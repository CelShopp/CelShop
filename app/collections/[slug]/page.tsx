import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Film, Sparkles, ShoppingCart } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | Cinematic Collection`,
    description: `Shop iconic looks from ${formattedTitle}. Screen-accurate archives curated for true film lovers.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <h1 className="text-2xl font-black text-stone-900 mb-4">Collection Not Found</h1>
        <Link href="/collections" className="text-orange-600 font-bold hover:underline">View All Collections</Link>
      </div>
    </div>
  );

  const collectionName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const filtered = await prisma.product.findMany({
    where: {
      collection: {
        contains: slug
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-stone-50 pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/collections"
            className="group inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 sm:mb-20">
          <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            <Film size={14} />
            Collection Archive
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.85]">
                {collectionName} <br />
                <span className="text-stone-300">Archive</span>
              </h1>
              <p className="text-base sm:text-xl text-stone-500 font-medium leading-relaxed">
                Curated apparel and accessories inspired by the iconic cinematography and character design of {collectionName}.
              </p>
            </div>
            <div className="flex items-center gap-6 pb-2">
              <div className="text-right">
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Items in Vault</div>
                <div className="text-4xl font-black text-stone-900 leading-none">{filtered.length}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-stone-200 rounded-[3rem]">
              <Sparkles className="mx-auto mb-6 text-stone-200" size={48} />
              <h3 className="text-2xl font-black text-stone-900 mb-2">The vault is being updated</h3>
              <p className="text-stone-500 font-medium italic">Iconic styles for this collection will appear here soon.</p>
            </div>
          ) : (
            filtered.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] rounded-2xl sm:rounded-[2.5rem] overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-2xl transition-all duration-500 mb-3 sm:mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-stone-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow-2xl">
                      <ShoppingCart size={16} />
                      View Product
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Close Alternative</div>
                  <h3 className="text-sm sm:text-lg font-black text-stone-900 mb-1 line-clamp-1 leading-tight">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm sm:text-xl font-black text-stone-900">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
