'use client';
import { useTransition } from 'react';
import { createProjectAction } from './actions';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NewProjectPage() {
    const [isPending, startTransition] = useTransition();
    // Có thể thêm state để xử lý lỗi từ action

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Create New Project
            </h1>

            <form
                action={(formData) => startTransition(() => createProjectAction(formData))}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm max-w-lg space-y-5"
            >
                {/* Project Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Project Name
                    </label>
                    <input
                        name="name"
                        required
                        placeholder="My Awesome App"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                focus:border-indigo-500 transition"
                    />
                </div>

                {/* Allowed Origins */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Allowed Origins
                    </label>
                    <input
                        name="allowedOrigins"
                        placeholder="https://myapp.com, http://localhost:3000"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                focus:border-indigo-500 transition"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Các tên miền được phép gọi API. Phân tách bằng dấu phẩy.
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2 border border-indigo-500 text-indigo-500 rounded-lg 
                            font-medium hover:bg-indigo-500 hover:text-white transition 
                            disabled:bg-indigo-400 disabled:border-indigo-400 disabled:text-white"
                >
                    {isPending ? <LoadingSpinner /> : 'Create Project'}
                </button>
            </form>
        </div>
    );
}