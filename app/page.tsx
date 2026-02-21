import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Movie Outfits & Celebrity Inspired Clothing",
  description:
    "Find movie inspired outfits, celebrity clothing and budget alternatives to iconic movie looks like Batman, Spider-Man and more.",
};

export default function Home() {
  return (
    <main>
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Dress Like Your Favorite Movie Characters
        </h1>
      
        <p style={{ fontSize: "18px", opacity: 0.7, marginBottom: "30px" }}>
          We break down iconic outfits and show you the best budget and premium alternatives.
        </p>
      
        <Link
          href="/collections/batman"
          className="button"
          style={{ maxWidth: "250px", margin: "0 auto" }}
        >
          Explore Collections
        </Link>
      </section>
    </main>
  );
}
