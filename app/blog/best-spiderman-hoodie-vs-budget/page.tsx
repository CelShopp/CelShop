import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Spider-Man Hoodie – Budget vs Premium",
  description:
    "Compare budget vs premium Spider-Man hoodies to choose the best outfit option.",
};

export default function Page() {
  return (
    <main>
      <h1>Best Spider-Man Hoodie – Budget vs Premium</h1>

      <p>
        Spider-Man hoodies are a popular choice for casual cosplay.
      </p>

      <Link href="/collections/spiderman">
        View Spider-Man Collection
      </Link>

      <h2>Premium Hoodie</h2>
      <Link href="/products/spiderman-hoodie">
        View Premium Hoodie
      </Link>

      <h2>Budget Alternative</h2>
      <Link href="/products/spiderman-hoodie">
        View Budget Option
      </Link>
    </main>
  );
}
