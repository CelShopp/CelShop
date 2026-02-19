import { products } from "../../../lib/products";
import Link from "next/link";

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
