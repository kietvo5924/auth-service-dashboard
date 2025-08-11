'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { logout } from '@/app/actions';

const API_BASE_URL = 'https://auth-service-platform.onrender.com';

// Action để cập nhật Full Name
export async function updateOwnerProfile(formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    const fullName = formData.get('fullName');

    const res = await fetch(`${API_BASE_URL}/api/owners/me`, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName }),
    });

    if (!res.ok) throw new Error('Failed to update profile.');
    revalidatePath('/dashboard/settings');
}

// Action để đổi mật khẩu
export async function changeOwnerPassword(formData: FormData) {
    const token = (await cookies()).get('owner-token')?.value;
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');

    const res = await fetch(`${API_BASE_URL}/api/owners/me/password`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to change password.');
    }
    await logout();
}