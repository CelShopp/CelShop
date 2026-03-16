import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: [
    {
      path: "../public/fonts/geist-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-latin-ext.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: [
    {
      path: "../public/fonts/geist-mono-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-mono-latin-ext.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://filmyfits.vercel.app"),
  title: {
    default: "FilmyFits — Shop Iconic Bollywood & Hollywood Outfits",
    template: "%s | FilmyFits",
  },
  description:
    "Shop screen-accurate outfits from your favourite Bollywood and Hollywood films. Yeh Jawaani Hai Deewani, John Wick, Batman & more. Curated affiliate links to trusted retailers.",
  keywords: [
    "bollywood outfits",
    "hollywood movie clothes",
    "film fashion",
    "screen accurate outfits",
    "Yeh Jawaani Hai Deewani jacket",
    "Ranbir Kapoor style",
    "John Wick suit",
    "movie inspired clothing India",
    "filmyfits",
  ],
  openGraph: {
    title: "FilmyFits — Dress Like the Screen",
    description:
      "Shop screen-accurate outfits from iconic Bollywood & Hollywood films.",
    url: "https://filmyfits.vercel.app",
    siteName: "FilmyFits",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FilmyFits — Dress Like the Screen",
    description: "Screen-accurate film outfits. Shop YJHD, John Wick, Batman & more.",
    site: "@FilmyFits",
    creator: "@FilmyFits",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://filmyfits.vercel.app",
  },
  verification: {
    google: "POHSrNwaNDYHk6krd0lOC5jY7qj5k5NVJHZQUwAzu4w",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://filmyfits.vercel.app",
              "logo": "https://filmyfits.vercel.app/logo.png",
              "name": "FilmyFits",
              "sameAs": [
                "https://in.pinterest.com/filmyfits/",
                "https://x.com/FilmyFits"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-900 flex flex-col min-h-screen`}
      >
        <Header/>
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
