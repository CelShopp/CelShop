"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Menu, Send, PlusCircle } from "lucide-react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [requestOpen, setRequestOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [scrolled, setScrolled] = useState(false);

    // Request form state
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
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Search error:", err);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

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

            if (res.ok) {
                setSubmitStatus("success");
                setRequestContent("");
                setRequestEmail("");
                setTimeout(() => setRequestOpen(false), 2000);
            } else {
                setSubmitStatus("error");
            }
        } catch (err) {
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

                    <ul className="desktop-nav">
                        <li><Link href="/collections" className="nav-link">Collections</Link></li>
                        <li><Link href="/collections/batman" className="nav-link">Batman</Link></li>
                        <li><Link href="/collections/spiderman" className="nav-link">Spider-Man</Link></li>
                    </ul>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setRequestOpen(true)}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-all active:scale-95"
                        >
                            <PlusCircle size={14} />
                            Request Item
                        </button>

                        <div className="flex gap-2">
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
                                className="mobile-menu-btn header-icon-btn"
                                aria-label="Menu"
                            >
                                {open ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Request Modal */}
            {requestOpen && (
                <div className="modal-overlay" onClick={() => setRequestOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setRequestOpen(false)}
                            className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-stone-900 mb-2">Request an Outfit</h2>
                        <p className="text-stone-500 mb-8">Can't find a specific movie look? Tell us what you're looking for!</p>

                        {submitStatus === "success" ? (
                            <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl text-center animate-in fade-in zoom-in">
                                <PlusCircle className="mx-auto mb-4 w-12 h-12" />
                                <h3 className="text-xl font-bold mb-1">Request Received!</h3>
                                <p>We'll look for this iconic fit and let you know.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleRequestSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-tight">What movie or character?</label>
                                    <textarea
                                        required
                                        value={requestContent}
                                        onChange={e => setRequestContent(e.target.value)}
                                        placeholder="e.g. John Wick's black suit from Chapter 4"
                                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all h-32 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-tight">Your Email (Optional)</label>
                                    <input
                                        type="email"
                                        value={requestEmail}
                                        onChange={e => setRequestEmail(e.target.value)}
                                        placeholder="To notify you when it's added"
                                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : (
                                        <>
                                            <Send size={18} />
                                            Submit Request
                                        </>
                                    )}
                                </button>
                                {submitStatus === "error" && (
                                    <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Search Overlay */}
            {searchOpen && (
                <div className="floating-panel">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search outfits, movies, actors..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input !pl-12"
                            autoFocus
                        />
                    </div>

                    <div className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                        {results.length > 0 ? (
                            results.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.slug}`}
                                    onClick={() => setSearchOpen(false)}
                                    className="search-result group"
                                >
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-stone-900 truncate">{p.name}</div>
                                        <div className="text-xs text-stone-500 truncate">{p.movie || p.collection}</div>
                                    </div>
                                    <div className="text-sm font-bold text-stone-900">₹{p.price.toLocaleString()}</div>
                                </Link>
                            ))
                        ) : query.length >= 2 ? (
                            <div className="text-center py-8 text-stone-400 text-sm">No results found for "{query}"</div>
                        ) : (
                            <div className="text-center py-8 text-stone-400 text-sm italic">Type to search iconic film styles...</div>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Menu Panel */}
            {open && (
                <div className="floating-panel !w-[calc(100%-40px)] left-5">
                    <div className="grid gap-2 p-2">
                        <Link href="/collections" onClick={() => setOpen(false)} className="px-4 py-4 hover:bg-stone-50 rounded-xl font-bold text-stone-900 border-b border-stone-50">All Collections</Link>
                        <Link href="/collections/batman" onClick={() => setOpen(false)} className="px-4 py-4 hover:bg-stone-50 rounded-xl font-bold text-stone-900 border-b border-stone-50">Batman Lookbook</Link>
                        <Link href="/collections/spiderman" onClick={() => setOpen(false)} className="px-4 py-4 hover:bg-stone-50 rounded-xl font-bold text-stone-900 border-b border-stone-50">Spider-Man Gear</Link>
                        <button
                            onClick={() => {
                                setRequestOpen(true);
                                setOpen(false);
                            }}
                            className="mt-4 px-4 py-4 bg-stone-900 text-white rounded-xl font-bold text-center active:scale-95 transition-transform"
                        >
                            Request an Item
                        </button>
                    </div>
                </div>
            )}

            {/* Global Overlay */}
            {(open || searchOpen || requestOpen) && (
                <div
                    onClick={() => {
                        setOpen(false);
                        setSearchOpen(false);
                        setRequestOpen(false);
                    }}
                    className="fixed inset-0 z-[900]"
                    style={{
                        background: (open || searchOpen) ? "rgba(0,0,0,0.1)" : "transparent",
                    }}
                />
            )}
        </>
    );
}

