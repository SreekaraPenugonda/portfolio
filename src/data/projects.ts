import { ProjectCategory } from "@/types";

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription: string;
  category?: ProjectCategory;
  technologies: string[];
  image?: string;
  images?: string[];
  live?: string;
  github: string;
  featured: boolean;
  date: string;
  highlights?: string[];
  architecture?: string;
  keyLearnings?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "grocery-flask-app",
    title: "Grocery Based Flask Application",
    tagline: "OTP authentication system for kirana shops",
    description: "Reduced login friction for 50+ kirana shops by eliminating password dependency via OTP auth",
    longDescription: "A website-based OTP authentication system enabling kirana shop owners to manage their entire inventory without remembering credentials. Built CRUD operations for stocks, images, services, and bulk collections — streamlining operations for multi-vendor environments.",
    category: "backend" as ProjectCategory,
    technologies: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    image: "/projects/grocery-app.jpg",
    highlights: [
      "OTP-based login eliminating credential-remembering for 50+ shop owners",
      "Full CRUD for stocks, images, services and bulk collections",
      "Multi-vendor product management across wide range of companies",
      "Secure session management with Flask and SQLite backend",
    ],
    github: "https://github.com/SreekaraPenugonda/grocery.git",
    featured: true,
    date: "2024",
  },
  {
    id: "2",
    slug: "typescript-command-center",
    title: "TypeScript Command Center",
    tagline: "Voice-controlled productivity platform — web + desktop",
    description: "Cross-platform task manager with voice commands deployed on Render — zero-install web + desktop access",
    longDescription: "A productivity platform for students and professionals featuring voice command support for hands-free task management. Deployed as both a web app on Render and a native desktop app — users get the same experience across platforms with real-time task sync.",
    category: "full-stack" as ProjectCategory,
    technologies: ["TypeScript", "React", "Docker", "Kubernetes", "Render"],
    image: "/projects/command-center.jpg",
    highlights: [
      "Voice + keyboard CRUD for daily tasks — hands-free option for accessibility",
      "Containerised with Docker and orchestrated via Kubernetes",
      "Deployed on Render — accessible as both web app and desktop application",
      "Real-time task synchronisation across devices",
    ],
    github: "https://github.com/SreekaraPenugonda/focusos-your-smart-task-hub.git",
    featured: true,
    date: "2024",
  },
  {
    id: "3",
    slug: "quo-rion",
    title: "QUO-RION",
    tagline: "QR analytics platform for D-Mart, Reliance & retail chains",
    description: "Tracked QR scan analytics daily/weekly across 3+ retail chains including D-Mart and Reliance",
    longDescription: "A real-time QR code analytics platform tracking generation and scan statistics for major Indian retail chains. Delivers daily and weekly insights on QR usage patterns across D-Mart, Reliance, and marketing environments.",
    category: "full-stack" as ProjectCategory,
    technologies: ["JavaScript", "HTML", "CSS", "Flask", "API"],
    image: "/projects/quo-rion.jpg",
    highlights: [
      "Analytics for D-Mart and Reliance QR campaigns — daily & weekly reports",
      "Real-time QR generation tracking via REST API integration",
      "Dashboard showing scan trends across multiple retail locations",
      "Flask backend serving live statistics to the frontend",
    ],
    github: "https://github.com/SreekaraPenugonda/QUORION.git",
    featured: true,
    date: "2024",
  },
];

export const categories = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "DevOps",
  "Mobile",
];

export function getFeaturedProjects() {
  return projects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find(project => project.slug === slug);
}

/** @deprecated Use getProjectBySlug instead */
export function getProjectById(id: string) {
  return projects.find(project => project.id === id || project.slug === id);
}

export function getProjectCategories() {
  const used = new Set(projects.map(p => p.category).filter(Boolean));
  return Array.from(used) as string[];
}
