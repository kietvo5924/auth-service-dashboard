import { cookies } from 'next/headers';
import RoleManager from './RoleManager';
import { ProjectRole } from '@/app/types';

async function getProjectRoles(token: string, projectId: string): Promise<ProjectRole[]> {
    const res = await fetch(`https://auth-service-platform.onrender.com/api/projects/${projectId}/roles`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function ProjectRolesPage({ params }: { params: { id: string } }) {
    const { id: projectId } = await params;
    const token = (await cookies()).get('owner-token')?.value;
    const initialRoles = token ? await getProjectRoles(token, projectId) : [];

    return (
        <RoleManager initialRoles={initialRoles} projectId={projectId} />
    );
}