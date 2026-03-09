import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Film, ArrowRight, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pt-24 sm:pt-32 pb-16 sm:pb-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-12 sm:mb-20 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            <Film size={14} />
            Cinematic Archives
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-4 sm:mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-500">Collections</span>
          </h1>
          <p className="text-base sm:text-xl text-stone-500 max-w-2xl mx-auto font-medium">
            Browse our curated archives of screen-worn replicas and cinematic style inspirations.
          </p>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {uniqueCollections.map((col: any) => {
            const isBatman = col.slug === 'batman';
            const movieContext = isBatman ? "The Dark Knight" : col.name;
            const actorContext = isBatman ? "Christian Bale" : "Various Icons";

            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group relative h-[420px] sm:h-[540px] lg:h-[600px] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-stone-200 shadow-xl transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-2 sm:hover:-translate-y-3"
              >
                {/* Image */}
                <img
                  src={col.image || "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Dramatic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-700" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 flex flex-col items-start translate-y-2 sm:translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex items-center gap-3 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    <Sparkles size={14} />
                    {col.count} Master Files
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-[0.9]">
                    {col.name} <br />
                    <span className="text-white/40 italic">Archive</span>
                  </h2>

                  <div className="flex flex-col gap-1 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Featured Inspiration</div>
                    <div className="text-white font-bold text-sm">{movieContext} / {actorContext}</div>
                  </div>

                  <div className="flex items-center gap-4 py-4 px-8 bg-white text-stone-900 rounded-2xl font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 shadow-2xl">
                    View Dossier
                    <ArrowRight size={16} className="text-orange-600" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

