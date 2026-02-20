"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
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
          <>
            {/* BACKDROP */}
            <div
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.2)",
                zIndex: 9998
              }}
            />

            {/* DRAWER */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "260px",
                height: "100vh",
                background: "#fbfaf0",
                zIndex: 9999,
                padding: "25px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "-5px 0 15px rgba(0,0,0,0.1)"
              }}
            >
              <Link href="/collections/batman" onClick={() => setOpen(false)}>
                Batman Outfits
              </Link>
        
              <Link href="/collections/spiderman" onClick={() => setOpen(false)}>
                Spider-Man Outfits
              </Link>
        
              <Link href="/blog/batman-outfit-guide" onClick={() => setOpen(false)}>
                Outfit Guides
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}