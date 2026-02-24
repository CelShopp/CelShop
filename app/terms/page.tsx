import React from 'react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-24">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 mb-4">
                        Terms of <span className="text-stone-300">Service</span>
                    </h1>
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Last Updated: February 2025</p>
                </header>

                <div className="prose prose-stone max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">1. Acceptance of Terms</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            By accessing FilmyFits, you agree to these terms. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">2. Product Accuracy</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed font-medium">
                            <p>We strive for accuracy, but please note:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>No Guarantees:</strong> We do not guarantee the quality, fit, or screen-accuracy of products sold by third-party retailers.</li>
                                <li><strong>Price Inaccuracies:</strong> Prices and availability are subject to change on the retailer's site. We are not responsible for price differences.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">3. Third-Party Sites</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            Our site contains links to external websites (like Amazon). We do not control these sites and are not responsible for their content, policies, or practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-stone-900 border-b border-stone-200 pb-2">4. Limitation of Liability</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            FilmyFits is an informational and curation service. We are not liable for any damages arising from your use of the site or products purchased through our affiliate links.
                        </p>
                    </section>

                    <section className="pt-12 border-t border-stone-200">
                        <h2 className="text-xl font-black uppercase tracking-tight mb-4 text-stone-900">Legal Contact</h2>
                        <p className="text-stone-600 leading-relaxed font-medium">
                            For legal inquiries: <span className="text-orange-600">legal@filmyfits.com</span>
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
