"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBar } from "@/components/ui/skill-bar";
import { SkillIcon } from "@/components/ui/skill-icon";
import { getSkillsByCategory } from "@/data/skills";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  tools: "Tools",
};

export function SkillsSection() {
  const skillsByCategory = getSkillsByCategory();

  return (
    <section className="py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with regularly, organized by category. Hover over icons to see details."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skillsByCategory).map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={cn(
                "rounded-xl border border-zinc-200 p-6 dark:border-zinc-800",
                "bg-white dark:bg-zinc-900/50"
              )}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {categoryLabels[category] || category}
              </h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <SkillIcon name={skill.name} size="sm" showLabel={false} />
                    <div className="flex-1">
                      <SkillBar
                        name={skill.name}
                        level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
