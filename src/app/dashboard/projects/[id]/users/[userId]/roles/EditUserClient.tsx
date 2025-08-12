'use client';
import { useState, useTransition } from 'react';
import { updateUserAction } from './actions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { EndUser, ProjectRole } from '@/app/types';

interface EditUserProps {
    user: EndUser;
    availableRoles: ProjectRole[];
    projectId: string;
}

export default function EditUserClient({ user, availableRoles, projectId }: EditUserProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // State để quản lý các role được chọn
    const [selectedRoleIds, setSelectedRoleIds] = useState<Set<number>>(
        new Set(availableRoles.filter(r => user.roles.includes(r.name)).map(r => r.id))
    );

    const handleRoleChange = (roleId: number) => {
        setSelectedRoleIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(roleId)) {
                newSet.delete(roleId);
            } else {
                newSet.add(roleId);
            }
            return newSet;
        });
    };

    const formAction = (formData: FormData) => {
        // Thêm các roleId đã chọn vào formData trước khi gửi
        selectedRoleIds.forEach(id => formData.append('roleIds', id.toString()));

        startTransition(() => {
            updateUserAction(projectId, user.id, formData);
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit User: <span className="text-indigo-600">{user.email}</span></h1>

            <form action={formAction} className="mt-8 p-6 bg-white border rounded-lg shadow-sm max-w-2xl space-y-6">
                {/* Phần cập nhật thông tin */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">User Details</h2>
                    <label className="block mb-1 text-sm font-medium">Full Name</label>
                    <input name="fullName" defaultValue={user.fullName} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
                </div>

                {/* Phần phân quyền */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Assign Roles</h2>
                    <div className="space-y-2">
                        {availableRoles.map(role => (
                            <label key={role.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={role.id}
                                    checked={selectedRoleIds.has(role.id)}
                                    onChange={() => handleRoleChange(role.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>{role.name} (Level: {role.level})</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded-md">
                        Quay lại
                    </button>
                    <button type="submit" disabled={isPending} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-400">
                        {isPending ? <LoadingSpinner /> : 'Lưu Thay đổi'}
                    </button>
                </div>
            </form>
        </div>
    );
}