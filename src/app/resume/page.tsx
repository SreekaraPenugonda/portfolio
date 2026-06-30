"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { experiences, education } from "@/data/experience";
import { skills } from "@/data/skills";
import { Download, Mail, Phone, Globe } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Resume
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Download or view my full resume
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            <Download size={18} />
            Download PDF
          </button>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          {/* Header */}
          <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {siteConfig.name}
            </h2>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {siteConfig.links.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} />
                +91-9490339137
              </span>
              <span className="flex items-center gap-1">
                <Globe size={14} />
                {siteConfig.url}
              </span>
              <span className="text-sm">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              </span>
              <span className="text-sm">
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Education
            </h3>
            <div className="mt-3 space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">
                        {edu.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {edu.company} · {edu.location}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500">{edu.period}</span>
                  </div>
                  {edu.description[0]?.includes("CGPA") && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {edu.description[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Experience
            </h3>
            <div className="mt-3 space-y-4">
              {experiences.filter(exp => exp.type === "internship" || exp.type === "work").map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">
                        {exp.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500">{exp.period}</span>
                  </div>
                  <ul className="mt-2 list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
                    {exp.description.slice(0, 2).map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Technical Skills
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-lg bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Key Projects
            </h3>
            <div className="mt-3 space-y-2">
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  Grocery Based Flask Application
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  OTP authentication system with CRUD operations for stocks and bulk collections
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  TypeScript Command Center
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Productivity platform with voice commands, deployed on Render
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  QUO-RION
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  QR code analytics platform tracking retail and marketing statistics
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}