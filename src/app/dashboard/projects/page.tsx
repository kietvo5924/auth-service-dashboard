import { Project } from '@/app/types';
import { cookies } from 'next/headers';
import Link from 'next/link';

// Hàm lấy danh sách các project của Owner
async function getProjects(token: string): Promise<Project[]> {
    const res = await fetch('https://auth-service-platform.onrender.com/api/projects', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store', // Luôn lấy dữ liệu mới nhất
    });

    if (!res.ok) {
        console.error("Failed to fetch projects");
        return [];
    }
    return res.json();
}

export default async function ProjectsPage() {
    const token = (await cookies()).get('owner-token')?.value;

    if (!token) {
        // Middleware đã xử lý, nhưng đây là lớp bảo vệ thứ 2
        return <p>Please log in to view projects.</p>;
    }

    const projectsList = await getProjects(token);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
                <Link
                    href="/dashboard/projects/new"
                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    + Create Project
                </Link>
            </div>

            {/* Danh sách các project */}
            <div className="space-y-4">
                {projectsList.length > 0 ? (
                    projectsList.map((project) => (
                        <div key={project.id} className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                                <p className="text-sm text-gray-500 font-mono">
                                    API Key: {project.apiKey.substring(0, 12)}...
                                </p>
                            </div>
                            <Link
                                href={`/dashboard/projects/${project.id}`}
                                className="px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-500 rounded-md hover:bg-indigo-50"
                            >
                                Manage
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">You haven't created any projects yet.</p>
                )}
            </div>
        </div>
    );
}