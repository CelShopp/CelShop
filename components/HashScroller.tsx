"use client";

import { useEffect } from "react";

function scrollToId(id: string, behavior: ScrollBehavior) {
  let attempts = 0;
  const maxAttempts = 30;

  const tryScroll = () => {
    attempts += 1;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
      return;
    }

    if (attempts < maxAttempts) {
      window.setTimeout(tryScroll, 100);
    }
  };

  tryScroll();
}

export default function HashScroller() {
  useEffect(() => {
    const handle = (behavior: ScrollBehavior) => {
      const hash = window.location.hash || "";
      if (!hash.startsWith("#")) return;
      const id = decodeURIComponent(hash.slice(1));
      if (!id) return;
      scrollToId(id, behavior);
    };

    const onHashChange = () => handle("smooth");

    handle("auto");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
