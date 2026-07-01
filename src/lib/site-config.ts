import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "SREEKARA PENUGONDA",
  tagline: "Full-Stack Developer · AWS Cloud Intern · SIH 2024 Winner",
  description:
    "Portfolio of Penugonda Sreekara Venkata Naga Durga Sai Uday — a Computer Science student specializing in full-stack development, cloud computing, and building scalable solutions.",
  url: "https://sreekara.dev",
  ogImage: "/og-image.png",
  phone: "+91-9490339137",
  location: "Vadlamudi, Guntur, Andhra Pradesh",
  resumeLastUpdated: "July 2026",
  links: {
    github: "https://github.com/SreekaraPenugonda",
    linkedin: "https://www.linkedin.com/in/sreekara-penugonda-882965302",
    twitter: "https://twitter.com/sreekara",
    email: "231fa04970@gmail.com",
    leetcode: "https://leetcode.com/u/Sreekara_Penugonda/",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Resume", href: "/resume" },
  ],
  github: {
    username: "SreekaraPenugonda",
    totalRepos: 24,
    totalStars: 12,
    totalContributions: 200,
    topLanguages: ["Python", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
  },
  leetcode: {
    username: "Sreekara_Penugonda",
    totalSolved: 286,
    totalProblems: 350,
    ranking: 48231,
    byDifficulty: { easy: 120, medium: 140, hard: 26 },
  },
};
