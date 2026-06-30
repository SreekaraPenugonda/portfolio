"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { Code2, Star, GitFork, Activity } from "lucide-react";
import { SkillIcon } from "@/components/ui/skill-icon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getGitHubStats, getGitHubRepos } from "@/lib/api/github";

interface GitHubStats {
  repos: number;
  followers: number;
  following: number;
}

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/github?username=${siteConfig.github.username}`);
        const data = await response.json();
        
        if (data.stats) {
          setStats(data.stats);
        }
        if (data.repos) {
          setRepos(data.repos);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
      setLoading(false);
    }
    
    fetchData();
  }, []);

  const displayStats = stats || {
    repos: siteConfig.github.totalRepos,
    followers: 0,
    following: 0,
  };

  const statCards = [
    {
      icon: Code2,
      label: "Repositories",
      value: displayStats.repos,
      suffix: "+",
    },
    {
      icon: Star,
      label: "Stars Earned",
      value: repos.reduce((sum, repo) => sum + repo.stars, 0) || siteConfig.github.totalStars,
      suffix: "+",
    },
    {
      icon: GitFork,
      label: "Contributions",
      value: siteConfig.github.totalContributions,
      suffix: "+",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Open Source"
          subtitle="Contributions and activity across the GitHub ecosystem."
        />

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          {statCards.map((stat, idx) => {
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
                <Icon
                  size={24}
                  className="mx-auto text-zinc-400 dark:text-zinc-500"
                />
                <motion.p
                  className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: idx * 0.1 + 0.3,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </motion.p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Top Languages */}
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
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Top Languages
              </h3>
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

          <div className="flex flex-wrap gap-4 justify-center">
            {siteConfig.github.topLanguages.map((lang, idx) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <SkillIcon
                  name={lang}
                  size="lg"
                  showLabel={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contribution Graph Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Recent Activity
          </h3>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 365 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-sm transition-colors"
                style={{
                  backgroundColor:
                    Math.random() > 0.6
                      ? `rgba(34, 197, 94, ${0.2 + Math.random() * 0.6})`
                      : "rgb(39 39 42 / 0.1)",
                }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 text-right">
            {siteConfig.github.totalContributions} contributions in the last year
          </p>
        </motion.div>
      </div>
    </section>
  );
}