"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMovies(data);
        } else {
          setMovies([
            {
              id: "default",
              title: "Iconic outfits from iconic films",
              movieName: "Yeh Jawaani Hai Deewani",
              image: "/YehJawaaniHaiDeewani.png",
              ctaLink: "/collections",
            },
          ]);
        }
      })
      .catch((err) => console.error("Error fetching hero:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: movies.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    fade: true,
  };

  return (
    <section className="relative bg-stone-950 overflow-hidden w-full lg:w-[75%] mx-auto rounded-none md:rounded-[30px] mt-[110px] md:mt-[120px]">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative w-full h-[60vh] md:h-[82vh] outline-none">

            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={movie.image}
                alt={movie.movieName}
                className="w-full h-full object-cover opacity-[1] scale-100 animate-fast-zoom"
              />

              {/* Gradients tahy*/}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/30 to-transparent" />
            </div>

            {/* Film grain */}
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
                  style={{ fontSize: "clamp(2rem, 4vw, 5.5rem)" }}
                >
                  {movie.title === "Iconic outfits from iconic films" ? (
                    <>
                      Iconic outfits
                      <br />
                      from iconic films
                    </>
                  ) : (
                    movie.title
                  )}
                </h1>

                {/* Buttons (UPDATED but same placement) */}
                <div className="flex flex-col sm:flex-row gap-3 items-start">

                  <Link
                    href={movie.ctaLink}
                    className="group inline-flex items-center gap-2 bg-white text-stone-900 font-black py-2.5 px-5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                  >
                    <Play size={12} fill="currentColor" />
                    Shop Collection
                  </Link>

                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2 border border-white/20 text-white/70 font-black py-2.5 px-5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:border-white hover:text-white transition-all"
                  >
                    Browse Products
                    <ArrowRight size={11} />
                  </Link>

                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-10 pt-6 border-t border-white/10 max-w-2xl">
                  {[
                    { num: "Not enough", label: "Collections" },
                    { num: "Bassically 0", label: "Products" },
                    { num: "But Hey, it's a 100%", label: "Affiliate" },
                  ].map(({ num, label }) => (
                    <div key={label}>
                      <div className="text-xl font-black text-white leading-none">{num}</div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Film watermark */}
            <div className="absolute bottom-6 right-6 text-right hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-stone-600 mb-0.5">
                Now Showing
              </p>
              <p className="text-xs font-black text-stone-500 tracking-tight">
                {movie.movieName}
              </p>
            </div>

          </div>
        ))}
      </Slider>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        .animate-slow-zoom {
          animation: slow-zoom 22s ease-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;