import HeroSection from "@/components/HeroSection"
import NewestCollections from "@/components/NewestProducts"
import RecentProducts from "@/components/RecentProducts"

export default function Page() {

  return (

    <main className="bg-white">

      <HeroSection />

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
      <NewestCollections />
      <RecentProducts />

    </main>

  )
}