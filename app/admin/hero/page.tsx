"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Image as ImageIcon, Trash2, ArrowRight, Layout, Sparkles, Database } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeroPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [heroItems, setHeroItems] = useState<any[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        movieName: '',
        image: '',
        ctaLink: '/collections'
    });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const authCookie = typeof document !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('admin_auth=')) : null;
        if (!authCookie) {
            window.location.href = '/admin/login?returnTo=/admin/hero';
        } else {
            setIsAuthenticated(true);
            fetchHeroItems();
        }
    }, []);

    const fetchHeroItems = async () => {
        try {
            const res = await fetch('/api/hero');
            if (res.ok) {
                const data = await res.json();
                setHeroItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch hero items", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setFormData(prev => ({ ...prev, image: '' }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            let imageUrl = formData.image;

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

            if (!imageUrl) {
                throw new Error('Please provide an image or upload a file');
            }

            const res = await fetch('/api/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, image: imageUrl }),
            });

            if (res.ok) {
                setStatus('success');
                setMessage('Hero item added successfully');
                setFormData({ title: '', movieName: '', image: '', ctaLink: '/collections' });
                setFile(null);
                setPreview(null);
                fetchHeroItems();
            } else {
                throw new Error('Failed to add hero item');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this from the hero section?')) return;
        
        try {
            const res = await fetch(`/api/hero?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchHeroItems();
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <main className="max-w-6xl mx-auto px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Layout size={14} />
                            Homepage Customization
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                            Hero <span className="text-stone-300">Section</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/collections"
                            className="px-8 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-lg flex items-center gap-2"
                        >
                            Add products
                        </Link>
                        <Link
                            href="/admin/manage"
                            className="px-8 py-4 bg-white border border-stone-100 text-stone-900 font-black rounded-2xl hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            <Database size={20} />
                            Manage Archives
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
                            <div className="p-8 border-b border-stone-50 bg-stone-50/50">
                                <h2 className="text-xl font-black text-stone-900">Add New Slide</h2>
                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Configure hero content</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Hero Title</label>
                                    <input
                                        required
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Iconic outfits from iconic films"
                                        className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Movie Name (Bottom Right)</label>
                                    <input
                                        required
                                        name="movieName"
                                        value={formData.movieName}
                                        onChange={handleChange}
                                        placeholder="e.g. Yeh Jawaani Hai Deewani"
                                        className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Button Link</label>
                                    <input
                                        required
                                        name="ctaLink"
                                        value={formData.ctaLink}
                                        onChange={handleChange}
                                        placeholder="/collections/..."
                                        className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Background Image</label>
                                    <div 
                                        onClick={() => document.getElementById('hero-file')?.click()}
                                        className="w-full aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-stone-100 transition-all overflow-hidden"
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <ImageIcon className="text-stone-300" size={24} />
                                                <span className="text-[10px] font-bold text-stone-400 uppercase">Upload Image</span>
                                            </>
                                        )}
                                    </div>
                                    <input id="hero-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    
                                    <div className="relative">
                                        <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
                                            <span className="bg-white px-2 text-[8px] font-black text-stone-300 uppercase">Or URL</span>
                                        </div>
                                        <input
                                            name="image"
                                            value={formData.image}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setPreview(e.target.value);
                                            }}
                                            placeholder="https://..."
                                            className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-sm"
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-stone-900 text-white font-black rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Saving...' : 'Add to Hero'}
                                </button>
                                
                                {message && (
                                    <p className={`text-[10px] font-bold text-center uppercase tracking-widest ${status === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Current Items */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {heroItems.length === 0 ? (
                                <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-stone-200">
                                    <ImageIcon className="mx-auto text-stone-200 mb-4" size={48} />
                                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">No hero slides active</p>
                                </div>
                            ) : (
                                heroItems.map((item) => (
                                    <div key={item.id} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md border border-stone-100">
                                        <div className="aspect-video relative">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-75" />

                                            <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-xl"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Slide Title</p>
                                            <h3 className="text-lg font-black text-stone-900 leading-tight mb-4">{item.title}</h3>
                                            
                                            <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                                                <div>
                                                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Movie</p>
                                                    <p className="text-xs font-black text-stone-600">{item.movieName}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Link</p>
                                                    <p className="text-xs font-black text-stone-600">{item.ctaLink}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
