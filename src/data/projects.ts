export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  live?: string;
  featured: boolean;
  date: string;
  tagline?: string;
  category?: string;
  image?: string;
  highlights?: string[];
  architecture?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Grocery Based Flask Application",
    description: "OTP authentication system for kirana shops with CRUD operations",
    longDescription: "A website-based OTP authentication system to make CRUD operations for stocks, images, services, and bulk collections. Facilitating kirana shop logins to websites without having to remember their credentials.",
    technologies: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/SreekaraPenugonda",
    featured: true,
    date: "2024",
  },
  {
    id: "2",
    title: "TypeScript Command Center",
    description: "Productivity platform with voice commands for students and professionals",
    longDescription: "A website and desktop app built for students and professionals to manage daily tasks. Features CRUD operations for tasks using physical typing or voice commands. Works as both desktop app and website on Render deployed service.",
    technologies: ["TypeScript", "React", "Kubernetes", "Docker", "Render"],
    github: "https://github.com/SreekaraPenugonda",
    live: "https://command-center.vercel.app",
    featured: true,
    date: "2024",
  },
  {
    id: "3",
    title: "QUO-RION",
    description: "QR code analytics platform tracking retail and marketing statistics",
    longDescription: "Daily and weekly updated statistics tracking the number of QR generators in big retail and marketing places like D-Mart and Reliance.",
    technologies: ["JavaScript", "HTML", "CSS", "Flask", "API"],
    github: "https://github.com/SreekaraPenugonda",
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

export function getProjectById(id: string) {
  return projects.find(project => project.id === id);
}

export function getProjectCategories() {
  return categories;
}
