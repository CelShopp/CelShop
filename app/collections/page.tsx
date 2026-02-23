import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CollectionsPage() {
  // Get distinct collection names
  const collections = await prisma.product.findMany({
    distinct: ["collection"],
    select: { collection: true },
  });

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Explore Collections
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((item) => (
            <Link
              key={item.collection}
              href={`/collections/${item.collection}`}
              className="bg-white rounded-xl p-8 shadow hover:shadow-lg transition text-center font-semibold"
            >
              {item.collection}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}