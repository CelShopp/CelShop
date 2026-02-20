import Link from "next/link";
import { products } from "../../../lib/products";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Buy Online`,
    description: `Buy ${product.name} online at best price. Find budget and premium alternatives.`,
    alternates: {
      canonical: `https://cel-shop-alpha.vercel.app/products/${slug}`,
    },
  };
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) return <div>Not found</div>;

  return (
    <main style={{ paddingBottom: "120px" }}>
      <Link href={`/collections/${product.collection}`}>
        Back to {product.collection} Collection
      </Link>


      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: product.image,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: product.price.replace("₹", ""),
        availability: "https://schema.org/InStock",
        url: product.buyLink,
      },
    }),
  }}
/>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px"
  }}
>

  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      margin: "0 auto"
    }}
  />

  <div
    style={{
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    <p style={{ fontSize: "14px", color: "gray" }}>
⭐ Trusted by 1000+ fans for movie-accurate outfits
    </p>
    <h2>{product.name}</h2>

    <p style={{ fontSize: "22px", fontWeight: "bold" }}>
      {product.price}
    </p>

    <a
      href={product.buyLink}
      target="_blank"
      rel="nofollow sponsored"
      style={{
        display: "block",
        marginTop: "10px",
        padding: "14px",
        background: "white",
        color: "black",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold"
      }}
    >
      Check Price on Amazon
    </a>
  </div>

</div>

<h2>Budget & Premium Alternatives</h2>
       <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    marginTop: "10px"
  }}
>
{product.alternatives.map((alt, i) => (
  <div
    key={i}
    style={{
      border: i === 0 ? "2px solid gold" : "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "10px",
      position: "relative"
    }}
  >
    {i === 0 && (
      <span
        style={{
          position: "absolute",
          top: "-10px",
          left: "10px",
          background: "gold",
          padding: "2px 8px",
          fontSize: "12px",
          borderRadius: "5px"
        }}
      >
        Best Budget Pick
      </span>
    )}

    <h3>{alt.name}</h3>
    <p>{alt.price}</p>
    <a href={alt.link}>Check</a>
  </div>
))}
</div>
<div
  style={{
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    background: "#fff",
    borderTop: "1px solid #ddd",
    padding: "10px",
    zIndex: "9999"
  }}
>
  <a
    href={product.buyLink}
    target="_blank"
    rel="nofollow sponsored"
    style={{
      display: "block",
      textAlign: "center",
      padding: "14px",
      background: "black",
      color: "white",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold"
    }}
  >
    Check Price on Amazon
  </a>
</div>
</main>
);
}

    