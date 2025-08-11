import { EndUser, Project, ProjectRole } from '@/app/types';
import { cookies } from 'next/headers';
import UserManagementClient from './UserManagementClient';


// Hàm lấy danh sách EndUser (không đổi)
async function getEndUsers(token: string, projectId: string): Promise<EndUser[]> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}/endusers`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
}

// Hàm lấy chi tiết Project (không đổi)
async function getProjectDetails(token: string, projectId: string): Promise<Project | null> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
}

// Hàm lấy các Role có sẵn (không đổi)
async function getAvailableRoles(token: string, projectId: string): Promise<ProjectRole[]> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}/roles`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function ProjectUsersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: projectId } = await params;

    const token = (await cookies()).get('owner-token')?.value;

    // Lấy đồng thời cả 3 loại dữ liệu
    const [users, availableRoles, project] = await Promise.all([
        token ? getEndUsers(token, projectId) : [],
        token ? getAvailableRoles(token, projectId) : [],
        token ? getProjectDetails(token, projectId) : null,
    ]);

    if (!project) {
        return <div>Project not found or you do not have permission.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Quản lý End-User <span className="text-indigo-600">{project.name}</span></h1>
            <p className="text-gray-600">Thêm, khóa/mở khóa và gán quyền cho người dùng.</p>

            <div className="mt-8">
                <UserManagementClient
                    initialUsers={users}
                    availableRoles={availableRoles}
                    projectId={projectId}
                    apiKey={project.apiKey}
                />
            </div>
        </div>
    );
}