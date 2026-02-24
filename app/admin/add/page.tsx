"use client";

import React, { useState } from 'react';
import { Plus, Package, Database, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';

export default function AddProductPage() {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        image: '',
        buyLink: '',
        collection: '',
        actorName: '',
        movie: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
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
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
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
            } else {
                const err = await res.json();
                setStatus('error');
                setMessage(err.error || 'Failed to archive item.');
            }
        } catch (err) {
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
                    <a href="/" className="inline-block px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-sm">Return Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                        <Database size={14} />
                        Internal Archive Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                        Archive <span className="text-stone-300">New Item</span>
                    </h1>
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
                                <select
                                    name="collection"
                                    value={formData.collection}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium appearance-none"
                                >
                                    <option value="batman">Batman</option>
                                    <option value="spiderman">Spider-Man</option>
                                    <option value="john-wick">John Wick</option>
                                    <option value="top-gun">Top Gun</option>
                                    <option value="matrix">The Matrix</option>
                                </select>
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

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Image URL</label>
                            <input
                                required
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium"
                            />
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
