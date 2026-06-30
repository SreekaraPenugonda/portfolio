import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CertificationGallery } from "@/components/sections/achievements/certification-gallery";
import { GitHubSection } from "@/components/sections/github-section";
import { LeetCodeSection } from "@/components/sections/leetcode-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <GitHubSection />
      <LeetCodeSection />
      <CertificationGallery />
      <BlogSection />
      <ContactSection />
    </>
  );
}
