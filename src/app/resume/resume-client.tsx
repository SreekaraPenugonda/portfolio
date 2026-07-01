"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Download, Mail, Phone, Globe, MapPin, ExternalLink,
  Calendar, Award, BookOpen, Code2, Briefcase, GraduationCap,
  Copy, Check, Share2, ChevronRight, Star,
  Layers, Terminal, Cloud, Database, Wrench, Users,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getSkillsByCategory } from "@/data/skills";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { experiences, education, workExperience } from "@/data/experience";
import { cn } from "@/lib/utils";

// Inline GitHub SVG — lucide-react doesn't export Github/Linkedin
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ── Skill category metadata ───────────────────────────────────────
const CATEGORY_META: Record<string, { label: string; icon: React.ComponentType<{ size?: number | string; className?: string }>; color: string }> = {
  languages: { label: "Languages",        icon: Code2,      color: "text-blue-500"   },
  frontend:  { label: "Frontend",         icon: Layers,     color: "text-purple-500" },
  backend:   { label: "Backend",          icon: Terminal,   color: "text-emerald-500"},
  database:  { label: "Databases",        icon: Database,   color: "text-amber-500"  },
  devops:    { label: "Cloud & DevOps",   icon: Cloud,      color: "text-sky-500"    },
  tools:     { label: "Tools",            icon: Wrench,     color: "text-rose-500"   },
};

// ── Copy-to-clipboard hook ────────────────────────────────────────
function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return { copied, copy };
}

// ── Sticky sidebar nav ────────────────────────────────────────────
const SECTIONS = [
  { id: "summary",       label: "Summary",       icon: Star        },
  { id: "skills",        label: "Skills",         icon: Code2       },
  { id: "experience",    label: "Experience",     icon: Briefcase   },
  { id: "education",     label: "Education",      icon: GraduationCap },
  { id: "projects",      label: "Projects",       icon: Layers      },
  { id: "certifications",label: "Certifications", icon: Award       },
  { id: "coursework",    label: "Coursework",     icon: BookOpen    },
  { id: "leadership",    label: "Leadership",     icon: Users       },
  { id: "interests",     label: "Interests",      icon: Star        },
];

function SidebarNav({ active }: { active: string }) {
  return (
    <nav aria-label="Resume sections" className="hidden xl:flex flex-col gap-1 sticky top-24 self-start w-44 shrink-0">
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            active === id
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          )}
        >
          <Icon size={14} />
          {label}
        </a>
      ))}
    </nav>
  );
}

