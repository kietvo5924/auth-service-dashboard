'use client';
import { useLoadingStore } from '@/app/lib/store';
import LoadingSpinner from './LoadingSpinner';

export default function GlobalRetryOverlay() {
    const { isRetrying } = useLoadingStore();

    // Nếu không ở trạng thái retry, không hiển thị gì cả
    if (!isRetrying) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
            <LoadingSpinner />
            <p className="text-white mt-4">Kết nối gặp sự cố. Đang thử lại...</p>
        </div>
    );
}