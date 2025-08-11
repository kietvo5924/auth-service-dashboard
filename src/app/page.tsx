import Link from 'next/link';

// Component nhỏ cho từng thẻ tính năng
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-50 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Nền tảng Xác thực Mạnh mẽ cho Ứng dụng của bạn
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Tập trung vào việc xây dựng sản phẩm, để chúng tôi lo việc xác thực và phân quyền người dùng phức tạp.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Bắt đầu Ngay
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Các tính năng Vượt trội
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Kiến trúc Đa người dùng"
            description="Mỗi Owner có thể tạo và quản lý nhiều project độc lập, mỗi project có bộ người dùng và vai trò riêng."
          />
          <FeatureCard
            title="Phân quyền Linh hoạt"
            description="Tự do định nghĩa vai trò (Role), cấp bậc (Level) chi tiết cho từng project."
          />
          <FeatureCard
            title="Thư viện Client (SDK)"
            description="Cung cấp Spring Boot Starter tiện lợi với Annotation và SDK, giúp tích hợp vào ứng dụng của bạn chỉ trong vài phút."
          />
          <FeatureCard
            title="Bảo mật Cao"
            description="Xác thực bằng JWT, tự động vô hiệu hóa token cũ khi đổi mật khẩu, bảo vệ an toàn cho người dùng."
          />
          <FeatureCard
            title="Luồng Xác thực Đầy đủ"
            description="Bao gồm đăng ký, đăng nhập, xác thực email, quên mật khẩu bằng OTP cho cả Owner và End-User."
          />
          <FeatureCard
            title="Sẵn sàng Triển khai"
            description="Được thiết kế để dễ dàng đóng gói bằng Docker và deploy lên các nền tảng đám mây như Render."
          />
        </div>
      </section>
    </div>
  );
}