import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('owner-token');
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard') && !token) {
        console.log('Không tìm thấy token, đang chuyển hướng về /login...');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && token) {
        console.log('Đã có token, đang chuyển hướng về /dashboard...');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log('Request hợp lệ, cho đi tiếp.');
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
    ],
};