import { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "languages", level: 95 },
  { name: "JavaScript", category: "languages", level: 95 },
  { name: "Python", category: "languages", level: 85 },
  { name: "Java", category: "languages", level: 70 },
  { name: "SQL", category: "languages", level: 80 },
  { name: "HTML/CSS", category: "languages", level: 95 },

  // Frontend
  { name: "React", category: "frontend", level: 95 },
  { name: "Next.js", category: "frontend", level: 90 },
  { name: "Tailwind CSS", category: "frontend", level: 90 },
  { name: "Framer Motion", category: "frontend", level: 80 },
  { name: "Redux", category: "frontend", level: 85 },
  { name: "React Native", category: "frontend", level: 75 },

  // Backend
  { name: "Node.js", category: "backend", level: 90 },
  { name: "Express", category: "backend", level: 85 },
  { name: "FastAPI", category: "backend", level: 75 },
  { name: "REST APIs", category: "backend", level: 95 },
  { name: "GraphQL", category: "backend", level: 70 },

  // Database
  { name: "MongoDB", category: "database", level: 85 },
  { name: "PostgreSQL", category: "database", level: 80 },
  { name: "Redis", category: "database", level: 70 },
  { name: "Firebase", category: "database", level: 75 },

  // DevOps
  { name: "Docker", category: "devops", level: 80 },
  { name: "Kubernetes", category: "devops", level: 65 },
  { name: "AWS", category: "devops", level: 75 },
  { name: "CI/CD", category: "devops", level: 85 },
  { name: "Git", category: "devops", level: 90 },

  // Tools
  { name: "VS Code", category: "tools", level: 95 },
  { name: "Figma", category: "tools", level: 70 },
  { name: "Postman", category: "tools", level: 85 },
  { name: "Linux", category: "tools", level: 80 },
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