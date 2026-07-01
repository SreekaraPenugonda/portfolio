import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    title: "AWS Cloud Intern",
    company: "SkillCraft Technology",
    location: "Online",
    period: "December 2024 - April 2025",
    description: [
      "In-depth understanding of AWS cloud computing services, including EC2, S3, RDS, Lambda, IAM, VPC, and more.",
      "Proficient in designing, deploying, and managing fault-tolerant, highly available, and scalable AWS solutions.",
      "Strong knowledge of architectural best practices, such as AWS Well-Architected Framework, security, performance, and cost optimization.",
      "Hands-on experience in cloud infrastructure provisioning, monitoring, and automation using AWS Management Console and AWS CLI.",
    ],
    technologies: ["AWS", "EC2", "S3", "Lambda", "IAM", "VPC", "CloudFormation"],
    type: "internship",
  },
  {
    id: "2",
    title: "B.Tech in Computer Science and Engineering",
    company: "Vignan's Foundation for Science, Technology and Research",
    location: "Vadlamudi, Guntur Dist.",
    period: "2023 - Present",
    description: [
      "CGPA: 7.35/10",
      "Relevant Coursework: Data Structures & Algorithms, Operating Systems, Object Oriented Programming, Database Management System, Software Engineering",
    ],
    technologies: ["C", "Python", "JavaScript", "React", "SQL", "AWS"],
    type: "education",
  },
  {
    id: "3",
    title: "Intermediate in MPC",
    company: "Sri Chaitanya Junior College",
    location: "Avanthi Bhavan, Guntur",
    period: "2021 - 2023",
    description: [
      "CGPA: 6.49/10",
      "Focused on Mathematics, Physics, and Chemistry",
    ],
    technologies: ["Mathematics", "Physics", "Chemistry"],
    type: "education",
  },
  {
    id: "4",
    title: "SSC - State Board of Education",
    company: "Gemini's School",
    location: "Andhra Pradesh",
    period: "2009 - 2021",
    description: [
      "CGPA: 9.8/10",
      "Completed schooling with excellent academic performance",
    ],
    technologies: [],
    type: "education",
  },
];

export const education = experiences.filter(exp => exp.type === "education");
export const workExperience = experiences.filter(exp => exp.type === "work" || exp.type === "internship");
export const certifications = experiences.filter(exp => exp.type === "internship" || exp.type === "education");
