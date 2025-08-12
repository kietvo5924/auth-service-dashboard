'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

export async function updateProjectAction(projectId: string, formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    if (!token) throw new Error('Not authenticated');

    const rawData = {
        name: formData.get('name'),
        allowedOrigins: (formData.get('allowedOrigins') as string)
        .split(',')
        .map(origin => origin.trim())
        .filter(origin => origin.length > 0),
    };

    const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update project.');
    }

    // Làm mới lại dữ liệu của cả trang list và trang chi tiết
    revalidatePath('/dashboard/projects');
    revalidatePath(`/dashboard/projects/${projectId}`);
    // Chuyển hướng về trang danh sách project
    redirect('/dashboard/projects');
}