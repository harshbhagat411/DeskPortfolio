import Fuse from "fuse.js";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category:
    | "Applications"
    | "Projects"
    | "Skills"
    | "Resume"
    | "Contact"
    | "Settings";

  icon: string;

  keywords?: string[];

  actionType: "open-app" | "open-project" | "social-link" | "resume-action";

  actionValue?: string;
}

export const searchIndexItems: SearchItem[] = [
  // ==========================
  // Applications
  // ==========================

  {
    id: "about",
    title: "About Me",
    description: "Learn more about me",
    category: "Applications",
    icon: "👤",
    keywords: ["about", "profile", "bio"],
    actionType: "open-app",
    actionValue: "about",
  },

  {
    id: "projects",
    title: "Projects",
    description: "Browse all portfolio projects",
    category: "Applications",
    icon: "📁",
    keywords: ["portfolio", "works"],
    actionType: "open-app",
    actionValue: "projects",
  },

  {
    id: "designs",
    title: "Designs",
    description: "UI & Graphic Designs",
    category: "Applications",
    icon: "🎨",
    keywords: ["figma", "design"],
    actionType: "open-app",
    actionValue: "designs",
  },

  {
    id: "resume",
    title: "Resume",
    description: "View professional resume",
    category: "Applications",
    icon: "📄",
    keywords: ["cv"],
    actionType: "open-app",
    actionValue: "resume",
  },

  {
    id: "contact",
    title: "Contact",
    description: "Get in touch",
    category: "Applications",
    icon: "📬",
    keywords: ["mail", "email"],
    actionType: "open-app",
    actionValue: "contact",
  },

  {
    id: "settings",
    title: "Settings",
    description: "Customize your experience",
    category: "Applications",
    icon: "⚙️",
    keywords: ["theme"],
    actionType: "open-app",
    actionValue: "settings",
  },

  // ==========================
  // Projects
  // ==========================

  {
    id: "tasker-ai",
    title: "Task Nest",
    description: "AI Productivity Application",
    category: "Projects",
    icon: "🚀",
    keywords: ["todo", "flutter", "firebase"],
    actionType: "open-project",
    actionValue: "tasker-ai",
  },

  {
    id: "ag-diamond",
    title: "AG Diamond",
    description: "Business Website",
    category: "Projects",
    icon: "💎",
    keywords: ["diamond"],
    actionType: "open-project",
    actionValue: "ag-diamond",
  },

  {
    id: "heart-disease-ai",
    title: "Quick Fresh",
    description: "Fresh Grocery Platform",
    category: "Projects",
    icon: "🥬",
    keywords: ["grocery"],
    actionType: "open-project",
    actionValue: "heart-disease-ai",
  },

  {
    id: "portfolio-os",
    title: "The Drobe",
    description: "Fashion E-commerce UI",
    category: "Projects",
    icon: "🛍️",
    keywords: ["shopping"],
    actionType: "open-project",
    actionValue: "portfolio-os",
  },

  {
    id: "flavora-bistro",
    title: "Flavora",
    description: "Restaurant Website",
    category: "Projects",
    icon: "🍔",
    keywords: ["food"],
    actionType: "open-project",
    actionValue: "flavora-bistro",
  },

  {
    id: "ai-attendance",
    title: "Academic Workflow",
    description: "Student Management System",
    category: "Projects",
    icon: "🎓",
    keywords: ["college"],
    actionType: "open-project",
    actionValue: "ai-attendance",
  },

  // ==========================
  // Skills
  // ==========================

  ...[
    "Java",
    "Spring Boot",
    "Hibernate",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Git",
    "GitHub",
    "Docker",
    "REST API",
    "Tailwind CSS",
    "TypeScript",
  ].map((skill) => ({
    id: `skill-${skill.toLowerCase().replace(/\s+/g, "-")}`,
    title: skill,
    description: "Technical Skill",
    category: "Skills" as const,
    icon: "💻",
    keywords: [skill.toLowerCase()],
    actionType: "open-app" as const,
    actionValue: "about",
  })),

  // ==========================
  // Resume
  // ==========================

  {
    id: "resume-preview",
    title: "Preview Resume",
    description: "Open resume preview",
    category: "Resume",
    icon: "📄",
    actionType: "resume-action",
    actionValue: "preview",
  },

  {
    id: "resume-download",
    title: "Download Resume",
    description: "Download PDF",
    category: "Resume",
    icon: "⬇️",
    actionType: "resume-action",
    actionValue: "download",
  },

  // ==========================
  // Contact
  // ==========================

  {
    id: "contact-github",
    title: "GitHub",
    description: "View source code",
    category: "Contact",
    icon: "🐙",
    actionType: "social-link",
    actionValue: "https://github.com/harshbhagat411",
  },

  {
    id: "contact-linkedin",
    title: "LinkedIn",
    description: "Professional profile",
    category: "Contact",
    icon: "💼",
    actionType: "social-link",
    actionValue: "https://www.linkedin.com/in/harsh-bhagat-863741356/",
  },

  {
    id: "contact-instagram",
    title: "Instagram",
    description: "Follow me",
    category: "Contact",
    icon: "📸",
    actionType: "social-link",
    actionValue: "https://www.instagram.com/harsh.bhagat411/",
  },

  {
    id: "contact-email",
    title: "Email",
    description: "Send an email",
    category: "Contact",
    icon: "✉️",
    actionType: "social-link",
    actionValue: "mailto:harsh.bhagat411@gmail.com",
  },
];

const fuse = new Fuse(searchIndexItems, {
  keys: [
    {
      name: "title",
      weight: 0.6,
    },
    {
      name: "description",
      weight: 0.25,
    },
    {
      name: "keywords",
      weight: 0.15,
    },
  ],

  threshold: 0.35,
  includeScore: true,
  ignoreLocation: true,
});

export const performSearch = (query: string): SearchItem[] => {
  if (!query.trim()) return [];

  return fuse.search(query).map((r) => r.item);
};
