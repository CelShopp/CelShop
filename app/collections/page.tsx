import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Film, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Movie Collections | FilmyFits",
  description: "Explore our curated collections of movie-inspired outfits.",
};

export default async function CollectionsPage() {
  // Fetch collections from Database table
  let collectionRecords = await (prisma as any).collection.findMany({
    orderBy: { updatedAt: "desc" }
  });
  
  const products = await prisma.product.findMany({ select: { collection: true } });
  const countMap = new Map<string, number>();
  products.forEach(p => {
    p.collection.split(',').forEach(c => {
      const slug = c.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      if (slug) countMap.set(slug, (countMap.get(slug) || 0) + 1);
    });
  });

  if (collectionRecords.length === 0) {
    const slugs = Array.from(countMap.keys());
    collectionRecords = slugs.map(slug => ({
      slug,
      name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      image: null,
      description: null
    }));
  }

  const uniqueCollections = collectionRecords.map((col: any) => ({
    ...col,
    count: countMap.get(col.slug) || 0,
    name: col.name || col.slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  }));

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-10 sm:mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            <Film size={14} />
            Cinematic Archives
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-3 sm:mb-5 leading-[0.95]">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-500">Collections</span>
          </h1>
          <p className="text-sm sm:text-lg text-stone-500 max-w-2xl mx-auto font-medium">
            Browse our curated archives of screen-worn replicas and cinematic style inspirations.
          </p>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
          {uniqueCollections.map((col: any) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                <img
                  src={col.image || "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"}
                  alt={col.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-x-0 top-0 h-[115%] w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-stone-700 border border-stone-200 shadow-sm">
                    {col.count} item{col.count === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-snug line-clamp-2">
                  {col.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-500 font-medium line-clamp-2">
                  Curated looks and items from this archive.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-600 group-hover:text-stone-900 transition-colors">
                  View Collection
                  <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
