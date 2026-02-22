'use client';
import Link from "next/link";
import { products } from "../lib/products";
import { Button } from "./components/button";
import { Card, CardContent } from "./components/card";
import { Badge } from "./components/badge";
import { ArrowRight, Star, TrendingUp, ShoppingBag } from "lucide-react";

export default function HomePage() {
  // Select a hero product (e.g., the first one)
  const heroProduct = products[0];
  const trendingProducts = products.slice(1, 6);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section - Editorial Split Layout */}
      <section className="relative bg-white overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[85vh]">
            {/* Text Content */}
            <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-0 order-2 lg:order-1">
              <Badge className="w-fit mb-6 bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200 transition-colors">
                <TrendingUp className="w-3 h-3 mr-1" /> This Month's Top Pick
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 mb-6 leading-[1.1]">
                Screen Accurate <br />
                <span className="text-stone-500 italic font-serif">Style.</span>
              </h1>
              <p className="text-xl text-stone-600 mb-8 max-w-lg leading-relaxed">
                Discover the exact jackets, suits, and accessories worn by your favorite characters. 
                Curated from the best budget and premium sources.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 text-base rounded-full bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href={`/products/${heroProduct.slug}`}>
                    Shop {heroProduct.name.split(' ').slice(0, 2).join(' ')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-stone-300 hover:bg-stone-50" asChild>
                  <Link href="/collections">View All Collections</Link>
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="mt-12 flex items-center gap-4 text-sm text-stone-500">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white"></div>
                   ))}
                </div>
                <p>Trusted by 1,000+ movie fans</p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-2 bg-stone-100">
              <div className="absolute inset-0 bg-stone-200/50">
                <img 
                  src={heroProduct.image} 
                  alt={heroProduct.name}
                  className="w-full h-full object-cover object-top mix-blend-multiply opacity-90"
                />
              </div>
              {/* Floating Price Tag */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-stone-100 animate-bounce" style={{ animationDuration: '3s' }}>
                 <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Starting at</p>
                 <p className="text-2xl font-bold text-stone-900">{heroProduct.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Intro - "The Edit" */}
      <section className="py-20 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-stone-900 mb-6">The Celebrity Edit</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            We bridge the gap between the screen and your wardrobe. Our team of fashion enthusiasts 
            tracks down the exact items from blockbuster movies and TV shows, offering you direct 
            links to buy the look—whether you're looking for a high-end replica or a smart budget alternative.
          </p>
        </div>
      </section>

      {/* Trending Grid - Asymmetrical Layout */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">Trending Now</h2>
              <p className="text-stone-500">The most sought-after looks this week.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-stone-600 hover:text-stone-900" asChild>
              <Link href="/collections">View All <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Large Featured Card */}
            <div className="md:col-span-2 lg:row-span-2 group">
              <Card className="h-full border-0 shadow-sm overflow-hidden relative bg-stone-100 rounded-2xl">
                <div className="absolute inset-0">
                  <img 
                    src={trendingProducts[0]?.image || heroProduct.image} 
                    alt="Featured" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <CardContent className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <Badge className="mb-3 bg-white text-black hover:bg-white/90 border-0">Editor's Choice</Badge>
                  <h3 className="text-3xl font-bold mb-2">{trendingProducts[0]?.name || "Featured Look"}</h3>
                  <p className="text-white/80 mb-6 line-clamp-2 max-w-md">
                    {trendingProducts[0]?.description || "The iconic jacket that defined the movie."}
                  </p>
                  <Button size="lg" className="bg-white text-black hover:bg-stone-100 rounded-full shadow-lg" asChild>
                    <Link href={`/products/${trendingProducts[0]?.slug || heroProduct.slug}`}>
                      Shop Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Standard Cards */}
            {trendingProducts.slice(1).map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                <Card className="h-full border-stone-100 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl bg-white">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-stone-100">
                      {product.price}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-stone-900 mb-1 group-hover:text-stone-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-xs text-stone-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                      <span>4.9</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{product.collection}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Row - Dark Contrast */}
      <section className="py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">Shop By Character</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['batman', 'spiderman', 'joker'].map((col) => (
              <Link 
                key={col} 
                href={`/collections/${col}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-800"
              >
                <div className="absolute inset-0 bg-stone-800">
                   {/* Gradient placeholder for collection image */}
                   <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900 group-hover:scale-105 transition-transform duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2 capitalize tracking-wide">{col}</h3>
                  <p className="text-stone-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore Collection
                  </p>
                  <div className="w-10 h-10 rounded-full bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-75">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-stone-600" />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Join the Inner Circle</h2>
          <p className="text-stone-600 mb-8">
            Get notified when we find new movie outfits. No spam, just style.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white text-stone-900 placeholder:text-stone-400"
            />
            <Button className="bg-stone-900 hover:bg-stone-800 rounded-xl h-12 px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};
