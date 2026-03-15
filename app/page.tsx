import HeroSection from "@/components/HeroSection"
import HomeQuickLinks from "@/components/HomeQuickLinks"
import NewestCollections from "@/components/NewestProducts"
import RecentProducts from "@/components/RecentProducts"
import { Suspense } from "react"

export default function Page() {

  return (

    <main className="bg-white">
      {/* space for fixed header, then quick links, then hero */}
      <div className="pt-[110px] md:pt-[120px]">
        <div className="w-full lg:w-[75%] mx-auto px-6 sm:px-10 flex justify-center">
          <HomeQuickLinks />
        </div>

        <div className="mt-3 md:mt-4">
          <HeroSection />
        </div>
      </div>

      {/* trust strip */}

      <section className="w-full bg-white border-y border-stone-100 overflow-hidden">
        <div className="trust-marquee">

          <div className="trust-track">
            {[
              "Verified affiliate products",
              "Scene accurate outfits",
              "Updated weekly",
              "Made for film fans",
            ].map((item, i) => (
              <span key={i} className="trust-item">
                ✦ {item}
              </span>
            ))}

            {/* duplicate for seamless loop */}
            {[
              "Verified affiliate products",
              "Scene accurate outfits",
              "Updated weekly",
              "Made for film fans",
            ].map((item, i) => (
              <span key={`dup-${i}`} className="trust-item">
                ✦ {item}
              </span>
            ))}

          </div>

        </div>
      </section>
      <Suspense fallback={null}>
        <NewestCollections/>
      </Suspense>
      <Suspense fallback={null}>
        <RecentProducts />
      </Suspense>

    </main>

  )
}
