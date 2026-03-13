import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import RecentProductsClient, { type RecentProduct } from "@/components/RecentProductsClient";

const getRecentProductsPage1 = unstable_cache(
  async (): Promise<RecentProduct[]> => {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
        buyLink: true,
      },
    });

    return products;
  },
  ["home-recent-products-page1"],
  { revalidate: 60 },
);

export default async function RecentProducts() {
  const initialProducts = await getRecentProductsPage1();
  return <RecentProductsClient initialProducts={initialProducts} />;
}

