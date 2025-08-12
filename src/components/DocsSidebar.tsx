// 📂 components/DocsSidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsSidebar() {
    const pathname = usePathname();

    const navSections = [
        {
            title: 'Bắt đầu',
            links: [{ label: 'Giới thiệu', href: '/docs' }]
        },
        {
            title: 'API Reference',
            links: [
                { label: 'Owner APIs', href: '/docs/api/owner' },
                { label: 'Project APIs', href: '/docs/api/project' },
                { label: 'Role APIs', href: '/docs/api/role' },
                { label: 'End-User APIs', href: '/docs/api/enduser' }
            ]
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-indigo-600">📚 Tài liệu</h2>
            <nav className="space-y-6">
                {navSections.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {section.title}
                        </h3>
                        <div className="flex flex-col space-y-1">
                            {section.links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                                            ${isActive
                                                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
}
