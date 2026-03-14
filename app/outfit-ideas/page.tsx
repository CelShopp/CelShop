import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Outfit Ideas | FilmyFits",
  description: "Complete film-inspired outfits, curated with matching products.",
  alternates: { canonical: "https://filmyfits.vercel.app/outfit-ideas" },
  openGraph: {
    title: "Outfit Ideas | FilmyFits",
    description: "Complete film-inspired outfits, curated with matching products.",
    url: "https://filmyfits.vercel.app/outfit-ideas",
    siteName: "FilmyFits",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfit Ideas | FilmyFits",
    description: "Complete film-inspired outfits, curated with matching products.",
    site: "@FilmyFits",
    creator: "@FilmyFits",
    images: ["/logo.png"],
  },
};

export default async function OutfitIdeasPage() {
  const outfits = await prisma.outfitIdea.findMany({
    orderBy: { updatedAt: "desc" },
    include: { products: { select: { productId: true } } },
  });

  return (
    <main className="min-h-screen bg-stone-50 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="mb-10 sm:mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            <Sparkles size={14} />
            Outfit Vault
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-3 sm:mb-5 leading-[0.95]">
            Outfit <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-500">Ideas</span>
          </h1>
          <p className="text-sm sm:text-lg text-stone-500 max-w-2xl mx-auto font-medium">
            Complete looks you can build with the exact products we curated.
          </p>
        </header>

        {outfits.length === 0 ? (
          <div className="py-24 text-center border border-stone-200 rounded-3xl bg-white">
            <p className="text-stone-500 font-medium">No outfit ideas yet. Create some in Admin → Outfits.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 lg:gap-5">
            {outfits.map((o) => (
              <Link
                key={o.id}
                href={`/outfit-ideas/${o.slug}`}
                className="group rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                  <div className="absolute inset-0 p-1 sm:p-2">
                    <img
                      src={o.image}
                      alt={o.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-700 border border-stone-200 shadow-sm">
                      {o.products.length} item{o.products.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <h2 className="text-sm sm:text-base font-black text-stone-900 tracking-tight leading-snug line-clamp-2">
                    {o.title}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs text-stone-500 font-medium line-clamp-2">
                    {o.description || "Tap to see the full outfit and all curated products."}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-stone-600 group-hover:text-stone-900 transition-colors">
                    View Outfit
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
