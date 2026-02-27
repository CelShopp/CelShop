import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";

export default async function AllProducts() {
  // 1️⃣ Get total number of products
  const totalCount = await prisma.product.count();

  // 2️⃣ Generate random starting point
  const randomSkip =
    totalCount > 20
      ? Math.floor(Math.random() * (totalCount - 20))
      : 0;

  // 3️⃣ Fetch 20 products from random position
  const products: Product[] = await prisma.product.findMany({
    take: 20,
    skip: randomSkip,
  });

  return (
    <div className="min-h-screen bg-stone-50 pt-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <div className="aspect-[4/5] rounded-1xl overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-xl transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-4 font-black text-stone-900 group-hover:text-orange-600 transition">
              {product.name}
            </h3>

            <p className="text-stone-500 font-bold">
              ₹{product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}