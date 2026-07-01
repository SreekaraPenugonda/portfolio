"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Zap,
  Code2,
  Cloud,
  Trophy,
  Users,
  Lightbulb,
  GitBranch,
  GraduationCap,
} from "lucide-react";

const reasons = [
  {
    icon: Code2,
    title: "Full-Stack Fluency",
    body: "From Python/Flask backends to React + TypeScript frontends, I ship end-to-end features independently — you get a developer who can own an entire product slice.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-900/40",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Mindset",
    body: "Completed an AWS internship covering EC2, S3, Lambda, IAM, VPC, and RDS. I design with the AWS Well-Architected Framework in mind — fault-tolerant, cost-optimised, and scalable by default.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-100 dark:border-amber-900/40",
  },
  {
    icon: Zap,
    title: "Ships Real Products",
    body: "Built and deployed three production projects — an OTP-based kirana shop platform, a voice-command task manager on Render, and a QR analytics dashboard used at D-Mart and Reliance — not just tutorial apps.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-100 dark:border-emerald-900/40",
  },
  {
    icon: Trophy,
    title: "Smart India Hackathon Winner",
    body: "Won SIH 2024 — India's largest student hackathon — by delivering an innovative solution under pressure with a cross-functional team. Proof that I perform when stakes are high.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-100 dark:border-purple-900/40",
  },
  {
    icon: GitBranch,
    title: "DevOps & Containerisation",
    body: "Hands-on with Docker and Kubernetes in production deployments. I understand CI/CD pipelines, infrastructure as code, and how to get software from laptop to production reliably.",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-100 dark:border-sky-900/40",
  },
  {
    icon: Lightbulb,
    title: "Fast Learner, Self-Starter",
    body: "Taught myself TypeScript, Kubernetes, and advanced AWS services while maintaining a 7.35 CGPA and leading on-stage events at Mahostav 2024. I ramp up fast and bring momentum to every team.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-100 dark:border-rose-900/40",
  },
  {
    icon: GraduationCap,
    title: "Solid CS Fundamentals",
    body: "Strong grounding in DSA, OS, OOP, DBMS, and Software Engineering — demonstrated by solving 286+ LeetCode problems. Clean code and sound architecture, not just 'it works'.",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    border: "border-teal-100 dark:border-teal-900/40",
  },
  {
    icon: Users,
    title: "Collaborator & Leader",
    body: "Served as On Stage Events Lead at Mahostav 2024, coordinating teams and managing live events for 1000+ attendees. I communicate clearly, adapt quickly, and make people around me better.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-100 dark:border-indigo-900/40",
  },
];

export function WhyHireSection() {
  return (
    <section className="py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Why Hire Me?"
          subtitle="Eight reasons backed by real work, real awards, and real deployments."
        />

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group rounded-2xl border p-5 transition-shadow hover:shadow-lg ${r.bg} ${r.border}`}
              >
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${r.bg} ${r.color}`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {r.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            I don&apos;t just write code. I solve problems, ship products, and grow with every challenge.
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Currently open to internships, full-time roles, and interesting collaborations.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Let&apos;s Talk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
