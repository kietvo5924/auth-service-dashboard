'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProjectAction(formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;

    const rawData = {
        name: formData.get('name'),
        // Xử lý allowedOrigins: tách chuỗi bằng dấu phẩy
        allowedOrigins: (formData.get('allowedOrigins') as string)
        .split(',')
        .map(origin => origin.trim())
        .filter(origin => origin.length > 0),
    };

    const res = await fetch('https://auth-service-platform.onrender.com/api/projects', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create project.');
    }

    // Làm mới lại trang danh sách project và chuyển hướng
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}