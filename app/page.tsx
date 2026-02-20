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
      <h1>Shop Movie Inspired Outfits</h1>

      <div>
        <h2>Collections</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <Link
            href="/collections/batman"
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            Batman Outfits
          </Link>

          <Link
            href="/collections/spiderman"
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            Spider-Man Outfits
          </Link>
        </div>
      </div>

      <div>
        <h2>Guides</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <Link
            href="/blog/batman-outfit-guide"
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            How to Dress Like Batman
          </Link>

          <Link
            href="/blog/spiderman-outfit-guide"
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            How to Dress Like Spider-Man
          </Link>

          <Link
            href="/blog/batman-costume-guide"
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            Best Batman Costume Pieces
          </Link>

          <Link
            href="/blog/spiderman-costume-guide"
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            Best Spider-Man Costume Pieces
          </Link>
        </div>
      </div>
    </main>
  );
}
