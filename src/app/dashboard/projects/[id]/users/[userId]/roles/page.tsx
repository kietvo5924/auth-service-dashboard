import { cookies } from 'next/headers';
import EditUserClient from './EditUserClient';
import { EndUser, ProjectRole } from '@/app/types';

// --- HÀM LẤY DỮ LIỆU ĐÃ ĐƯỢC LÀM AN TOÀN HƠN ---

async function getEndUserDetails(token: string, projectId: string, userId: string): Promise<EndUser | null> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}/endusers/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return null;

    try {
        return await res.json(); // Bọc trong try-catch để tránh lỗi JSON rỗng
    } catch (error) {
        console.error("Failed to parse JSON for getEndUserDetails:", error);
        return null;
    }
}

async function getAvailableRoles(token: string, projectId: string): Promise<ProjectRole[]> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}/roles`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return [];

    try {
        return await res.json(); // Bọc trong try-catch
    } catch (error) {
        console.error("Failed to parse JSON for getAvailableRoles:", error);
        return [];
    }
}

// --- COMPONENT TRANG CHÍNH ĐÃ ĐƯỢC SỬA LỖI ---

export default async function EditUserPage({ params }: { params: { id: string, userId: string } }) {
    // --- FIX 1: Dùng await params như bạn đã khám phá ---
    const { id: projectId, userId } = await params;

    const token = (await cookies()).get('owner-token')?.value;

    // Lấy đồng thời cả thông tin user và danh sách role
    const [user, availableRoles] = await Promise.all([
        token ? getEndUserDetails(token, projectId, userId) : null,
        token ? getAvailableRoles(token, projectId) : [],
    ]);

    if (!user) {
        return <div>User not found or you do not have permission.</div>
    }

    return (
        <EditUserClient
            user={user}
            availableRoles={availableRoles}
            projectId={projectId}
        />
    );
}