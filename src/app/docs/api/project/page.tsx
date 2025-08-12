// src/app/docs/api/project/page.tsx
import ApiEndpoint from "@/components/ApiEndpoint";

export default function ProjectApiPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Project & Resource Management APIs</h1>
            <p className="mb-8">Các endpoint được bảo vệ để Owner (hoặc EndUser có quyền Admin) quản lý project và các tài nguyên bên trong nó.</p>

            {/* === Project Management === */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Quản lý Project</h2>
            <ApiEndpoint
                method="GET"
                path="/api/projects"
                description="Lấy danh sách tất cả các project thuộc về Owner đang đăng nhập."
                auth="Yêu cầu token của Owner."
                successResponse={[{ id: 1, name: "My First Project", apiKey: "pk_live_...", allowedOrigins: [] }]}
            />
            <ApiEndpoint
                method="POST"
                path="/api/projects"
                description="Tạo một project mới. Trả về thông tin project bao gồm cả projectSecret một lần duy nhất."
                auth="Yêu cầu token của Owner."
                requestBody={{ name: "My New App", allowedOrigins: ["https://myapp.com"] }}
                successResponse={{ id: 2, name: "My New App", apiKey: "pk_live_...", projectSecret: "sk_live_...", allowedOrigins: ["https://myapp.com"] }}
            />
            <ApiEndpoint
                method="GET"
                path="/api/projects/{projectId}"
                description="Lấy thông tin chi tiết của một project cụ thể."
                auth="Yêu cầu token của Owner sở hữu project đó."
                successResponse={{ id: 1, name: "My First Project", apiKey: "pk_live_...", allowedOrigins: [] }}
            />
            <ApiEndpoint
                method="PUT"
                path="/api/projects/{projectId}"
                description="Cập nhật tên và allowedOrigins cho một project."
                auth="Yêu cầu token của Owner sở hữu project đó."
                requestBody={{ name: "Updated Project Name", allowedOrigins: ["https://myapp.com", "http://localhost:3000"] }}
            />

            {/* === Role Management === */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Quản lý Vai trò (Role)</h2>
            <ApiEndpoint
                method="GET"
                path="/api/projects/{projectId}/roles"
                description="Lấy danh sách tất cả các vai trò (role) của một project."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                successResponse={[{ id: 1, name: "USER", level: 10 }, { id: 2, name: "ADMIN", level: 1000 }]}
            />
            <ApiEndpoint
                method="POST"
                path="/api/projects/{projectId}/roles"
                description="Tạo một vai trò mới cho project."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                requestBody={{ name: "EDITOR", level: 50 }}
                successResponse={{ id: 3, name: "EDITOR", level: 50 }}
            />
            <ApiEndpoint
                method="DELETE"
                path="/api/projects/{projectId}/roles/{roleId}"
                description="Xóa một vai trò khỏi project."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
            />

            {/* === EndUser Management by Admin === */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Quản lý End-User</h2>
            <ApiEndpoint
                method="GET"
                path="/api/projects/{projectId}/endusers"
                description="Lấy danh sách tất cả EndUser của một project."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
            />
            <ApiEndpoint
                method="POST"
                path="/api/projects/{projectId}/endusers/admin"
                description="Admin tạo một tài khoản EndUser mới (mặc định đã xác thực email)."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                requestBody={{ fullName: "New User", email: "new.user@example.com", password: "password123" }}
            />
            <ApiEndpoint
                method="PUT"
                path="/api/projects/{projectId}/endusers/{userId}/roles"
                description="Cập nhật (thay thế toàn bộ) danh sách vai trò cho một EndUser."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                requestBody={{ roleIds: [1, 3] }}
            />
        </div>
    );
}