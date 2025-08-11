import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, password } = body;

        // URL của auth-service thật trên Render
        const authServiceUrl = 'https://auth-service-platform.onrender.com/api/platform/auth/register';

        const authRes = await fetch(authServiceUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password }),
        });

        // Lấy dữ liệu JSON từ response của auth-service
        const data = await authRes.json();

        // Nếu auth-service trả về lỗi (ví dụ: email đã tồn tại), gửi lỗi đó về lại cho form
        if (!authRes.ok) {
            return NextResponse.json({ message: data.message || 'Registration failed' }, { status: authRes.status });
        }

        // Nếu thành công, gửi response thành công về cho form
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ message: 'An internal error occurred' }, { status: 500 });
    }
}