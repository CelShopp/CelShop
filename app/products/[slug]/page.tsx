import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import type { Product } from "@prisma/client";
import { ArrowLeft, ShoppingCart, Check, BadgeCheck, Film, User } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product: Product | null = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | FilmyFits`,
    description: `Iconic ${product.movie || 'film'} style worn by ${product.actorName || 'your favorite stars'}. Get the screen-accurate look of ${product.name}.`,
    alternates: {
      canonical: `https://filmyfits.vercel.app/products/${slug}`,
    },
  };
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: Product | null = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <h1 className="text-2xl font-black text-stone-900 mb-4">Product Not Found</h1>
        <Link href="/collections" className="text-orange-600 font-bold hover:underline">Back to Collections</Link>
      </div>
    </div>
  );

  const discountedPrice = Math.round(product.price * 1.3);

  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-32">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "FilmyFits"
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: "https://schema.org/InStock",
              url: product.buyLink,
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-8 md:mb-12">
          <Link
            href={`/collections/${product.collection}`}
            className="group inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Archive / {product.collection}
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start pb-16 md:pb-24 border-b border-stone-200">
          {/* Visual Side */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 lg:sticky lg:top-28">
            <div className="aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-stone-200 shadow-xl sm:shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Context Badge */}
            {(product.movie || product.actorName) && (
              <div className="absolute -bottom-4 left-2 right-2 sm:-bottom-6 sm:-left-6 sm:right-auto bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border border-stone-100 sm:max-w-[280px] animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-widest mb-3">
                  <Film size={12} />
                  As Seen In
                </div>
                <div className="space-y-3">
                  {product.movie && (
                    <div className="flex gap-3">
                      <div className="p-2 bg-stone-50 rounded-lg h-fit"><Film size={16} className="text-stone-400" /></div>
                      <div>
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Movie</div>
                        <div className="text-sm font-black text-stone-900">{product.movie}</div>
                      </div>
                    </div>
                  )}
                  {product.actorName && (
                    <div className="flex gap-3">
                      <div className="p-2 bg-stone-50 rounded-lg h-fit"><User size={16} className="text-stone-400" /></div>
                      <div>
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Worn By</div>
                        <div className="text-sm font-black text-stone-900">{product.actorName}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-stone-900 text-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl">
              <BadgeCheck size={32} className="text-orange-500" />
            </div>
          </div>

          {/* Details Side */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">In Stock</span>
                <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">Free Pan-India Delivery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-stone-900 tracking-tighter leading-[0.9] mb-5 md:mb-6">
                {product.name}
              </h1>

              <p className="text-base sm:text-xl text-stone-500 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-5 sm:p-8 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-stone-100">
              <div className="flex items-end gap-4 mb-8">
                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">Current Price</div>
                  <div className="text-4xl sm:text-5xl font-black text-stone-900">₹{product.price.toLocaleString()}</div>
                </div>
                <div className="mb-1">
                  <span className="text-lg text-stone-300 line-through font-bold">₹{discountedPrice.toLocaleString()}</span>
                  <div className="text-orange-600 font-black text-xs uppercase tracking-widest mt-1">Limited Time Offer</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Screen Accurate",
                  "Premium Materials",
                  "Collector's Item",
                  "Express Shipping",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-600 text-sm font-bold">
                    <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <a
                href={product.buyLink}
                target="_blank"
                rel="nofollow sponsored"
                className="group flex items-center justify-center gap-3 sm:gap-4 w-full py-4 sm:py-6 bg-stone-900 text-white font-black text-sm sm:text-lg rounded-2xl hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-600/20 active:scale-[0.98]"
              >
                <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform" />
                Check Price on Amazon
              </a>
            </div>

            {/* Quality Commitment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start p-2">
              <div className="flex-1">
                <div className="font-black text-stone-900 mb-2 uppercase tracking-tight">Authentic Detail</div>
                <p className="text-stone-500 text-sm leading-relaxed">We source products that capture the soul of the character. Each piece in the FilmyFits archive is selected for its proximity to screen accuracy.</p>
              </div>
              <div className="flex-1">
                <div className="font-black text-stone-900 mb-2 uppercase tracking-tight">Hand-Picked</div>
                <p className="text-stone-500 text-sm leading-relaxed">Our fashion experts scan thousands of items to find only those with the correct drape, material, and iconic silhouette.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 p-4 md:p-6 z-50 pointer-events-none flex justify-center">
        <div className="bg-white/80 backdrop-blur-xl border border-stone-100 shadow-2xl p-3 md:p-4 rounded-[2rem] w-full max-w-lg pointer-events-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block ml-4">
            <div className="text-[10px] text-stone-400 font-black uppercase tracking-widest leading-none mb-1">Buy Now</div>
            <div className="text-xl font-black text-stone-900 leading-none">₹{product.price.toLocaleString()}</div>
          </div>
          <a
            href={product.buyLink}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10"
          >
            <ShoppingCart size={16} />
            Claim Piece
          </a>
        </div>
      </div>
    </main>
  );
}

