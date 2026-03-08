import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 pt-20 pb-10 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
              <span className="text-orange-500 italic">Filmy</span>Fits
            </div>
            <p className="text-sm leading-relaxed max-w-xs opacity-50 font-medium">
              Curating screen-accurate outfits from iconic Bollywood &amp; Hollywood films.
              We bridge the gap between cinema and your wardrobe.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-900 px-3 py-1.5 rounded-lg">
              <span className="text-orange-500"></span> Affiliate links — we earn commissions
            </div>
          </div>

          {/* Archives */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              Archives
            </h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <Link href="/collections/shirts" className="hover:text-orange-500 transition-colors">
                  Shirts
                </Link>
              </li>
              <li>
                <Link href="/collections/pants" className="hover:text-orange-500 transition-colors">
                  Pants
                </Link>
              </li>
              <li>
                <Link href="/collections/jackets" className="hover:text-orange-500 transition-colors">
                  Jackets
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-orange-500 transition-colors">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              Info
            </h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-orange-500 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-orange-500 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.18em] opacity-40">
          <span>© 2025 FilmyFits Archive. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
            <Link href="/affiliate-disclosure" className="hover:opacity-100 transition-opacity">Disclosure</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}