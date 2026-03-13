export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://filmyfits.vercel.app/sitemap.xml",
  };
}