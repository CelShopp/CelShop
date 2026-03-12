"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";

interface Product {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    buyLink: string;
}

export default function RecentProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (pageNum: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/products/recent?page=${pageNum}`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const handleNext = () => {
        if (page < 5) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-white border-t border-stone-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
                            <Sparkles size={14} />
                            Just In
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tighter leading-none">
                            Recent <span className="text-stone-300">Arrivals</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevious}
                            disabled={page === 1 || loading}
                            className="p-3 rounded-full border border-stone-200 hover:border-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-4">
                            Page {page} of 5
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={page === 5 || products.length < 50 || loading}
                            className="p-3 rounded-full border border-stone-200 hover:border-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center text-stone-400 gap-4">
                        <Loader2 className="animate-spin" size={32} />
                        <span className="text-xs font-black uppercase tracking-widest">Opening the Vault...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group flex flex-col"
                            >
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="inline-block bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-stone-900 uppercase tracking-widest">
                                            View Details
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-black text-stone-900 text-sm leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-stone-500 font-bold text-xs mt-1">
                                        ₹{product.price.toLocaleString()}
                                        <a
                                          href={product.buyLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="mt-2 block text-center text-xs font-black bg-black text-white py-2 rounded-xl hover:bg-stone-800 transition"
                                        >
                                          Check Price
                                        </a>
                                    </p>
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Manual Load buttons also at bottom if they want */}
                <div className="mt-16 flex justify-center items-center gap-6">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 1 || loading}
                        className="group flex items-center gap-3 text-stone-400 font-black uppercase tracking-widest text-[10px] hover:text-stone-900 disabled:opacity-30 transition-all"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Previous Items
                    </button>

                    <div className="h-4 w-px bg-stone-200" />

                    <button
                        onClick={handleNext}
                        disabled={page === 5 || products.length < 50 || loading}
                        className="group flex items-center gap-3 text-stone-400 font-black uppercase tracking-widest text-[10px] hover:text-stone-900 disabled:opacity-30 transition-all"
                    >
                        Next Items
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-orange-500" />
                    </button>
                </div>
            </div>
        </section>
    );
}
