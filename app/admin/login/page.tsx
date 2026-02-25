"use client";

import React, { useState, Suspense } from 'react';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function AdminLoginForm() {
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || '/admin/add';
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                // Success! Redirect to the admin dashboard or the requested page
                window.location.href = returnTo;
            } else {
                const data = await res.json();
                setStatus('error');
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setStatus('error');
            setError('Connection error');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl mb-6 text-orange-600">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-stone-900 mb-2">
                        Archivist <span className="text-stone-300">Login</span>
                    </h1>
                    <p className="text-stone-400 font-medium">Restricted Personnel Only</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-10 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Archive Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                                <ShieldAlert size={18} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-5 bg-stone-900 text-white font-black text-sm rounded-2xl hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-600/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {status === 'loading' ? (
                                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Enter Archive
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={null}>
            <AdminLoginForm />
        </Suspense>
    );
}
