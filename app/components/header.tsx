"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Debounced search */
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <header
        className="glass-header"
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "blur(20px)",
          boxShadow: scrolled
            ? "0 12px 48px rgba(0,0,0,0.1)"
            : "0 8px 32px rgba(0,0,0,0.06)",
        }}
      >
        <nav
          className="glass-nav"
          role="navigation"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
          aria-label="Main Navigation"
        >
          <Link href="/" className="logo-text">
            FilmyFits
          </Link>

          <ul className="desktop-nav">
            <li><Link href="/collections/batman" className="nav-link">Batman</Link></li>
            <li><Link href="/collections/spiderman" className="nav-link">Spider-Man</Link></li>
            <li><Link href="/blog/batman-outfit-guide" className="nav-link">Guides</Link></li>
          </ul>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="header-icon-btn"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="mobile-menu-btn header-icon-btn"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

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

      {open && (
        <div className="floating-panel">
          <Link href="/collections/batman" onClick={() => setOpen(false)}>Batman</Link>
          <Link href="/collections/spiderman" onClick={() => setOpen(false)}>Spider-Man</Link>
          <Link href="/blog/batman-outfit-guide" onClick={() => setOpen(false)}>Guides</Link>
        </div>
      )}

      {searchOpen && (
        <div className="floating-panel">
          <input
            type="text"
            placeholder="Search outfits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            autoFocus
          />

          <div style={{ marginTop: 12 }}>
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                onClick={() => setSearchOpen(false)}
                className="search-result"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: 40, height: 40, borderRadius: 8 }}
                />
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