import React from "react";
import HeroSection from "@/components/HeroSection";
import LookbookSection from "@/components/LookbookSection";
import CtaSection from "@/components/CtaSection";
import NewestProducts from "@/components/NewestProducts";
import { Plus, Package, Database, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <main className="flex-grow">
        {/* Full width Hero Section */}
        <section className="w-full">
          <HeroSection />
        </section>

        {/* Cinematic Marquee */}
        <div className="bg-stone-900 overflow-hidden py-10 border-y border-stone-800">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                <span className="text-4xl md:text-6xl font-black text-transparent stroke-white stroke-1 opacity-20 uppercase tracking-tighter">Iconic Style</span>
                <Sparkles className="text-orange-600 opacity-40" size={32} />
                <span className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-tighter italic">Screen Accurate</span>
                <span className="text-4xl md:text-6xl font-black text-orange-600 opacity-20 uppercase tracking-tighter">Archives</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newest Products Section */}
        <div className="w-full">
          <NewestProducts />
        </div>

        {/* Lookbook Section */}
        <div className="w-full border-y border-stone-200 bg-white">
          <LookbookSection />
        </div>

        {/* CTA Section */}
        <div className="w-full">
          <CtaSection />
        </div>
      </main>

      <footer className="bg-stone-950 text-stone-400 py-24 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="text-3xl font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-2">
              <span className="text-orange-600 italic">Filmy</span>Fits
            </div>
            <p className="mb-8 max-w-sm opacity-60 text-lg leading-relaxed font-medium">
              We bridge the gap between cinema and reality. Curating the most iconic outfits from film history for the modern enthusiast.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Archives</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="/collections/batman" className="hover:text-orange-500 transition-colors">The Gotham Files</Link></li>
              <li><Link href="/collections/john-wick" className="hover:text-orange-500 transition-colors">The Continental</Link></li>
              <li><Link href="/collections/spiderman" className="hover:text-orange-500 transition-colors">Queens Collection</Link></li>
              <li><Link href="/collections" className="hover:text-orange-500 transition-colors">All Collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Resources</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="/admin/add" className="hover:text-orange-500 transition-colors">Archivist Access</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Sourcing Guide</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-xs font-bold uppercase tracking-[0.2em]">
          <span>© 2025 FilmyFits Archive. All rights reserved.</span>
          <div className="flex gap-8">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
