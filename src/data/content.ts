export const roles = [
  "Full Stack Developer",
  "Backend Engineer",
  "AI Enthusiast",
  "ML Learner",
];

export const stats = [
  { label: "Years building software", value: "3+" },
  { label: "Production projects shipped", value: "10+" },
  { label: "Core stack mastered", value: "React · Spring Boot" },
  { label: "Focus area", value: "AI-driven systems" },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "inventory-management",
    title: "Inventory Management System",
    description:
      "A full-stack inventory platform for tracking stock levels, purchase orders, and warehouse movement in real time, built for teams that need accuracy over spreadsheets.",
    stack: ["React", "Spring Boot", "REST API", "MySQL"],
    highlights: [
      "Role-based dashboards for admins and staff",
      "Real-time stock alerts and low-inventory flags",
      "Reporting views for purchase and sales history",
    ],
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A responsive online storefront with product browsing, cart management, and checkout flow, built from the ground up with core web technologies.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Dynamic cart and checkout logic in vanilla JS",
      "Fully responsive across mobile, tablet, and desktop",
      "Optimized asset loading for fast page speed",
    ],
  },
  {
    id: "ai-resume-screener",
    title: "AI Resume Screener",
    description:
      "An intelligent screening tool that parses resumes and ranks candidates against job requirements, cutting manual review time for recruiters.",
    stack: ["Python", "NLP", "Machine Learning", "Flask"],
    highlights: [
      "Automated keyword and skill extraction from resumes",
      "Candidate scoring model trained on labeled data",
      "Simple upload-and-review interface for recruiters",
    ],
  },
  {
    id: "handwriting-synthesis",
    title: "Handwriting Synthesis",
    description:
      "A generative model that produces realistic, human-like handwriting from typed text, exploring sequence modeling for stroke-level generation.",
    stack: ["Python", "Deep Learning", "RNN", "TensorFlow"],
    highlights: [
      "Stroke-sequence generation from text input",
      "Style-conditioned handwriting variation",
      "Exported vector output for rendering at any scale",
    ],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  },
  {
    category: "Backend",
    items: ["Spring Boot", "Java", "Node.js", "REST APIs", "Python"],
  },
  {
    category: "AI / ML",
    items: ["Machine Learning", "NLP", "TensorFlow", "PyTorch", "Deep Learning"],
  },
  {
    category: "Data & Tools",
    items: ["MySQL", "MongoDB", "Git", "Docker", "Postman"],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Full Stack Developer Intern",
    org: "Vulture Lines Management Pvt.Ltd",
    period: "2025 (Internship)",
    description:
      "Designed and shipped full-stack applications end to end, from database schema to production UI, across React, Spring Boot, and Python-based services.",
  },
  {
    role: "Web Developer Intern",
    org: "Internpe",
    period: "2024 (Internship)",
    description:
      "Built and maintained web applications using modern frontend and backend technologies.",
  },
  {
    role: "Computer Science Student",
    org: "Undergraduate Studies",
    period: "2024 — Present",
    description:
      "Studying core computer science fundamentals while building production-grade side projects to apply theory to real systems.",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  { title: "Programming with Java", issuer: "Coursera", year: "2026" },
  { title: "Introduction to Frontend Development", issuer: "Simplilearn", year: "2025" },
  { title: "AWS Solutions Architecture Job Simulation", issuer: "Forage", year: "2024" },
  { title: "MongoDB Basics for Students", issuer: "MongoDB University", year: "2024" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Guna-garan" },
  { label: "LinkedIn", href: "https://linkedin.com/in/gunagaran-s-k-882552327" },
  { label: "Email", href: "mailto:gunagaran08@gmail.com" },
];
