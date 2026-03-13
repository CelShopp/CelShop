import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ShoppingCart, User } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let actor: { name: string; image: string | null } | null = null;
  try {
    actor = await prisma.actor.findUnique({ where: { slug }, select: { name: true, image: true } });
  } catch {
    actor = null;
  }
  const name =
    actor?.name ||
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const url = `https://filmyfits.vercel.app/actors/${slug}`;
  const title = `${name} | FilmyFits`;
  const description = `Curated picks for ${name}.`;
  const image = actor?.image || "/logo.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "FilmyFits",
      type: "profile",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@FilmyFits",
      creator: "@FilmyFits",
      images: [image],
    },
  };
}

export default async function ActorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const actor = await prisma.actor.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
        include: { product: true },
      },
    },
  });

  if (!actor) {
    return (
      <main className="min-h-screen bg-stone-50 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-stone-900 mb-4">Actor Not Found</h1>
          <p className="text-stone-500 font-medium mb-8">This actor card does not exist (or was renamed).</p>
          <Link href="/actors" className="inline-flex items-center gap-2 text-orange-600 font-black hover:underline">
            <ArrowLeft size={16} />
            View all actors
          </Link>
        </div>
      </main>
    );
  }

  const curated = actor.products.map((p) => p.product).filter(Boolean);
  const heroImage = actor.image || curated[0]?.image || null;

  return (
    <main className="min-h-screen bg-stone-50 pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <Link
            href="/actors"
            className="group inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Actors
          </Link>
        </div>

        <header className="mb-10 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              <User size={14} />
              Actor Card
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-stone-900">
              {actor.name} <br />
              <span className="text-stone-300">Picks</span>
            </h1>
            <p className="mt-5 text-base sm:text-xl text-stone-500 font-medium leading-relaxed max-w-2xl">
              Only the products you choose for this actor show up here.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Items in Vault</div>
                <div className="text-4xl font-black text-stone-900 leading-none">{curated.length}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2.5rem] overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                {heroImage ? (
                  <img
                    src={heroImage}
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
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          {curated.length === 0 ? (
            <div className="col-span-full py-24 text-center border border-stone-200 rounded-3xl bg-white">
              <p className="text-stone-500 font-medium">No curated products yet. Add products in Admin → Actors.</p>
            </div>
          ) : (
            curated.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <Link href={`/products/${product.slug}`} className="flex flex-col">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-stone-900 uppercase tracking-widest">
                        <ShoppingCart size={12} />
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-black text-stone-900 text-sm leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-stone-500 font-bold text-xs mt-1">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>

                <a
                  href={product.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-center text-xs font-black bg-black text-white py-2 rounded-xl hover:bg-stone-800 transition opacity-100"
                >
                  Check Price
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
