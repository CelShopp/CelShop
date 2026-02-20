import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Dress Like Spider-Man – Complete Outfit Guide",
  description:
    "Complete guide on how to dress like Spider-Man including hoodies, gloves, shoes and masks.",
};

export default function Page() {
  return (
    <main>
      <h1>How to Dress Like Spider-Man – Complete Outfit Guide</h1>

      <p>
        Dressing like Spider-Man requires the right hoodie, gloves, shoes and
        mask. Below we break down each essential item.
      </p>

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
