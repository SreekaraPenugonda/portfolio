"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2, Lightbulb, CheckCircle, Calendar, Tag, BookOpen } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectMetrics, categoryLabels } from "@/data/projects";
import { useRef } from "react";

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

function FadeSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>
      <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" aria-hidden="true" />
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h2>
    </div>
  );
}

export function AnimatedCaseStudy({ project }: { project: Project }) {
  const metrics = projectMetrics[project.slug];
  const containerRef = useRef<HTMLDivElement>(null);

  const techStackSections = [
    { label: "Languages", items: project.technologies.filter(t => ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "C", "SQL"].includes(t)) },
    { label: "Frameworks", items: project.technologies.filter(t => ["Flask", "React", "Next.js", "Express"].includes(t)) },
    { label: "Infrastructure", items: project.technologies.filter(t => ["Docker", "Kubernetes", "AWS", "Render", "VPC", "S3", "EC2", "Lambda", "CloudFormation", "IAM"].includes(t)) },
    { label: "Other", items: project.technologies.filter(t => !["Python", "JavaScript", "TypeScript", "HTML", "CSS", "C", "SQL", "Flask", "React", "Next.js", "Express", "Docker", "Kubernetes", "AWS", "Render", "VPC", "S3", "EC2", "Lambda", "CloudFormation", "IAM"].includes(t)) },
  ].filter(s => s.items.length > 0);

  return (
    <>
      <ProgressBar />
      <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to projects</span>
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="text-sm">
              <Tag size={12} className="mr-1" aria-hidden="true" />
              {categoryLabels[project.category ?? ""] || project.category}
            </Badge>
            {project.featured && <Badge variant="success">★ Featured</Badge>}
            <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={project.date}>{project.date}</time>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="mt-3 text-xl text-zinc-500 dark:text-zinc-400 font-medium">{project.tagline}</p>
          )}

          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {project.longDescription}
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="primary" size="lg">
                  <ExternalLink size={16} className="mr-2" aria-hidden="true" />
                  Live Demo
                </Button>
              </motion.a>
            )}
            <motion.a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg">
                <Code2 size={16} className="mr-2" aria-hidden="true" />
                Source Code
              </Button>
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent my-16"
          aria-hidden="true"
        />

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <FadeSection className="mb-20">
            <SectionHeader label="Measurable Impact" title="Key Metrics" />
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {m.value}{m.suffix || ""}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>
        )}

        {/* Architecture */}
        {project.architecture && (
          <FadeSection className="mb-20">
            <SectionHeader label="Architecture" title="How it works" />
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950/50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex mt-1 shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 items-center justify-center">
                  <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.architecture}
                </p>
              </div>
            </div>
          </FadeSection>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <FadeSection className="mb-20">
            <SectionHeader label="Key Highlights" title="What was achieved" />
            <div className="grid gap-4 sm:grid-cols-2">
              {project.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{h}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>
        )}

        {/* Key Learnings */}
        {project.keyLearnings && project.keyLearnings.length > 0 && (
          <FadeSection className="mb-20">
            <SectionHeader label="Key Learnings" title="What I learned" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.keyLearnings.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 hover:border-amber-200 dark:hover:border-amber-800 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-amber-50 p-2 dark:bg-amber-950/50 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-colors">
                      <Lightbulb size={16} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{l}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeSection>
        )}

        {/* Technologies with categories */}
        <FadeSection className="mb-20">
          <SectionHeader label="Tech Stack" title="Technologies used" />
          <div className="space-y-6">
            {techStackSections.map((section) => (
              <div key={section.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">{section.label}</p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Navigation footer */}
        <FadeSection>
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Project built by <span className="font-semibold text-zinc-700 dark:text-zinc-300">Sreekara Penugonda</span>
              </p>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    Live Demo
                  </motion.a>
                )}
                <motion.a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  <Code2 size={14} aria-hidden="true" />
                  Source
                </motion.a>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Back link */}
        <FadeSection delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Back to all projects
            </Link>
          </div>
        </FadeSection>
      </div>
    </>
  );
}