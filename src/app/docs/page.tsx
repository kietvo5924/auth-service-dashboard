import ApiEndpoint from "@/components/ApiEndpoint";
import Link from "next/link";

export default function DocsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Tài liệu API
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Tổng quan chi tiết về tất cả các endpoint của Auth Service Platform.
            </p>

            {/* Thư viện Client */}
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg mb-12">
                <h3 className="font-semibold text-blue-800">Tích hợp Nhanh chóng với Spring Boot Starter</h3>
                <p className="text-blue-700 mt-1">
                    Cách dễ dàng nhất để sử dụng các API này là thông qua thư viện `auth-client-spring-boot-starter`.
                    Nó cung cấp SDK và các Annotation bảo mật tiện lợi.
                </p>
                <Link
                    href="https://github.com/kietvo5924/auth-client-spring-boot-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Xem trên GitHub
                </Link>
            </div>

            {/* --- Owner APIs --- */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Owner Authentication APIs</h2>
            <ApiEndpoint
                method="POST"
                path="/api/platform/auth/register"
                description="Đăng ký một tài khoản Owner mới. Yêu cầu xác thực email để kích hoạt."
                auth="Công khai"
                requestBody={{ fullName: "John Doe", email: "owner@example.com", password: "password123" }}
                successResponse={{ success: true, message: "User registered successfully. Please check your email..." }}
            />
            <ApiEndpoint
                method="POST"
                path="/api/platform/auth/login"
                description="Đăng nhập cho Owner và nhận về JWT token."
                auth="Công khai"
                requestBody={{ email: "owner@example.com", password: "password123" }}
                successResponse={{ accessToken: "eyJ...", tokenType: "Bearer" }}
            />

            {/* --- End-User Public APIs --- */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-12 border-b pb-2">End-User Public APIs</h2>
            <ApiEndpoint
                method="POST"
                path="/api/p/{apiKey}/auth/register"
                description="Đăng ký một tài khoản End-User mới cho một Project cụ thể."
                auth="Công khai (yêu cầu apiKey trong đường dẫn)"
                requestBody={{ fullName: "End User", email: "user@example.com", password: "password123" }}
                successResponse={{ success: true, message: "User registered successfully..." }}
            />
            <ApiEndpoint
                method="POST"
                path="/api/p/{apiKey}/auth/validate-token"
                description="Xác thực một End-User token. Được sử dụng bởi thư viện client."
                auth="Công khai (yêu cầu apiKey trong đường dẫn)"
                requestBody={{ token: "eyJ..." }}
                successResponse={{ valid: true, email: "user@example.com", userId: 1, roles: ["USER"], maxRoleLevel: 10, permissions: [] }}
            />

            {/* --- Protected Management APIs --- */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-12 border-b pb-2">Management APIs</h2>
            <ApiEndpoint
                method="GET"
                path="/api/admin/owners"
                description="Lấy danh sách tất cả các tài khoản Owner trong hệ thống."
                auth="Yêu cầu token của Owner có vai trò ROLE_ADMIN"
                successResponse={[{ id: 1, fullName: "Admin Owner", email: "admin@example.com", role: "ROLE_ADMIN", emailVerified: true, locked: false }]}
            />
            <ApiEndpoint
                method="POST"
                path="/api/admin/owners/{id}/lock"
                description="Khóa một tài khoản Owner."
                auth="Yêu cầu token của Owner có vai trò ROLE_ADMIN"
            />

            {/* --- Protected End-User APIs --- */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-12 border-b pb-2">Protected End-User APIs</h2>
            <ApiEndpoint
                method="GET"
                path="/api/eu/me"
                description="End-User lấy thông tin cá nhân của chính họ."
                auth="Yêu cầu token của End-User"
                successResponse={{ id: 1, fullName: "End User", email: "user@example.com", roles: ["USER"] }}
            />
        </div>
    );
}