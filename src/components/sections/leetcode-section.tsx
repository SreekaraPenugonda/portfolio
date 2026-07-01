"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getLeetCodeStats } from "@/lib/api/leetcode";
import type { LeetCodeApiResponse } from "@/types";

export function LeetCodeSection() {
  const [stats, setStats] = useState<LeetCodeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/leetcode?username=${siteConfig.leetcode.username}`);
        const data = await response.json();
        
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const leetcode = stats || siteConfig.leetcode;
  const solvedPercent = Math.round(
    (leetcode.totalSolved / leetcode.totalProblems) * 100
  );

  const statCards = [
    {
      icon: Code,
      label: "Problems Solved",
      value: leetcode.totalSolved,
      suffix: `/${leetcode.totalProblems}`,
      color: "text-emerald-500",
    },
    {
      icon: Trophy,
      label: "Global Ranking",
      value: `#${leetcode.ranking.toLocaleString()}`,
      suffix: "",
      color: "text-amber-500",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: `${solvedPercent}%`,
      suffix: "",
      color: "text-blue-500",
    },
  ];

  const difficulties = [
    {
      label: "Easy",
      solved: leetcode.byDifficulty?.easy ?? 120,
      total: 200,
      color: "bg-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      label: "Medium",
      solved: leetcode.byDifficulty?.medium ?? 140,
      total: 400,
      color: "bg-amber-500",
      bg: "bg-amber-100 dark:bg-amber-950",
    },
    {
      label: "Hard",
      solved: leetcode.byDifficulty?.hard ?? 26,
      total: 200,
      color: "bg-red-500",
      bg: "bg-red-100 dark:bg-red-950",
    },
  ];

  return (
    <section className="py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Problem Solving"
          subtitle="Data structures & algorithms proficiency on LeetCode."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <div className="flex items-center gap-4">
                    <Icon size={24} className={stat.color} />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {stat.label}
                      </p>
                      <motion.p
                        className="text-2xl font-bold text-zinc-900 dark:text-zinc-50"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                      >
                        {stat.value}
                        <span className="text-sm font-normal text-zinc-400">
                          {stat.suffix}
                        </span>
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-zinc-400" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  By Difficulty
                </h3>
              </div>
              <Link
                href={siteConfig.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                View Profile →
              </Link>
            </div>

            <div className="space-y-5">
              {difficulties.map((diff) => {
                const percent = Math.round((diff.solved / diff.total) * 100);
                return (
                  <div key={diff.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {diff.label}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {diff.solved}/{diff.total}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${diff.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                      {percent}% completed
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-center">
              <Badge variant="success" className="text-sm px-4 py-1.5">
                Solved {leetcode.totalSolved} problems total
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}