import HeroSection from "@/components/HeroSection";
import LookbookSection from "@/components/LookbookSection";
import NewestProducts from "@/components/NewestProducts";
export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <main className="flex-grow pt-[100px] md:pt-[110px]">
        {/* Contained Hero Section */}
        <section className="w-full max-w-[1080px] mx-auto sm:px-6">
          <div className="sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
            <HeroSection />
          </div>
        </section>

        {/* Newest Products Section */}
        <div className="w-full">
          <NewestProducts/>
        </div>

        {/* Lookbook Section */}
        <div className="w-full border-y border-stone-200 bg-white">
          <LookbookSection />
        </div>

      </main>
    </div>
  );
}
