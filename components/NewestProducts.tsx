import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Sparkles, FolderOpen } from "lucide-react";

export default async function NewestProducts() {
  let latestCollections: any[] = [];

  try {
    // Fetch the collections marked for home page
    const collections = await (prisma as any).collection.findMany({
      where: { showInHome: true },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });

    // Enhance collections with fallback images from products if needed
    latestCollections = await Promise.all(collections.map(async (col: any) => {
      if (col.image) return col;

      // Fallback: use image from the latest product in this collection
      const latestProduct = await prisma.product.findFirst({
        where: { collection: { contains: col.name } },
        orderBy: { createdAt: "desc" },
        select: { image: true }
      });

      return {
        ...col,
        image: latestProduct?.image || null
      };
    }));

    // If no collections in table, fall back to search products directly
    if (latestCollections.length === 0) {
      const recentProducts = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        distinct: ['collection'],
        take: 4,
      });

      latestCollections = recentProducts.map(p => ({
        id: p.id,
        name: p.collection.split(',')[0].trim(),
        slug: p.collection.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        image: p.image
      }));
    }
  } catch (e) {
    console.error("Failed to fetch latest collections", e);
  }


  if (latestCollections.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-stone-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
              <Sparkles size={14} />
              Recently Unlocked
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tighter leading-none">
              Latest <span className="text-stone-300">Collections</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="group flex items-center gap-2 text-stone-400 font-black uppercase tracking-widest text-[10px] hover:text-stone-900 transition-colors pb-1 border-b border-transparent hover:border-stone-300"
          >
            Explore The Vault
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-orange-500" />
          </Link>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {latestCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[2/3] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-stone-200 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <FolderOpen size={48} strokeWidth={1} />
                  </div>
                )}

                {/* Overlay with glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <h3 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
                    {collection.name.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </h3>
                  <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-black text-stone-300 uppercase tracking-widest mt-1">
                    See Items <ArrowRight size={10} className="text-orange-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-stone-200 text-stone-700 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl hover:border-stone-400 hover:text-stone-900 transition-all"
          >
            View All Products
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
