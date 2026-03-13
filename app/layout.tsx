import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "FilmyFits — Dress Like the Screen",
    description: "Screen-accurate film outfits. Shop YJHD, John Wick, Batman & more.",
  },
  robots: {
    index: true,
    follow: true,
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
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "Customer Service"
              }
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
      </body>
    </html>
  );
}