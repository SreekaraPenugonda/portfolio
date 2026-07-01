"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, getProjectCategories } from "@/data/projects";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

const categoryLabels: Record<string, string> = {
  "full-stack": "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  mobile: "Mobile",
  "ai-ml": "AI/ML",
  "open-source": "Open Source",
};

export function ProjectsPageClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = getProjectCategories();

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const matchesCategory =
        !activeCategory || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projects
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A selection of projects that demonstrate my engineering capabilities.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-600"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              onClick={() => setActiveCategory(null)}
              aria-pressed={!activeCategory}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                aria-pressed={activeCategory === cat}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll Projects */}
        <HorizontalScroll>
          <div className="flex gap-6">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="w-[500px] shrink-0"
              >
                <div className="group h-full rounded-xl border border-zinc-200 bg-white p-8 transition-all hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {categoryLabels[project.category ?? ""] || project.category}
                      </Badge>
                      {project.featured && (
                        <Badge variant="success">Featured</Badge>
                      )}
                    </div>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {project.title}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      {project.live && (
                        <span
                          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                          aria-label="Live demo"
                        >
                          <ExternalLink size={16} />
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
            ))}
          </div>
        </HorizontalScroll>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-zinc-500 dark:text-zinc-400"
          >
            No projects found matching your criteria.
          </motion.div>
        )}
      </div>
    </div>
  );
}
