"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Code2, Calendar, Layers, Star, GitFork, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { categoryLabels, categoryColors, cardGradients } from "@/data/projects";
import { prefersReducedMotion } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const techColors: Record<string, string> = {
  Python: "bg-blue-500", JavaScript: "bg-yellow-500", TypeScript: "bg-blue-600",
  React: "bg-cyan-500", Flask: "bg-green-600", Docker: "bg-sky-500",
  Kubernetes: "bg-indigo-500", AWS: "bg-orange-500", SQLite: "bg-gray-500",
  HTML: "bg-red-500", CSS: "bg-purple-500", "REST API": "bg-teal-500",
  Render: "bg-emerald-500", VPC: "bg-violet-500", Lambda: "bg-amber-500",
  S3: "bg-green-500", EC2: "bg-red-600", CloudFormation: "bg-blue-400",
  IAM: "bg-pink-500", OSPF: "bg-cyan-600", VLAN: "bg-fuchsia-500",
  STP: "bg-lime-500", ACL: "bg-rose-500", IoT: "bg-teal-600",
  "Cisco Packet Tracer": "bg-slate-500", MongoDB: "bg-green-600",
};

// ── 1. Skill level indicator ─────────────────────────────────────
function SkillLevelDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
        active ? "bg-zinc-400 scale-100" : "bg-zinc-200 dark:bg-zinc-700 scale-75"
      }`}
    />
  );
}

// ── 2. Ripple button ─────────────────────────────────────────────
function RippleButton({ label, icon: Icon, onClick, href, reduced }: {
  label: string; icon: React.ComponentType<{ size?: number | string; className?: string }>; onClick?: (e: React.MouseEvent) => void;
  href?: string; reduced: boolean;
}) {
  const btnRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Ripple effect
    if (btnRef.current && !reduced) {
      const rect = btnRef.current.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btnRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    if (onClick) onClick(e);
  };

  return (
    <span
      ref={btnRef}
      className="relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 overflow-hidden cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${label} ${href ? `- ${href}` : ''}`}
      onKeyDown={(e) => { if (e.key === 'Enter' && href) window.open(href, '_blank', 'noopener,noreferrer'); }}
    >
      <Icon size={13} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  showDivider?: boolean;
}

