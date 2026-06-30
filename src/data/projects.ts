import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-atlas",
    title: "Project Atlas",
    tagline: "A production-grade engineering portfolio",
    description:
      "A modern, performance-optimized portfolio platform showcasing software engineering projects with interactive case studies, measurable technical achievements, and exceptional UX.",
    longDescription:
      "Project Atlas is a comprehensive portfolio platform built with Next.js, TypeScript, and Tailwind CSS. It features a fully responsive design, dark mode, interactive project case studies, a blog with MDX support, and a contact system. The platform achieves 95+ Lighthouse scores and follows accessibility best practices.",
    category: "full-stack",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "MDX",
    ],
    image: "/images/atlas.png",
    liveUrl: "https://sreekara.dev",
    sourceUrl: "https://github.com/sreekara/portfolio",
    featured: true,
    date: "2026-06",
    highlights: [
      "95+ Lighthouse performance score",
      "100% accessibility score",
      "Responsive across all devices",
      "Dark mode with system preference detection",
      "Interactive project case studies",
    ],
    architecture:
      "Built with Next.js App Router, server components for performance, client components for interactivity, and a modular component architecture.",
    keyLearnings: [
      "Advanced Next.js App Router patterns",
      "Performance optimization techniques",
      "Accessibility-first development",
    ],
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    tagline: "Full-stack marketplace with real-time inventory",
    description:
      "A scalable e-commerce platform featuring real-time inventory management, payment processing, and an admin dashboard.",
    longDescription:
      "Built with Next.js, Node.js, and MongoDB, this platform supports thousands of concurrent users with features like real-time stock updates, Stripe payment integration, order management, and a comprehensive admin dashboard with analytics.",
    category: "full-stack",
    technologies: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
      "Redis",
    ],
    image: "/images/ecommerce.png",
    liveUrl: "#",
    sourceUrl: "#",
    featured: true,
    date: "2026-03",
    highlights: [
      "Real-time inventory management",
      "Stripe payment integration",
      "Admin dashboard with analytics",
      "Rate limiting and security",
    ],
  },
  {
    id: "ai-chat-app",
    title: "AI Chat Application",
    tagline: "Real-time AI-powered chat with streaming responses",
    description:
      "A real-time chat application powered by AI with streaming responses, conversation history, and multi-model support.",
    longDescription:
      "An AI chat application that supports multiple LLM providers, streaming responses via Server-Sent Events, conversation history with vector search, and a modern chat interface with markdown rendering.",
    category: "ai-ml",
    technologies: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
    image: "/images/ai-chat.png",
    liveUrl: "#",
    sourceUrl: "#",
    featured: true,
    date: "2026-01",
    highlights: [
      "Multi-model AI provider support",
      "Streaming responses with SSE",
      "Conversation history with vector search",
      "Markdown and code rendering",
    ],
  },
  {
    id: "devops-pipeline",
    title: "CI/CD Pipeline Automation",
    tagline: "Automated deployment pipeline with monitoring",
    description:
      "A comprehensive CI/CD pipeline with automated testing, deployment, and monitoring for microservices architecture.",
    longDescription:
      "Designed and implemented a complete CI/CD pipeline using GitHub Actions, Docker, and Kubernetes. Includes automated testing, security scanning, blue-green deployments, and real-time monitoring with Prometheus and Grafana.",
    category: "devops",
    technologies: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
      "Prometheus",
      "Grafana",
    ],
    image: "/images/devops.png",
    sourceUrl: "#",
    featured: false,
    date: "2025-10",
    highlights: [
      "Automated testing and deployment",
      "Blue-green deployment strategy",
      "Real-time monitoring and alerting",
      "Infrastructure as Code",
    ],
  },
  {
    id: "mobile-app",
    title: "Fitness Tracker Mobile App",
    tagline: "Cross-platform fitness tracking with social features",
    description:
      "A cross-platform mobile application for fitness tracking with workout logging, progress charts, and social features.",
    longDescription:
      "Built with React Native and Expo, this fitness tracker features workout logging with exercise libraries, progress visualization with charts, social features including challenges and leaderboards, and integration with health APIs.",
    category: "mobile",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Chart.js",
    ],
    image: "/images/fitness.png",
    liveUrl: "#",
    sourceUrl: "#",
    featured: false,
    date: "2025-07",
    highlights: [
      "Cross-platform (iOS & Android)",
      "Workout logging with exercise library",
      "Progress charts and analytics",
      "Social challenges and leaderboards",
    ],
  },
  {
    id: "open-source-lib",
    title: "React Form Library",
    tagline: "Lightweight form library with validation",
    description:
      "An open-source React form library with built-in validation, accessibility support, and TypeScript-first design.",
    longDescription:
      "A lightweight, performant form library for React with built-in validation, accessibility-first design, TypeScript generics for type-safe forms, and zero dependencies. Published on npm with comprehensive documentation.",
    category: "open-source",
    technologies: ["TypeScript", "React", "Vitest", "npm"],
    image: "/images/form-lib.png",
    sourceUrl: "#",
    featured: false,
    date: "2025-04",
    highlights: [
      "TypeScript-first with full generics",
      "Built-in validation with custom rules",
      "Accessibility-first design",
      "Zero external dependencies",
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectCategories(): string[] {
  return [...new Set(projects.map((p) => p.category))];
}