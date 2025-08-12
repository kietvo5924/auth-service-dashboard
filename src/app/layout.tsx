import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOwnerFromToken } from "./lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Service Platform",
  description: "Giải pháp Xác thực Toàn diện cho các ứng dụng của bạn.",
};

export default async function RootLayout({ // Thêm 'async'
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Lấy thông tin owner trên server
  const owner = await getOwnerFromToken();

  return (
    <html lang="vi">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Navbar owner={owner} />
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}