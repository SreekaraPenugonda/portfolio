"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillIcon } from "@/components/ui/skill-icon";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section className="py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Technologies"
          subtitle="Tools and technologies I work with"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.2, y: -5 }}
              className="cursor-pointer"
            >
              <SkillIcon
                name={skill.name}
                size="lg"
                showLabel={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}