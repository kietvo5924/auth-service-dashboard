// src/app/docs/api/owner/page.tsx
import ApiEndpoint from "@/components/ApiEndpoint";

export default function OwnerApiPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Owner Authentication APIs</h1>
            <p className="mb-8">Các endpoint để Owner đăng ký, đăng nhập và quản lý tài khoản.</p>

            <ApiEndpoint
                method="POST"
                path="/api/platform/auth/register"
                description="Đăng ký một tài khoản Owner mới. Yêu cầu xác thực email để kích hoạt."
                auth="Công khai"
                requestBody={{ fullName: "John Doe", email: "owner@example.com", password: "password123" }}
                successResponse={{ success: true, message: "User registered successfully..." }}
            />
            <ApiEndpoint
                method="POST"
                path="/api/platform/auth/login"
                description="Đăng nhập cho Owner và nhận về JWT token."
                auth="Công khai"
                requestBody={{ email: "owner@example.com", password: "password123" }}
                successResponse={{ accessToken: "eyJ...", tokenType: "Bearer" }}
            />
            {/* Bạn có thể thêm các endpoint khác của Owner vào đây */}
        </div>
    );
}