'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

// Action để TẠO MỚI role
export async function createRoleAction(projectId: string, formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    const rawData = {
        name: formData.get('name'),
        level: Number(formData.get('level')),
    };

    const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/roles`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData),
    });

    if (!res.ok) throw new Error('Failed to create role.');

    revalidatePath(`/dashboard/projects/${projectId}/roles`);
}

// Action để CẬP NHẬT role
export async function updateRoleAction(projectId: string, roleId: number, formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    const rawData = {
        name: formData.get('name'),
        level: Number(formData.get('level')),
    };

    const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/roles/${roleId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData),
    });

    if (!res.ok) throw new Error('Failed to update role.');

    revalidatePath(`/dashboard/projects/${projectId}/roles`);
}

// Action để XÓA role
export async function deleteRoleAction(projectId: string, roleId: number) {
    const token = (await cookies()).get('owner-token')?.value;

    const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/roles/${roleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to delete role.');
    }

    revalidatePath(`/dashboard/projects/${projectId}/roles`);
}