import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer
import GlobalRetryOverlay from "@/components/GlobalRetryOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Service Platform - Giải pháp Xác thực Toàn diện",
  description: "Cung cấp API xác thực và phân quyền mạnh mẽ cho các ứng dụng của bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
        <GlobalRetryOverlay />
      </body>
    </html>
  );
}