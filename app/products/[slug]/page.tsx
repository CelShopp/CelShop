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
      canonical: `https://yourdomain.com/products/${slug}`,
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
    <main>
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
      <img src={product.image} alt={product.name} />
      <p>{product.price}</p>

      <a href={product.buyLink} target="_blank" rel="nofollow sponsored">
        Buy Now
      </a>

      <h2>Alternatives</h2>
      {product.alternatives.map((alt, i) => (
        <div key={i}>
          <h3>{alt.name}</h3>
          <p>{alt.price}</p>
          <a href={alt.link}>Check</a>
        </div>
      ))}
    </main>
    
  );
}
