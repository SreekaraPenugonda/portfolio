"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Resume
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Download my resume or view it online.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              <Download size={18} className="mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="lg">
              <ExternalLink size={18} className="mr-2" />
              View Online
            </Button>
          </div>

          <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Skills Summary
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Frontend
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>React, Next.js, TypeScript</li>
                  <li>Tailwind CSS, Framer Motion</li>
                  <li>Responsive & Accessible Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Backend
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>Node.js, Express, FastAPI</li>
                  <li>REST & GraphQL APIs</li>
                  <li>PostgreSQL, MongoDB, Redis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  DevOps
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>Docker, Kubernetes</li>
                  <li>AWS, CI/CD Pipelines</li>
                  <li>Infrastructure as Code</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Tools & Methods
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>Git, Linux, VS Code</li>
                  <li>Agile & Scrum</li>
                  <li>System Design & Architecture</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Notable Experience
            </h2>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 text-left">
              <div>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Senior Software Engineer
                </strong>{" "}
                at Tech Corp (2024–Present)
                <p className="mt-1">
                  Leading development of applications serving 100K+ users.
                  Architected real-time dashboards and mentored junior engineers.
                </p>
              </div>
              <div>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Full Stack Developer
                </strong>{" "}
                at StartupXYZ (2022–2023)
                <p className="mt-1">
                  Built core features for B2B SaaS platform used by 500+
                  companies. Reduced bug rate by 30% through comprehensive
                  testing.
                </p>
              </div>
              <div>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Frontend Developer
                </strong>{" "}
                at WebAgency Pro (2021–2022)
                <p className="mt-1">
                  Delivered 10+ client projects. Improved Lighthouse scores from
                  60 to 95+ across all projects.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}