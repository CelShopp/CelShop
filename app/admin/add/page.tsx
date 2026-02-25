"use client";

import React, { useState } from 'react';
import { Plus, Package, Database, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
    const suggestedCollections = ['batman', 'spiderman', 'john-wick', 'top-gun', 'matrix'];

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        image: '',
        buyLink: '',
        collection: 'batman',
        actorName: '',
        movie: '',
    });

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            // Clear URL input if file is selected
            setFormData(prev => ({ ...prev, image: '' }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const normalizedValue = name === 'collection'
                ? value
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                : value;

            const newData = { ...prev, [name]: normalizedValue };
            // Auto-generate slug from name if slug is empty
            if (name === 'name' && !prev.slug) {
                newData.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            let imageUrl = formData.image;

            // Handle file upload if present
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
                    const err = await uploadRes.json();
                    throw new Error(err.error || 'Image upload failed');
                }
            }

            if (!imageUrl) {
                throw new Error('Please provide an image URL or upload a file');
            }

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl,
                    price: parseInt(formData.price)
                }),
            });

            if (res.ok) {
                setStatus('success');
                setMessage('Product added to archives successfully.');
                setFormData({
                    name: '',
                    slug: '',
                    description: '',
                    price: '',
                    image: '',
                    buyLink: '',
                    collection: 'batman',
                    actorName: '',
                    movie: '',
                });
                setFile(null);
                setPreview(null);
            } else {
                const err = await res.json();
                setStatus('error');
                setMessage(err.error || 'Failed to archive item.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Check connection.');
        }
    };

    // Prevent rendering the form in production
    if (process.env.NODE_ENV !== "development" && process.env.ALLOW_PRODUCTION_ADMIN !== "true") {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-black text-stone-900">Protected Route</h1>
                    <p className="text-stone-500 text-sm">Admin tools are strictly restricted to local development for security.</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-sm">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Database size={14} />
                            Internal Archive Tool
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                            Archive <span className="text-stone-300">New Item</span>
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

                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100">
                    <div className="p-10 border-b border-stone-50 bg-stone-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Plus className="text-orange-600" size={24} />
                            </div>
                            <div>
                                <div className="text-sm font-black text-stone-900">Archive Entry Form</div>
                                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Entry ID: AUTO-GEN</div>
                            </div>
                        </div>
                        {status === 'success' && (
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm animate-in fade-in slide-in-from-right-4">
                                <Sparkles size={16} />
                                {message}
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="text-red-500 font-bold text-sm">{message}</div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Product Name</label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Gotham Knight Tactical Vest"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">URL Slug</label>
                                <input
                                    required
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="gotham-knight-vest"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Description</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detailed description of the cinematic connection..."
                                rows={4}
                                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                <input
                                    required
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="2499"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Collection</label>
                                <input
                                    name="collection"
                                    value={formData.collection}
                                    onChange={handleChange}
                                    list="collection-suggestions"
                                    placeholder="batman"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium appearance-none"
                                />
                                <datalist id="collection-suggestions">
                                    {suggestedCollections.map((collection) => (
                                        <option key={collection} value={collection} />
                                    ))}
                                </datalist>
                                <p className="text-[10px] text-stone-400 font-medium ml-1">
                                    You can type any new collection slug (example: <span className="font-bold">interstellar</span>).
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Movie Title</label>
                                <input
                                    name="movie"
                                    value={formData.movie}
                                    onChange={handleChange}
                                    placeholder="The Dark Knight"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Actor Name</label>
                                <input
                                    name="actorName"
                                    value={formData.actorName}
                                    onChange={handleChange}
                                    placeholder="Christian Bale"
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Amazon Link</label>
                                <input
                                    required
                                    name="buyLink"
                                    value={formData.buyLink}
                                    onChange={handleChange}
                                    placeholder="https://amazon.in/..."
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Product Media</label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                        className="w-full aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-stone-100 hover:border-orange-500/20 transition-all overflow-hidden"
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                    <Plus className="text-stone-300" size={24} />
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Upload Photo</div>
                                                    <div className="text-[8px] text-stone-400 font-bold uppercase tracking-widest">JPG, PNG, WEBP</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>

                                <div className="space-y-4 flex flex-col justify-center">
                                    <div className="text-center text-[10px] font-black text-stone-300 uppercase tracking-widest">— OR —</div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Direct Image URL</label>
                                        <input
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-6 bg-stone-900 text-white font-black text-lg rounded-[2rem] hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-600/20 active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                        >
                            {status === 'loading' ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Package size={22} />
                                    Publish to Archive
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
