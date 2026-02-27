import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://filmyfits.vercel.app'

  const products = await prisma.product.findMany({
    select: {
      id: true,
      createdAt: true,
    },
  })

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.createdAt,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...productUrls,
  ]
}