import { ProjectCategory } from "@/types";

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
  category?: ProjectCategory;
  image?: string;
  highlights?: string[];
  architecture?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Grocery Based Flask Application",
    tagline: "OTP authentication system for kirana shops",
    description: "OTP authentication system for kirana shops with CRUD operations",
    longDescription: "A website-based OTP authentication system to make CRUD operations for stocks, images, services, and bulk collections. Facilitating kirana shop logins to websites without having to remember their credentials.",
    category: "backend" as ProjectCategory,
    technologies: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    image: "/projects/grocery-app.jpg",
    highlights: [
      "OTP-based authentication for secure access",
      "CRUD operations for stocks and bulk collections",
      "Multi-vendor product management system",
    ],
    github: "https://github.com/SreekaraPenugonda/grocery.git",
    featured: true,
    date: "2024",
  },
  {
    id: "2",
    title: "TypeScript Command Center",
    tagline: "Productivity platform with voice commands",
    description: "Productivity platform with voice commands for students and professionals",
    longDescription: "A website and desktop app built for students and professionals to manage daily tasks. Features CRUD operations for tasks using physical typing or voice commands. Works as both desktop app and website on Render deployed service.",
    category: "full-stack" as ProjectCategory,
    technologies: ["TypeScript", "React", "Kubernetes", "Docker", "Render"],
    image: "/projects/command-center.jpg",
    highlights: [
      "Voice command support for hands-free operation",
      "Cross-platform desktop and web deployment",
      "Real-time task synchronization",
    ],
    github: "https://github.com/SreekaraPenugonda/focusos-your-smart-task-hub.git",
    featured: true,
    date: "2024",
  },
  {
    id: "3",
    title: "QUO-RION",
    tagline: "QR code analytics for retail and marketing",
    description: "QR code analytics platform tracking retail and marketing statistics",
    longDescription: "Daily and weekly updated statistics tracking the number of QR generators in big retail and marketing places like D-Mart and Reliance.",
    category: "full-stack" as ProjectCategory,
    technologies: ["JavaScript", "HTML", "CSS", "Flask", "API"],
    image: "/projects/quo-rion.jpg",
    highlights: [
      "Real-time QR code generation tracking",
      "Daily and weekly analytics updates",
      "Integration with major retail chains",
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

export function getProjectById(id: string) {
  return projects.find(project => project.id === id);
}

export function getProjectCategories() {
  return categories;
}
