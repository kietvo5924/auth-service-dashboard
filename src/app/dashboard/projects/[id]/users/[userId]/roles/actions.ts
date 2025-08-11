'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

// Hàm xử lý lỗi an toàn
async function getErrorMessage(response: Response, defaultMessage: string): Promise<string> {
    try {
        const errorBody = await response.json();
        return errorBody.message || defaultMessage;
    } catch (e) {
        // Trả về thông báo mặc định nếu không thể parse JSON
        return defaultMessage;
    }
}

export async function updateUserAction(projectId: string, userId: number, formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    if (!token) throw new Error('Not authenticated');

    const fullName = formData.get('fullName');
    const roleIds = formData.getAll('roleIds').map(id => Number(id));

    // --- Gọi API để cập nhật Full Name ---
    const detailsUpdateRes = await fetch(`${API_BASE_URL}/api/projects/${projectId}/endusers/${userId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName }),
    });

    if (!detailsUpdateRes.ok) {
        const errorMessage = await getErrorMessage(detailsUpdateRes, 'Failed to update user details.');
        throw new Error(errorMessage);
    }

    // --- Gọi API để cập nhật Roles ---
    const rolesUpdateRes = await fetch(`${API_BASE_URL}/api/projects/${projectId}/endusers/${userId}/roles`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleIds }),
    });

    if (!rolesUpdateRes.ok) {
        const errorMessage = await getErrorMessage(rolesUpdateRes, 'Failed to update user roles.');
        throw new Error(errorMessage);
    }
    
    revalidatePath(`/dashboard/projects/${projectId}/users`);
    redirect(`/dashboard/projects/${projectId}/users`);
}