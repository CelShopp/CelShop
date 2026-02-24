import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-stone-950 text-stone-400 py-24 border-t border-stone-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-2">
                    <div className="text-3xl font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-2">
                        <span className="text-orange-600 italic">Filmy</span>Fits
                    </div>
                    <p className="text-sm opacity-50 max-w-sm font-medium leading-relaxed">
                        Curating the most iconic outfits from film history. We bridge the gap between cinema and reality.
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
                        <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/admin/add" className="hover:text-orange-500 transition-colors">Archivist Access</Link></li>
                        <li><Link href="/affiliate-disclosure" className="hover:text-orange-500 transition-colors">Affiliate Disclosure</Link></li>
                        <li><Link href="/refund-policy" className="hover:text-orange-500 transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 text-xs font-bold uppercase tracking-[0.2em]">
                <span>© 2025 FilmyFits Archive. All rights reserved.</span>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
                </div>
            </div>
        </footer>
    );
}
