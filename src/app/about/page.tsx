import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sreekara Penugonda — a Computer Science student and full-stack developer specializing in scalable applications and cloud computing.",
  alternates: { canonical: "https://sreekara.dev/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-14">
      <AboutSection />
    </div>
  );
}