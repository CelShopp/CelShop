"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Menu } from "lucide-react";

export default function Header() {
    // State to control if the mobile menu is open
    const [open, setOpen] = useState(false);
    // State to control if the search overlay is open
    const [searchOpen, setSearchOpen] = useState(false);
    // State for the search query input
    const [query, setQuery] = useState("");
    // State for search results fetched from API
    const [results, setResults] = useState<any[]>([]);
    // State to track if page is scrolled down
    const [scrolled, setScrolled] = useState(false);

    /* Effect to handle scroll event, updates 'scrolled' state based on scroll position */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Effect for debounced search: fetch results 300ms after user stops typing */
    useEffect(() => {
        if (query.length < 2) {
            setResults([]); // Clear results if query is too short
            return;
        }

        const timeout = setTimeout(async () => {
            const res = await fetch(`/api/search?q=${query}`); // Fetch search results
            const data = await res.json();
            setResults(data); // Update results state
        }, 300); // 300ms debounce

        return () => clearTimeout(timeout); // Clear timeout if query changes
    }, [query]);

    return (
        <>
            {/* Header element with background blur and shadow effect based on scroll */}
            <header
                className="glass-header"
                style={{
                    backdropFilter: scrolled ? "blur(24px)" : "blur(20px)", // Blur effect
                    boxShadow: scrolled
                        ? "0 12px 48px rgba(0,0,0,0.1)" // Shadow when scrolled
                        : "0 8px 32px rgba(0,0,0,0.06)", // Shadow when at top
                }}
            >
                {/* Navigation bar */}
                <nav
                    className="glass-nav"
                    role="navigation"
                    itemScope
                    itemType="https://schema.org/SiteNavigationElement"
                    aria-label="Main Navigation"
                >
                    {/* Logo or site title */}
                    <Link href="/" className="logo-text">
                        FilmyFits
                    </Link>

                    {/* Desktop navigation links */}
                    <ul className="desktop-nav">
                        <li><Link href="/collections/batman" className="nav-link">Batman</Link></li>
                        <li><Link href="/collections/spiderman" className="nav-link">Spider-Man</Link></li>
                        <li><Link href="/blog/batman-outfit-guide" className="nav-link">Guides</Link></li>
                    </ul>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Other nav items can go here */}

                        {/* Spacer to push buttons to the right */}
                        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                            {/* Search toggle button */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="header-icon-btn"
                            >
                                {searchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>
                            {/* Mobile menu toggle button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="mobile-menu-btn header-icon-btn"
                            >
                                {open ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                </nav>
            </header>

            {/* Overlay backdrop when menu or search is open, clicking closes both */}
            {(open || searchOpen) && (
                <div
                    onClick={() => {
                        setOpen(false);
                        setSearchOpen(false);
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(4px)",
                        zIndex: 98,
                    }}
                />
            )}

            {/* Mobile menu panel, shown when 'open' is true */}
            {open && (
                <div className="floating-panel">
                    {/* Links inside mobile menu, clicking closes menu */}
                    <Link href="/collections/batman" onClick={() => setOpen(false)}>Batman</Link>
                    <Link href="/collections/spiderman" onClick={() => setOpen(false)}>Spider-Man</Link>
                    <Link href="/blog/batman-outfit-guide" onClick={() => setOpen(false)}>Guides</Link>
                </div>
            )}

            {/* Search overlay, shown when 'searchOpen' is true */}
            {searchOpen && (
                <div className="floating-panel">
                    {/* Search input field */}
                    <input
                        type="text"
                        placeholder="Search outfits..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                        autoFocus
                    />

                    {/* Display search results */}
                    <div style={{ marginTop: 12 }}>
                        {results.map((p) => (
                            <Link
                                key={p.id}
                                href={`/products/${p.slug}`}
                                onClick={() => setSearchOpen(false)}
                                className="search-result"
                            >
                                {/* Product image */}
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    style={{ width: 40, height: 40, borderRadius: 8 }}
                                />
                                {/* Product info */}
                                <div>
                                    <div>{p.name}</div>
                                    <div style={{ fontSize: 12, opacity: 0.6 }}>
                                        ₹{p.price.toLocaleString()}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
