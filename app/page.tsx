import React from "react";
import HeroSection from "@/components/HeroSection";
import LookbookSection from "@/components/LookbookSection";
import NewestProducts from "@/components/NewestProducts";
import { Plus, Package, Database, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <main className="flex-grow pt-[100px] md:pt-[110px]">
        {/* Contained Hero Section */}
        <section className="w-full max-w-[1440px] mx-auto sm:px-6">
          <div className="sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
            <HeroSection />
          </div>
        </section>

        {/* Newest Products Section */}
        <div className="w-full">
          <NewestProducts />
        </div>

        {/* Lookbook Section */}
        <div className="w-full border-y border-stone-200 bg-white">
          <LookbookSection />
        </div>

      </main>
    </div>
  );
}
