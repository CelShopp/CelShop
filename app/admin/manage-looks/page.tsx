import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ManageLooks() {
  if (process.env.NODE_ENV !== "development") return null;

  const looks = await prisma.actorLook.findMany({
    include: { products: true },
  });

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <h1 className="text-4xl font-bold mb-10">
        Manage Actor Looks
      </h1>

      <div className="space-y-6">
        {looks.map((look) => (
          <div
            key={look.id}
            className="p-6 bg-neutral-900 rounded flex justify-between"
          >
            <div>
              <div className="text-xl font-bold">
                {look.actorName}
              </div>
              <div className="text-neutral-400">
                {look.movie}
              </div>
              <div className="text-sm mt-2">
                {look.products.length} Products Attached
              </div>
            </div>

            <Link
              href={`/lookbook/${look.slug}`}
              className="bg-white text-black px-6 py-2 rounded"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}