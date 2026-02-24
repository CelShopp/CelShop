"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Updated import
import HeroSection from "@/components/HeroSection";
import LookbookSection from "@/components/LookbookSection";
import CtaSection from "@/components/CtaSection";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4">

        {/* Hero Section */}
        <HeroSection />

        {/* Other sections */}
        <LookbookSection />
        <CtaSection onExploreClick={() => router.push('/collections')} />
      </main>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2025 FilmyFits. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;