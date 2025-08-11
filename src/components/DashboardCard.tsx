// src/components/DashboardCard.tsx
import Link from 'next/link';

interface DashboardCardProps {
    title: string;
    description: string;
    href: string;
}

export default function DashboardCard({ title, description, href }: DashboardCardProps) {
    return (
        <Link href={href} className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            <p className="font-normal text-gray-700">{description}</p>
        </Link>
    );
}