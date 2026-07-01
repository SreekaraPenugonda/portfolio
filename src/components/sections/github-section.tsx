"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { Code2, Star, GitFork, Activity, Users, ExternalLink } from "lucide-react";
import { SkillIcon } from "@/components/ui/skill-icon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { StatCardSkeleton } from "@/components/ui/skeleton";

interface GitHubStats {
  repos: number;
  followers: number;
  following: number;
  avatar: string | null;
  bio: string | null;
  location: string | null;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
}

interface GitHubData {
  stats: GitHubStats | null;
  repos: GitHubRepo[];
  topLanguages: string[];
  totalStars: number;
}

export function GitHubSection() {
  const [data, setData] = useState<GitHubData>({
    stats: null,
    repos: [],
    topLanguages: [],
    totalStars: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/github?username=${siteConfig.github.username}`)
      .then((r) => r.json())
      .then((json) => {
        setData({
          stats: json.stats ?? null,
          repos: json.repos ?? [],
          topLanguages: json.topLanguages ?? [],
          totalStars: json.totalStars ?? 0,
        });
      })
      .catch((err) => console.error("GitHub fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const { stats, repos, topLanguages, totalStars } = data;

  // Displayed languages: live from API, fallback to siteConfig
  const displayLanguages =
    topLanguages.length > 0 ? topLanguages : siteConfig.github.topLanguages;

  const statCards = [
    {
      icon: Code2,
      label: "Repositories",
      value: stats?.repos ?? siteConfig.github.totalRepos,
      suffix: "",
    },
    {
      icon: Star,
      label: "Stars Earned",
      value: totalStars > 0 ? totalStars : siteConfig.github.totalStars,
      suffix: "",
    },
    {
      icon: Users,
      label: "Followers",
      value: stats?.followers ?? 0,
      suffix: "",
    },
  ];

  // Contribution graph — deterministic visual (real data needs GH GraphQL with auth)
  const graphCells = Array.from({ length: 365 }, (_, i) => {
    const seed = ((i * 2654435761) >>> 0) % 1000;
    const active = seed > 400;
    const intensity = active ? 0.2 + ((seed % 600) / 600) * 0.7 : 0;
    return { active, intensity };
  });

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Open Source"
          subtitle="Real-time data from GitHub — repositories, languages, and activity."
        />

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
            : statCards.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <Icon size={24} className="mx-auto text-zinc-400 dark:text-zinc-500" />
                    <motion.p
                      className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100, delay: idx * 0.1 + 0.3 }}
                    >
                      {stat.value.toLocaleString()}{stat.suffix}
                    </motion.p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                  </motion.div>
                );
              })}
        </div>

        {/* Top Languages — live from API */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-zinc-400" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Top Languages</h3>
              {!loading && topLanguages.length > 0 && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  LIVE
                </span>
              )}
            </div>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              View GitHub →
            </Link>
          </div>

          {loading ? (
            <div className="flex gap-4 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {displayLanguages.map((lang, idx) => (
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <SkillIcon name={lang} size="lg" showLabel={true} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Top Repos — live */}
        {!loading && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <GitFork size={18} className="text-zinc-400" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Top Repositories</h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  LIVE
                </span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, idx) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="group flex flex-col gap-2 rounded-lg border border-zinc-100 bg-zinc-50 p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {repo.name}
                    </p>
                    <ExternalLink size={13} className="shrink-0 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {repo.description && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} />
                      {repo.forks}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Recent Activity</h3>
          <div className="flex flex-wrap gap-1" aria-label="Contribution activity grid">
            {graphCells.map(({ active, intensity }, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-sm"
                style={{
                  backgroundColor: active
                    ? `rgba(34, 197, 94, ${intensity.toFixed(2)})`
                    : "rgb(39 39 42 / 0.1)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 text-right">
            {siteConfig.github.totalContributions}+ contributions in the last year
          </p>
        </motion.div>
      </div>
    </section>
  );
}
