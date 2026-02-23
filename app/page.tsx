"use client";
import { useRouter } from "next/navigation"; // or 'next/router' if older version
import HeroSection from "./components/herosection";
import CollectionsGrid from "./components/collectionsgrid";
import LookbookSection from "./components/lookbooksection";
import CtaSection from "./components/ctasection";

function App() {
  const router = useRouter();

  const goToCollectionsPage = () => {
    router.push('/collections'); // replace with your actual collections page route
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onExploreClick={goToCollectionsPage} />
      {/* other sections */}
      <LookbookSection />
      <CtaSection onExploreClick={goToCollectionsPage} />
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        <p>© 2025 Screen Accurate Style. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;