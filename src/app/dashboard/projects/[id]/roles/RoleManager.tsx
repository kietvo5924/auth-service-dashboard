'use client';
import { useState, useTransition, useRef } from 'react';
import { createRoleAction, updateRoleAction, deleteRoleAction } from './actions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ProjectRole } from '@/app/types';

interface RoleManagerProps {
    initialRoles: ProjectRole[];
    projectId: string;
}

export default function RoleManager({ initialRoles, projectId }: RoleManagerProps) {
    const [isPending, startTransition] = useTransition();
    // --- STATE MỚI ĐỂ QUẢN LÝ THÔNG BÁO ---
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<ProjectRole | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Hàm tiện ích để xóa các thông báo cũ
    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    const openNewModal = () => {
        setEditingRole(null);
        clearMessages();
        setIsModalOpen(true);
    };

    const openEditModal = (role: ProjectRole) => {
        setEditingRole(role);
        clearMessages();
        setIsModalOpen(true);
    };

    const handleDelete = (roleId: number) => {
        clearMessages();
        if (confirm('Bạn có chắc chắn muốn xóa vai trò này không?')) {
            startTransition(async () => {
                try {
                    await deleteRoleAction(projectId, roleId);
                    setSuccess('Vai trò đã được xóa thành công.');
                } catch (err) {
                    if (err instanceof Error) setError(err.message);
                }
            });
        }
    };

    const formAction = (formData: FormData) => {
        clearMessages();
        startTransition(async () => {
            try {
                if (editingRole) {
                    await updateRoleAction(projectId, editingRole.id, formData);
                    setSuccess('Vai trò đã được cập nhật thành công.');
                } else {
                    await createRoleAction(projectId, formData);
                    setSuccess('Vai trò đã được tạo thành công.');
                }
                setIsModalOpen(false);
                formRef.current?.reset();
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
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý Vai trò</h1>
                    <p className="text-gray-600">Thêm, sửa, xóa các vai trò cho project này.</p>
                </div>
                <button
                    onClick={openNewModal}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                    + Thêm Role
                </button>
            </div>

            {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
            {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}

            {/* Bảng Roles */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Tên Role</th>
                            <th className="px-6 py-3 text-left">Level</th>
                            <th className="px-6 py-3 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {initialRoles.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{role.id}</td>
                                <td className="px-6 py-4 font-medium">{role.name}</td>
                                <td className="px-6 py-4">{role.level}</td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => openEditModal(role)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(role.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-gray-500 mt-1 italic">
                Lưu ý: Các vai trò có Level từ 500 trở lên sẽ có quyền quản lý End-User.
            </p>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {editingRole ? 'Chỉnh sửa Role' : 'Tạo Role mới'}
                        </h2>
                        <form action={formAction} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Tên Role</label>
                                <input
                                    name="name"
                                    defaultValue={editingRole?.name}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Level</label>
                                <input
                                    name="level"
                                    type="number"
                                    defaultValue={editingRole?.level}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-400"
                                >
                                    {isPending ? <LoadingSpinner /> : 'Lưu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}