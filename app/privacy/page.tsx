import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-24">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 mb-4">
                        Privacy <span className="text-stone-300">Policy</span>
                    </h1>
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Last Updated: February 2025</p>
                </header>

                <div className="prose prose-stone max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">1. Overview</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            At FilmyFits, we value your privacy. This policy explains how we collect and use your data when you visit our site, use our analytics, or interact with our affiliate links.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">2. Data We Collect</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed font-medium">
                            <p>We may collect following information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Email Addresses:</strong> When you sign up for updates or submit requests.</li>
                                <li><strong>Usage Data:</strong> We use analytics tools to track how visitors interact with our site.</li>
                                <li><strong>Cookies:</strong> To enhance your experience and track affiliate performance.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">3. Third-Party Services</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            We use third-party services like Google Analytics and various affiliate networks. These services may collect data about your browsing habits across different platforms to provide accurate tracking and performance insights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">4. Affiliate Tracking</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            Some links on this site are affiliate links. When you click these, we use cookies to track your purchase so that we may earn a commission. This tracking is handled by third-party retailers (like Amazon).
                        </p>
                    </section>

                    <section className="pt-12 border-t border-stone-200">
                        <h2 className="text-xl font-black uppercase tracking-tight mb-4 text-stone-900">Contact Us</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            If you have questions about this policy, contact us at <span className="text-orange-600">hello@filmyfits.com</span>
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
