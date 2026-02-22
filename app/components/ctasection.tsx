import { Button } from "../components/button";

interface CtaSectionProps {
  onExploreClick: () => void;
}

export default function CtaSection({ onExploreClick }: CtaSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Explore Our Collections
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Discover screen-accurate fashion from your favorite films and TV shows
        </p>
        <Button
          onClick={onExploreClick}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-6 px-10 rounded-md text-lg transition-colors"
        >
          Explore
        </Button>
      </div>
    </section>
  );
}