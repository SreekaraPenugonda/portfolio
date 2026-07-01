"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

// Every technology from the resume + projects — with brand colours and SVG-style icons
const techs = [
  // Languages
  { name: "Python",       icon: "🐍", color: "#3776AB" },
  { name: "JavaScript",   icon: "JS", color: "#F7DF1E" },
  { name: "TypeScript",   icon: "TS", color: "#3178C6" },
  { name: "C",            icon: "C",  color: "#A8B9CC" },
  { name: "WEB",         icon: "HT", color: "#E34F26" },
  // Frontend
  { name: "React",        icon: "⚛",  color: "#61DAFB" },
  // Backend / Frameworks
  { name: "Flask",        icon: "🌶", color: "#b9c219" },
  { name: "Node.js",      icon: "⬡",  color: "#339933" },
  { name: "Express",      icon: "Ex", color: "#888888" },

  // Databases
  { name: "MongoDB",      icon: "🍃", color: "#47A248" },
  { name: "Firebase",     icon: "🔥", color: "#FFCA28" },
  // DevOps / Cloud
  { name: "AWS",          icon: "☁",  color: "#FF9900" },
  { name: "Render",       icon: "▲",  color: "#46E3B7" },
  { name: "GitHub",       icon: "GH", color: "#ffffff" },
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
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

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

    // Use Framer Motion instead of gsap
    controls.start({
      x: -totalWidth,
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      },
    });

    return () => controls.stop();
  }, [controls]);

  return (
    <section
      className="py-14 overflow-hidden border-y border-zinc-100 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/40"
      aria-label="Technologies I work with"
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Technologies & Tools
        </p>
      </div>

      {/* Single scrolling row */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />

        <div className="overflow-hidden px-20">
          <motion.div
            ref={trackRef}
            className="flex gap-8 items-end"
            style={{ width: "max-content" }}
            animate={controls}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {techs.map((t) => (
              <TechBadge key={t.name} {...t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}