"use client";
import { useRef } from "react";
import HeroSection from "./components/herosection";
import CollectionsGrid from "./components/collectionsgrid";
import LookbookSection from "./components/lookbooksection";
import CtaSection from "./components/ctasection";

function App() {
  const collectionsRef = useRef<HTMLDivElement>(null);

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onExploreClick={scrollToCollections} />
      <div ref={collectionsRef}>
        <CollectionsGrid />
      </div>
      <LookbookSection />
      <CtaSection onExploreClick={scrollToCollections} />
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2025 Screen Accurate Style. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;