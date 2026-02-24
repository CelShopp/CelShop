import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AffiliateDisclosure() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-24">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                        <Sparkles size={14} />
                        Transparency Report
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 mb-4">
                        Affiliate <span className="text-stone-300">Disclosure</span>
                    </h1>
                </header>

                <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-stone-100 space-y-8">
                    <p className="text-xl md:text-2xl text-stone-900 font-bold leading-tight">
                        In compliance with FTC guidelines, please note that FilmyFits is a curation platform that participates in affiliate marketing programs.
                    </p>

                    <div className="space-y-6 text-stone-600 leading-relaxed font-medium">
                        <p>
                            This means that some of the links on this website are "affiliate links." If you click on the link and purchase the item, we may receive an affiliate commission at no extra cost to you.
                        </p>

                        <div className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
                            <h3 className="text-stone-900 font-black uppercase tracking-widest text-xs mb-4">Our Commitment</h3>
                            <p className="text-sm">
                                We only feature products that we believe represent the cinematic style of the characters portrayed. Our curation is driven by aesthetic and screen-accuracy, not by commission rates. The support we receive through your clicks helps us maintain and expand our cinematic archive.
                            </p>
                        </div>

                        <p>
                            FilmyFits is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and affiliated sites.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
