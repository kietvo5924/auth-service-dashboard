// src/lib/auth.ts
import { cookies } from 'next/headers';
import { Owner } from '../types';


// Đổi tên interface cho rõ ràng
interface OwnerProfile extends Owner {
    sub: string;
}

export async function getOwnerFromToken(): Promise<OwnerProfile | null> {
    const token = (await cookies()).get('owner-token')?.value;

    if (!token) {
        return null;
    }

    try {
        // Gọi đến auth-service để xác thực token
        const res = await fetch('https://auth-service-platform.onrender.com/api/owners/me/validate', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store', // Luôn kiểm tra, không dùng cache
        });

        if (!res.ok) {
        return null;
        }
        
        const ownerData: Owner = await res.json();
        return { ...ownerData, sub: ownerData.email }; // Trả về dữ liệu Owner đầy đủ

    } catch (error) {
        console.error('Token validation failed:', error);
        return null;
    }
}