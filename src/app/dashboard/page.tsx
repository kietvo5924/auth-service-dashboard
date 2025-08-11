import DashboardCard from '@/components/DashboardCard';
import { getOwnerFromToken } from '../lib/auth';

export default async function DashboardPage() {
    const owner = await getOwnerFromToken();

    const isAdmin = owner?.role === 'ROLE_ADMIN';

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
                Chào mừng trở lại <span className="text-indigo-600">{owner?.sub}</span>!
            </h1>
            <p className="mt-2 text-gray-600">Bảng điều khiển của bạn.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {isAdmin && (
                    <DashboardCard
                        title="Quản lý Người dùng Platform"
                        description="Xem danh sách, khóa hoặc mở khóa tài khoản các Owner khác."
                        href="/dashboard/owners"
                    />
                )}

                <DashboardCard
                    title="Quản lý Project"
                    description="Tạo project mới, xem và quản lý các project của bạn."
                    href="/dashboard/projects"
                />

            </div>
        </div>
    );
}