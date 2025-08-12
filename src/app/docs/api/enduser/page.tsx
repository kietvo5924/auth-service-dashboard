// src/app/docs/api/enduser/page.tsx
import ApiEndpoint from "@/components/ApiEndpoint";

export default function EndUserApiPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">End-User APIs</h1>
            <p className="mb-8">Các endpoint dành cho người dùng cuối (End-User) của các ứng dụng do Owner xây dựng.</p>

            {/* === Public End-User APIs === */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Public Authentication</h2>
            <ApiEndpoint
                method="POST"
                path="/api/p/{apiKey}/auth/register"
                description="End-User tự đăng ký tài khoản cho một project."
                auth="Công khai (yêu cầu apiKey trong đường dẫn)"
                requestBody={{ fullName: "End User", email: "user@example.com", password: "password123" }}
                successResponse={{ success: true, message: "User registered successfully..." }}
            />
            <ApiEndpoint
                method="POST"
                path="/api/p/{apiKey}/auth/login"
                description="End-User đăng nhập vào một project."
                auth="Công khai (yêu cầu apiKey trong đường dẫn)"
                requestBody={{ email: "user@example.com", password: "password123" }}
                successResponse={{ accessToken: "eyJ...", tokenType: "Bearer" }}
            />
            <ApiEndpoint
                method="GET"
                path="/api/p/{apiKey}/auth/verify-email"
                description="Endpoint mà link trong email xác thực trỏ tới. Được kích hoạt bởi người dùng."
                auth="Công khai (yêu cầu apiKey và token trong URL)"
            />

            {/* === Protected End-User APIs === */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Personal Account Management</h2>
            <ApiEndpoint
                method="GET"
                path="/api/eu/me"
                description="End-User lấy thông tin cá nhân của chính họ."
                auth="Yêu cầu token của End-User."
                successResponse={{ id: 1, fullName: "End User", email: "user@example.com", roles: ["USER"] }}
            />
            <ApiEndpoint
                method="PUT"
                path="/api/eu/me"
                description="End-User tự cập nhật fullName."
                auth="Yêu cầu token của End-User."
                requestBody={{ fullName: "Updated Name" }}
            />
            <ApiEndpoint
                method="PUT"
                path="/api/eu/me/password"
                description="End-User tự đổi mật khẩu."
                auth="Yêu cầu token của End-User."
                requestBody={{ oldPassword: "currentPassword", newPassword: "newStrongPassword" }}
            />
        </div>
    );
}