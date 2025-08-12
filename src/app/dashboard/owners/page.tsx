import { cookies } from 'next/headers';
import UserActions from './UserActions';
import { Owner } from '@/app/types';
import { getOwnerFromToken } from '@/app/lib/auth';

// Hàm lấy danh sách tất cả Owner
async function getAllOwners(token: string): Promise<Owner[]> {
    const res = await fetch('https://auth-service-platform.onrender.com/api/admin/owners', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error("Failed to fetch owners list");
        return [];
    }
    return res.json();
}

export default async function OwnersManagementPage() {
    const currentOwner = await getOwnerFromToken();

    if (!currentOwner || currentOwner.role !== 'ROLE_ADMIN') {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p className="text-gray-600">You do not have permission to view this page.</p>
            </div>
        );
    }

    const token = (await cookies()).get('owner-token')?.value;
    let ownersList = token ? await getAllOwners(token) : [];

    ownersList = ownersList.filter(owner => owner.email !== currentOwner.sub);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Quản lý Người dùng Platform</h1>
            <p className="mt-2 text-gray-600">Xem và quản lý tất cả tài khoản Owner trong hệ thống.</p>

            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {ownersList.map((owner) => (
                            <tr key={owner.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owner.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{owner.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owner.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${owner.role === 'ROLE_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {owner.role.replace('ROLE_', '')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                    {owner.emailVerified ? (
                                        <span className="text-green-600">Verified</span>
                                    ) : (
                                        <span className="text-yellow-600">Pending</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {owner.locked ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Locked
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <UserActions owner={owner} currentAdminEmail={currentOwner.sub} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}