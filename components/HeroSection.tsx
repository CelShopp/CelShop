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
        posterURL: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
        cta: "/collections/batman",
    },
    {
        id: 2,
        title: "John Wick",
        posterURL: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?q=80&w=1935&auto=format&fit=crop",
        cta: "/collections/john-wick",
    },
    {
        id: 3,
        title: "Top Gun: Maverick",
        posterURL: "https://images.unsplash.com/photo-1506190503913-909249826353?q=80&w=2072&auto=format&fit=crop",
        cta: "/collections/top-gun",
    },
];

const HeroSection = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        fade: true,
    };

    return (
        <section className="w-full relative bg-stone-950 overflow-hidden">
            <Slider {...settings}>
                {MOVIES.map((movie) => (
                    <div key={movie.id} className="relative w-full h-[70vh] md:h-[80vh] outline-none">
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
                                    <div className="flex gap-1 opacity-50">
                                        {[...Array(5)].map((_, i) => <Sparkles key={i} size={10} className="text-white" />)}
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter max-w-4xl leading-[0.9] drop-shadow-2xl">
                                    {movie.title}
                                </h1>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <Link
                                        href={movie.cta}
                                        className="group flex items-center justify-center gap-3 bg-white text-stone-900 font-black py-4 px-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95 whitespace-nowrap"
                                    >
                                        <Play size={14} fill="currentColor" className="transition-transform group-hover:scale-110" />
                                        Enter Archive
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <style jsx global>{`
                @keyframes slow-zoom {
                    from { transform: scale(0.95); }
                    to { transform: scale(1.10); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-out infinite alternate;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;


