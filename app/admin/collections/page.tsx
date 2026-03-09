"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Database, Sparkles, Trash2, Edit2, Check, X, Layout, ImageIcon, Upload } from 'lucide-react';
import Link from 'next/link';

export default function ManageCollectionsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Modal/Form states
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        showInHome: false
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
        setLoading(true);
        try {
            const res = await fetch('/api/collections');
            const data = await res.json();
            if (Array.isArray(data)) setCollections(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (col: any) => {
        setEditingId(col.id);
        setIsCreating(false);
        setFormData({
            name: col.name,
            image: col.image || '',
            description: col.description || '',
            showInHome: !!col.showInHome
        });
        setPreview(col.image || null);
        setFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This won't delete products, but will detach them from this collection record.")) return;
        
        try {
            const res = await fetch(`/api/collections?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setCollections(prev => prev.filter(c => c.id !== id));
                setStatus('success');
                setMessage('Collection deleted.');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Delete failed.');
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
                    const err = await uploadRes.json();
                    throw new Error(err.error || 'Image upload failed');
                }
            }

            const method = editingId ? 'PATCH' : 'POST';
            const res = await fetch('/api/collections', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingId ? { id: editingId, ...formData, image: imageUrl } : { ...formData, image: imageUrl })
            });

            if (res.ok) {
                setStatus('success');
                setMessage(editingId ? 'Archive updated successfully!' : 'New archive launched!');
                
                // Clear state
                setEditingId(null);
                setIsCreating(false);
                setFormData({ name: '', image: '', description: '', showInHome: false });
                setFile(null);
                setPreview(null);
                
                // Refresh list
                await fetchCollections();

                // Auto hide message after 4 seconds
                setTimeout(() => setMessage(''), 4000);
            } else {
                const err = await res.json();
                setStatus('error');
                setMessage(err.error || 'Operation failed');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Network error');
        } finally {
            if (status === 'error') {
                setTimeout(() => setMessage(''), 5000);
            }
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
                            Collection Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                            Archive <span className="text-stone-300">Vaults</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/add"
                            className="px-6 py-3 bg-white border border-stone-200 text-stone-900 font-black rounded-xl hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Add Product
                        </Link>
                        <button
                            onClick={() => {
                                setIsCreating(true);
                                setEditingId(null);
                                setFormData({ name: '', image: '', description: '', showInHome: false });
                                setFile(null);
                                setPreview(null);
                            }}
                            className="px-6 py-3 bg-stone-900 text-white font-black rounded-xl hover:bg-stone-800 transition-all shadow-xl flex items-center gap-2"
                        >
                            <Plus size={18} />
                            New Collection
                        </button>
                    </div>
                </header>

                {message && (
                    <div className={`mb-8 p-4 rounded-xl font-bold text-center animate-in fade-in slide-in-from-top-2 ${status === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {message}
                    </div>
                )}

                {(isCreating || editingId) && (
                    <div className="mb-12 bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-2xl animate-in fade-in slide-in-from-top-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black">{editingId ? 'Edit' : 'Create'} Collection</h2>
                            <button onClick={() => { setIsCreating(false); setEditingId(null); }} className="p-2 hover:bg-stone-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-stone-400 mb-1 ml-1 block">Collection Name</label>
                                    <input 
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-orange-500 font-bold"
                                        placeholder="e.g. Yeh Jawaani Hai Deewani"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-stone-400 mb-1 ml-1 block">Description</label>
                                    <textarea 
                                        rows={4}
                                        value={formData.description}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                        className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-orange-500 font-bold"
                                        placeholder="Briefly describe what this archive contains..."
                                    />
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100 cursor-pointer" onClick={() => setFormData({...formData, showInHome: !formData.showInHome})}>
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${formData.showInHome ? 'bg-orange-500 border-orange-500' : 'border-orange-200 bg-white'}`}>
                                        {formData.showInHome && <Check size={14} className="text-white" />}
                                    </div>
                                    <span className="text-xs font-black text-orange-900 uppercase tracking-widest leading-none">Show in Home Page</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase text-stone-400 mb-1 ml-1 block">Collection Media</label>
                                <div className="grid grid-cols-1 gap-4">
                                    <div 
                                        onClick={() => document.getElementById('collection-upload')?.click()}
                                        className="w-full aspect-[4/3] bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-stone-100 transition-all overflow-hidden"
                                    >
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <>
                                                <Upload className="text-stone-300" size={32} />
                                                <div className="text-center">
                                                    <div className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Upload Local Pic</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <input id="collection-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    
                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase text-stone-300 mb-1 text-center block">— OR —</label>
                                        <input 
                                            value={formData.image}
                                            onChange={e => {
                                                setFormData({...formData, image: e.target.value});
                                                setPreview(e.target.value || null);
                                                setFile(null);
                                            }}
                                            className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-orange-500 font-bold text-sm"
                                            placeholder="Paste Image URL"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-stone-900 text-white font-black rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {status === 'loading' ? <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" /> : <><Sparkles size={18} /> {editingId ? 'Update' : 'Launch'} Archive</>}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [1,2,3].map(i => <div key={i} className="h-96 bg-stone-200 rounded-[2rem] animate-pulse" />)
                    ) : (
                        collections.map(col => (
                            <div key={col.id} className="group bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                                <div className="aspect-[2/3] relative bg-stone-100 overflow-hidden">
                                    {col.image ? (
                                        <img src={col.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={col.name} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                            <ImageIcon size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        {col.showInHome && (
                                            <div className="px-3 py-1 bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <button onClick={() => handleEdit(col)} className="p-3 bg-white rounded-xl shadow-lg hover:bg-stone-50 text-stone-900 transition-all">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(col.id)} className="p-3 bg-red-500 rounded-xl shadow-lg hover:bg-red-600 text-white transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black mb-1">{col.name}</h3>
                                    <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-3">{col.slug}</div>
                                    {col.description && <p className="text-xs text-stone-500 font-medium line-clamp-2">{col.description}</p>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
