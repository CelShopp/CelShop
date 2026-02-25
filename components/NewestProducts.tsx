import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

export default async function NewestProducts() {
    let latestProducts: Product[] = [];
    try {
        latestProducts = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    } catch (e) {
        console.error("Failed to fetch latest products", e);
    }


    if (latestProducts.length === 0) return null;

    return (
        <section className="py-24 px-4 sm:px-8 lg:px-12 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-stone-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Sparkles size={14} />

                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tighter leading-none mb-6">
                            Latest <span className="text-stone-300">Artifacts</span>
                        </h2>
                    </div>
                    <Link
                        href="/collections"
                        className="group flex items-center gap-2 text-stone-400 font-black uppercase tracking-widest text-xs hover:text-stone-900 transition-all pb-2 self-start md:self-auto"
                    >
                        Explore The Vault
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-orange-600" />
                    </Link>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 md:gap-10 sm:overflow-visible sm:snap-none">
                    {latestProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group flex-shrink-0 basis-[42%] min-w-[42%] max-w-[180px] snap-start sm:min-w-0 sm:max-w-none sm:basis-auto sm:flex sm:flex-col"
                        >
                            <div className="relative aspect-[4/5] rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-stone-100 mb-4 sm:mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />


                                {/* Hover Overlay Component */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="bg-stone-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-2xl">
                                        <ShoppingBag size={14} className="text-orange-500" />
                                        See Product
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-base sm:text-xl font-black text-stone-900 mb-1 sm:mb-2 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="text-base sm:text-2xl font-black text-stone-900 leading-none">₹{product.price.toLocaleString()}</div>
                                <div className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">{product.collection}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
