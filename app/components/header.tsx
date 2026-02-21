"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "../../lib/products";
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
      setTimeout(() => setMounted(false), 180);
    }
  }, [open]);

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Search filter */
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const results = filtered.length > 0 ? filtered : products;

  return (
    <header
      className="glass-header"
      style={{
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
        boxShadow: scrolled
          ? "0 12px 40px rgba(0,0,0,0.12)"
          : "0 8px 30px rgba(0,0,0,0.08)",
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
          CelebStore
        </Link>

        {/* Desktop Menu */}
        <ul className="desktop-nav">
          <li>
            <Link href="/collections/batman" className="nav-link">
              Batman Outfits
            </Link>
          </li>
          <li>
            <Link href="/collections/spiderman" className="nav-link">
              Spider-Man Outfits
            </Link>
          </li>
          <li>
            <Link href="/blog/batman-outfit-guide" className="nav-link">
              Outfit Guides
            </Link>
          </li>
        </ul>

        {/* Right Controls */}
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            🔍︎
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            aria-expanded={open}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
        </div>

        {/* Backdrop for mobile menu */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
            }}
          />
        )}
      </nav>

      {/* Floating Mobile Menu */}
      {mounted && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            width: "220px",
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(16px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            padding: "10px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            opacity: animate ? 1 : 0,
            transform: animate ? "scale(1)" : "scale(0.95)",
            pointerEvents: open ? "auto" : "none",
            transition: "all 0.18s ease",
          }}
        >
          <Link
            href="/collections/batman"
            onClick={() => setOpen(false)}
            className="nav-link"
          >
            Batman Outfits
          </Link>

          <Link
            href="/collections/spiderman"
            onClick={() => setOpen(false)}
            className="nav-link"
          >
            Spider-Man Outfits
          </Link>

          <Link
            href="/blog/batman-outfit-guide"
            onClick={() => setOpen(false)}
            className="nav-link"
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
            top: "80px",
            right: "20px",
            width: "300px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            padding: "20px",
            zIndex: 10000,
          }}
        >
          <input
            type="text"
            placeholder="Search outfits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "15px",
            }}
          />

          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {results.slice(0, 5).map((p, i) => (
              <Link
                key={i}
                href={`/products/${p.slug}`}
                onClick={() => setSearchOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 0",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}