import Link from "next/link";

// Hàm này sẽ chạy trên server để gọi API xác thực
async function verifyTokenOnServer(token: string, apiKey?: string): Promise<{ success: boolean; message: string }> {
    // Nếu không có token, trả về lỗi ngay
    if (!token) {
        return { success: false, message: "Verification token is missing." };
    }

    try {
        let apiUrl = '';
        if (apiKey) {
            // Dành cho EndUser
            apiUrl = `https://auth-service-platform.onrender.com/api/p/${apiKey}/auth/verify-email?token=${token}`;
        } else {
            // Dành cho Owner
            apiUrl = `https://auth-service-platform.onrender.com/api/platform/auth/verify-email?token=${token}`;
        }

        const res = await fetch(apiUrl, { cache: 'no-store' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Verification failed.');
        }

        return { success: true, message: data.message };

    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: 'An unknown error occurred.' };
    }
}

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token: string, apiKey?: string } }) {

    const { token, apiKey } = searchParams;
    const result = await verifyTokenOnServer(token, apiKey);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md">
                {result.success ? (
                    <>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">Xác thực thành công!</h2>
                        <p className="mt-2 text-gray-600">{result.message}</p>
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
                        <p className="mt-2 text-red-600">{result.message}</p>
                    </>
                )}
            </div>
        </div>
    );
}