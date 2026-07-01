import type { Metadata } from "next";
import { ExperiencePage as ExperiencePageClient } from "./experience-client";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, education, and certifications of Sreekara Penugonda — AWS Cloud Intern and full-stack developer.",
  alternates: { canonical: "https://sreekara.dev/experience" },
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
