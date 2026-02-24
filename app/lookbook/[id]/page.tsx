"use client";

import React, { use } from 'react';

const lookbookData = [
    {
        celebrity: "James Bond",
        movie: "Casino Royale",
        items: [
            { name: "Navy Suit", color: "#1e3a8a" },
            { name: "White Shirt", color: "#ffffff" },
            { name: "Black Tie", color: "#000000" },
            { name: "Oxford Shoes", color: "#b45309" },
        ],
    },
    {
        celebrity: "Don Draper",
        movie: "Mad Men",
        items: [
            { name: "Grey Suit", color: "#6b7280" },
            { name: "Light Blue Shirt", color: "#bae6fd" },
            { name: "Striped Tie", color: "#334155" },
            { name: "Brown Oxford", color: "#92400e" },
        ],
    },
    {
        celebrity: "Tony Stark",
        movie: "Iron Man",
        items: [
            { name: "Black Blazer", color: "#0f172a" },
            { name: "Graphic Tee", color: "#dc2626" },
            { name: "Dark Jeans", color: "#1e3a8a" },
            { name: "Sneakers", color: "#d1d5db" },
        ],
    },
    {
        celebrity: "Walter White",
        movie: "Breaking Bad",
        items: [
            { name: "Green Shirt", color: "#16a34a" },
            { name: "Beige Pants", color: "#fef3c7" },
            { name: "White Briefs", color: "#ffffff" },
            { name: "Socks", color: "#27272a" },
        ],
    },
    {
        celebrity: "Neo",
        movie: "The Matrix",
        items: [
            { name: "Black Coat", color: "#000000" },
            { name: "Black Shirt", color: "#0f172a" },
            { name: "Black Pants", color: "#1f2937" },
            { name: "Black Boots", color: "#4b5563" },
        ],
    },
];

export default function LookbookDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const lookbookIndex = parseInt(id as string);
    const lookbook = lookbookData[lookbookIndex];

    if (!lookbook) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-semibold">Lookbook entry not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Photo on the left */}
                    <div className="flex-1">
                        <div className="aspect-[3/4] bg-stone-200 rounded-3xl overflow-hidden relative shadow-xl">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-stone-400">
                                {lookbook.celebrity}
                            </div>
                        </div>
                    </div>

                    {/* Clothing items */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-stone-900 mb-2">{lookbook.celebrity}</h1>
                            <p className="text-xl text-stone-500">Seen in {lookbook.movie}</p>
                        </div>

                        <div className="space-y-4">
                            {lookbook.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-4 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {/* Color box */}
                                    <div
                                        className="w-16 h-16 rounded-xl shadow-inner border border-stone-100"
                                        style={{ backgroundColor: item.color }}
                                    ></div>

                                    {/* Item name and button */}
                                    <div className="ml-6 flex-1">
                                        <div className="text-lg font-bold text-stone-900">{item.name}</div>
                                        <button
                                            className="mt-2 px-4 py-2 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                                        >
                                            See Similar Product
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
