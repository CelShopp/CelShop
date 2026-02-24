import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Sparkles, Film, ShoppingBag } from "lucide-react";

export default async function NewestProducts() {
    let latestProducts: any[] = [];
    try {
        latestProducts = await prisma.product.findMany({
            take: 4,
            orderBy: {
                createdAt: 'desc'
            }
        });
    } catch (e) {
        console.error("Failed to fetch latest products", e);
    }


    if (latestProducts.length === 0) return null;

    return (
        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-stone-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Sparkles size={14} />
                            Director's Cut
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter leading-none mb-6">
                            Latest <span className="text-stone-300">Artifacts</span>
                        </h2>
                        <p className="text-lg text-stone-500 font-medium leading-relaxed max-w-lg">
                            Freshly unearthed pieces from the cinematic archives. Each item is a masterclass in screen-accurate character design.
                        </p>
                    </div>
                    <Link
                        href="/collections"
                        className="group flex items-center gap-2 text-stone-400 font-black uppercase tracking-widest text-xs hover:text-stone-900 transition-all pb-2"
                    >
                        Explore The Vault
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-orange-600" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {latestProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-stone-100 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />

                                {/* Status Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-stone-100 shadow-sm">
                                        Archive New
                                    </span>
                                </div>

                                {/* Hover Overlay Component */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="bg-stone-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-2xl">
                                        <ShoppingBag size={14} className="text-orange-500" />
                                        Analyze Details
                                    </div>
                                </div>
                            </div>

                            <div className="px-2">
                                <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.2em] text-[9px] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Film size={10} />
                                    Screen Legend
                                </div>
                                <h3 className="text-xl font-black text-stone-900 mb-2 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-black text-stone-900 leading-none">₹{product.price.toLocaleString()}</div>
                                    <div className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">{product.collection}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

