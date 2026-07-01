// ============================================
// Project Atlas — Type Definitions
// ============================================

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription: string;
  category?: ProjectCategory;
  technologies: string[];
  image?: string;
  images?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  caseStudy?: string;
  featured: boolean;
  date: string;
  highlights?: string[];
  architecture?: string;
  keyLearnings?: string[];
}

export type ProjectCategory =
  | "full-stack"
  | "frontend"
  | "backend"
  | "devops"
  | "mobile"
  | "ai-ml"
  | "open-source";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0–100
  icon?: string;
}

export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools"
  | "soft-skills";

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  credentialId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
  readingTime: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "award" | "publication" | "recognition" | "milestone";
  url?: string;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface GitHubStats {
  username: string;
  totalRepos: number;
  totalStars: number;
  totalContributions: number;
  topLanguages: string[];
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalProblems: number;
  ranking: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  phone?: string;
  location?: string;
  resumeLastUpdated?: string;
  links: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    leetcode: string;
  };
  navLinks: NavLink[];
  github: GitHubStats;
  leetcode: LeetCodeStats;
}
