const baseUrl = "https://yourdomain.com";

import { products } from "../lib/products";

export default function sitemap() {
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  const collectionUrls = products.map((product) => ({
    url: `${baseUrl}/collections/${product.collection}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    ...productUrls,
    ...collectionUrls,
  ];
}
