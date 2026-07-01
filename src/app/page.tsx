import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { TechStrip } from "@/components/sections/tech-strip";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WhyHireSection } from "@/components/sections/why-hire-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { GitHubSection } from "@/components/sections/github-section";
import { LeetCodeSection } from "@/components/sections/leetcode-section";
import { CertificationGallery } from "@/components/sections/achievements/certification-gallery";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TechStrip />
      <ProjectsSection />
      <WhyHireSection />
      <ExperienceSection />
      <GitHubSection />
      <LeetCodeSection />
      <CertificationGallery />
      <BlogSection />
      <ContactSection />
    </>
  );
}
