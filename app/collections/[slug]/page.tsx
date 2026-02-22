import { Metadata } from "next";
import Link from "next/link";
import { products } from "../../../lib/products";
import { Button } from "../../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { Badge } from "../../components/badge";
import { ArrowRight, BookOpen, FileText, Scale } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} Collection | CelebStore`,
    description: `Shop ${formattedTitle} inspired outfits from popular movies. Find jackets, gloves, masks and more with budget and premium alternatives.`,
    alternates: {
      canonical: `https://cel-shop-alpha.vercel.app/collections/${slug}`,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const filtered = products.filter(
    (product) => product.collection === slug
  );

  // Format the slug for display (e.g., "batman" -> "Batman")
  const collectionName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-stone-50 pb-24">
      {/* Hero Section */}
      <section className="bg-white border-b border-stone-200 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors"
            >
              <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              {collectionName} Collection
            </h1>
            
            <p className="text-xl text-stone-600 leading-relaxed max-w-2xl">
              Shop outfits inspired by {collectionName} from popular movies. 
              Find jackets, gloves, masks, and more with budget and premium 
              alternatives to match iconic looks.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <Badge variant="secondary" className="bg-stone-100 text-stone-700 border-stone-200 px-3 py-1">
                {filtered.length} Products Found
              </Badge>
              <Badge variant="outline" className="border-stone-300 text-stone-600">
                Updated Daily
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Guides / Resources Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-stone-100/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Essential Guides & Comparisons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href={`/blog/${slug}-outfit-guide`} className="group">
              <Card className="bg-white border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-stone-900 transition-colors">
                    <FileText className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-lg">Complete Outfit Guide</CardTitle>
                  <CardDescription>
                    Learn how to style the full {collectionName} look from head to toe.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span className="text-sm font-semibold text-stone-900 group-hover:underline flex items-center">
                    Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href={`/blog/${slug}-costume-guide`} className="group">
              <Card className="bg-white border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-stone-900 transition-colors">
                    <Scale className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-lg">Costume Breakdown</CardTitle>
                  <CardDescription>
                    A detailed analysis of every piece worn in the movie.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span className="text-sm font-semibold text-stone-900 group-hover:underline flex items-center">
                    View Breakdown <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>

            <Link href={`/blog/best-${slug}-jacket-vs-budget`} className="group">
              <Card className="bg-white border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-stone-900 transition-colors">
                    <Badge className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-lg">Budget vs Premium</CardTitle>
                  <CardDescription>
                    We compare the authentic movie jacket with affordable dupes.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span className="text-sm font-semibold text-stone-900 group-hover:underline flex items-center">
                    See Comparison <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 rounded-full mb-4">
                <FileText className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">No products found</h3>
              <p className="text-stone-600">
                We haven't added any products to this collection yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <Card className="h-full border-stone-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>

                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-stone-900 text-lg leading-tight group-hover:text-stone-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                        <span className="font-bold text-stone-900 text-lg">
                          {product.price}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-stone-600 hover:text-stone-900 hover:bg-stone-100 h-8 px-3 rounded-full"
                        >
                          View
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}