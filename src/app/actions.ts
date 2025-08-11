'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  // Xóa cookie owner-token
    (await
        cookies()).delete('owner-token');
  // Chuyển hướng về trang đăng nhập
    redirect('/login');
}