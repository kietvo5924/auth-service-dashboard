'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

// Hàm chung để thực hiện request quản lý
async function manageOwnerRequest(ownerId: number, action: string, method: string, body?: object) {
    const token = (await cookies()).get('owner-token')?.value;

    if (!token) {
        throw new Error('Not authenticated');
    }

    const res = await fetch(`${API_BASE_URL}/api/admin/owners/${ownerId}/${action}`, {
        method: method,
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {

        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to perform action: ${action}`);
    }
}

export async function lockOwner(ownerId: number) {
    await manageOwnerRequest(ownerId, 'lock', 'POST');
    revalidatePath('/dashboard/owners');
}

export async function unlockOwner(ownerId: number) {
    await manageOwnerRequest(ownerId, 'unlock', 'POST');
    revalidatePath('/dashboard/owners');
}

export async function updateOwnerRole(ownerId: number, newRole: string) {
    await manageOwnerRequest(ownerId, 'role', 'PUT', { role: newRole });
    revalidatePath('/dashboard/owners');
}