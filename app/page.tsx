import { Metadata } from "next";
import Link from "next/link";

/**
 * SEO Metadata Configuration
 * These meta tags help search engines understand and index the page content
 * - title: Appears in browser tabs and search results (keep under 60 chars)
 * - description: Shown in search result snippets (keep under 160 chars)
 * - keywords: Helps with search engine ranking (optional but useful)
 * - openGraph: Social media sharing previews
 * - robots: Controls search engine crawling behavior
 */
export const metadata: Metadata = {
  title: "Celebrity Clothes Store | Shop Movie Outfits & Celebrity Inspired Clothing",
  description:
    "Find authentic celebrity outfits and movie-inspired clothing. Shop budget-friendly and premium alternatives to iconic looks from Batman, Spider-Man, and your favorite celebrities. Free shipping on orders over $50.",
  keywords: [
    "celebrity clothes",
    "movie outfits",
    "celebrity inspired clothing",
    "batman outfits",
    "spiderman outfits",
    "celebrity fashion",
    "movie costume replicas",
    "celebrity style",
  ],
  openGraph: {
    title: "Celebrity Clothes Store | Shop Movie Outfits & Celebrity Inspired Clothing",
    description: "Find authentic celebrity outfits and movie-inspired clothing. Shop budget-friendly and premium alternatives.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Home Page Component
 * Main landing page for the celebrity clothes affiliate website
 * Modern design with visual hierarchy, gradients, and engaging layouts
 */
export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* 
        Hero Section - Modern gradient background with engaging layout
        - Uses h1 for main heading (critical for SEO)
        - Left-aligned text for modern feel (not everything centered)
        - Gradient background for visual interest
        - Prominent call-to-action button
        - Responsive padding and typography using clamp() for fluid scaling
      */}
      <section
        className="w-full relative overflow-hidden"
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #fbfaf0 0%, #f5f3e8 50%, #f0ede0 100%)",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* Hero Content - Left aligned for modern look */}
          <div style={{ maxWidth: "700px" }}>
            <h1
              className="font-bold mb-6"
              style={{
                fontSize: "clamp(32px, 7vw, 64px)",
                lineHeight: "1.1",
                color: "#111",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              Dress Like Your Favorite{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #111 0%, #444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Celebrities & Movie Characters
              </span>
            </h1>

            <p
              className="mb-8"
              style={{
                fontSize: "clamp(18px, 4vw, 22px)",
                opacity: 0.8,
                lineHeight: "1.7",
                color: "#333",
                marginBottom: "32px",
                maxWidth: "600px",
              }}
            >
              We break down iconic celebrity outfits and movie looks piece by piece,
              showing you the best budget-friendly and premium alternatives to recreate
              your favorite styles.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/collections/batman"
                className="button"
                style={{
                  padding: "16px 32px",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
                aria-label="Explore our celebrity outfit collections"
              >
                Explore Collections
              </Link>
              <Link
                href="/blog/batman-outfit-guide"
                className="button-outline"
                style={{
                  padding: "16px 32px",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
                aria-label="View outfit guides"
              >
                View Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        Trust & Value Proposition Section
        Builds credibility and explains what makes the site unique
        - Uses h2 for section heading (SEO hierarchy: h1 > h2 > h3)
        - Highlights key benefits with modern card design
        - Responsive grid layout for features
        - Left-aligned heading for modern feel
      */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-24"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "60px" }}>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "700",
              color: "#111",
              marginBottom: "16px",
              maxWidth: "600px",
            }}
          >
            Trusted Celebrity Outfit Breakdowns
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 3vw, 19px)",
              opacity: 0.7,
              maxWidth: "700px",
              lineHeight: "1.7",
              color: "#333",
            }}
          >
            We analyze iconic celebrity outfits and movie looks piece by piece,
            comparing real-world options from budget alternatives to premium replicas.
            Every item is carefully researched and verified.
          </p>
        </div>

        {/* 
          Feature Grid - Highlights key benefits with modern card design
          - Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
          - Each feature card uses semantic HTML
          - Modern card styling with hover effects
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            marginTop: "40px",
          }}
        >
          <div
            className="card"
            style={{
              padding: "32px 24px",
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #111 0%, #333 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                fontSize: "24px",
              }}
            >
              📋
            </div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#111",
                marginBottom: "12px",
              }}
            >
              Detailed Breakdowns
            </h3>
            <p
              style={{
                fontSize: "16px",
                opacity: 0.7,
                lineHeight: "1.6",
                color: "#333",
              }}
            >
              Every outfit is analyzed piece by piece with detailed descriptions
              and styling tips.
            </p>
          </div>

          <div
            className="card"
            style={{
              padding: "32px 24px",
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #111 0%, #333 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                fontSize: "24px",
              }}
            >
              💰
            </div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#111",
                marginBottom: "12px",
              }}
            >
              Budget & Premium Options
            </h3>
            <p
              style={{
                fontSize: "16px",
                opacity: 0.7,
                lineHeight: "1.6",
                color: "#333",
              }}
            >
              Find options for every budget, from affordable alternatives to
              high-end replicas.
            </p>
          </div>

          <div
            className="card"
            style={{
              padding: "32px 24px",
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #111 0%, #333 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                fontSize: "24px",
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#111",
                marginBottom: "12px",
              }}
            >
              Verified Products
            </h3>
            <p
              style={{
                fontSize: "16px",
                opacity: 0.7,
                lineHeight: "1.6",
                color: "#333",
              }}
            >
              All products are carefully researched and verified for quality and
              authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* 
        Featured Collections Section
        Showcases main product categories with modern card design
        - Uses h2 for section heading
        - Responsive grid layout
        - Each collection card is a clickable link (good for SEO)
        - Cards use semantic article tags for better structure
        - Modern card design with hover effects
      */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-24"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(180deg, #fbfaf0 0%, #ffffff 100%)",
          borderRadius: "24px",
          padding: "60px 24px",
        }}
      >
        <div style={{ marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "700",
              color: "#111",
              marginBottom: "16px",
              maxWidth: "600px",
            }}
          >
            Featured Celebrity Collections
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 3vw, 19px)",
              opacity: 0.7,
              maxWidth: "600px",
              lineHeight: "1.7",
              color: "#333",
            }}
          >
            Explore our curated collections of iconic celebrity and movie-inspired outfits.
          </p>
        </div>

        {/* 
          Collections Grid
          - Responsive: 1 column on mobile (<640px)
          - 2 columns on tablet (640px-1024px)
          - 3 columns on desktop (>1024px)
          - Gap spacing adjusts for different screen sizes
          - Modern card design with better visual hierarchy
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Batman Collection Card */}
          <Link
            href="/collections/batman"
            className="card block"
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              padding: "0",
              overflow: "hidden",
            }}
            aria-label="View Batman outfit collection"
          >
            <div
              style={{
                height: "200px",
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "64px",
              }}
            >
              🦇
            </div>
            <article style={{ padding: "24px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Batman Outfits
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  opacity: 0.7,
                  lineHeight: "1.6",
                  marginBottom: "16px",
                  color: "#333",
                }}
              >
                Jackets, gloves, boots, and utility belts inspired by the Dark
                Knight. Recreate iconic looks from all Batman movies.
              </p>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#111",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Shop Now →
              </span>
            </article>
          </Link>

          {/* Spider-Man Collection Card */}
          <Link
            href="/collections/spiderman"
            className="card block"
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              padding: "0",
              overflow: "hidden",
            }}
            aria-label="View Spider-Man outfit collection"
          >
            <div
              style={{
                height: "200px",
                background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "64px",
              }}
            >
              🕷️
            </div>
            <article style={{ padding: "24px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Spider-Man Outfits
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  opacity: 0.7,
                  lineHeight: "1.6",
                  marginBottom: "16px",
                  color: "#333",
                }}
              >
                Hoodies, masks, shoes, and accessories inspired by Spider-Man
                movies. Perfect for cosplay or casual wear.
              </p>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#111",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Shop Now →
              </span>
            </article>
          </Link>

          {/* More Collections Coming Soon Card */}
          <div
            className="card"
            style={{
              background: "#fff",
              border: "2px dashed rgba(0,0,0,0.15)",
              padding: "24px",
              opacity: 0.9,
            }}
          >
            <div
              style={{
                height: "200px",
                background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                marginBottom: "24px",
              }}
            >
              ✨
            </div>
            <article>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                More Collections Coming Soon
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  opacity: 0.7,
                  lineHeight: "1.6",
                  color: "#333",
                }}
              >
                We're constantly adding new celebrity and movie-inspired
                collections. Check back soon for more iconic looks!
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 
        Call-to-Action Section
        Final push to convert visitors into customers
        - Modern gradient background
        - Clear, action-oriented heading
        - Reinforces value proposition
        - Prominent CTA button
        - Optimized for conversion
      */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-20 md:py-28"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #111 0%, #2d2d2d 100%)",
          borderRadius: "24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Start Building Your Iconic Look Today
        </h2>

        <p
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            opacity: 0.9,
            lineHeight: "1.7",
            maxWidth: "600px",
            margin: "0 auto 32px",
            color: "#fff",
          }}
        >
          Browse our collections and discover the best budget and premium
          alternatives to your favorite celebrity and movie outfits. Free
          shipping on orders over $50.
        </p>

        <Link
          href="/collections/batman"
          className="button button-white"
          style={{
            padding: "16px 40px",
            fontSize: "17px",
            fontWeight: "600",
            display: "inline-block",
            maxWidth: "300px",
            width: "100%",
          }}
          aria-label="View all celebrity outfit collections"
        >
          View All Collections
        </Link>
      </section>
    </main>
  );
}
