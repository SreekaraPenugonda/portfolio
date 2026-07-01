"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

// Every technology from the resume + projects — with brand colours and SVG-style icons
const techs = [
  // Languages
  { name: "Python",       icon: "🐍", color: "#3776AB" },
  { name: "JavaScript",   icon: "JS", color: "#F7DF1E" },
  { name: "TypeScript",   icon: "TS", color: "#3178C6" },
  { name: "C",            icon: "C",  color: "#A8B9CC" },
  { name: "HTML",         icon: "HT", color: "#E34F26" },
  { name: "CSS",          icon: "CS", color: "#1572B6" },
  { name: "SQL",          icon: "SQL", color: "#CC2927" },
  // Frontend
  { name: "React",        icon: "⚛",  color: "#61DAFB" },
  { name: "Next.js",      icon: "N▲", color: "#ffffff" },
  { name: "Tailwind",     icon: "TW", color: "#06B6D4" },
  { name: "Redux",        icon: "Rx", color: "#764ABC" },
  // Backend / Frameworks
  { name: "Flask",        icon: "🌶", color: "#000000" },
  { name: "Node.js",      icon: "⬡",  color: "#339933" },
  { name: "Express",      icon: "Ex", color: "#888888" },
  { name: "REST API",     icon: "↔",  color: "#FF6C37" },
  // Databases
  { name: "MongoDB",      icon: "🍃", color: "#47A248" },
  { name: "MySQL",        icon: "MY", color: "#4479A1" },
  { name: "Firebase",     icon: "🔥", color: "#FFCA28" },
  { name: "SQLite",       icon: "SQ", color: "#003B57" },
  // DevOps / Cloud
  { name: "AWS",          icon: "☁",  color: "#FF9900" },
  { name: "Docker",       icon: "🐳", color: "#2496ED" },
  { name: "Kubernetes",   icon: "K8s", color: "#326CE5" },
  { name: "Render",       icon: "▲",  color: "#46E3B7" },
  { name: "Git",          icon: "GIT", color: "#F05032" },
  { name: "GitHub",       icon: "GH", color: "#ffffff" },
  // Tools
  { name: "VS Code",      icon: "⎈",  color: "#007ACC" },
  { name: "Postman",      icon: "PM", color: "#FF6C37" },
  { name: "Linux",        icon: "🐧", color: "#FCC624" },
  { name: "Figma",        icon: "Fg", color: "#F24E1E" },
];

function TechBadge({ name, icon, color }: { name: string; icon: string; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.12 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="flex shrink-0 flex-col items-center gap-1.5 select-none"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-transparent text-base font-bold transition-colors"
        style={{
          background: `${color}18`,
          borderColor: `${color}40`,
          color,
          fontSize: icon.length > 2 ? "11px" : "18px",
        }}
      >
        {icon}
      </div>
      <span
        className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
      >
        {name}
      </span>
    </motion.div>
  );
}

export function TechStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion()) return;

    const track = trackRef.current;
    // Duplicate children for seamless loop
    const original = Array.from(track.children) as HTMLElement[];
    original.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    const totalWidth = track.scrollWidth / 2;

    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      repeat: -1,
      ease: "linear",
    });

    const pause = () => tweenRef.current?.pause();
    const play = () => tweenRef.current?.play();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
    };
  }, []);

  return (
    <section
      className="py-14 overflow-hidden border-y border-zinc-100 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/40"
      aria-label="Technologies I work with"
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Technologies &amp; Tools
        </p>
      </div>

      {/* Single scrolling row */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />

        <div className="overflow-hidden px-20">
          <div
            ref={trackRef}
            className="flex gap-8 items-end"
            style={{ width: "max-content" }}
          >
            {techs.map((t) => (
              <TechBadge key={t.name} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
