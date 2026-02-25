import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type SearchResult = {
  id: string;
  type: "product" | "collection" | "movie" | "actor";
  title: string;
  subtitle: string;
  href: string;
  image: string | null;
  price: number | null;
  tags: string[];
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((token) => token.length > 1);

const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawQuery = searchParams.get("q") ?? "";
  const query = normalize(rawQuery);

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const queryTokens = tokenize(query);

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 80,
  });

  const matchedProducts = products.filter((product) => {
    const source = [
      product.name,
      product.collection,
      product.movie ?? "",
      product.actorName ?? "",
      product.description,
      product.slug,
    ].join(" ");

    const searchable = normalize(source);
    const searchableTokens = tokenize(searchable);

    const exactMatch = searchable.includes(query);
    const tokenMatch = queryTokens.some((token) =>
      searchableTokens.some((candidate) => candidate.includes(token) || token.includes(candidate))
    );

    return exactMatch || tokenMatch;
  });

  const results: SearchResult[] = [];

  matchedProducts.forEach((product) => {
    const tags = unique(
      [product.collection, product.movie ?? "", product.actorName ?? "", product.name]
        .flatMap((item) => tokenize(item))
        .filter(Boolean)
    );

    results.push({
      id: product.id,
      type: "product",
      title: product.name,
      subtitle: `${product.movie || product.collection}${product.actorName ? ` • ${product.actorName}` : ""}`,
      href: `/products/${product.slug}`,
      image: product.image,
      price: product.price,
      tags,
    });
  });

  const matchedCollectionSlugs = unique(matchedProducts.map((p) => p.collection));
  matchedCollectionSlugs.forEach((slug) => {
    const linked = matchedProducts.find((p) => p.collection === slug);
    const title = slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    results.push({
      id: `collection-${slug}`,
      type: "collection",
      title,
      subtitle: "Collection",
      href: `/collections/${slug}`,
      image: linked?.image ?? null,
      price: null,
      tags: tokenize(`${slug} ${title}`),
    });
  });

  const matchedMovies = unique(matchedProducts.map((p) => p.movie).filter((movie): movie is string => Boolean(movie)));
  matchedMovies.forEach((movie) => {
    const linked = matchedProducts.find((p) => p.movie === movie);
    const movieSlug = movie.toLowerCase().replace(/\s+/g, "-");
    results.push({
      id: `movie-${movieSlug}`,
      type: "movie",
      title: movie,
      subtitle: "Movie Tag",
      href: linked ? `/collections/${linked.collection}` : "/collections",
      image: linked?.image ?? null,
      price: null,
      tags: tokenize(movie),
    });
  });

  const matchedActors = unique(
    matchedProducts.map((p) => p.actorName).filter((actor): actor is string => Boolean(actor))
  );
  matchedActors.forEach((actor) => {
    const linked = matchedProducts.find((p) => p.actorName === actor);
    const actorSlug = actor.toLowerCase().replace(/\s+/g, "-");
    results.push({
      id: `actor-${actorSlug}`,
      type: "actor",
      title: actor,
      subtitle: "Actor Tag",
      href: linked ? `/collections/${linked.collection}` : "/collections",
      image: linked?.image ?? null,
      price: null,
      tags: tokenize(actor),
    });
  });

  const deduped = unique(results.map((result) => `${result.type}:${result.title.toLowerCase()}`))
    .map((key) => results.find((result) => `${result.type}:${result.title.toLowerCase()}` === key))
    .filter((result): result is SearchResult => Boolean(result));

  return NextResponse.json(deduped.slice(0, 12));
}
