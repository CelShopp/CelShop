import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Badge } from "@/components/Badge";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} Collection | FilmyFits`,
    description: `Shop ${formattedTitle} inspired outfits from popular movies. Find jackets, gloves, masks and more with budget and premium alternatives.`,
    alternates: {
      canonical: `https://filmyfits.vercel.app/collections/${slug}`,
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    return <div>Slug not found</div>;
  }

  const collectionName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const filtered = await prisma.product.findMany({
    where: {
      collection: slug,
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          <Link
            href="/"
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{collectionName} Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
              Shop outfits inspired by {collectionName} from popular movies. Find jackets, gloves, masks, and more
              with budget and premium alternatives to match iconic looks.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200 px-4 py-1">
                {filtered.length} Products Found
              </Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-600 px-4 py-1">
                Updated Daily
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - Show filtered results */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <CardDescription className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">No products found</h3>
              <p className="text-gray-600">We haven't added any products to this collection yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product: any) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transition duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
                  </div>
                  {/* Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      <Button size="sm" variant="ghost" className="px-3 py-1 rounded-full hover:bg-gray-200">
                        View <ArrowLeft className="w-4 h-4 ml-1 transform rotate-180" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}