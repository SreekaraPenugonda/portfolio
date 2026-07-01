// ============================================
// Project Atlas — Type Definitions
// ============================================

// ── Project ───────────────────────────────────────────────────────
export type ProjectCategory =
  | "full-stack"
  | "frontend"
  | "backend"
  | "devops"
  | "mobile"
  | "ai-ml"
  | "open-source";

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription: string;
  category?: ProjectCategory;
  technologies: string[];
  liveUrl?: string;
  sourceUrl: string;
  featured: boolean;
  date: string;
  highlights?: string[];
  architecture?: string;
  keyLearnings?: string[];
}

// ── Skill ─────────────────────────────────────────────────────────
export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools"
  | "soft-skills";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
}

// ── Experience ────────────────────────────────────────────────────
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: "work" | "internship" | "education";
  highlights?: string[];
  link?: string;
}

// ── Achievement ──────────────────────────────────────────────────
export type AchievementType = "award" | "publication" | "recognition" | "milestone";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: AchievementType;
  url?: string;
  image?: string;
}

// ── Blog ──────────────────────────────────────────────────────────
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

// ── GitHub ────────────────────────────────────────────────────────
export interface GitHubStats {
  username: string;
  totalRepos: number;
  totalStars: number;
  totalContributions: number;
  topLanguages: string[];
}

export interface GitHubApiResponse {
  stats: {
    repos: number;
    followers: number;
    following: number;
    avatar: string | null;
    bio: string | null;
    location: string | null;
  } | null;
  repos: GitHubRepo[];
  topLanguages: string[];
  totalStars: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
}

// ── LeetCode ─────────────────────────────────────────────────────
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

export interface LeetCodeApiResponse {
  totalSolved: number;
  totalProblems: number;
  ranking: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

// ── Site Config ──────────────────────────────────────────────────
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