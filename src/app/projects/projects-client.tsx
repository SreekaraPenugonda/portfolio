"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Filter, Clock, ArrowUpDown, LayoutGrid, Tag, Eye, TrendingUp, Download, Share2, Bookmark, ChevronDown } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { projects, getProjectCategories, categoryLabels } from "@/data/projects";

type SortOption = "latest" | "oldest" | "name" | "alphabetical";

// ── 27. Theme-aware tag cloud ────────────────────────────────────
function TagCloud({ technologies, onSelect }: { technologies: string[]; onSelect: (tech: string) => void }) {
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    projects.forEach(p => p.technologies.forEach(t => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, []);

  const maxCount = Math.max(...counts.map(([, c]) => c));

  return (
    <div className="flex flex-wrap gap-1.5">
      {counts.map(([tech, count]) => (
        <button
          key={tech}
          onClick={() => onSelect(tech)}
          className="group relative rounded-lg px-2.5 py-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all"
          style={{ opacity: 0.5 + (count / maxCount) * 0.5 }}
          title={`${tech} — used in ${count} project${count > 1 ? 's' : ''}`}
        >
          {tech}
          <span className="ml-1 text-[8px] text-zinc-400">({count})</span>
        </button>
      ))}
    </div>
  );
}

// ── 28. Project timeline visualization ───────────────────────────
function ProjectTimeline({ projects: projs }: { projects: typeof projects }) {
  const years = useMemo(() => {
    const map = new Map<string, number>();
    projs.forEach((p: typeof projects[0]) => {
      const year = p.date.slice(0, 4);
      map.set(year, (map.get(year) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [projects]);

  return (
    <div className="flex items-center gap-3">
      {years.map(([year, count], i) => (
        <div key={year} className="flex items-center gap-2">
          <div className="text-center">
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{year}</p>
            <div className="relative h-16 w-6 mx-auto flex items-end justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(20, count * 35)}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-3 rounded-full bg-gradient-to-t from-blue-500 to-indigo-500"
              />
            </div>
            <p className="text-[10px] text-zinc-500">{count} project{count > 1 ? 's' : ''}</p>
          </div>
          {i < years.length - 1 && <ChevronDown size={14} className="text-zinc-300 dark:text-zinc-700 -rotate-90" />}
        </div>
      ))}
    </div>
  );
}

// ── 29. Featured project spotlight ───────────────────────────────
function Spotlight({ project }: { project: typeof projects[0] }) {
  return (
    <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">Latest Project</span>
      </div>
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{project.title}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{project.tagline}</p>
    </div>
  );
}

export function ProjectsPageClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const categories = getProjectCategories();
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // ── 30. Keyboard shortcuts ─────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setShowFilters(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sortedAndFiltered = useMemo(() => {
    let result = projects.filter((project) => {
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const matchesCategory =
        !activeCategory || project.category === activeCategory;
      const matchesTech =
        !activeTech || project.technologies.some(t => t.toLowerCase() === activeTech.toLowerCase());
      return matchesSearch && matchesCategory && matchesTech;
    });

    if (sortBy === "latest") result = [...result].sort((a, b) => b.date.localeCompare(a.date));
    else if (sortBy === "oldest") result = [...result].sort((a, b) => a.date.localeCompare(b.date));
    else if (sortBy === "name") result = [...result].sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [search, activeCategory, activeTech, sortBy]);

  const handleClearFilters = useCallback(() => {
    setSearch(""); setActiveCategory(null); setSortBy("latest"); setActiveTech(null);
    searchRef.current?.focus();
  }, []);

  const handleTechSelect = useCallback((tech: string) => {
    setActiveTech(activeTech === tech ? null : tech);
  }, [activeTech]);

  const hasActiveFilters = search || activeCategory || sortBy !== "latest" || activeTech;

  const toggleSave = (id: string) => {
    setSavedProjects(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  // Statistics
  const statCards = [
    { label: "Total Projects", value: projects.length, icon: LayoutGrid, color: "text-blue-500" },
    { label: "Technologies Used", value: [...new Set(projects.flatMap(p => p.technologies))].length, icon: SlidersHorizontal, color: "text-emerald-500" },
    { label: "Categories", value: categories.length, icon: Tag, color: "text-purple-500" },
    { label: "Highlights", value: projects.reduce((a, p) => a + (p.highlights?.length || 0), 0), icon: Eye, color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Projects</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A selection of projects that demonstrate my engineering capabilities.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto"
        >
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + idx * 0.08 }}
                className="text-center rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-3"
              >
                <Icon size={16} className={`mx-auto mb-1 ${stat.color}`} aria-hidden="true" />
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{stat.value}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Latest spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-md mx-auto mb-8"
        >
          <Spotlight project={projects[0]} />
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search projects... (⌘K)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search projects"
                className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-10 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-600"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* View toggle */}
            <div className="flex rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" : "bg-white text-zinc-500 dark:bg-zinc-900"}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" : "bg-white text-zinc-500 dark:bg-zinc-900"}`}
                aria-label="List view"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileTap={{ scale: 0.95 }}
              className={`rounded-xl border p-2.5 transition-colors ${
                showFilters || hasActiveFilters
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
              }`}
              aria-label="Toggle filters"
            >
              <Filter size={16} />
            </motion.button>

            {/* Save count */}
            {savedProjects.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="rounded-full bg-blue-500 text-white px-2 py-0.5 text-[10px] font-bold"
                title="Projects you've saved"
              >
                {savedProjects.length}
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 max-w-2xl mx-auto">
                  {/* Category */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Category</p>
                    <div className="flex flex-wrap gap-2" role="group">
                      <button onClick={() => setActiveCategory(null)} aria-pressed={!activeCategory}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!activeCategory ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                        All
                      </button>
                      {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} aria-pressed={activeCategory === cat}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                          {categoryLabels[cat] || cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Sort by</p>
                    <div className="flex gap-2">
                      {[{ value: "latest", label: "Latest" }, { value: "oldest", label: "Oldest" }, { value: "name", label: "Name" }].map(({ value, label }) => (
                        <button key={value} onClick={() => setSortBy(value as SortOption)} aria-pressed={sortBy === value}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${sortBy === value ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tag cloud */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Popular Technologies</p>
                    <TagCloud technologies={[]} onSelect={handleTechSelect} />
                  </div>

                  {/* Timeline */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">By Year</p>
                    <ProjectTimeline projects={projects} />
                  </div>

                  {hasActiveFilters && (
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleClearFilters}
                      className="text-xs text-zinc-500 hover:text-zinc-900 underline underline-offset-2">
                      Clear all filters
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {sortedAndFiltered.length === projects.length
              ? `Showing all ${projects.length} projects`
              : `Showing ${sortedAndFiltered.length} of ${projects.length} projects`}
            {activeTech && <span className="ml-1">· Filtered by <span className="font-semibold">{activeTech}</span></span>}
          </span>
        </motion.div>

        {/* Grid/List view */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}
          >
            {sortedAndFiltered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className={viewMode === "list" ? "flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800" : ""}
              >
                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <ProjectCard project={project} index={idx} />
                </div>
                {/* Save button */}
                {viewMode === "grid" && (
                  <motion.button
                    onClick={(e) => { e.preventDefault(); toggleSave(project.id); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 left-2 z-10 p-1.5 rounded-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={savedProjects.includes(project.id) ? "Unsave project" : "Save project"}
                  >
                    <Bookmark size={14} className={savedProjects.includes(project.id) ? "text-blue-500 fill-blue-500" : "text-zinc-400"} />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {sortedAndFiltered.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Search size={24} className="text-zinc-400" />
            </div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">No projects found</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Try adjusting your search or filter criteria.</p>
            <button onClick={handleClearFilters} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500 underline underline-offset-2">
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}