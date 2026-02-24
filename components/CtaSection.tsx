import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface CtaSectionProps {
    onExploreClick?: () => void;
}

export default function CtaSection({ onExploreClick }: CtaSectionProps) {
    return (
        <section className="relative py-32 md:py-48 overflow-hidden bg-stone-950">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

            <div className="relative max-w-5xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-10 animate-pulse">
                    <Sparkles size={14} />
                    Entry into the Archive
                </div>

                <h2 className="text-white text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.85]">
                    Become the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-500 italic">Protagonist</span>
                </h2>

                <p className="text-stone-400 text-lg md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                    Stop watching from the sidelines. Our master-curated archive brings screen-accurate legendary style directly to your wardrobe.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/collections"
                        onClick={onExploreClick}
                        className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-orange-600 text-white font-black py-6 px-14 rounded-[2rem] text-lg hover:bg-white hover:text-stone-900 transition-all shadow-2xl shadow-orange-600/20 active:scale-95"
                    >
                        Access The Vault
                        <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link
                        href="/collections/top-gun"
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl text-white border border-white/10 font-black py-6 px-14 rounded-[2rem] text-lg hover:bg-white/10 transition-all uppercase tracking-widest text-sm"
                    >
                        Featured Assets
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-30">
                    <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px]">
                        <ShieldCheck size={16} className="text-orange-500" />
                        Verified Replicas
                    </div>
                    <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px]">
                        <ShieldCheck size={16} className="text-orange-500" />
                        Director Approved Fit
                    </div>
                    <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px]">
                        <ShieldCheck size={16} className="text-orange-500" />
                        Worldwide Dispatch
                    </div>
                </div>
            </div>
        </section>
    );
}


