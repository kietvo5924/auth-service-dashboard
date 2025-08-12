import { cookies } from 'next/headers';
import DashboardCard from '@/components/DashboardCard';
import { Project } from '@/app/types';
import EditProjectForm from './EditProjectForm';

// Hàm lấy thông tin chi tiết của một project
async function getProjectDetails(token: string, projectId: string): Promise<Project | null> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        // Trả về null nếu không tìm thấy hoặc không có quyền truy cập
        return null;
    }
    return res.json();
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: projectId } = await params;

    const token = (await cookies()).get('owner-token')?.value;
    const project = token ? await getProjectDetails(token, projectId) : null;

    if (!project) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">Project Not Found</h1>
                <p className="text-gray-600">The project could not be found or you don&apos;t have permission to view it.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Project: <span className="text-indigo-600">{project.name}</span></h1>
                <p className="mt-2 text-gray-600">Xem và chỉnh sửa cài đặt cho project của bạn.</p>
            </div>

            {/* Hiển thị thông tin Keys */}
            <div className="mb-8 p-6 bg-gray-50 border rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">API Keys</h2>
                <div className="space-y-3 font-mono text-sm">
                    <div>
                        <label className="block text-gray-500">API Key</label>
                        <p className="p-2 bg-gray-200 rounded text-gray-800">{project.apiKey}</p>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                {/* Form chỉnh sửa */}
                <div className="p-6 bg-white border rounded-lg shadow-sm">
                    <EditProjectForm project={project} />
                </div>
            </div>

            {/* Các thẻ điều hướng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    title="Quản lý End-User"
                    description="Xem danh sách, phân quyền và quản lý tất cả người dùng cuối của project này."
                    href={`/dashboard/projects/${projectId}/users`}
                />
                <DashboardCard
                    title="Quản lý Vai trò (Roles)"
                    description="Tạo và chỉnh sửa các vai trò và quyền hạn cho người dùng cuối."
                    href={`/dashboard/projects/${projectId}/roles`}
                />
            </div>
        </div>
    );
}