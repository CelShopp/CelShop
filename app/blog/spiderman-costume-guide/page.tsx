import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Spider-Man Costume Pieces – Hoodie, Gloves & Shoes",
  description:
    "Discover the best Spider-Man costume pieces including hoodies, gloves and shoes for cosplay or themed events.",
};

export default function Page() {
  return (
    <main>
      <h1>Best Spider-Man Costume Pieces – Hoodie, Gloves & Shoes</h1>

      <p>
        Building a Spider-Man costume requires key pieces such as a hoodie,
        gloves and shoes. Here are the most essential items.
      </p>

      <p>
        You can explore all Spider-Man inspired outfits in our full collection.
      </p>

      <Link href="/collections/spiderman">
        View Spider-Man Collection
      </Link>

      <h2>Spider-Man Hoodie</h2>
      <Link href="/products/spiderman-hoodie">
        View Spider-Man Hoodie
      </Link>

      <h2>Spider-Man Gloves</h2>
      <Link href="/products/spiderman-gloves">
        View Spider-Man Gloves
      </Link>

      <h2>Spider-Man Shoes</h2>
      <Link href="/products/spiderman-shoes">
        View Spider-Man Shoes
      </Link>
    </main>
  );
}
