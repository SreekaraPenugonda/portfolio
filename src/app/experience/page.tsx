"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { experiences, education, certifications } from "@/data/experience";
import { formatDateShort } from "@/lib/utils";
import { GraduationCap, Award } from "lucide-react";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Experience
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            My professional journey and qualifications.
          </p>
        </motion.div>

        {/* Work Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Work Experience
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 md:left-8" />
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12 md:pl-16"
                >
                  <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900 md:left-6.5" />
                  <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        {formatDateShort(exp.startDate)} —{" "}
                        {exp.endDate
                          ? formatDateShort(exp.endDate)
                          : "Present"}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 flex items-center gap-2">
            <GraduationCap size={24} />
            Education
          </h2>
          <div className="grid gap-6">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {edu.institution} · {edu.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {edu.gpa && (
                      <Badge variant="success">GPA: {edu.gpa}</Badge>
                    )}
                    <span className="text-sm text-zinc-500">
                      {formatDateShort(edu.startDate)} —{" "}
                      {formatDateShort(edu.endDate)}
                    </span>
                  </div>
                </div>
                {edu.highlights && (
                  <ul className="mt-3 space-y-1">
                    {edu.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 flex items-center gap-2">
            <Award size={24} />
            Certifications
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <h3 className="font-medium text-zinc-900 dark:text-zinc-50 text-sm">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {cert.issuer}
                </p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                  {formatDateShort(cert.date)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}