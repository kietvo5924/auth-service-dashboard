'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Yêu cầu thất bại');
            }

            router.push(`/reset-password?email=${encodeURIComponent(email)}`);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
                <h2 className="mb-2 text-2xl font-bold text-center">Quên Mật khẩu</h2>
                <p className="mb-6 text-sm text-center text-gray-500">
                    Nhập email của bạn để nhận mã OTP
                </p>

                {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
                {success && <p className="mb-4 text-green-600 text-center">{success}</p>}

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 flex items-center justify-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                    {isLoading ? <LoadingSpinner /> : 'Gửi mã OTP'}
                </button>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Nhớ lại mật khẩu?{' '}
                    <Link href="/login" className="font-medium text-indigo-600 hover:underline">
                        Quay lại Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
}
