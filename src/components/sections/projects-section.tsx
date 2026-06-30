"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProjects } from "@/data/projects";

export function ProjectsSection() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="Selected projects that demonstrate my engineering capabilities."
        />

        <div className="grid gap-6">
          {featured.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{project.category}</Badge>
                        {project.featured && (
                          <Badge variant="success">Featured</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.tagline}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <Badge key={tech} variant="default">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <span className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                          <ExternalLink size={18} />
                        </span>
                      )}
                      {project.sourceUrl && (
                        <span className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                          <Code2 size={18} />
                        </span>
                      )}
                      <ArrowRight
                        size={18}
                        className="text-zinc-400 transition-all group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-200 px-5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}