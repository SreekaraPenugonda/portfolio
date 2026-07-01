"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Focus, LayoutGrid, Bell, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { useRef, useState, useEffect } from "react";

// ── 20. Floating icons with different timing ─────────────────────
function FloatingIcon({ icon: Icon, className, duration = 4 }: { icon: React.ComponentType<{ size?: number | string }>; className?: string; duration?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ y: [0, -15, 0], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Icon size={20} />
    </motion.div>
  );
}

// ── 21. Typewriter heading subtitle ──────────────────────────────
function useTypewriter(text: string, speed: number = 30) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, ref };
}

// ── 22. Animated counter ─────────────────────────────────────────
function AnimatedCounter({ value, label, duration = 1500 }: { value: number; label: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); observer.disconnect(); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{count}+</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

export function ProjectsSection() {
  const featured = projects.filter(p => p.featured);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { displayed: typedText, ref: typeRef } = useTypewriter("Selected projects that demonstrate my engineering capabilities — from full-stack apps to cloud infrastructure.", 25);

  // ── 23. Carousel scroll controls ──────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 overflow-hidden relative" ref={ref}>
      {/* Background decorations */}
      <FloatingIcon icon={Sparkles} className="text-blue-200 dark:text-blue-800 top-20 left-[8%]" duration={4} />
      <FloatingIcon icon={Focus} className="text-emerald-200 dark:text-emerald-800 top-40 right-[12%]" duration={5} />
      <FloatingIcon icon={LayoutGrid} className="text-purple-200 dark:text-purple-800 bottom-32 left-[15%]" duration={3.5} />
      <FloatingIcon icon={Bell} className="text-amber-200 dark:text-amber-800 bottom-48 right-[8%]" duration={4.5} />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title={
            <span className="inline-flex items-center gap-3">
              Featured Projects
              <motion.span
                initial={{ rotate: 0 }}
                animate={isInView ? { rotate: [0, 15, -15, 10, -10, 0] } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-block"
              >
                ✨
              </motion.span>
            </span>
          }
          subtitle={typedText + (typedText.length > 0 ? "" : "")}
        />

        {/* ── 24. Stats row with animated counters ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mb-8"
        >
          <AnimatedCounter value={projects.length} label="Total Projects" />
          <div className="w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
          <AnimatedCounter value={[...new Set(projects.flatMap(p => p.technologies))].length} label="Technologies" />
          <div className="w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
          <AnimatedCounter value={5} label="Solutions" />
        </motion.div>

        {/* ── 25. Carousel with scroll buttons ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Scroll buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Scroll projects left"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Scroll projects right"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Project grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                  scale: { type: "spring", stiffness: 100, damping: 15 },
                }}
                className="animate-scale-reveal"
              >
                <ProjectCard project={project} index={idx} showDivider={false} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 26. Improved CTA with attention indicator ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="group relative inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" aria-hidden="true" />
              <span className="relative z-10">View All Projects</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
              {/* Attention dot */}
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500 animate-ping" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}