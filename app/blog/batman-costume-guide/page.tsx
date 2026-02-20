import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Batman Costume Pieces – Jacket, Gloves, Mask & Belt",
  description:
    "Discover the best Batman costume pieces including jackets, gloves, mask and utility belt for cosplay or themed events.",
};

export default function Page() {
  return (
    <main>
      <h1>Best Batman Costume Pieces – Jacket, Gloves, Mask & Belt</h1>

      <p>
        Building a Batman costume requires key pieces such as a jacket, gloves,
        mask and utility belt. Here are the most essential items.
      </p>

      <p>
        You can explore all Batman inspired outfits in our full collection.
      </p>

      <Link href="/collections/batman">
        View Batman Collection
      </Link>

      <h2>Batman Mask</h2>
      <Link href="/products/batman-mask">
        View Batman Mask
      </Link>

      <h2>Batman Gloves</h2>
      <Link href="/products/batman-gloves">
        View Batman Gloves
      </Link>

      <h2>Utility Belt</h2>
      <Link href="/products/batman-belt">
        View Batman Utility Belt
      </Link>
    </main>
  );
}
