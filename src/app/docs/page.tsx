import Link from "next/link";
import { Lightbulb, BookOpen, Users, ShieldCheck, Key, } from "lucide-react";

const ConceptCard = ({
    title,
    icon: Icon,
    children
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) => (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-indigo-500" />
            <h4 className="font-bold text-gray-800">{title}</h4>
        </div>
        <p className="text-gray-600">{children}</p>
    </div>
);

export default function DocsHomePage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Chào mừng đến với Auth Service Platform
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Đây là nền tảng xác thực và phân quyền mạnh mẽ, giúp bạn nhanh chóng
                thêm chức năng đăng ký, đăng nhập, và quản lý người dùng vào ứng dụng
                của mình.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Các Khái niệm Cốt lõi
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <ConceptCard title="Owner" icon={Lightbulb}>
                    Nhà phát triển hoặc chủ sở hữu ứng dụng. Mỗi Owner có thể sở hữu
                    nhiều Project.
                </ConceptCard>
                <ConceptCard title="Project" icon={BookOpen}>
                    Đại diện cho một ứng dụng. Mỗi Project có môi trường EndUser, Role,
                    và Permission riêng.
                </ConceptCard>
                <ConceptCard title="End-User" icon={Users}>
                    Người dùng cuối của ứng dụng. Ví dụ: độc giả blog, người viết bài.
                </ConceptCard>
                <ConceptCard title="Role (Vai trò)" icon={ShieldCheck}>
                    Nhóm các quyền hạn (ADMIN, EDITOR...). Một EndUser có thể có nhiều
                    Role.
                </ConceptCard>
                <ConceptCard title="Permission (Quyền hạn)" icon={Key}>
                    Hành động cụ thể mà Role có thể thực hiện. Ví dụ: users:read.
                </ConceptCard>
            </div>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Hướng dẫn Bắt đầu Nhanh
            </h2>

            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        Bước 1: Đăng ký tài khoản Owner
                    </h3>
                    <p>
                        Tạo tài khoản tại{" "}
                        <Link href="/register" className="text-indigo-500 hover:underline">
                            Đăng ký
                        </Link>{" "}
                        và xác thực email.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        Bước 2: Tạo Project đầu tiên
                    </h3>
                    <p>
                        Vào{" "}
                        <Link href="/dashboard" className="text-indigo-500 hover:underline">
                            Dashboard
                        </Link>{" "}
                        và nhấn <strong>+ Create Project</strong>.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        Bước 3: Lấy API Key & Project Secret
                    </h3>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>
                            <strong>API Key:</strong> Khóa công khai để định danh project.
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        Bước 4: Tích hợp Thư viện Client
                    </h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`<dependency>
    <groupId>io.github.kietvo5924</groupId>
    <artifactId>auth-client-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>`}
                    </pre>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        Bước 5: Cấu hình Thư viện
                    </h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`auth.client.api-key=DÁN_API_KEY_CỦA_BẠN`}
                    </pre>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        Bước 6: Bắt đầu Sử dụng!
                    </h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`@RestController
@RequiredArgsConstructor
public class MyController {
    private final AuthClient authClient;

    @GetMapping("/posts")
    @RequiresPermission("posts:read")
    public List<Post> getPosts() {
        // ...
    }
}`}
                    </pre>
                </section>
            </div>
        </div>
    );
}
