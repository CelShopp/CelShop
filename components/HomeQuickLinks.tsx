import Link from "next/link";

export default function HomeQuickLinks() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-[clamp(6px,2.5vw,12px)] w-[min(100%,420px)]">
      <Link
        href="/actors"
        className="inline-flex items-center justify-center rounded-full whitespace-nowrap font-black uppercase text-[#F59E0B] border border-[#F59E0B]/55 bg-transparent backdrop-blur hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/75 transition-all active:scale-95 text-[clamp(8px,2.2vw,10px)] tracking-[0.2em] px-[clamp(10px,3.4vw,16px)] py-[clamp(6px,1.8vw,8px)] shadow-[0_0_18px_rgba(245,158,11,0.35)] hover:shadow-[0_0_22px_rgba(245,158,11,0.5)]"
      >
        Bollywood
      </Link>

      <Link
        href="/outfit-ideas"
        className="inline-flex items-center justify-center rounded-full whitespace-nowrap font-black uppercase text-[#E60023] border border-[#E60023]/45 bg-transparent backdrop-blur hover:bg-[#E60023]/10 hover:border-[#E60023]/70 transition-all active:scale-95 text-[clamp(8px,2.2vw,10px)] tracking-[0.2em] px-[clamp(10px,3.4vw,16px)] py-[clamp(6px,1.8vw,8px)]"
      >
        Pinterest
      </Link>
    </div>
  );
}
