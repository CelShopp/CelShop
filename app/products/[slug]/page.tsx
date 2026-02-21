import Link from "next/link";
import { products } from "../../../lib/products";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Star, ShoppingCart, Check, Award } from "lucide-react";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | CelebStore`,
    description: `Buy ${product.name} online at best price. Find budget and premium alternatives.`,
    alternates: {
      canonical: `https://cel-shop-alpha.vercel.app/products/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return <div>Not found</div>;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Link
              href={`/collections/${product.collection}`}
              className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {product.collection}
            </Link>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.image,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price.replace("₹", "").trim(),
              availability: "https://schema.org/InStock",
              url: product.buyLink,
            },
          }),
        }}
      />

      {/* Product Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Trust Badge */}
              <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm font-semibold">Verified Quality</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8 pt-4">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold ml-1">4.9</span>
                  </div>
                  <span className="text-sm text-stone-500">1,200+ verified purchases</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-stone-600 mt-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-stone-900">
                  {product.price}
                </span>
                <span className="text-lg text-stone-400 line-through">
                  ₹{parseInt(product.price.replace("₹", "").replace(",", "")) * 1.3}
                </span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Save 30%
                </span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Movie-accurate design",
                  "Premium fabric quality",
                  "Free shipping",
                  "Easy returns",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-stone-700">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={product.buyLink}
                target="_blank"
                rel="nofollow sponsored"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-stone-900 text-white font-semibold rounded-2xl hover:bg-stone-800 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200 hover:-translate-y-1"
              >
                <ShoppingCart className="w-5 h-5 mr-3" />
                Check Price on Amazon
              </a>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 border-t border-stone-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-stone-900">1000+</p>
                  <p className="text-sm text-stone-500">Happy Fans</p>
                </div>
                <div className="w-px h-12 bg-stone-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-stone-900">4.9★</p>
                  <p className="text-sm text-stone-500">Avg Rating</p>
                </div>
                <div className="w-px h-12 bg-stone-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-stone-900">24hr</p>
                  <p className="text-sm text-stone-500">Dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternatives Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Budget & Premium Alternatives
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Compare options and find the perfect fit for your budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {product.alternatives.map((alt, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-3xl p-8 shadow-lg shadow-stone-200/50 hover:shadow-xl hover:shadow-stone-200 transition-all duration-300 hover:-translate-y-1 ${
                  i === 0 ? "ring-2 ring-emerald-500 ring-offset-4" : ""
                }`}
              >
                {/* Badge */}
                <div
                  className={`absolute -top-3 left-8 px-4 py-1 rounded-full text-sm font-semibold ${
                    i === 0
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {i === 0 ? "⚡ Best Budget Pick" : "✨ Premium Choice"}
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {alt.name}
                  </h3>
                  <p className="text-3xl font-bold text-stone-900 mb-6">
                    {alt.price}
                  </p>
                  <a
                    href={alt.link}
                    target="_blank"
                    rel="nofollow sponsored"
                    className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      i === 0
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    }`}
                  >
                    {i === 0 ? "View Budget Option" : "View Premium Option"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-stone-200 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm text-stone-500">{product.name}</p>
            <p className="text-xl font-bold text-stone-900">{product.price}</p>
          </div>
          <a
            href={product.buyLink}
            target="_blank"
            rel="nofollow sponsored"
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Now
          </a>
        </div>
      </div>

      {/* Spacer for sticky CTA */}
      <div className="h-24" />
    </main>
  );
}