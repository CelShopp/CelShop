import { Metadata } from "next";
import { products } from "../../../lib/products";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} Movie Outfits Collection`,
    description: `Shop ${slug} inspired outfits from movies including jackets, gloves, masks and more.`,
    alternates: {
      canonical: `https://cel-shop-alpha.vercel.app/collections/${slug}`,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filtered = products.filter(
    (product) => product.collection === slug
  );

  return (
    <main>
      <h1>{slug} Collection</h1>
      <p>
      Shop outfits inspired by {slug} from popular movies. Find jackets, gloves, masks and more
      with budget and premium alternatives to match iconic looks.
      </p>
<h2>Guides</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "10px"
  }}
>
  <Link
    href={`/blog/${slug}-outfit-guide`}
    style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    Outfit Guide
  </Link>

  <Link
    href={`/blog/${slug}-costume-guide`}
    style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    Costume Guide
  </Link>

  <Link
    href={`/blog/best-${slug}-jacket-vs-budget`}
    style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center"
    }}
  >
    Jacket Comparison
  </Link>
</div>



<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginTop: "20px"
  }}
>
  {filtered.map((product, i) => (
<div key={i} className="card">
<img
  src={product.image}
  alt={product.name}
  style={{
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px"
  }}
/>

      <h2>{product.name}</h2>
      <p>{product.price}</p>
      
<Link
  href={`/products/${product.slug}`}
  className="button"
>
  View Product
</Link>
    </div>
  ))}
</div>

      
    </main>
  );
}
