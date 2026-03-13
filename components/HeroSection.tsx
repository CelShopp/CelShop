import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import HeroSectionClient, { type HeroMovie } from "@/components/HeroSectionClient";

const getHeroMovies = unstable_cache(
  async (): Promise<HeroMovie[]> => {
    const heroItems = await prisma.heroItem.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, movieName: true, image: true, ctaLink: true },
    });

    if (heroItems.length > 0) return heroItems;

    return [
      {
        id: "default",
        title: "Iconic outfits from iconic films",
        movieName: "Yeh Jawaani Hai Deewani",
        image: "/YehJawaaniHaiDeewani.png",
        ctaLink: "/collections",
      },
    ];
  },
  ["home-hero-movies"],
  { revalidate: 60 },
);

export default async function HeroSection() {
  const movies = await getHeroMovies();
  return <HeroSectionClient initialMovies={movies} />;
}

