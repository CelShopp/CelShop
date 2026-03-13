import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Actors | FilmyFits",
  description: "Browse curated outfits by actor.",
};

export default async function ActorsPage() {
  const actors = await prisma.actor.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { products: true } },
      products: {
        take: 1,
        include: { product: { select: { image: true } } },
      },
    },
  });

  return (
    <main className="min-h-screen bg-stone-50 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="mb-10 sm:mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            <User size={14} />
            Actor Vault
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-3 sm:mb-5 leading-[0.95]">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-500">Actors</span>
          </h1>
          <p className="text-sm sm:text-lg text-stone-500 max-w-2xl mx-auto font-medium">
            Hand-picked actor cards with only the products you choose.
          </p>
        </header>

        {actors.length === 0 ? (
          <div className="py-24 text-center border border-stone-200 rounded-3xl bg-white">
            <p className="text-stone-500 font-medium">No actors yet. Create some in Admin → Actors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {actors.map((actor) => {
              const image = actor.image || actor.products[0]?.product.image || null;
              return (
                <Link
                  key={actor.id}
                  href={`/actors/${actor.slug}`}
                  className="group rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={actor.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-x-0 top-0 h-[130%] w-full object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-black uppercase tracking-widest text-xs">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-stone-700 border border-stone-200 shadow-sm">
                        {actor._count.products} item{actor._count.products === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-snug line-clamp-2">
                      {actor.name}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-stone-500 font-medium line-clamp-2">
                      Curated picks for this actor.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-600 group-hover:text-stone-900 transition-colors">
                      View Actor
                      <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
