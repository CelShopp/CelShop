"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Play, Film, Award, Sparkles } from "lucide-react";
import Link from "next/link";

const MOVIES = [
    {
        id: 1,
        title: "The Batman",
        description: "Uncover the rugged, tactical silhouette of Gotham's vengeance. Every stitch and rivet engineered for the shadows.",
        posterURL: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
        cta: "/collections/batman",
        badge: "Director's Choice"
    },
    {
        id: 2,
        title: "John Wick",
        description: "The Continental's finest. A masterclass in high-stakes tailoring, balancing lethal efficiency with timeless grace.",
        posterURL: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?q=80&w=1935&auto=format&fit=crop",
        cta: "/collections/john-wick",
        badge: "Elite Archive"
    },
    {
        id: 3,
        title: "Top Gun: Maverick",
        description: "The absolute standard of naval aviation style. Reclaiming the legacy of the G-1 flight jacket.",
        posterURL: "https://images.unsplash.com/photo-1506190503913-909249826353?q=80&w=2072&auto=format&fit=crop",
        cta: "/collections/top-gun",
        badge: "Legacy Asset"
    },
];

const HeroSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false,
        fade: true,
        dotsClass: "slick-dots custom-dots",
    };

    return (
        <section className="w-full relative bg-stone-950 overflow-hidden">
            <Slider {...settings}>
                {MOVIES.map((movie) => (
                    <div key={movie.id} className="relative w-full h-[80vh] md:h-[95vh] outline-none">
                        {/* Background Image with Cinematic Zoom Overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={movie.posterURL}
                                alt={movie.title}
                                className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom"
                            />
                            {/* Dramatic Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start pt-16">
                            <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="px-4 py-1.5 bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-orange-600/30">
                                        {movie.badge}
                                    </span>
                                    <div className="flex gap-1 opacity-50">
                                        {[...Array(5)].map((_, i) => <Sparkles key={i} size={10} className="text-white" />)}
                                    </div>
                                </div>
                                <h1 className="text-6xl md:text-[9rem] font-black text-white mb-8 tracking-tighter max-w-4xl leading-[0.8] drop-shadow-2xl">
                                    {movie.title}
                                </h1>
                                <p className="text-lg md:text-2xl text-stone-300 max-w-2xl mb-12 leading-relaxed font-medium italic opacity-80">
                                    "{movie.description}"
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <Link
                                        href={movie.cta}
                                        className="group flex items-center justify-center gap-4 bg-white text-stone-900 font-extrabold py-5 px-10 rounded-2xl text-lg hover:bg-orange-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95"
                                    >
                                        <Play size={20} fill="currentColor" />
                                        Enter Archive
                                    </Link>
                                    <button className="flex items-center justify-center gap-4 bg-white/5 backdrop-blur-xl text-white border border-white/10 font-black py-5 px-10 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                                        <Film size={18} />
                                        Collection Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <style jsx global>{`
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-out infinite alternate;
                }
                .custom-dots {
                    position: absolute !important;
                    bottom: 60px !important;
                    left: 50% !important;
                    transform: translateX(-50%);
                    width: auto !important;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    padding: 8px 16px;
                    border-radius: 99px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .custom-dots li {
                    margin: 0 4px !important;
                }
                .custom-dots li button:before {
                    color: white !important;
                    font-size: 8px !important;
                    opacity: 0.2 !important;
                }
                .custom-dots li.slick-active button:before {
                    color: #ea580c !important;
                    opacity: 1 !important;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;


