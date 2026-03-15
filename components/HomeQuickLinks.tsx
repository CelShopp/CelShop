import Link from "next/link";

export default function HomeQuickLinks() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-[clamp(6px,2.2vw,12px)] w-[min(100%,560px)]">
      <Link
        href="/actors"
        className="inline-flex items-center justify-center rounded-full whitespace-nowrap font-black uppercase text-[#F59E0B] border border-[#F59E0B]/55 bg-transparent backdrop-blur hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/75 transition-all active:scale-95 text-[clamp(8px,2.2vw,10px)] tracking-[0.2em] px-[clamp(10px,3.4vw,16px)] py-[clamp(6px,1.8vw,8px)]"
      >
        Bollywood
      </Link>

      <Link
        href="/outfit-ideas"
        className="inline-flex items-center justify-center rounded-full whitespace-nowrap font-black uppercase text-[#E60023] border border-[#E60023]/45 bg-transparent backdrop-blur hover:bg-[#E60023]/10 hover:border-[#E60023]/70 transition-all active:scale-95 text-[clamp(8px,2.2vw,10px)] tracking-[0.2em] px-[clamp(10px,3.4vw,16px)] py-[clamp(6px,1.8vw,8px)]"
      >
        Pinterest
      </Link>

      <Link
        href="https://x.com/FilmyFits"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center min-w-[clamp(92px,24vw,132px)] rounded-full whitespace-nowrap font-black uppercase text-white bg-stone-950 hover:bg-stone-900 border border-white/10 transition-all active:scale-95 text-[clamp(8px,2.2vw,10px)] tracking-[0.2em] px-[clamp(10px,3.4vw,16px)] py-[clamp(6px,1.8vw,8px)]"
      >
        X
      </Link>
    </div>
  );
}
