import { prisma } from "../lib/prisma";
import { products } from "./products";

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: parseInt(product.price.replace("₹", "").replace(",", "")),
        image: product.image,
        buyLink: product.buyLink,
        collection: product.collection,
      },
    });
  }

  console.log("Seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });