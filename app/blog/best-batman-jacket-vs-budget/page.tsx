import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Batman Jacket – Budget vs Premium Comparison",
  description:
    "Compare budget vs premium Batman jackets to find the best option for cosplay or everyday wear.",
};

export default function Page() {
  return (
    <main>
      <h1>Best Batman Jacket – Budget vs Premium Comparison</h1>

      <p>
        If you're building a Batman inspired outfit, the jacket is the most
        important piece. Below we compare budget and premium options.
      </p>

      <p>
        Explore all Batman outfits in our full collection.
      </p>

      <Link href="/collections/batman">
        View Batman Collection
      </Link>

      <h2>Premium Batman Jacket</h2>
      <Link href="/products/batman-jacket">
        View Premium Jacket
      </Link>

      <h2>Budget Alternative</h2>
      <Link href="/products/batman-jacket">
        View Budget Option
      </Link>
    </main>
  );
}
