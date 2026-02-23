"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "../../lib/products";
import { Search, X, Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  /* Mobile menu animation */
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(false);
      setTimeout(() => setMounted(false), 200);
    }
  }, [open]);

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Search filter */
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const results = query.length > 0 ? filtered : products;

  return (
    <>
      <header
        className="glass-header"
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "blur(20px)",
          boxShadow: scrolled
            ? "0 12px 48px rgba(0,0,0,0.1)"
            : "0 8px 32px rgba(0,0,0,0.06)",
          transform: scrolled ? "scale(0.98)" : "scale(1)",
        }}
      >
        <nav
          className="glass-nav"
          role="navigation"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link href="/" className="logo-text">
            FilmyFits
          </Link>

          {/* Desktop Menu */}
          <ul className="desktop-nav">
            <li>
              <Link href="/collections/batman" className="nav-link">
                Batman
              </Link>
            </li>
            <li>
              <Link href="/collections/spiderman" className="nav-link">
                Spider-Man
              </Link>
            </li>
            <li>
              <Link href="/blog/batman-outfit-guide" className="nav-link">
                Guides
              </Link>
            </li>
          </ul>

          {/* Right Controls */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="header-icon-btn"
              aria-label="Search"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="mobile-menu-btn header-icon-btn"
              aria-expanded={open}
              aria-label="Toggle Navigation Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      {(open || searchOpen) && (
        <div
          onClick={() => {
            setOpen(false);
            setSearchOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Floating Mobile Menu */}
      {mounted && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "20px",
            width: "260px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(24px)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            padding: "16px",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(-10px)",
            pointerEvents: open ? "auto" : "none",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Link
            href="/collections/batman"
            onClick={() => setOpen(false)}
            className="nav-link"
            style={{ fontSize: "14px", padding: "12px 16px" }}
          >
            Batman Outfits
          </Link>

          <Link
            href="/collections/spiderman"
            onClick={() => setOpen(false)}
            className="nav-link"
            style={{ fontSize: "14px", padding: "12px 16px" }}
          >
            Spider-Man Outfits
          </Link>

          <Link
            href="/blog/batman-outfit-guide"
            onClick={() => setOpen(false)}
            className="nav-link"
            style={{ fontSize: "14px", padding: "12px 16px" }}
          >
            Outfit Guides
          </Link>
        </div>
      )}

      {/* Floating Search Panel */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "20px",
            width: "340px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(24px)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            padding: "20px",
            zIndex: 99,
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search outfits..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-stone-100 rounded-xl border-0 focus:ring-2 focus:ring-stone-900 focus:outline-none text-stone-900 placeholder-stone-400"
              autoFocus
            />
          </div>

          <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "16px" }}>
            {results.slice(0, 6).map((p, i) => (
              <Link
                key={i}
                href={`/products/${p.slug}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-100 transition-colors"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 truncate">{p.name}</p>
                  <p className="text-sm text-stone-500">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}