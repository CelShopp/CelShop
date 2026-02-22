import { Button } from "../components/button";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-slate-900 overflow-hidden">
      {/* Hero Background - Solid color with placeholder styling */}
      <div className="absolute inset-0 bg-slate-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
            <div className="text-slate-600 text-6xl font-bold opacity-20">
              FASHION
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white text-center mb-2">
          Screen Accurate
        </h1>
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-orange-500 font-bold text-center mb-6">
          Style.
        </h2>
        <p className="text-white text-base md:text-lg text-center max-w-2xl mb-8 opacity-90">
          Discover the exact looks from your favorite films and TV shows
        </p>
        <Button
          onClick={onExploreClick}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 px-8 rounded-md text-base transition-colors"
        >
          Explore
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}