export function ProjectCard({ project, index = 0, showDivider = true }: ProjectCardProps) {
  const gradient = cardGradients[index % cardGradients.length];
  const catColor = categoryColors[project.category ?? ""] || "";
  const catLabel = categoryLabels[project.category ?? ""] || project.category || "Project";
  const reduced = prefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // ── 3. Mouse parallax on hover ─────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || reduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty("--rotate-x", `${y * -6}deg`);
    cardRef.current.style.setProperty("--rotate-y", `${x * 6}deg`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rotate-x", "0deg");
      cardRef.current.style.setProperty("--rotate-y", "0deg");
    }
  };

  // ── 4. Intersection-based entrance ─────────────────────────────
  const [hasEntered, setHasEntered] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasEntered(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── 5. Skill level (simulated) ────────────────────────────────
  const skillLevel = Math.min(3 + (project.technologies.length * 2), 10);

  return (
    <div ref={observerRef} className="h-full project-card-grid">
      <div
        role="article"
        aria-label={`Project: ${project.title}. ${project.technologies.length} technologies used. ${project.featured ? "Featured" : ""}`}
        className="h-full"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-2xl"
        >
          <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative h-full overflow-hidden rounded-2xl border bg-white transition-all duration-500 dark:bg-zinc-900/50 ${
              isHovered
                ? "border-zinc-300 shadow-2xl -translate-y-1 dark:border-zinc-700 animate-border"
                : "border-zinc-200 shadow-sm dark:border-zinc-800"
            }`}
            style={{
              transform: `perspective(800px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            }}
          >
            {/* ── 6. Hover gradient overlay ─────────────────────── */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} ${
                isHovered ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              aria-hidden="true"
            />

            {/* ── 7. Top shine border on hover ──────────────────── */}
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              aria-hidden="true"
            />

            {/* ── 8. Image placeholder (gradient-based since images are placeholders) ── */}
            <div className="relative h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`flex items-center gap-4 ${isHovered ? "scale-105" : "scale-100"} transition-transform duration-500`}>
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={tech}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white ${techColors[tech] || "bg-zinc-400"} ${
                        hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      } transition-all duration-500`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {tech.slice(0, 2).toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              {/* ── 9. Gradient overlay at bottom of image area ── */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-zinc-900/50 to-transparent" />
            </div>

            <div className="relative p-5 sm:p-6 flex flex-col">
              {/* ── 10. Category + Date with skill dots ─────────── */}
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${catColor}`} title={`Category: ${catLabel}`}>
                  <Layers size={10} aria-hidden="true" />
                  {catLabel}
                </span>
                <div className="flex items-center gap-2">
                  {/* ── 11. Skill indicator dots ──────────────── */}
                  <span className="hidden sm:flex items-center gap-[2px]" title="Skill complexity indicator">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <SkillLevelDot key={i} active={i < skillLevel / 2} />
                    ))}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                    <Calendar size={10} aria-hidden="true" />
                    <time dateTime={project.date}>{project.date}</time>
                  </span>
                </div>
              </div>

              {/* ── 12. Featured badge with star ─────────────────── */}
              {project.featured && (
                <Badge variant="success" className="absolute top-4 right-4 text-[10px] px-2 py-0.5" aria-label="Featured project">
                  <Star size={10} className="mr-0.5" aria-hidden="true" />
                  Featured
                </Badge>
              )}

              {/* ── 13. Title with gradient on hover ─────────────── */}
              <h3 className={`text-lg font-bold transition-all duration-300 ${
                isHovered
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                  : "text-zinc-900 dark:text-zinc-50"
              }`}>
                {project.title}
              </h3>

              {/* ── 14. Tagline with typewriter effect on first visit ── */}
              {project.tagline && (
                <p className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                  {project.tagline}
                </p>
              )}

              {/* ── 15. Description with gradient text fade ───────── */}
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {project.description}
              </p>

              {/* ── 16. Tech stack with colored dots and hover scale ── */}
              <div className="mt-3 flex flex-wrap gap-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium transition-all duration-200 ${
                      isHovered ? "bg-zinc-100 dark:bg-zinc-800 scale-105" : "bg-zinc-50 dark:bg-zinc-800/50"
                    }`}
                    title={tech}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${techColors[tech] || "bg-zinc-400"}`} aria-hidden="true" />
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium text-zinc-400 dark:text-zinc-500"
                    title={`${project.technologies.length - 4} more technologies`}
                  >
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* ── 17. Bottom actions with showDivider ───────────── */}
              <div className={`mt-4 flex items-center justify-between ${
                showDivider ? "pt-3 border-t border-zinc-100 dark:border-zinc-800" : ""
              }`}>
                <div className="flex items-center gap-1">
                  {project.liveUrl && (
                    <RippleButton
                      label="Live"
                      icon={ExternalLink}
                      href={project.liveUrl}
                      onClick={(e) => { e.preventDefault(); window.open(project.liveUrl, "_blank", "noopener,noreferrer"); }}
                      reduced={reduced}
                    />
                  )}
                  <RippleButton
                    label="Code"
                    icon={Code2}
                    href={project.sourceUrl}
                    onClick={(e) => { e.preventDefault(); window.open(project.sourceUrl, "_blank", "noopener,noreferrer"); }}
                    reduced={reduced}
                  />
                </div>

                {/* ── 18. Arrow with spring animation ──────────── */}
                <ArrowRight
                  size={16}
                  className={`text-zinc-300 transition-all duration-300 dark:text-zinc-600 ${
                    isHovered ? "translate-x-1 text-blue-500 dark:text-blue-400" : ""
                  }`}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* ── 19. Corner decoration on hover ────────────────── */}
            <div
              className={`absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-xl ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } transition-all duration-500`}
              aria-hidden="true"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}