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
          padding: "50px 16px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            fontSize: "clamp(24px, 6vw, 36px)",
            marginBottom: "20px"
          }}
        >
          Dress Like Your Favorite Movie Characters
        </h1>
      
        <p style={{ fontSize: "clamp(15px, 4vw, 18px)", opacity: 0.7, marginBottom: "30px" }}>
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
      <section
        style={{
          padding: "50px 20px",
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Trusted Movie Outfit Breakdowns
        </h2>
      
        <p style={{ opacity: 0.7, maxWidth: "700px", margin: "0 auto" }}>
          We analyze iconic outfits piece by piece and compare real-world options —
          from budget alternatives to premium replicas.
        </p>
      </section>
      <section
        style={{
          padding: "50px 20px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Featured Collections
        </h2>
      
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "25px"
          }}
        >
          <Link href="/collections/batman" className="card">
            <h3>Batman Outfits</h3>
            <p style={{ opacity: 0.7 }}>
              Jackets, gloves, boots and utility belts inspired by the Dark Knight.
            </p>
          </Link>
      
          <Link href="/collections/spiderman" className="card">
            <h3>Spider-Man Outfits</h3>
            <p style={{ opacity: 0.7 }}>
              Hoodies, masks and shoes inspired by Spider-Man movies.
            </p>
          </Link>
        </div>
      </section>
      <section
        style={{
          padding: "50px 20px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Start Building Your Iconic Look Today
        </h2>
      
        <p style={{ opacity: 0.7, marginBottom: "30px" }}>
          Browse our collections and discover the best budget and premium alternatives
          to your favorite movie outfits.
        </p>
      
        <Link
          href="/collections/batman"
          className="button"
          style={{ maxWidth: "260px", margin: "0 auto" }}
        >
          View All Collections
        </Link>
      </section>
    </main>
  );
}
