import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const authServiceUrl = 'https://auth-service-platform.onrender.com/api/platform/auth/login';

        const authRes = await fetch(authServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await authRes.json();

        if (!authRes.ok) {
            return NextResponse.json({ message: data.message || 'Authentication failed' }, { status: authRes.status });
        }

        const response = NextResponse.json({ success: true });

        // Lưu token vào cookie an toàn
        response.cookies.set('owner-token', data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 3,
        });

        return response;

    } catch (error) {
    return NextResponse.json({ message: 'An internal error occurred' }, { status: 500 });
    }
}