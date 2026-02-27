import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://filmyfits.vercel.app";

  const pages = [
    "",
    "/collections",
    "/products",

    "/collections/yeh-jawaani-hai-deewani",
    "/collections/pants",
    "/collections/ranbir-kapoor",
    "/collections/shirts",
    "/collections/jackets",

    "/products/ranbir-kapoor-cargo-pants",
    "/products/ranbir-kapoor-checked-shirt",
    "/products/ranbir-kapoor-jacket",
    "/products/ranbir-kapoor-brown-jacket",
  ];

  return pages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}