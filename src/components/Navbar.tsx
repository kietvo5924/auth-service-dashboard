'use client'; // <-- Chuyển thành Client Component

import { useState } from 'react';
import Link from 'next/link';
import ProfileButton from './ProfileButton';

// Định nghĩa kiểu dữ liệu cho owner prop
interface Owner {
    sub: string;
    role: string;
}

interface NavbarProps {
    owner: Owner | null;
}

export default function Navbar({ owner }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-6 py-4">
                {/* Main Nav for Desktop */}
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        AuthPlatform
                    </Link>

                    {/* Desktop Menu Links (Ẩn trên mobile) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/#features" className="text-gray-600 hover:text-indigo-600">
                            Tính năng
                        </Link>
                        <Link href="/docs" className="text-gray-600 hover:text-indigo-600">
                            Tài liệu
                        </Link>

                        {owner ? (
                            <ProfileButton userEmail={owner.sub} />
                        ) : (
                            <>
                                <Link href="/register" className="px-4 py-2 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50">
                                    Đăng ký
                                </Link>
                                <Link href="/login" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                    Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button (Chỉ hiện trên mobile) */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {/* Hamburger Icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu (Hiện ra khi nhấn nút) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4">
                        <Link href="/#features" className="block py-2 text-gray-600 hover:bg-gray-100 rounded">Tính năng</Link>
                        <Link href="/docs" className="block py-2 text-gray-600 hover:bg-gray-100 rounded">Tài liệu</Link>
                        <hr className="my-2" />
                        {owner ? (
                            <ProfileButton userEmail={owner.sub} />
                        ) : (
                            <>
                                <Link href="/register" className="block py-2 text-center text-indigo-600 border border-indigo-600 rounded-md mt-2">Đăng ký</Link>
                                <Link href="/login" className="block py-2 text-center text-white bg-indigo-600 rounded-md mt-2">Đăng nhập</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}