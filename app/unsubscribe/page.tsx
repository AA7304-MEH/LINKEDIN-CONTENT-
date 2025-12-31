
"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function UnsubscribePage() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleUnsubscribe = async () => {
        setStatus('loading');
        try {
            const res = await fetch('/api/outreach/unsubscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, token })
            });

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setMessage("Invalid or expired link.");
            }
        } catch (e) {
            setStatus('error');
            setMessage("Something went wrong.");
        }
    };

    if (!leadId || !token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <p className="text-red-500">Invalid unsubscribe link.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full bg-white p-8 rounded shadow text-center">
                <h1 className="text-2xl font-bold mb-4">Unsubscribe</h1>

                {status === 'idle' && (
                    <>
                        <p className="mb-6 text-gray-600">
                            Are you sure you want to unsubscribe from our emails? You will miss out on updates and tips.
                        </p>
                        <button
                            onClick={handleUnsubscribe}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 w-full"
                        >
                            Confirm Unsubscribe
                        </button>
                    </>
                )}

                {status === 'loading' && <Loader2 className="animate-spin mx-auto text-gray-500" />}

                {status === 'success' && (
                    <div className="text-green-600">
                        <h2 className="text-xl font-semibold mb-2">Unsubscribed</h2>
                        <p>You have been removed from our mailing list.</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-red-500">
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
