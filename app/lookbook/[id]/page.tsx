"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, ShoppingBag, Info, Sparkles } from 'lucide-react';

const lookbookData = [
    {
        celebrity: "James Bond",
        movie: "Casino Royale",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        items: [
            { name: "Midnight Navy Tuxedo", color: "#0f172a", brand: "Brioni Replica" },
            { name: "French Cuffed White Shirt", color: "#ffffff", brand: "Turnbull & Asser" },
            { name: "Silk Bow Tie", color: "#000000", brand: "London Bespoke" },
            { name: "John Lobb Oxford Shoes", color: "#1c1917", brand: "Fine Leather" },
        ],
        description: "The ultimate expression of 007's lethal elegance. A tailored fit that balances rugged masculinity with high-stakes sophistication."
    },
    {
        celebrity: "Don Draper",
        movie: "Mad Men",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        items: [
            { name: "Sharkskin Grey Suit", color: "#6b7280", brand: "Madison Ave" },
            { name: "Crisp Light Blue Shirt", color: "#bae6fd", brand: "Vintage 1960s" },
            { name: "Slim Striped Tie", color: "#334155", brand: "Narrow Knot" },
            { name: "Classic Brown Oxford", color: "#78350f", brand: "Brooks Replica" },
        ],
        description: "Mid-century sharp. Don't just sell the product, sell the dream. This look defines the golden age of advertising."
    },
    {
        celebrity: "Tony Stark",
        movie: "Iron Man",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
        items: [
            { name: "Charcoal Tech Blazer", color: "#334155", brand: "Stark Industries" },
            { name: "Vintage Rock Tee", color: "#991b1b", brand: "Malibu Style" },
            { name: "Raw Selvedge Jeans", color: "#1e3a8a", brand: "Billionaire Casual" },
            { name: "Limited Edition Sneakers", color: "#d1d5db", brand: "Mark V" },
        ],
        description: "Billionaire, playboy, philanthropist. A masterclass in mixing high-end tailoring with effortless casual rebellion."
    },
    {
        celebrity: "Thomas Shelby",
        movie: "Peaky Blinders",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
        items: [
            { name: "Heavy Wool Overcoat", color: "#1f2937", brand: "Birmingham Bespoke" },
            { name: "Club Collar Shirt", color: "#f3f4f6", brand: "Garrison Style" },
            { name: "Herringbone Waistcoat", color: "#4b5563", brand: "Peaky Sharp" },
            { name: "Service Combat Boots", color: "#2d2d2d", brand: "Industrial Era" },
        ],
        description: "By order of the Peaky Blinders. Dark, heavy textures that scream authority and razor-sharp precision."
    },
];

export default function LookbookDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const lookbookIndex = parseInt(id as string);
    const lookbook = lookbookData[lookbookIndex];

    if (!lookbook) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-stone-900 mb-4">Evidence Not Found</h1>
                    <Link href="/" className="text-orange-600 font-bold hover:underline">Back to Files</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Lookbook
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Visual Side */}
                    <div className="flex-1 sticky top-32">
                        <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-stone-200 shadow-2xl group">
                            <img
                                src={lookbook.image}
                                alt={lookbook.celebrity}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />

                            <div className="absolute bottom-10 left-10">
                                <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-[10px] mb-2">
                                    <Camera size={12} />
                                    Captured Silhouette
                                </div>
                                <h1 className="text-5xl font-black text-white tracking-tighter leading-none">{lookbook.celebrity}</h1>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Side */}
                    <div className="flex-1 space-y-12">
                        <header>
                            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                                <Info size={14} />
                                Style Breakdown
                            </div>
                            <h2 className="text-4xl font-black text-stone-900 tracking-tight leading-none mb-6">
                                The <span className="text-orange-600 italic">"{lookbook.movie}"</span> <br /> Blueprint
                            </h2>
                            <p className="text-xl text-stone-500 font-medium leading-relaxed">
                                {lookbook.description}
                            </p>
                        </header>

                        <div className="space-y-6">
                            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Outfit Component Analysis</div>
                            {lookbook.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center p-6 bg-white border border-stone-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                                >
                                    {/* Swatch */}
                                    <div
                                        className="w-20 h-20 rounded-2xl shadow-inner border border-stone-100 flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Details */}
                                    <div className="ml-8 flex-1">
                                        <div className="text-[10px] text-orange-600 font-black uppercase tracking-widest mb-1">{item.brand}</div>
                                        <div className="text-xl font-black text-stone-900 mb-4">{item.name}</div>
                                        <Link
                                            href="/collections"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-600/20"
                                        >
                                            <ShoppingBag size={14} />
                                            Find Match
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Note */}
                        <div className="flex items-center gap-4 p-8 bg-stone-950 rounded-[2.5rem] text-white">
                            <div className="p-3 bg-white/10 rounded-2xl"><Sparkles className="text-orange-500" size={24} /></div>
                            <div>
                                <div className="text-sm font-black uppercase tracking-widest mb-1">Expert Curation</div>
                                <div className="text-xs text-white/50 font-medium leading-relaxed">This selection has been analyzed by our master tailors to ensure 95%+ color match accuracy.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

