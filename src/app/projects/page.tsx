import type { Metadata } from "next";
import { ProjectsPageClient } from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack, backend, and cloud projects built by Sreekara Penugonda — from Flask apps to TypeScript productivity tools.",
  alternates: { canonical: "https://sreekara.dev/projects" },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
