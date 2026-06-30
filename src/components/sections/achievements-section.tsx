"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { achievements } from "@/data/achievements";
import { formatDateShort } from "@/lib/utils";
import { Award, BookOpen, Star, Trophy, ExternalLink } from "lucide-react";

function AchievementIcon({ type }: { type: string }) {
  const props = { size: 20 };
  switch (type) {
    case "award":
      return <Trophy {...props} />;
    case "publication":
      return <BookOpen {...props} />;
    case "recognition":
      return <Star {...props} />;
    default:
      return <Award {...props} />;
  }
}

function getColor(type: string): string {
  switch (type) {
    case "award":
      return "text-amber-500";
    case "publication":
      return "text-blue-500";
    case "recognition":
      return "text-purple-500";
    default:
      return "text-emerald-500";
  }
}

export function AchievementsSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and recognition throughout my career."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, idx) => {
            const color = getColor(achievement.type);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 ${color}`}>
                    <AchievementIcon type={achievement.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 text-sm">
                      {achievement.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {achievement.description}
                    </p>
                    <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                      {formatDateShort(achievement.date)}
                    </p>
                  </div>
                  {achievement.url && (
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-zinc-400 opacity-0 transition-all group-hover:opacity-100"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}