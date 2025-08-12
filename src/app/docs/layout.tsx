'use client';
import { useState } from 'react';
import DocsSidebar from '@/components/DocsSidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Lớp phủ khi mở menu trên mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-white/80 z-10 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Nút mở Sidebar */}
            {!isSidebarOpen && (
                <button
                    className="md:hidden fixed top-[45%] -translate-y-1/2 left-0 z-30 p-2 bg-gradient-to-b from-white to-gray-100 rounded-tr-md shadow-lg border border-gray-300"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m0 6H4"
                        />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border border-gray-300 shadow-md transition-transform duration-300 ease-in-out z-20
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="h-full flex flex-col">
                    <div
                        className="flex-1 overflow-y-auto"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <DocsSidebar />
                    </div>
                </div>
            </aside>

            {/* Nội dung chính */}
            <main className="flex-1 p-8 md:ml-64">
                {children}
            </main>
        </div>
    );
}
