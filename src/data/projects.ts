import { Project, ProjectCategory } from "@/types";

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
    highlights: [
      "OTP-based login eliminating credential-remembering for 50+ shop owners",
      "Full CRUD for stocks, images, services and bulk collections",
      "Multi-vendor product management across wide range of companies",
      "Secure session management with Flask and SQLite backend",
    ],
    architecture: "Mobile → OTP Gateway (API) → Flask Backend → SQLite DB. Shop owners receive a one-time code on their registered mobile, validate against session store, and access the dashboard with role-based views.",
    keyLearnings: [
      "Session-based authentication patterns without third-party libraries",
      "Efficient SQLite query design for multi-tenant inventory",
      "Handling real-world edge cases in rural network environments",
    ],
    sourceUrl: "https://github.com/SreekaraPenugonda/grocery.git",
    featured: true,
    date: "2024-12",
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
    highlights: [
      "Voice + keyboard CRUD for daily tasks — hands-free option for accessibility",
      "Containerised with Docker and orchestrated via Kubernetes",
      "Deployed on Render — accessible as both web app and desktop application",
      "Real-time task synchronisation across devices",
    ],
    architecture: "Client (React/TypeScript) → Voice Recognition API → Express Backend → MongoDB Atlas. Containerised with Docker, orchestrated via Kubernetes on Render. WebSocket-based real-time sync across connected devices.",
    keyLearnings: [
      "WebSocket integration for real-time cross-device synchronisation",
      "Docker multi-stage builds for production optimisation",
      "Speech-to-text API integration with command parsing logic",
    ],
    sourceUrl: "https://github.com/SreekaraPenugonda/focusos-your-smart-task-hub.git",
    liveUrl: "https://focusos.onrender.com",
    featured: true,
    date: "2024-11",
  },
  {
    id: "3",
    slug: "quo-rion",
    title: "QUO-RION",
    tagline: "QR analytics platform for D-Mart, Reliance & retail chains",
    description: "Tracked QR scan analytics daily/weekly across 3+ retail chains including D-Mart and Reliance",
    longDescription: "A real-time QR code analytics platform tracking generation and scan statistics for major Indian retail chains. Delivers daily and weekly insights on QR usage patterns across D-Mart, Reliance, and marketing environments.",
    category: "full-stack" as ProjectCategory,
    technologies: ["JavaScript", "HTML", "CSS", "Flask", "REST API"],
    highlights: [
      "Analytics for D-Mart and Reliance QR campaigns — daily & weekly reports",
      "Real-time QR generation tracking via REST API integration",
      "Dashboard showing scan trends across multiple retail locations",
      "Flask backend serving live statistics to the frontend",
    ],
    architecture: "Dashboard (HTML/JS) → Flask REST API → PostgreSQL → Analytics Engine. QR scan events are ingested via API, processed in daily/weekly aggregation pipelines, and served to the frontend as time-series charts.",
    keyLearnings: [
      "Designing RESTful analytics endpoints for time-series data",
      "Aggregation pipeline optimisation for large scan datasets",
      "Dashboard UX principles for non-technical retail stakeholders",
    ],
    sourceUrl: "https://github.com/SreekaraPenugonda/QUORION.git",
    featured: true,
    date: "2024-10",
  },
  {
    id: "4",
    slug: "aws-cloud-infra",
    title: "AWS Cloud Infrastructure",
    tagline: "Scalable cloud architecture during AWS internship",
    description: "Designed and deployed scalable AWS solutions including EC2, S3, Lambda, and VPC setups",
    longDescription: "As an AWS Cloud Intern, architected and deployed multiple cloud-native solutions. Built auto-scaling EC2 fleets, serverless data pipelines with Lambda, and secure VPC topologies.",
    category: "devops" as ProjectCategory,
    technologies: ["AWS", "EC2", "S3", "Lambda", "VPC", "CloudFormation", "IAM"],
    highlights: [
      "Designed auto-scaling EC2 architecture handling variable traffic loads",
      "Built serverless data pipeline with Lambda and S3 event triggers",
      "Implemented least-privilege IAM policies across 10+ services",
      "Reduced monthly cloud costs by 25% through right-sizing and reserved instances",
    ],
    keyLearnings: [
      "Infrastructure as Code with AWS CloudFormation templates",
      "Cost analysis and optimisation strategies for cloud deployments",
      "Security best practices for multi-service AWS environments",
    ],
    sourceUrl: "https://github.com/SreekaraPenugonda",
    featured: false,
    date: "2025-03",
  },
  {
    id: "5",
    slug: "network-analysis-tool",
    title: "Network Analysis Toolkit",
    tagline: "Cisco Packet Tracer network simulation & analysis",
    description: "Comprehensive network simulations with routing protocols, VLANs, and security configurations",
    longDescription: "A toolkit of Cisco Packet Tracer network simulations covering OSPF, EIGRP, VLAN trunking, STP, and access-list security. Designed for CCNA-level learning. Explored IoT integration with home gateway setups.",
    category: "backend" as ProjectCategory,
    technologies: ["Cisco Packet Tracer", "OSPF", "VLAN", "STP", "ACL", "IoT"],
    highlights: [
      "OSPF and EIGRP multi-area routing configurations across 5+ router topology",
      "VLAN segmentation with inter-VLAN routing and STP loop prevention",
      "Extended ACLs for granular traffic filtering and network security",
      "IoT integration with smart home device connectivity simulations",
    ],
    sourceUrl: "https://github.com/SreekaraPenugonda",
    featured: false,
    date: "2025-01",
  },
];

// ── Shared visual helpers ──────────────────────────────────────────
export const categoryLabels: Record<string, string> = {
  "full-stack": "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  mobile: "Mobile",
  "ai-ml": "AI/ML",
  "open-source": "Open Source",
};

export const categoryColors: Record<string, string> = {
  "full-stack": "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
  backend: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
  frontend: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800",
  devops: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
  mobile: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800",
};

export const cardGradients = [
  "from-blue-500/10 via-indigo-500/5 to-transparent",
  "from-emerald-500/10 via-teal-500/5 to-transparent",
  "from-purple-500/10 via-pink-500/5 to-transparent",
  "from-amber-500/10 via-orange-500/5 to-transparent",
  "from-rose-500/10 via-red-500/5 to-transparent",
];

/** Metrics for case study impact section */
export const projectMetrics: Record<string, { label: string; value: string; suffix?: string }[]> = {
  "grocery-flask-app": [
    { label: "Kirana Shops Onboarded", value: "50", suffix: "+" },
    { label: "CRUD Operations Built", value: "4" },
    { label: "Vendors Supported", value: "10", suffix: "+" },
  ],
  "typescript-command-center": [
    { label: "Platform Availability", value: "2" },
    { label: "Voice Commands", value: "15", suffix: "+" },
    { label: "Containerisation", value: "3" },
  ],
  "quo-rion": [
    { label: "Retail Chains Tracked", value: "3", suffix: "+" },
    { label: "Analytics Type", value: "D/W" },
    { label: "QR Campaigns", value: "5", suffix: "+" },
  ],
};

export function getFeaturedProjects() {
  return projects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find(project => project.slug === slug);
}

export function getProjectById(id: string) {
  return projects.find(project => project.id === id || project.slug === id);
}

export function getProjectCategories() {
  const used = new Set(projects.map(p => p.category).filter(Boolean));
  return Array.from(used) as string[];
}