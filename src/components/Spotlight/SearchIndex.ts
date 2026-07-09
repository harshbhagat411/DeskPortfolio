import Fuse from "fuse.js";

export interface SearchItem {
  id: string;
  title: string;
  category: "Applications" | "Projects" | "Skills" | "Resume" | "Contact" | "Settings";
  icon: string;
  actionType: "open-app" | "open-project" | "social-link" | "theme-action" | "resume-action";
  actionValue?: string;
}

export const searchIndexItems: SearchItem[] = [
  // Applications
  { id: "about", title: "About Me", category: "Applications", icon: "🖥", actionType: "open-app", actionValue: "about" },
  { id: "projects", title: "Projects", category: "Applications", icon: "🖥", actionType: "open-app", actionValue: "projects" },
  { id: "designs", title: "Designs", category: "Applications", icon: "🖥", actionType: "open-app", actionValue: "designs" },
  { id: "resume", title: "Resume", category: "Applications", icon: "🖥", actionType: "open-app", actionValue: "resume" },
  { id: "contact", title: "Contact", category: "Applications", icon: "🖥", actionType: "open-app", actionValue: "contact" },
  { id: "settings", title: "Settings", category: "Applications", icon: "🖥", actionType: "open-app", actionValue: "settings" },

  // Projects
  { id: "tasker-ai", title: "Task Nest", category: "Projects", icon: "📁", actionType: "open-project", actionValue: "tasker-ai" },
  { id: "ag-diamond", title: "AG Diamond", category: "Projects", icon: "📁", actionType: "open-project", actionValue: "ag-diamond" },
  { id: "heart-disease-ai", title: "Quick Fresh", category: "Projects", icon: "📁", actionType: "open-project", actionValue: "heart-disease-ai" },
  { id: "portfolio-os", title: "The Drobe", category: "Projects", icon: "📁", actionType: "open-project", actionValue: "portfolio-os" },
  { id: "flavora-bistro", title: "Flavora", category: "Projects", icon: "📁", actionType: "open-project", actionValue: "flavora-bistro" },
  { id: "ai-attendance", title: "Academic Workflow", category: "Projects", icon: "📁", actionType: "open-project", actionValue: "ai-attendance" },

  // Skills
  { id: "skill-java", title: "Java", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-spring-boot", title: "Spring Boot", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-hibernate", title: "Hibernate", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-react", title: "React", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-nextjs", title: "Next.js", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-nodejs", title: "Node.js", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-express", title: "Express", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-mongodb", title: "MongoDB", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-mysql", title: "MySQL", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-postgresql", title: "PostgreSQL", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-git", title: "Git", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-github", title: "GitHub", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-docker", title: "Docker", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-rest-api", title: "REST API", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-tailwind-css", title: "Tailwind CSS", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },
  { id: "skill-typescript", title: "TypeScript", category: "Skills", icon: "⚙", actionType: "open-app", actionValue: "about" },

  // Resume actions
  { id: "resume-preview", title: "Preview Resume", category: "Resume", icon: "📄", actionType: "resume-action", actionValue: "preview" },
  { id: "resume-download", title: "Download Resume", category: "Resume", icon: "📄", actionType: "resume-action", actionValue: "download" },

  // Social / Contact
  { id: "contact-github", title: "GitHub", category: "Contact", icon: "🐙", actionType: "social-link", actionValue: "https://github.com/harshbhagat411" },
  { id: "contact-linkedin", title: "LinkedIn", category: "Contact", icon: "💼", actionType: "social-link", actionValue: "https://www.linkedin.com/in/harsh-bhagat-863741356/" },
  { id: "contact-instagram", title: "Instagram", category: "Contact", icon: "📞", actionType: "social-link", actionValue: "https://www.instagram.com/harsh.bhagat411/" },
  { id: "contact-email", title: "Email", category: "Contact", icon: "📞", actionType: "social-link", actionValue: "mailto:harsh.bhagat411@gmail.com" },

  // Settings
  { id: "settings-theme", title: "Change Theme", category: "Settings", icon: "⚙", actionType: "open-app", actionValue: "settings" },
  { id: "settings-wallpapers", title: "Wallpapers", category: "Settings", icon: "⚙", actionType: "open-app", actionValue: "settings" },
  { id: "settings-appearance", title: "Appearance", category: "Settings", icon: "⚙", actionType: "open-app", actionValue: "settings" },
];

const fuseOptions = {
  keys: ["title", "category"],
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 1,
};

// Memoized instance of Fuse
let fuseInstance: Fuse<SearchItem> | null = null;

const getFuseInstance = () => {
  if (!fuseInstance) {
    fuseInstance = new Fuse(searchIndexItems, fuseOptions);
  }
  return fuseInstance;
};

export const performSearch = (query: string): SearchItem[] => {
  if (!query.trim()) return [];
  const fuse = getFuseInstance();
  return fuse.search(query).map((result) => result.item);
};
