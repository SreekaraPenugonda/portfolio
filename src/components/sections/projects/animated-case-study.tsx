"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function StickySection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`sticky top-14 h-screen flex items-center justify-center overflow-hidden ${className || ""}`}
    >
      {children}
    </section>
  );
}

function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxLayer({
  children,
  speed = 0.5,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

function RotatingDevice({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: 45, scale: 0.8 }}
      animate={
        isInView
          ? { opacity: 1, rotateY: 0, scale: 1 }
          : { opacity: 0, rotateY: 45, scale: 0.8 }
      }
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <div className="ml-4 h-5 flex-1 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function FloatingMetric({
  label,
  value,
  icon,
  delay = 0,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4"
    >
      <div className="text-zinc-400">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {value}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </motion.div>
  );
}

export function AnimatedCaseStudy({ project }: { project: Project }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section — Device rotates into view */}
      <StickySection>
        <motion.div
          style={{ scale, opacity, borderRadius }}
          className="w-full max-w-5xl px-4"
        >
          <RotatingDevice delay={0.2}>
            <div className="p-8 sm:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{project.category}</Badge>
                  {project.featured && (
                    <Badge variant="success">Featured</Badge>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h1>
                <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
                  {project.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="lg">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg">
                        <Code2 size={16} className="mr-2" />
                        Source Code
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </RotatingDevice>
        </motion.div>
      </StickySection>

      {/* Spacer for hero */}
      <div className="h-screen" />

      {/* Metrics Section — Cards fly in */}
      <StickySection>
        <div className="w-full max-w-5xl px-4">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Measurable Impact
              </p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Key Metrics
              </h2>
            </div>
          </FadeInSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.highlights.slice(0, 3).map((highlight, i) => (
              <FloatingMetric
                key={i}
                label={highlight}
                value={`0${i + 1}`}
                icon={<div className="h-2 w-2 rounded-full bg-current" />}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </StickySection>

      {/* Spacer for metrics */}
      <div className="h-screen" />

      {/* Scroll-driven Storytelling — Architecture section */}
      {project.architecture && (
        <>
          <StickySection>
            <div className="w-full max-w-5xl px-4">
              <ParallaxLayer speed={0.3}>
                <FadeInSection>
                  <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Architecture
                      </p>
                      <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        How it works
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.architecture}
                      </p>
                    </div>
                    <div className="relative">
                      <RotatingDevice delay={0.3}>
                        <div className="p-8">
                          <div className="space-y-4">
                            {/* Architecture diagram blocks */}
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              {["Client", "API", "Cache", "DB"].map(
                                (layer, i) => (
                                  <motion.div
                                    key={layer}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                  >
                                    {layer}
                                  </motion.div>
                                )
                              )}
                            </div>
                            <div className="flex items-center justify-center gap-1 text-zinc-300 dark:text-zinc-600">
                              <span>←</span>
                              <span className="text-xs">data flow</span>
                              <span>→</span>
                            </div>
                          </div>
                        </div>
                      </RotatingDevice>
                    </div>
                  </div>
                </FadeInSection>
              </ParallaxLayer>
            </div>
          </StickySection>
          <div className="h-screen" />
        </>
      )}

      {/* Highlights Section — Before/After style */}
      <StickySection>
        <div className="w-full max-w-5xl px-4">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Key Highlights
              </p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                What was achieved
              </h2>
            </div>
          </FadeInSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {highlight}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </StickySection>
      <div className="h-screen" />

      {/* Technologies Section */}
      <StickySection>
        <div className="w-full max-w-5xl px-4">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Tech Stack
              </p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Technologies used
              </h2>
            </div>
          </FadeInSection>
          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </StickySection>
      <div className="h-screen" />

      {/* Back to projects */}
      <div className="h-[50vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}