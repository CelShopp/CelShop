import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://filmyfits.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/collections",
    "/actors",
    "/products",
    "/lookbook",
    "/affiliate-disclosure",
    "/privacy",
    "/refund-policy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  try {
    const [products, actors, collections] = await Promise.all([
      prisma.product.findMany({
        select: { slug: true, createdAt: true },
      }),
      prisma.actor.findMany({
        select: { slug: true, updatedAt: true },
      }),
      prisma.collection.findMany({
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: p.createdAt,
    }));

    const actorEntries: MetadataRoute.Sitemap = actors.map((a) => ({
      url: `${baseUrl}/actors/${a.slug}`,
      lastModified: a.updatedAt,
    }));

    const collectionEntries: MetadataRoute.Sitemap = collections.map((c) => ({
      url: `${baseUrl}/collections/${c.slug}`,
      lastModified: c.updatedAt,
    }));

    return [...staticEntries, ...collectionEntries, ...actorEntries, ...productEntries];
  } catch {
    return staticEntries;
  }

}
