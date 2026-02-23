"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Updated import
import ImageCarousel from "./components/herosection"; // Adjust the path as needed
import LookbookSection from "./components/lookbooksection";
import CtaSection from "./components/ctasection";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">My Movie Slider</h1>
      
      {/* Insert the ImageCarousel component */}
      <ImageCarousel />

      {/* Other sections */}
      <LookbookSection />
      <CtaSection onExploreClick={() => router.push('/collections')} />

      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2025 Screen Accurate Style. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;