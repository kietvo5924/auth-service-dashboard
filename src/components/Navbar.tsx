import Link from 'next/link';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import ProfileButton from './ProfileButton';

// Hàm để lấy thông tin người dùng từ token
async function getUserFromToken() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('owner-token')?.value;

    if (!token) {
        return null;
    }

    try {
        const payload = jose.decodeJwt(token);

        if (typeof payload.sub === 'string') {
            return { email: payload.sub };
        }
        return null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

export default async function Navbar() {
    const user = await getUserFromToken();

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-800">
                    AuthPlatform
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/#features" className="text-gray-600 hover:text-indigo-600">
                        Tính năng
                    </Link>
                    <Link href="/docs" className="text-gray-600 hover:text-indigo-600">
                        Tài liệu
                    </Link>

                    {user ? (
                        <ProfileButton userEmail={user.email} />
                    ) : (
                        <>
                            <Link href="/register" className="px-4 py-2 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50">
                                Đăng ký
                            </Link>
                            <Link href="/login" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}