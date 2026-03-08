"use client";

import YehJawaaniHaiDeewani from "../public/YehJawaaniHaiDeewani.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const MOVIES = [
  {
    id: 1,
    title: "Yeh Jawaani Hai Deewani",
    posterURL: YehJawaaniHaiDeewani.src,
    cta: "/collections",
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
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
  };

  return (
    <section className="relative bg-stone-950 overflow-hidden w-full lg:w-[75%] mx-auto lg:rounded-[30px] mt-[10px]">
      <Slider {...settings}>
        {MOVIES.map((movie) => (
          <div key={movie.id} className="relative w-full h-[72vh] md:h-[82vh] outline-none">
      

            {/* Background image — low opacity for clean look */}
            <div className="absolute inset-0">
              <img
                src={movie.posterURL}
                alt={movie.title}
                className="w-full h-full object-cover opacity-[0.75] scale-100 animate-slow-zoom"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/30 to-transparent" />
            </div>

            {/* Subtle grain texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end items-start pb-16">
              <div className="animate-in fade-in slide-in-from-left-8 duration-1000 max-w-2xl">
                {/* Headline */}
                <h1
                  className="font-black text-white tracking-tighter leading-[0.93] mb-3 drop-shadow-2xl"
                  style={{ fontSize: "clamp(2.0rem, 4vw, 5.5rem)" }}
                >
                  Iconic outfits<br />from iconic films
                </h1>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={movie.cta}
                    className="group flex items-center gap-2.5 bg-white text-stone-900 font-black py-3.5 px-7 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all hover:-translate-y-0.5 shadow-2xl active:scale-95 whitespace-nowrap"
                  >
                    <Play size={12} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                    See Collection
                  </Link>
                  <Link
                    href="/products"
                    className="group flex items-center gap-2 border border-white/20 text-white/70 font-black py-3.5 px-7 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:border-white/50 hover:text-white transition-all whitespace-nowrap"
                  >
                    All Products
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-10 pt-6 border-t border-white/10 max-w-2xl">
                  {[
                    { num: "4+", label: "Collections" },
                    { num: "10+", label: "Products" },
                    { num: "100%", label: "Affiliate" },
                  ].map(({ num, label }) => (
                    <div key={label}>
                      <div className="text-xl font-black text-white leading-none">{num}</div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Film title watermark — bottom right */}
            <div className="absolute bottom-6 right-6 text-right hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-stone-600 mb-0.5">Now Showing</p>
              <p className="text-xs font-black text-stone-500 tracking-tight">{movie.title}</p>
            </div>

          </div>
        ))}
      </Slider>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 22s ease-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;