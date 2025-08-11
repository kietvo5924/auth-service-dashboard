'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { logout } from '@/app/actions';

// Định nghĩa kiểu cho props để nhận tên user
interface ProfileButtonProps {
    userEmail: string;
}

export default function ProfileButton({ userEmail }: ProfileButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Xử lý đóng dropdown khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
            >
                {userEmail}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Bảng điều khiển
                    </Link>
                    <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Cài đặt
                    </Link>
                    <form action={logout} className="w-full">
                        <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Đăng xuất
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}