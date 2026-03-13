import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ShoppingCart, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const outfit = await prisma.outfitIdea.findUnique({
    where: { slug },
    select: { title: true, description: true, image: true },
  });

  if (!outfit) return { title: "Outfit Not Found", robots: { index: false, follow: false } };

  const url = `https://filmyfits.vercel.app/outfit-ideas/${slug}`;
  const title = `${outfit.title} | Outfit Ideas | FilmyFits`;
  const description = outfit.description || "A complete outfit with the matching products we curated.";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "FilmyFits",
      type: "website",
      images: [{ url: outfit.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@FilmyFits",
      creator: "@FilmyFits",
      images: [outfit.image],
    },
  };
}

export default async function OutfitIdeaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const outfit = await prisma.outfitIdea.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        include: { product: true },
      },
    },
  });

  if (!outfit) notFound();

  const selectedProducts = outfit.products.map((p) => p.product).filter(Boolean);

  return (
    <main className="min-h-screen bg-stone-50 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <Link
            href="/outfit-ideas"
            className="group inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Outfit Ideas
          </Link>
        </div>

        <header className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            <Sparkles size={14} />
            Complete Outfit
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-stone-900">
            {outfit.title}
          </h1>
          {outfit.description && (
            <p className="mt-4 text-base sm:text-lg text-stone-500 font-medium max-w-3xl">{outfit.description}</p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: outfit image (small) */}
          <div className="lg:col-span-2">
            <div className="mx-auto lg:mx-0 w-[160px] sm:w-[200px] rounded-[2rem] overflow-hidden border border-stone-200 bg-white shadow-sm">
              <div className="h-[220px] sm:h-[260px] bg-stone-100 p-2 overflow-hidden">
                <img src={outfit.image} alt={outfit.title} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Right: selected products (smaller images) */}
          <aside className="lg:col-span-10">
            <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Products</div>
                  <div className="text-xl font-black mt-2">Build the look</div>
                </div>
                <div className="text-xs font-black text-stone-500">{selectedProducts.length} item{selectedProducts.length === 1 ? "" : "s"}</div>
              </div>

              {selectedProducts.length === 0 ? (
                <div className="py-10 text-center border border-stone-200 rounded-3xl bg-stone-50">
                  <p className="text-stone-500 font-medium">No products attached to this outfit yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="flex gap-3 rounded-3xl border border-stone-100 bg-stone-50 p-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-stone-200 flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Link href={`/products/${p.slug}`} className="font-black text-stone-900 hover:text-orange-600 transition-colors line-clamp-2">
                          {p.name}
                        </Link>
                        <div className="mt-1 text-xs font-bold text-stone-500 line-clamp-1">{p.collection}</div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="text-sm font-black text-stone-900">{"\u20B9"}{p.price.toLocaleString()}</div>
                          <a
                            href={p.buyLink}
                            target="_blank"
                            rel="nofollow sponsored"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors"
                          >
                            <ShoppingCart size={14} />
                            Buy
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
