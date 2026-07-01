"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Download, Send, Code2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useRef, useEffect, useState } from "react";

// ── Animated counter ──────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, to]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Typing headline ───────────────────────────────────────────────
const roles = [
  "Full-Stack Developer",
  "Cloud Engineer",
  "SIH 2024 Winner",
  "Problem Solver",
  "AWS Intern",
];

function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="text-zinc-900 dark:text-zinc-50">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ── Tilt image card ───────────────────────────────────────────────
function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative shrink-0 hidden lg:block"
    >
      {/* Glow ring */}
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-emerald-500/20 blur-2xl" />

      {/* Photo */}
      <div className="relative h-[420px] w-[360px] overflow-hidden rounded-[2rem] border border-zinc-200/60 shadow-2xl dark:border-zinc-700/50">
        <Image
          src="/images/image.png"
          alt="Sreekara Penugonda — Full-Stack Developer & AWS Intern"
          fill
          priority
          sizes="360px"
          className="object-cover"
        />
        {/* Subtle gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Floating badge — SIH Winner */}
        <motion.div
          style={{ translateZ: 40 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm dark:bg-zinc-900/90"
        >
          <span className="text-lg">🏆</span>
          <div>
            <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight">SIH 2024 Winner</p>
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">Smart India Hackathon</p>
          </div>
        </motion.div>

        {/* Floating badge — AWS */}
        <motion.div
          style={{ translateZ: 30 }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="absolute top-5 right-5 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm dark:bg-zinc-900/90"
        >
          <span className="text-lg">☁️</span>
          <div>
            <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight">AWS Intern</p>
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">SkillCraft Technology</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 overflow-hidden">

      {/* Background — layered gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
        <div className="absolute bottom-0 left-0 h-[40%] w-[40%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.07),transparent)]" />
        <div className="absolute top-0 right-0 h-[40%] w-[40%] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07),transparent)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:60px_60px] dark:[background:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[size:60px_60px]" />
      </div>

      <div className="mx-auto max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── Left — Text ──────────────────────────────────────── */}
        <div className="flex-1 text-center lg:text-left">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 dark:border-emerald-900/50 dark:bg-emerald-950/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl"
          >
            Penugonda{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Sreekara
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-3 text-xl font-semibold text-zinc-500 dark:text-zinc-400 sm:text-2xl"
          >
            <TypingRole />
          </motion.div>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 lg:mx-0"
          >
            B.Tech CSE student at Vignan&apos;s University who{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              won Smart India Hackathon 2024
            </strong>
            , completed an{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              AWS Cloud internship
            </strong>
            , and shipped three real products — from a voice-command productivity app to a
            QR analytics platform used at D-Mart and Reliance. I write clean code,
            deploy to the cloud, and solve problems that matter.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-7 flex flex-wrap justify-center gap-6 lg:justify-start"
          >
            {[
              { value: 286, suffix: "+", label: "LeetCode Solved" },
              { value: 3, suffix: "", label: "Live Projects" },
              { value: 8, suffix: "+", label: "Certifications" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  <Counter to={value} suffix={suffix} />
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              See My Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-7 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <Send size={15} />
              Hire Me
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Download size={15} />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 flex items-center justify-center gap-4 lg:justify-start"
          >
            {/* GitHub */}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-zinc-400 transition-colors hover:text-blue-600"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* LeetCode */}
            <a
              href={siteConfig.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile"
              className="text-zinc-400 transition-colors hover:text-amber-500"
            >
              <Code2 size={20} />
            </a>
            <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-400">
              231fa04970@gmail.com
            </span>
          </motion.div>
        </div>

        {/* ── Right — 3-D tilt photo ──────────────────────────── */}
        <TiltPhoto />
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            scroll
          </span>
          <ArrowDown size={16} className="text-zinc-400 dark:text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
