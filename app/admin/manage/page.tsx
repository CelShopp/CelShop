"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Package, Database, ExternalLink, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ManageProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert("Failed to delete product");
            }
        } catch (err) {
            console.error("Delete error", err);
            alert("Network error");
        } finally {
            setDeletingId(null);
        }
    };

    if (process.env.NODE_ENV !== "development" && process.env.ALLOW_PRODUCTION_ADMIN !== "true") {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-black text-stone-900">Protected Route</h1>
                    <p className="text-stone-500 text-sm">Access restricted to local development.</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-sm">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <main className="max-w-6xl mx-auto px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Database size={14} />
                            Archive Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                            Manage <span className="text-stone-300">Archives</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchProducts}
                            className="p-4 bg-white border border-stone-100 rounded-2xl text-stone-600 hover:bg-stone-100 transition-all"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <Link
                            href="/admin/add"
                            className="px-8 py-4 bg-stone-900 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2"
                        >
                            <Package size={20} />
                            Add Item
                        </Link>
                    </div>
                </header>

                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100">
                    {loading ? (
                        <div className="p-20 text-center text-stone-400 font-bold uppercase tracking-widest text-xs animate-pulse">
                            Accessing Archives...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="text-stone-300 font-black text-4xl mt-4">Empty Archive</div>
                            <p className="text-stone-400 font-medium">No products have been unearthed yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-stone-50/50 border-b border-stone-50">
                                    <tr>
                                        <th className="px-10 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Item</th>
                                        <th className="px-6 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Collection</th>
                                        <th className="px-6 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Price</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-50">
                                    {products.map((product) => (
                                        <tr key={product.id} className="group hover:bg-stone-50/30 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-stone-900">{product.name}</div>
                                                        <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">{product.movie || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="px-3 py-1 bg-stone-100 text-stone-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                                                    {product.collection}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 font-black text-stone-900">
                                                ₹{product.price.toLocaleString()}
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        target="_blank"
                                                        className="p-3 bg-stone-50 text-stone-400 rounded-xl hover:text-stone-900 transition-colors"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                        disabled={deletingId === product.id}
                                                        className="p-3 bg-stone-50 text-stone-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-30"
                                                    >
                                                        {deletingId === product.id ? (
                                                            <div className="w-4.5 h-4.5 border-2 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