// ── Section wrapper ───────────────────────────────────────────────
function Section({ id, title, icon: Icon, children }: {
  id: string; title: string; icon: React.ComponentType<{ size?: number | string; className?: string }>; children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-24"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
        <Icon size={17} className="text-zinc-400" />
        <h2 className="text-base font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

// ── Skill badge with tooltip ──────────────────────────────────────
const SKILL_CONTEXT: Record<string, string> = {
  "Python":      "Used in Flask apps & data scripts",
  "JavaScript":  "Core language across all projects",
  "TypeScript":  "Used in Command Center — typed React + Node",
  "Flask":       "Backend for Grocery App & QUO-RION",
  "React":       "Frontend for Command Center & portfolio",
  "Docker":      "Containerised Command Center deployment",
  "Kubernetes":  "Orchestrated Command Center on Render",
  "AWS":         "EC2, S3, Lambda, IAM, VPC — SkillCraft internship",
  "MongoDB":     "Used in full-stack projects",
  "MySQL":       "Relational DB for structured data projects",
  "Git":         "Version control across all projects",
  "Node.js":     "Server-side JS for REST APIs",
};

function SkillBadge({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const ctx = SKILL_CONTEXT[name];
  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => ctx && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => ctx && setOpen(true)}
        onBlur={() => setOpen(false)}
        className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-zinc-500"
      >
        {name}
      </button>
      <AnimatePresence>
        {open && ctx && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 w-44 rounded-lg border border-zinc-200 bg-white p-2 text-[11px] text-zinc-600 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {ctx}
            <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export function ResumeClient() {
  const { copied: emailCopied, copy: copyEmail } = useCopy(siteConfig.links.email);
  const { copied: urlCopied, copy: copyUrl } = useCopy(
    typeof window !== "undefined" ? window.location.href : "https://sreekara.dev/resume"
  );
  const [activeSection, setActiveSection] = useState("summary");

  // Intersection observer to track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const byCategory = getSkillsByCategory();
  const workExp = workExperience;

  return (
    <div className="min-h-screen py-20 px-4 print:py-0 print:px-0">
      <div className="mx-auto max-w-5xl">

        {/* ── Top action bar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Resume
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Last updated: {siteConfig.resumeLastUpdated ?? "2026"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              title="Copy email address"
            >
              {emailCopied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
              {emailCopied ? "Copied!" : "Copy Email"}
            </button>
            <button
              onClick={copyUrl}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              title="Share resume URL"
            >
              {urlCopied ? <Check size={15} className="text-emerald-500" /> : <Share2 size={15} />}
              {urlCopied ? "Link Copied!" : "Share"}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              aria-label="Download resume as PDF"
            >
              <Download size={15} />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* ── Layout: sidebar + content ───────────────────────── */}
        <div className="flex gap-10">
          <SidebarNav active={activeSection} />

          <div className="flex-1 min-w-0 space-y-12">

            {/* ── Header card ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-7 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
            >
              {/* SIH Winner badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 dark:border-amber-900/50 dark:bg-amber-950/40">
                <span>🏆</span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  Smart India Hackathon 2024 Winner
                </span>
              </div>

              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                Penugonda Sreekara Venkata Naga Durga Sai Uday
              </h2>
              <p className="mt-1 text-base font-semibold text-zinc-500 dark:text-zinc-400">
                Full-Stack Developer · AWS Cloud Intern · B.Tech CSE (2023–Present)
              </p>

              {/* Contact row */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <a href={`mailto:${siteConfig.links.email}`} className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  <Mail size={14} />{siteConfig.links.email}
                </a>
                <span className="flex items-center gap-1.5">
                  <Phone size={14} />{siteConfig.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />{siteConfig.location}
                </span>
                <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  <Globe size={14} />{siteConfig.url}
                </a>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  <GithubIcon size={14} />GitHub
                </a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  <ExternalLink size={14} />LinkedIn
                </a>
                <a href={siteConfig.links.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                  <Code2 size={14} />LeetCode
                </a>
              </div>
            </motion.div>

            {/* ── Professional Summary ─────────────────────────── */}
            <Section id="summary" title="Professional Summary" icon={Star}>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                B.Tech Computer Science student at Vignan&apos;s University (CGPA 7.35) with hands-on experience
                building and deploying full-stack applications using Python, Flask, React, and TypeScript.
                <strong className="font-semibold text-zinc-800 dark:text-zinc-200"> Won Smart India Hackathon 2024</strong> — India&apos;s
                largest student innovation competition. Completed an <strong className="font-semibold text-zinc-800 dark:text-zinc-200">AWS Cloud internship at SkillCraft Technology</strong>,
                gaining production-grade exposure to EC2, S3, Lambda, IAM, VPC, and the AWS Well-Architected Framework.
                Solved 286+ LeetCode problems with strong DSA foundations. Actively seeking internship or entry-level
                roles in <strong className="font-semibold text-zinc-800 dark:text-zinc-200">full-stack development or cloud engineering</strong> where
                I can ship real products from day one.
              </p>
            </Section>

            {/* ── Skills ──────────────────────────────────────── */}
            <Section id="skills" title="Technical Skills" icon={Code2}>
              <div className="space-y-4">
                {Object.entries(byCategory).map(([cat, catSkills]) => {
                  const meta = CATEGORY_META[cat];
                  if (!meta) return null;
                  const Icon = meta.icon;
                  return (
                    <div key={cat} className="flex flex-col gap-2 sm:flex-row sm:items-start">
                      <div className={cn("flex items-center gap-1.5 w-36 shrink-0 text-xs font-semibold", meta.color)}>
                        <Icon size={13} />
                        {meta.label}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map((s) => (
                          <SkillBadge key={s.name} name={s.name} />
                        ))}
                      </div>
                    </div>
                  );
                })}
                {/* Soft skills */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <div className="flex items-center gap-1.5 w-36 shrink-0 text-xs font-semibold text-pink-500">
                    <Users size={13} />
                    Soft Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Problem Solving", "Self-Learning", "Leadership", "Adaptability", "Presentation", "Motivation"].map((s) => (
                      <span key={s} className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* ── Experience & Internships ─────────────────────── */}
            <Section id="experience" title="Experience & Internships" icon={Briefcase}>
              <div className="relative space-y-6">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
                {workExp.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900" />
                    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-50">{exp.title}</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {exp.company} · {exp.location}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-zinc-400 shrink-0">
                          <Calendar size={12} />{exp.period}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {exp.description.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <ChevronRight size={13} className="mt-0.5 shrink-0 text-zinc-400" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span key={t} className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ── Education — visual timeline ──────────────────── */}
            <Section id="education" title="Education" icon={GraduationCap}>
              <div className="relative space-y-5">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
                {education.map((edu, idx) => {
                  const cgpaMatch = edu.description[0]?.match(/CGPA:\s*([\d.]+)/);
                  const cgpa = cgpaMatch?.[1];
                  const cgpaNum = cgpa ? parseFloat(cgpa) : 0;
                  const cgpaColor = cgpaNum >= 9 ? "text-emerald-600 dark:text-emerald-400"
                    : cgpaNum >= 7 ? "text-blue-600 dark:text-blue-400"
                    : "text-amber-600 dark:text-amber-400";
                  return (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900" />
                      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-zinc-50">{edu.title}</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{edu.company} · {edu.location}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="flex items-center gap-1 text-xs text-zinc-400">
                              <Calendar size={12} />{edu.period}
                            </span>
                            {cgpa && (
                              <span className={cn("text-sm font-bold", cgpaColor)}>
                                CGPA {cgpa}/10
                              </span>
                            )}
                          </div>
                        </div>
                        {edu.description.length > 1 && (
                          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                            {edu.description.slice(1).join(" · ")}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Section>

            {/* ── Projects ────────────────────────────────────── */}
            <Section id="projects" title="Projects" icon={Layers}>
              <div className="space-y-5">
                {projects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-zinc-50">{p.title}</p>
                        {p.tagline && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{p.tagline}</p>
                        )}
                      </div>
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Source — ${p.title}`}
                        className="shrink-0 rounded-lg border border-zinc-200 p-1.5 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:hover:text-zinc-50"
                      >
                        <Code2 size={15} />
                      </a>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {p.description}
                    </p>
                    {p.highlights && p.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {p.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            <ChevronRight size={12} className="mt-0.5 shrink-0 text-zinc-400" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ── Certifications ──────────────────────────────── */}
            <Section id="certifications" title="Certifications" icon={Award}>
              <div className="grid gap-3 sm:grid-cols-2">
                {achievements.map((a, idx) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-4 transition",
                      a.type === "award"
                        ? "border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20"
                        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
                    )}
                  >
                    <span className="text-xl shrink-0">
                      {a.type === "award" ? "🏆" : a.type === "recognition" ? "⭐" : "📜"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                        {a.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {a.description}
                      </p>
                      <p className="mt-1 text-[10px] text-zinc-400">{a.date.slice(0, 7)}</p>
                    </div>
                    {a.url && (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${a.title}`}
                        className="ml-auto shrink-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ── Coursework ───────────────────────────────────── */}
            <Section id="coursework" title="Relevant Coursework" icon={BookOpen}>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Data Structures & Algorithms", badge: "Core CS" },
                  { name: "Operating Systems",            badge: "Core CS" },
                  { name: "Object Oriented Programming",  badge: "Core CS" },
                  { name: "Database Management System",   badge: "Core CS" },
                  { name: "Software Engineering",         badge: "Core CS" },
                  { name: "Networking Fundamentals",      badge: "Cisco Certified" },
                  { name: "Cloud Computing",              badge: "AWS Internship" },
                  { name: "HR Analytics",                 badge: "Certified" },
                  { name: "Principles of Management",     badge: "Certified" },
                ].map(({ name, badge }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{name}</span>
                    <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Leadership & Extracurricular ─────────────────── */}
            <Section id="leadership" title="Leadership & Extracurricular" icon={Users}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-purple-200 bg-purple-50/50 p-5 dark:border-purple-900/40 dark:bg-purple-950/20"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-zinc-50">
                        On Stage Events Lead
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Mahostav 2024 · Vignan&apos;s Foundation for Science, Technology and Research
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 shrink-0">
                      <Calendar size={12} />February 2024
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {[
                      "Led and coordinated all on-stage events for Mahostav 2024, Vignan's annual cultural fest.",
                      "Managed a cross-functional team ensuring smooth execution of performances for 1000+ attendees.",
                      "Demonstrated leadership, communication, and real-time problem-solving under pressure.",
                    ].map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <ChevronRight size={13} className="mt-0.5 shrink-0 text-purple-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </Section>

            {/* ── Areas of Interest ────────────────────────────── */}
            <Section id="interests" title="Areas of Interest" icon={BookOpen}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: "🌐", title: "Web Development",          desc: "Full-stack apps with React, Next.js, Flask & Node.js" },
                  { icon: "🎨", title: "UI/UX Design",             desc: "Building accessible, beautiful user interfaces" },
                  { icon: "📱", title: "Mobile App Development",   desc: "Cross-platform apps and responsive PWAs" },
                  { icon: "☁️", title: "Cloud Security",           desc: "AWS security architecture, IAM, and compliance" },
                ].map(({ icon, title, desc }) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ── What I'm looking for ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-indigo-950/30"
            >
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-3">
                <Star size={14} />
                What I&apos;m Looking For
              </h3>
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                I&apos;m actively seeking <strong>internship or entry-level roles</strong> in{" "}
                <strong>full-stack development or cloud engineering</strong>. I want to join a team
                where I can contribute to real products from day one, grow my skills in a collaborative
                environment, and take ownership of meaningful engineering challenges. I thrive in
                fast-paced, learning-heavy environments and bring both technical depth and leadership
                energy to every team I join.
              </p>
            </motion.div>

            {/* ── References ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/30"
            >
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
                📋 Professional references available on request
              </p>
            </motion.div>

            {/* ── Last updated + Hire Me CTA ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/60 print:hidden"
            >
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                Last updated: {siteConfig.resumeLastUpdated ?? "2026"} · Sreekara Penugonda
              </p>
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                Convinced? Let&apos;s talk.
              </h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                I&apos;m open to internships, full-time roles, and interesting collaborations.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:from-blue-500 hover:to-indigo-500 hover:-translate-y-0.5"
                >
                  Hire Me →
                </Link>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <Mail size={15} />
                  Email Me
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <Download size={15} />
                  Download PDF
                </a>
              </div>
            </motion.div>

          </div>{/* end content col */}
        </div>{/* end flex layout */}
      </div>{/* end max-w */}

      {/* ── Print-only footer ────────────────────────────────── */}
      <div className="hidden print:block mt-8 border-t border-zinc-200 pt-4 text-center text-xs text-zinc-400">
        {siteConfig.url} · {siteConfig.links.email} · {siteConfig.phone}
      </div>
    </div>
  );
}
