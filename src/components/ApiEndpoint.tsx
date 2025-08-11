// src/components/ApiEndpoint.tsx
'use client';
import { useState } from 'react';

interface ApiEndpointProps {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
    auth: string;
    requestBody?: object;
    successResponse?: object;
}

const getMethodClass = (method: string) => {
    switch (method) {
        case 'GET': return 'bg-sky-100 text-sky-800';
        case 'POST': return 'bg-green-100 text-green-800';
        case 'PUT': return 'bg-amber-100 text-amber-800';
        case 'DELETE': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function ApiEndpoint({ method, path, description, auth, requestBody, successResponse }: ApiEndpointProps) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg mb-6 overflow-hidden">
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full bg-gray-50 px-4 py-3 flex items-center justify-between text-left hover:bg-gray-100 transition"
            >
                <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-sm font-semibold ${getMethodClass(method)}`}>
                        {method}
                    </span>
                    <span className="font-mono text-gray-800">{path}</span>
                </div>
                <span className="text-sm text-gray-500">{showDetails ? 'Thu gọn' : 'Chi tiết'}</span>
            </button>

            {showDetails && (
                <div className="p-4 bg-white space-y-4">
                    <p className="text-gray-700">{description}</p>
                    <div>
                        <h4 className="font-semibold text-gray-800">Xác thực:</h4>
                        <p className="text-sm text-gray-600">{auth}</p>
                    </div>

                    {requestBody && (
                        <div>
                            <h4 className="font-semibold text-gray-800">Request Body (JSON):</h4>
                            <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 overflow-x-auto">
                                <code>{JSON.stringify(requestBody, null, 2)}</code>
                            </pre>
                        </div>
                    )}

                    {successResponse && (
                        <div>
                            <h4 className="font-semibold text-gray-800">Success Response (200 OK):</h4>
                            <pre className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 overflow-x-auto">
                                <code>{JSON.stringify(successResponse, null, 2)}</code>
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}