import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        const authServiceUrl = 'https://auth-service-platform.onrender.com/api/platform/auth/forgot-password';

        const authRes = await fetch(authServiceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        });

        const data = await authRes.json();

        if (!authRes.ok) {
        return NextResponse.json({ message: data.message || 'Request failed' }, { status: authRes.status });
        }

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ message: 'An internal error occurred' }, { status: 500 });
    }
}