"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="About Me"
          subtitle="A passionate software engineer focused on building products that make a difference."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-zinc-600 dark:text-zinc-400"
          >
            <p>
              I'm a Computer Science student at Vignan's Foundation for Science, Technology and Research, Vadlamudi, Guntur Dist. 
              with a passion for building scalable, maintainable, and user-focused software products. 
              My CGPA is 7.35/10.
            </p>
            <p>
              I specialize in full-stack development with expertise in Python, JavaScript, React, and cloud technologies. 
              I've completed an AWS internship at SkillCraft Technology and built multiple projects including a Grocery Flask Application, 
              TypeScript Command Center, and QUO-RION analytics platform.
            </p>
            <p>
              My areas of interest include Web Development, UI-UX Design, Mobile Application Development, and Cloud Security. 
              I'm also an On Stage Events Lead at Mahostav 2024.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Quick Facts
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>📍 Vignan's Foundation, Vadlamudi, Guntur</li>
                <li>💼 B.Tech CSE Student (2023-Present)</li>
                <li>🎓 CGPA: 7.35/10</li>
                <li>� +91-9490339137</li>
                <li>🌐 AWS Certified Intern</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Core Principles
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>🎯 Simplicity before complexity</li>
                <li>⚡ Performance and scalability</li>
                <li>♿ Accessibility by default</li>
                <li>📝 Clean, maintainable code</li>
                <li>💡 Problem-solving mindset</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}