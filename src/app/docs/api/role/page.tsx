import ApiEndpoint from "@/components/ApiEndpoint";

export default function RoleApiPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Role Management APIs
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Các endpoint này cho phép <strong>Owner</strong> hoặc <strong>EndUser</strong>
                có quyền <strong>Admin</strong> quản lý các vai trò (<em>Role</em>)
                trong một project. Mỗi vai trò là một tập hợp các quyền hạn
                (<em>Permissions</em>) để gán cho người dùng cuối.
            </p>

            {/* 📌 Lấy danh sách Roles */}
            <ApiEndpoint
                method="GET"
                path="/api/projects/{projectId}/roles"
                description="Lấy danh sách tất cả các vai trò đã được định nghĩa cho một project."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                successResponse={[
                    { id: 1, name: "USER", level: 10 },
                    { id: 2, name: "ADMIN", level: 1000 }
                ]}
            />

            {/* 📌 Tạo Role mới */}
            <ApiEndpoint
                method="POST"
                path="/api/projects/{projectId}/roles"
                description="Tạo một vai trò mới trong project. Tên vai trò phải duy nhất trong project."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                requestBody={{
                    name: "EDITOR",
                    level: 50
                }}
                successResponse={{
                    id: 3,
                    name: "EDITOR",
                    level: 50,
                    permissions: []
                }}
            />

            {/* 📌 Cập nhật Role */}
            <ApiEndpoint
                method="PUT"
                path="/api/projects/{projectId}/roles/{roleId}"
                description="Cập nhật tên và/hoặc cấp bậc (level) của một vai trò."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                requestBody={{
                    name: "Content Editor",
                    level: 55
                }}
                successResponse={{
                    id: 3,
                    name: "Content Editor",
                    level: 55,
                    permissions: []
                }}
            />

            {/* 📌 Xóa Role */}
            <ApiEndpoint
                method="DELETE"
                path="/api/projects/{projectId}/roles/{roleId}"
                description="Xóa một vai trò khỏi project. Sẽ thất bại nếu vẫn còn EndUser đang dùng vai trò này."
                auth="Yêu cầu token của Owner hoặc EndUser Admin."
                successResponse={{
                    success: true,
                    message: "Project role deleted successfully."
                }}
            />
        </div>
    );
}
