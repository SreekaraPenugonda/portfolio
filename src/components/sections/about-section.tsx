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
              I'm a software engineer with experience building products
              across the full stack. I specialize in creating performant,
              accessible, and user-friendly applications using modern
              technologies.
            </p>
            <p>
              My approach combines strong technical fundamentals with product
              thinking — I don't just write code, I solve problems. Every
              project I build is an opportunity to learn, optimize, and deliver
              real value.
            </p>
            <p>
              When I'm not coding, you'll find me writing technical
              blog posts, contributing to open-source projects, or exploring new
              technologies.
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
                <li>📍 Based in San Francisco, CA</li>
                <li>💼 Senior Software Engineer</li>
                <li>🎓 B.S. Computer Science</li>
                <li>📚 Lifelong learner</li>
                <li>🌐 Open-source advocate</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Core Principles
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>🎯 Simplicity before complexity</li>
                <li>⚡ Performance over unnecessary abstraction</li>
                <li>♿ Accessibility by default</li>
                <li>📝 Clean code is a feature</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}