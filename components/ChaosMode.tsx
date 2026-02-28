"use client";
import Link from "next/link";
import { useState } from "react";

export default function CinematicPage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMove}
      className="min-h-screen text-white transition-all duration-300"
      style={{
        background: `
          radial-gradient(circle at ${pos.x}% ${pos.y}%,
          rgba(255,255,255,0.08),
          transparent 40%),
          #0a0a0a
        `,
      }}
    >
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
          FilmyFits
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl">
          Screen-accurate cinematic archives. Every outfit, every frame,
          reconstructed with precision.
        </p>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-neutral-800 w-full" />

      {/* Feature Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
        <Feature
          title="Precision"
          text="Detailed breakdown of screen-accurate wardrobe pieces."
        />
        <Feature
          title="Curation"
          text="Only iconic moments. No filler."
        />
        <Feature
          title="Authenticity"
          text="Built for real film enthusiasts."
        />
      </section>

{/* CTA Section */}
<section className="py-40 text-center px-6">
  <h2 className="text-4xl md:text-6xl font-bold mb-8">
    Step Into The Frame
  </h2>

  <Link
    href="/collections"
    className="inline-block px-10 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform duration-200"
  >
    Explore Collection
  </Link>
</section>
    </div>
    );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="group">
      <h3 className="text-2xl font-semibold mb-4 group-hover:translate-x-2 transition-transform duration-300">
        {title}
      </h3>
      <p className="text-neutral-500">
        {text}
      </p>
    </div>
  );
}