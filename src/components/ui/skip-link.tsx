"use client";

import { useEffect } from "react";

export function SkipLink() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey) {
        const skipLink = document.getElementById("skip-to-content");
        if (skipLink && document.activeElement === document.body) {
          e.preventDefault();
          skipLink.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <a
      id="skip-to-content"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
    >
      Skip to content
    </a>
  );
}