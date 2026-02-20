"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
useEffect(() => {
  if (open) {
    setMounted(true);

    requestAnimationFrame(() => {
      setAnimate(true);
    });

  } else {
    setAnimate(false);
    setTimeout(() => setMounted(false), 180);
  }
}, [open]);
  return (
    <header className="glass-header">
      <nav
        className="glass-nav"
        role="navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        aria-label="Main Navigation"
>
    
      
        {/* LOGO */}
        <div>
          <Link href="/" className="logo-text">
            CelebStore
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul
          className="desktop-nav"
        >
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

        {/* Hamburger */}
        <div>
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          aria-expanded={open}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button> </div>

        {/* Mobile Menu */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998
            }}
          />
        )}
{mounted && (
  <div
    style={{
      position: "fixed",
      top: "70px",
      right: "20px",
      width: "220px",
      background: "rgba(255,255,255,0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
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
      transition: "all 0.48s ease"
    }}
  
  >
    <Link
      href="/collections/batman"
      onClick={() => setOpen(false)}
      style={{
        padding: "10px 12px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "#000",
        fontWeight: 500,
        background: "rgba(0,0,0,0.03)"
      }}
    >
      Batman Outfits
    </Link>

    <Link href="/collections/spiderman" onClick={() => setOpen(false)} style={{
        padding: "10px 12px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "#000",
        fontWeight: 500,
        background: "rgba(0,0,0,0.03)"
      }}>
      Spider-Man Outfits
    </Link>

    <Link href="/blog/batman-outfit-guide" onClick={() => setOpen(false)} style={{
        padding: "10px 12px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "#000",
        fontWeight: 500,
        background: "rgba(0,0,0,0.03)"
      }}>
      Outfit Guides
    </Link>
  </div>
)}
      </nav>
    </header>
  );
}