'use client';
import { useState, useTransition, useRef } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { EndUser, ProjectRole } from '@/app/types';
import { createEndUserAction, lockEndUser, unlockEndUser } from './actions';

interface ClientProps {
    initialUsers: EndUser[];
    availableRoles: ProjectRole[];
    projectId: string;
    apiKey: string;
}

export default function UserManagementClient({ initialUsers, availableRoles, projectId, apiKey }: ClientProps) {
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const formAction = (formData: FormData) => {
        setError(null);
        setSuccess(null);
        startTransition(async () => {
            try {
                await createEndUserAction(apiKey, projectId, formData);
                setIsModalOpen(false);
                formRef.current?.reset();
                setSuccess('Tạo End-User thành công!');
            } catch (err) {
                if (err instanceof Error) setError(err.message);
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800"></h1>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                    + Thêm End-User
                </button>
            </div>

            {/* Thông báo */}
            {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
            {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}

            {/* Bảng Users */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roles</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Xác thực email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {initialUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4 font-medium">{user.fullName}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 text-xs">{user.roles.join(', ')}</td>
                                <td className="px-6 py-4">
                                    {user.emailVerified ?
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-800">Verified</span> :
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {user.locked ? (
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                            Locked
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    {user.locked ? (
                                        <button
                                            onClick={() => startTransition(() => unlockEndUser(projectId, user.id))}
                                            disabled={isPending}
                                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-400"
                                        >
                                            Unlock
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => startTransition(() => lockEndUser(projectId, user.id))}
                                            disabled={isPending}
                                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-400"
                                        >
                                            Lock
                                        </button>
                                    )}
                                    <Link
                                        href={`/dashboard/projects/${projectId}/users/${user.id}/roles`}
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Manage Roles
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Tạo End-User mới</h2>
                        <form ref={formRef} action={formAction} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <div>
                                <label className="block mb-1 text-sm font-medium">Họ và Tên</label>
                                <input name="fullName" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Email</label>
                                <input name="email" type="email" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
                                <input name="password" type="password" minLength={8} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-400"
                                >
                                    {isPending ? <LoadingSpinner /> : 'Tạo User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
