import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Sreekara Penugonda",
  tagline: "Software Engineer & Product Builder",
  description:
    "Portfolio of Sreekara Penugonda — a software engineer specializing in building scalable, maintainable, and user-focused software products.",
  url: "https://sreekara.dev",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/SreekaraPenugonda",
    linkedin: "https://www.linkedin.com/in/sreekara-penugonda-882965302",
    twitter: "https://twitter.com/sreekara",
    email: "hello@sreekara.dev",
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
    username: "sreekara",
    totalRepos: 24,
    totalStars: 1042,
    totalContributions: 1847,
    topLanguages: ["TypeScript", "JavaScript", "Python", "Java", "Go"],
  },
  leetcode: {
    username: "sreekara",
    totalSolved: 286,
    totalProblems: 350,
    ranking: 48231,
    byDifficulty: { easy: 120, medium: 140, hard: 26 },
  },
};
