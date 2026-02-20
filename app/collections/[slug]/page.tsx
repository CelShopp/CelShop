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


      {filtered.map((product, i) => (
        <div key={i}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>

          <Link href={`/products/${product.slug}`}>
            View Product
          </Link>
        </div>
      ))}
    </main>
  );
}
