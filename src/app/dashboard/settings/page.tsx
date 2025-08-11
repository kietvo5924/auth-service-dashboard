import { cookies } from 'next/headers';
import UpdateProfileForm from './UpdateProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import { Owner } from '@/app/types';

// Hàm lấy thông tin chi tiết của Owner hiện tại
async function getMyProfile(token: string): Promise<Owner | null> {
    const res = await fetch('https://auth-service-platform.onrender.com/api/owners/me', {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function SettingsPage() {
    const token = (await cookies()).get('owner-token')?.value;
    const owner = token ? await getMyProfile(token) : null;

    if (!owner) {
        return <div>Could not load owner profile.</div>;
    }

    return (
        <div className="space-y-8">
            {/* Thông tin tài khoản */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Cài đặt Tài khoản</h1>
                <div className="mt-4 p-6 bg-gray-50 border rounded-lg">
                    <p className="text-gray-700">
                        <strong>Email:</strong> {owner.email}
                    </p>
                    <p className="text-gray-700">
                        <strong>Vai trò:</strong> {owner.role.replace('ROLE_', '')}
                    </p>
                </div>
            </div>

            {/* Các form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Cập nhật thông tin */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        Cập nhật thông tin
                    </h2>
                    <UpdateProfileForm owner={owner} />
                </div>

                {/* Form Đổi mật khẩu */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        Đổi mật khẩu
                    </h2>
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );

}
