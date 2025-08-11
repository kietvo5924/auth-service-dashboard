'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

// Action để khóa/mở khóa user (dùng owner-token)
async function manageUserAction(projectId: string, userId: number, action: 'lock' | 'unlock') {
    const token = (await cookies()).get('owner-token')?.value;
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/endusers/${userId}/${action}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Failed to ${action} user.`);
    revalidatePath(`/dashboard/projects/${projectId}/users`);
}

export async function lockEndUser(projectId: string, userId: number) {
    await manageUserAction(projectId, userId, 'lock');
}

export async function unlockEndUser(projectId: string, userId: number) {
    await manageUserAction(projectId, userId, 'unlock');
}

// --- ACTION MỚI ---
// Action để admin tạo user mới, gọi đến API register công khai
export async function createEndUserAction(apiKey: string, projectId: string, formData: FormData) {
    // Action này không cần token của Owner
    const rawData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const res = await fetch(`${API_BASE_URL}/api/p/${apiKey}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create user.');
    }
    revalidatePath(`/dashboard/projects/${projectId}/users`);
}