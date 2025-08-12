'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

async function getErrorMessage(response: Response, defaultMessage: string): Promise<string> {
    try {
        const errorBody = await response.json();
        return errorBody.message || defaultMessage;
    } catch (e) {
        return defaultMessage;
    }
}

export async function updateUserAction(projectId: string, userId: number, formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    if (!token) throw new Error('Not authenticated');

    // Gom tất cả dữ liệu vào một object
    const rawData = {
        fullName: formData.get('fullName'),
        roleIds: formData.getAll('roleIds').map(id => Number(id)),
    };

    // --- Chỉ cần MỘT lời gọi API duy nhất ---
    const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/endusers/${userId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData),
    });

    if (!res.ok) {
        const errorMessage = await getErrorMessage(res, 'Failed to update user.');
        throw new Error(errorMessage);
    }
    
    revalidatePath(`/dashboard/projects/${projectId}/users`);
    redirect(`/dashboard/projects/${projectId}/users`);
}