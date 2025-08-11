'use client';

import { useTransition } from 'react';
import { lockOwner, unlockOwner, updateOwnerRole } from './actions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Owner } from '@/app/types';
import { useLoadingStore } from '@/app/lib/store';

export default function UserActions({ owner, currentAdminEmail }: { owner: Owner, currentAdminEmail: string }) {
    const [isPending, startTransition] = useTransition();
    const showRetryOverlay = useLoadingStore((state) => state.showRetryOverlay);
    // Hàm chung để xử lý action và bắt lỗi
    const handleAction = async (action: () => Promise<void>) => {
        try {
            await action();
        } catch (error) {
            // Nếu có lỗi (ví dụ: lỗi kết nối DB), kích hoạt overlay
            console.error(error);
            showRetryOverlay();

            // Đợi 4 giây rồi reload lại trang
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        startTransition(() => handleAction(() => updateOwnerRole(owner.id, newRole)));
    };

    const handleLock = () => {
        startTransition(() => handleAction(() => lockOwner(owner.id)));
    };

    const handleUnlock = () => {
        startTransition(() => handleAction(() => unlockOwner(owner.id)));
    };

    const isSelf = owner.email === currentAdminEmail;

    return (
        <div className="flex items-center space-x-2">
            <select defaultValue={owner.role} onChange={handleRoleChange} disabled={isPending || isSelf} className="text-xs border border-gray-300 rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed">
                <option value="ROLE_USER">USER</option>
                <option value="ROLE_ADMIN">ADMIN</option>
            </select>

            {owner.locked ? (
                <button onClick={handleUnlock} disabled={isPending || isSelf} className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center w-16 h-7">
                    {isPending ? <LoadingSpinner /> : 'Unlock'}
                </button>
            ) : (
                <button onClick={handleLock} disabled={isPending || isSelf} className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center w-16 h-7">
                    {isPending ? <LoadingSpinner /> : 'Lock'}
                </button>
            )}
        </div>
    );
}