'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function VerificationContent() {
    const searchParams = useSearchParams();
    const success = searchParams.get('success') === 'true';
    const error = searchParams.get('error');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md">
                {success ? (
                    <>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">Xác thực thành công!</h2>
                        <p className="mt-2 text-gray-600">
                            Tài khoản của bạn đã được kích hoạt. Bây giờ bạn có thể đăng nhập.
                        </p>
                        <Link href="/login" className="mt-6 inline-block w-full button-primary">
                            Tới trang Đăng nhập
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">Xác thực thất bại</h2>
                        <p className="mt-2 text-gray-600">
                            Link xác thực không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.
                        </p>
                        <p className="mt-2 text-xs text-red-500">{error}</p>
                        <Link href="/register" className="mt-6 inline-block w-full button-primary">
                            Quay lại trang Đăng ký
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default function VerifyEmailResultPage() {
    // Bọc component trong Suspense vì useSearchParams yêu cầu
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerificationContent />
        </Suspense>
    );
}