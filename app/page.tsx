import HeroSection from "@/components/HeroSection";
import NewestProducts from "@/components/NewestProducts";

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <main className="flex-grow pt-[88px] md:pt-[96px]">

        {/* Hero — full width, split layout */}
        <HeroSection />

        {/* Trust strip */}
        <div className="w-full bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              "✦ Verified affiliate links only",
              "✦ Scene-accurate matches",
              "✦ Updated weekly",
              "✦ Made by film fans",
            ].map((item) => (
              <span key={item} className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Newest Products */}
        <NewestProducts />

      </main>
    </div>
  );
}