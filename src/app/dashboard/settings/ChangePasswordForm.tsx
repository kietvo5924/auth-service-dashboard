'use client';
import { useTransition } from 'react';
import { changeOwnerPassword } from './actions';

export default function ChangePasswordForm() {
    const [isPending, startTransition] = useTransition();
    // Có thể thêm state để quản lý message thành công/thất bại ở đây

    return (
        <form
            action={(formData) => startTransition(() => changeOwnerPassword(formData))}
            className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white space-y-5"
        >
            <h3 className="text-lg font-semibold text-gray-800">Đổi mật khẩu</h3>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Mật khẩu cũ
                </label>
                <input
                    name="oldPassword"
                    type="password"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Mật khẩu mới
                </label>
                <input
                    name="newPassword"
                    type="password"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2 border border-indigo-500 text-indigo-500 rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition disabled:bg-indigo-400 disabled:border-indigo-400 disabled:text-white"
            >
                {isPending ? "Đang đổi..." : "Đổi mật khẩu"}
            </button>
        </form>
    );
}