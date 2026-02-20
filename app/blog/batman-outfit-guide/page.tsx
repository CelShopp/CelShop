import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Dress Like Batman – Complete Outfit Guide",
  description:
    "Complete guide on how to dress like Batman including jackets, gloves, masks and utility belt recommendations.",
};

export default function Page() {
  return (
    <main>
      <h1>How to Dress Like Batman – Complete Outfit Guide</h1>

      <p>
        Dressing like Batman requires the right jacket, gloves, mask and utility
        belt. Below we break down each essential item.
      </p>
      
      <p>
      Explore all Batman inspired outfits in our full collection.
      </p>

      <Link href="/collections/batman">
      View Batman Collection
      </Link>


      <h2>Batman Jacket</h2>
      <Link href="/products/batman-jacket">
        View Batman Jacket
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
