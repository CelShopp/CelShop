'use client';

import { products } from "../../lib/products";

export default function CollectionsPage() {
  const placeholderImages = [
    "https://via.placeholder.com/300x400?text=Collection+1",
    "https://via.placeholder.com/300x400?text=Collection+2",
    "https://via.placeholder.com/300x400?text=Collection+3",
    "https://via.placeholder.com/300x400?text=Collection+4",
    "https://via.placeholder.com/300x400?text=Collection+5",
    "https://via.placeholder.com/300x400?text=Collection+6",
    "https://via.placeholder.com/300x400?text=Collection+7",
    "https://via.placeholder.com/300x400?text=Collection+8",
  ];

  const newestProducts = [...products].slice(0, 12);
  const recommendedProducts = [...products].slice(12, 24); // Example

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 md:px-12 font-sans">
      {/* Header & Search */}
      <header className="max-w-7xl mx-auto py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Collections</h1>
        <p className="text-gray-600 mb-6">Discover curated collections inspired by your favorite movies and TV shows.</p>
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <label htmlFor="search" className="sr-only">Search collections and products</label>
          <input
            type="text"
            id="search"
            placeholder="Search collections or products..."
            aria-label="Search collections or products"
            className="w-full p-3 rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </header>

      {/* Collections Thumbnails */}
      <section aria-label="Collections Thumbnails" className="max-w-7xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {placeholderImages.map((src, index) => (
          <div
            key={index}
            className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Collection ${index + 1}`}
            title={`Collection ${index + 1}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { /* handle click if needed */ } }}
            onClick={() => { /* handle navigation or modal if needed */ }}
          >
            <img src={src} alt={`Collection ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </section>

      {/* New on Site */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-semibold mb-4">New on Site</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newestProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              tabIndex={0}
            >
              <div className="aspect-[4/5] bg-gray-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-stone-900 font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-stone-600 text-xs mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              tabIndex={0}
            >
              <div className="aspect-[4/5] bg-gray-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-stone-900 font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-stone-600 text-xs mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-300 text-center text-sm text-stone-500">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        {/* Placeholder for settings and account links */}
        <div className="mt-4 flex justify-center space-x-4 text-blue-600 text-sm">
          <a href="#settings" className="hover:underline">Settings</a>
          <a href="#wishlist" className="hover:underline">My Wishlist</a>
        </div>
      </footer>
    </div>
  );
}