import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "SREEKARA PENUGONDA",
  tagline: "Software Engineer & Builder | Designing | Problem Solver",
  description:
    "Portfolio of Penugonda Sreekara Venkata Naga Durga Sai Uday — a Computer Science student specializing in full-stack development, cloud computing, and building scalable solutions.",
  url: "https://sreekara.dev",
  ogImage: "/og-image.png",
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
    totalStars: 1042,
    totalContributions: 1847,
    topLanguages: ["TypeScript", "JavaScript", "Python", "Java", "Go"],
  },
  leetcode: {
    username: "Sreekara_Penugonda",
    totalSolved: 286,
    totalProblems: 350,
    ranking: 48231,
    byDifficulty: { easy: 120, medium: 140, hard: 26 },
  },
};
