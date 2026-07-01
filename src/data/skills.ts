import { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "Python",       category: "languages", level: 85 },
  { name: "JavaScript",   category: "languages", level: 90 },
  { name: "TypeScript",   category: "languages", level: 88 },
  { name: "C",            category: "languages", level: 75 },
  { name: "SQL",          category: "languages", level: 80 },
  { name: "HTML/CSS",     category: "languages", level: 92 },

  // Frontend
  { name: "React",        category: "frontend",  level: 88 },
  { name: "Next.js",      category: "frontend",  level: 82 },
  { name: "Tailwind CSS", category: "frontend",  level: 85 },
  { name: "Redux",        category: "frontend",  level: 72 },

  // Backend
  { name: "Node.js",      category: "backend",   level: 80 },
  { name: "Flask",        category: "backend",   level: 85 },
  { name: "Express",      category: "backend",   level: 75 },
  { name: "REST APIs",    category: "backend",   level: 88 },

  // Database
  { name: "MongoDB",      category: "database",  level: 80 },
  { name: "MySQL",        category: "database",  level: 78 },
  { name: "Firebase",     category: "database",  level: 72 },
  { name: "SQLite",       category: "database",  level: 75 },

  // DevOps / Cloud
  { name: "AWS",          category: "devops",    level: 78 },
  { name: "Docker",       category: "devops",    level: 75 },
  { name: "Kubernetes",   category: "devops",    level: 65 },
  { name: "Git",          category: "devops",    level: 88 },
  { name: "Render",       category: "devops",    level: 80 },

  // Tools
  { name: "VS Code",      category: "tools",     level: 95 },
  { name: "Postman",      category: "tools",     level: 82 },
  { name: "GitHub",       category: "tools",     level: 88 },
  { name: "Linux",        category: "tools",     level: 72 },
  { name: "Figma",        category: "tools",     level: 65 },
];

export function getSkillsByCategory(): Record<string, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}

export function getSkillIconMap(): Record<string, string> {
  const map: Record<string, string> = {};
  skills.forEach((skill) => {
    map[skill.name] = skill.icon || skill.name.slice(0, 2).toUpperCase();
  });
  return map;
}