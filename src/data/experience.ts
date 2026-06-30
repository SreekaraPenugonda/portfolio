import { Experience, Education, Certification } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    startDate: "2024-01",
    endDate: null,
    description:
      "Leading development of customer-facing web applications serving 100K+ users. Architecting scalable solutions and mentoring junior engineers.",
    highlights: [
      "Architected and built a real-time dashboard serving 100K+ users",
      "Reduced page load times by 40% through performance optimization",
      "Mentored 3 junior engineers through structured code reviews",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    technologies: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    id: "exp-2",
    role: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    startDate: "2022-03",
    endDate: "2023-12",
    description:
      "Built and maintained full-stack features for a B2B SaaS platform. Worked closely with product and design teams to deliver user-centric solutions.",
    highlights: [
      "Developed core features for B2B SaaS platform used by 500+ companies",
      "Built RESTful APIs serving 1M+ requests per day",
      "Implemented real-time collaboration features using WebSockets",
      "Reduced bug rate by 30% through comprehensive test coverage",
    ],
    technologies: ["Next.js", "TypeScript", "Express", "MongoDB", "Redis"],
  },
  {
    id: "exp-3",
    role: "Frontend Developer",
    company: "WebAgency Pro",
    location: "New York, NY",
    startDate: "2021-01",
    endDate: "2022-02",
    description:
      "Developed responsive web applications for diverse clients. Specialized in React-based SPAs with focus on performance and accessibility.",
    highlights: [
      "Delivered 10+ client projects on time and within budget",
      "Improved Lighthouse scores from 60 to 95+ across all projects",
      "Built reusable component library used across all agency projects",
      "Introduced TypeScript to the team, reducing runtime errors by 50%",
    ],
    technologies: ["React", "JavaScript", "SCSS", "Figma", "Jest"],
  },
];

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "B.S. in Computer Science",
    institution: "University of Technology",
    location: "San Francisco, CA",
    startDate: "2017",
    endDate: "2021",
    gpa: "3.8",
    highlights: [
      "Dean's List all semesters",
      "Teaching Assistant for Data Structures",
      "Hackathon winner — Best Overall Project",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Smart India Hackathon 2024",
    issuer: "SIH",
    date: "2024-12",
    credentialId: "SIH-2024",
    url: "https://sih.gov.in",
  },
  {
    id: "cert-2",
    title: "ByteXL Gaming Championship",
    issuer: "ByteXL",
    date: "2024-11",
    credentialId: "BYTEXL-2024",
    url: "https://bytexl.com",
  },
  {
    id: "cert-3",
    title: "Python Programming Certification",
    issuer: "OrcadeHub",
    date: "2024-10",
    credentialId: "ORC-2024",
    url: "https://orcadehub.com",
  },
  {
    id: "cert-4",
    title: "SkillCraft Recommendation",
    issuer: "SkillCraft",
    date: "2024-09",
    credentialId: "SC-2024",
    url: "https://skillcraft.in",
  },
  {
    id: "cert-5",
    title: "Cisco Networking Certification",
    issuer: "Cisco",
    date: "2024-08",
    credentialId: "CISCO-2024",
    url: "https://netacad.com",
  },
  {
    id: "cert-6",
    title: "HR Analytics Certification",
    issuer: "HR Certification Institute",
    date: "2024-07",
    credentialId: "HR-2024",
    url: "#",
  },
  {
    id: "cert-7",
    title: "Network Technician Career Path",
    issuer: "Cisco",
    date: "2024-06",
    credentialId: "NTCP-2024",
    url: "#",
  },
  {
    id: "cert-8",
    title: "Principles of Management",
    issuer: "Management Institute",
    date: "2024-05",
    credentialId: "POM-2024",
    url: "#",
  },
];
