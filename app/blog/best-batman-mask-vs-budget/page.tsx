import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Batman Mask – Budget vs Premium Comparison",
  description:
    "Compare budget vs premium Batman masks to find the best option for cosplay or themed events.",
};

export default function Page() {
  return (
    <main>
      <h1>Best Batman Mask – Budget vs Premium Comparison</h1>

      <p>
        Choosing the right Batman mask can make or break your costume.
      </p>

      <Link href="/collections/batman">
        View Batman Collection
      </Link>

      <h2>Premium Mask</h2>
      <Link href="/products/batman-mask">
        View Premium Mask
      </Link>

      <h2>Budget Alternative</h2>
      <Link href="/products/batman-mask">
        View Budget Option
      </Link>
    </main>
  );
}
