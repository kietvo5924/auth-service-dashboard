'use client';
import { useTransition } from 'react';
import { updateProjectAction } from './actions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { Project } from '@/app/types';

export default function EditProjectForm({ project }: { project: Project }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const formAction = (formData: FormData) => {
        startTransition(() => {
            updateProjectAction(project.id.toString(), formData);
        });
    };

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Project Name</label>
                <input
                    name="name"
                    defaultValue={project.name}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Allowed Origins</label>
                <textarea
                    name="allowedOrigins"
                    defaultValue={project.allowedOrigins.join(', ')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    rows={3}
                    placeholder="https://myapp.com, http://localhost:3000"
                />
                <p className="text-xs text-gray-500 mt-1">Các tên miền được phép gọi API. Phân tách bằng dấu phẩy.</p>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded-md">
                    Quay lại
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-400"
                >
                    {isPending ? <LoadingSpinner /> : 'Lưu Thay đổi'}
                </button>
            </div>
        </form>
    );
}