"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { AnimatedCaseStudy } from "@/components/sections/projects/animated-case-study";

export default function ProjectDetailPage() {
  const params = useParams();
  const project = getProjectById(params.slug as string);

  if (!project) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Project not found
          </h1>
          <Link
            href="/projects"
            className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <AnimatedCaseStudy project={project} />
    </div>
  );
}
