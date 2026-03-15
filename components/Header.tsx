"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, Menu, Send, PlusCircle } from "lucide-react";

type SearchResult = {
  id: string;
  type: "product" | "collection" | "movie" | "actor";
  title: string;
  subtitle: string;
  href: string;
  image: string | null;
  price: number | null;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const [requestContent, setRequestContent] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const closePanels = () => {
    setOpen(false);
    setSearchOpen(false);
    setRequestOpen(false);
  };

  const handleRecentArrivalsClick = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;

    e.preventDefault();

    if (window.location.hash !== "#recent-arrivals") {
      window.history.pushState(null, "", "/#recent-arrivals");
    }

    let attempts = 0;
    const maxAttempts = 30;

    const tryScroll = () => {
      attempts += 1;
      const el = document.getElementById("recent-arrivals");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempts < maxAttempts) {
        window.setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: requestContent, email: requestEmail }),
      });

      if (!res.ok) {
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      setRequestContent("");
      setRequestEmail("");
      setTimeout(() => setRequestOpen(false), 1400);
    } catch (error) {
      console.error("Request submit error", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header
        className="glass-header"
        style={{
          position: "fixed",
          top: scrolled ? "10px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 40px)",
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav className="glass-nav">
          <Link href="/" className="logo-text">
            FilmyFits
          </Link>

          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            <li><Link href="/collections" className="nav-link">Collections</Link></li>
            <li><Link href="/actors" className="nav-link">Actors</Link></li>
            <li><Link href="/outfit-ideas" className="nav-link">Outfit Ideas</Link></li>
            <li><Link href="/#recent-arrivals" onClick={handleRecentArrivalsClick} className="nav-link">Recent Arrivals</Link></li>
          </ul>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setRequestOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-all active:scale-95"
            >
              <PlusCircle size={14} />
              Request Item
            </button>

            <div className="flex gap-1 md:gap-2">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setOpen(false);
                }}
                className="header-icon-btn"
                aria-label="Search"
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
              <button
                onClick={() => {
                  setOpen(!open);
                  setSearchOpen(false);
                }}
                className="md:hidden header-icon-btn"
                aria-label="Menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {requestOpen && (
        <div className="modal-overlay" onClick={() => setRequestOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setRequestOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-stone-900 mb-2">Request an Outfit</h2>
            <p className="text-stone-500 mb-8">Drop the movie/actor/collection vibe and we will try to source it.</p>

            {submitStatus === "success" ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold text-center">
                Request submitted. We will reach out soon.
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  value={requestContent}
                  onChange={(e) => setRequestContent(e.target.value)}
                  placeholder="e.g. John Wick Chapter 4 suit with matching tie"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                <input
                  type="email"
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                <button
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : <><Send size={18} />Submit Request</>}
                </button>
                {submitStatus === "error" && (
                  <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="floating-panel">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Search tags: collections, products, movies, actors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input !pl-12"
              autoFocus
            />
          </div>

          <div className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto pr-2">
            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() => setSearchOpen(false)}
                  className="search-result group"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-stone-500">
                    {result.image ? (
                      <img src={result.image} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    ) : (
                      result.type
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-stone-900 truncate">{result.title}</div>
                    <div className="text-xs text-stone-500 truncate">{result.subtitle}</div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 text-right">
                    {result.price !== null ? `${"\u20B9"}${result.price.toLocaleString()}` : result.type}
                  </div>
                </Link>
              ))
            ) : query.length >= 2 ? (
              <div className="text-center py-8 text-stone-400 text-sm">No matches for &quot;{query}&quot;.</div>
            ) : (
              <div className="text-center py-8 text-stone-400 text-sm italic">Type at least 2 letters to search by tags.</div>
            )}
          </div>
        </div>
      )}

      {open && (
        <div
          className="fixed left-3 right-3 sm:left-5 sm:right-5 z-[1000] bg-white rounded-[2rem] p-4 shadow-2xl border border-stone-100 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ top: scrolled ? "72px" : "84px" }}
        >
          <div className="flex flex-col gap-1">

            <Link href="/collections" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 rounded-2xl font-bold text-stone-900 transition-colors">
              <span className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
              Collections
            </Link>
            <Link href="/actors" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 rounded-2xl font-bold text-stone-900 transition-colors">
              <span className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
              Actors
            </Link>
            <Link href="/outfit-ideas" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 rounded-2xl font-bold text-stone-900 transition-colors">
              <span className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
              Outfit Ideas
            </Link>
            <Link
              href="/#recent-arrivals"
              onClick={(e) => {
                handleRecentArrivalsClick(e);
                setOpen(false);
              }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 rounded-2xl font-bold text-stone-900 transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
              Recent Arrivals
            </Link>
            <div className="h-px bg-stone-100 my-2 mx-6" />
            <button
              onClick={() => {
                setRequestOpen(true);
                setOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-stone-900 text-white rounded-2xl font-bold active:scale-95 transition-all"
            >
              <PlusCircle size={18} />
              Request an Item
            </button>
          </div>
        </div>
      )}

      {(open || searchOpen || requestOpen) && (
        <div
          onClick={closePanels}
          className="fixed inset-0 z-[900]"
          style={{
            background: (open || searchOpen) ? "rgba(0,0,0,0.1)" : "transparent",
          }}
        />
      )}
    </>
  );
}
