"use client";

import React, { useState, useEffect } from 'react';
import { Folder, Image as ImageIcon, Save, Sparkles, Database } from 'lucide-react';
import Link from 'next/link';

export default function AdminCollectionsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [collections, setCollections] = useState<any[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState({
        image: '',
        description: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const authCookie = typeof document !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('admin_auth=')) : null;
        if (!authCookie) {
            window.location.href = '/admin/login?returnTo=/admin/collections';
        } else {
            setIsAuthenticated(true);
            fetchCollections();
        }
    }, []);

    const fetchCollections = async () => {
        try {
            const res = await fetch('/api/collections');
            if (res.ok) {
                const data = await res.json();
                setCollections(data);
            }
        } catch (error) {
            console.error("Failed to fetch collections", error);
        }
    };

    const handleEdit = (collection: any) => {
        setEditingId(collection.id);
        setEditData({
            image: collection.image || '',
            description: collection.description || ''
        });
        setPreview(collection.image || null);
        setFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setEditData(prev => ({ ...prev, image: '' }));
        }
    };

    const handleSave = async (id: string) => {
        setStatus('loading');
        try {
            let imageUrl = editData.image;

            if (file) {
                const uploadData = new FormData();
                uploadData.append('file', file);
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                if (uploadRes.ok) {
                    const data = await uploadRes.json();
                    imageUrl = data.url;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            const res = await fetch('/api/collections', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, image: imageUrl, description: editData.description }),
            });

            if (res.ok) {
                setStatus('success');
                setMessage('Collection updated');
                setEditingId(null);
                fetchCollections();
            } else {
                throw new Error('Update failed');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <main className="max-w-6xl mx-auto px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Folder size={14} />
                            Library Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                            Collections <span className="text-stone-300">Manager</span>
                        </h1>
                    </div>
                    <Link
                        href="/admin/manage"
                        className="px-8 py-4 bg-white border border-stone-100 text-stone-900 font-black rounded-2xl hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2"
                    >
                        <Database size={20} />
                        Manage Archives
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collections.map((collection) => (
                        <div key={collection.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-stone-100 flex flex-col">
                            <div className="aspect-video relative bg-stone-100">
                                {editingId === collection.id ? (
                                    <div 
                                        onClick={() => document.getElementById(`file-${collection.id}`)?.click()}
                                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-stone-200 transition-all"
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <ImageIcon className="text-stone-300" size={32} />
                                                <span className="text-[10px] font-bold text-stone-400 mt-2 uppercase">Update Image</span>
                                            </>
                                        )}
                                        <input id={`file-${collection.id}`} type="file" className="hidden" onChange={handleFileChange} />
                                    </div>
                                ) : (
                                    <>
                                        {collection.image ? (
                                            <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="text-stone-200" size={48} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight mb-4">
                                    {collection.name.replace(/-/g, ' ')}
                                </h3>

                                {editingId === collection.id ? (
                                    <div className="space-y-4 mb-6">
                                        <textarea
                                            value={editData.description}
                                            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Collection description..."
                                            className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                                            rows={3}
                                        />
                                        <input
                                            value={editData.image}
                                            onChange={(e) => {
                                                setEditData(prev => ({ ...prev, image: e.target.value }));
                                                setPreview(e.target.value);
                                            }}
                                            placeholder="Or paste image URL"
                                            className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-stone-500 text-sm line-clamp-2 mb-6 flex-1">
                                        {collection.description || 'No description provided yet.'}
                                    </p>
                                )}

                                <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                                    <div className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                                        Slug: {collection.slug}
                                    </div>
                                    
                                    {editingId === collection.id ? (
                                        <button
                                            onClick={() => handleSave(collection.id)}
                                            disabled={status === 'loading'}
                                            className="px-6 py-3 bg-orange-600 text-white font-black rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2 text-xs"
                                        >
                                            <Save size={14} />
                                            {status === 'loading' ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(collection)}
                                            className="px-6 py-3 bg-stone-900 text-white font-black rounded-xl hover:bg-stone-800 transition-all text-xs"
                                        >
                                            Edit Collection
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
