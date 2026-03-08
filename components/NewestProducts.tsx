import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";
import { ArrowRight, Sparkles } from "lucide-react";

export default async function NewestProducts() {
  let latestProducts: Product[] = [];
  let collectionName = "Latest Finds";

  try {
    const mostRecentProduct = await prisma.product.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (mostRecentProduct) {
      const latestCollection = mostRecentProduct.collection.split(",")[0].trim();
      const formattedName = latestCollection
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      collectionName = formattedName;

      latestProducts = await prisma.product.findMany({
        where: { collection: { contains: latestCollection } },
        orderBy: { createdAt: "desc" },
        take: 8,
      });
    }
  } catch (e) {
    console.error("Failed to fetch latest products", e);
  }

  if (latestProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-stone-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tighter leading-none">
              {collectionName}{" "}
              <span className="text-stone-300">Collection</span>
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

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {latestProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 mb-3 sm:mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0"
                />
                {/* Hover CTA */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-stone-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-[0.15em] text-[9px] sm:text-[10px]">
                    <span className="text-orange-500">●</span>
                    Shop This Look
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="px-0.5">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-orange-500 mb-0.5 truncate">
                  {product.collection
                    .split(",")[0]
                    .trim()
                    .split("-")
                    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </p>
                <h3 className="text-sm sm:text-base font-black text-stone-900 tracking-tight leading-tight group-hover:text-orange-600 transition-colors line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-base sm:text-xl font-black text-stone-900 leading-none">
                  ₹{product.price.toLocaleString()}
                </p>
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