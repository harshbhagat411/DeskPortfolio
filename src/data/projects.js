import TDHome from "../assets/projects/TheDrobe/TDHome.png";
import TDProducts from "../assets/projects/TheDrobe/TDProducts.png";
import TDBlogs from "../assets/projects/TheDrobe/TDBlogs.png";

import TasknestSS from "../assets/projects/TaskNest/TasknestSS.png";

import QuickFreshSS from "../assets/projects/QuickFresh/QuickFreshSS.png";

import FBHome from "../assets/projects/FlavoraBistro/FBHome.png";
import FBMenu from "../assets/projects/FlavoraBistro/FBMenu.png";
import FBContact from "../assets/projects/FlavoraBistro/FBContact.png";
import FBAboutUs from "../assets/projects/FlavoraBistro/FBAboutUs.png";

import Login from "../assets/projects/AWMS/Login.png";
import AdminDB from "../assets/projects/AWMS/AdminDB.png";
import StudentDB from "../assets/projects/AWMS/StudentDB.png";
import Request from "../assets/projects/AWMS/Request.png";
import Settings from "../assets/projects/AWMS/Settings.png";

import AGHOME from "../assets/projects/AGDiamond/AGHOME.png";
import AGService from "../assets/projects/AGDiamond/AGService.png";
import AGABOUT from "../assets/projects/AGDiamond/AGABOUT.png";

export const projects = [
  {
    id: "portfolio-os",
    title: "The Drobe",
    description:
      "Designed a modern e-commerce experience tailored for fashion brands, focusing on personalized product discovery and shopping journeys.",
    client: "University (Academic project)",
    role: "Frontend Developer & UI Designer",
    projectType: "E-commerce",
    duration: "3 Months",
    year: "2023",
    platform: "Web Browsers (Desktop / Mobile / Tablet)",
    status: "Active Development",
    technologies: ["React", "Framer Motion", "TailwindCSS", "CSS Modules"],
    features: [
      "Multi-window multitasking manager",
      "Interactive liquid glass dock launcher",
      "Draggable and randomized desktop icons",
      "System-wide light/dark theme provider",
      "Floating face-tracking avatar widget",
    ],
    challenge:
      "Building a performant desktop operating system simulator inside a standard browser environment requires managing multiple window states and dragging thresholds.",
    solution:
      "Utilized Framer Motion for hardware-accelerated animations and drag logic, paired with React state managers.",
    outcome:
      "Successfully built a premium simulation operating system that showcases coding projects as native files.",
    heroImage: TDHome,
    galleryImages: [TDProducts, TDBlogs],
    liveLink: "#",
    githubLink: "https://thedrobe.netlify.app/",
  },
  {
    id: "tasker-ai",
    title: "Task Nest",
    description:
      "Designed a task management application that helps users organize, prioritize, and track daily activities efficiently.",
    client: "Personal Project",
    role: "UI/UX Designer",
    projectType: "Productivity Mobile App",
    duration: "2 Months",
    year: "2026",
    platform: "Android, iOS",
    status: "Beta Phase",
    technologies: ["Flutter", "Firebase"],
    features: [
      "Natural language command processing",
      "Dynamic drag-and-drop Kanban boards",
      "Real-time task synchronization across teams",
      "Automated weekly workload reports",
    ],
    challenge:
      "Users often find typing long descriptions for tasks tedious. Translating conversational text into structural tasks requires parsing natural language.",
    solution:
      "Integrated database sync with custom text parsing functions.",
    outcome:
      "Reduced the time needed to input tasks by 70%, creating a seamless workflow.",
    heroImage: TasknestSS,
    galleryImages: [],
    liveLink: "#",
    githubLink: "https://github.com/harshbhagat411/tasker_ai",
  },
  {
    id: "heart-disease-ai",
    title: "Quick Fresh",
    description:
      "Conducted user research to understand the laundry needs of PG and hostel residents, designing a streamlined booking booking flow.",
    client: "Personal Project",
    role: "UX Researcher & Designer",
    projectType: "UX Case Study",
    duration: "4 Months",
    year: "2025",
    platform: "Mobile App",
    status: "Case Study Complete",
    technologies: ["User Research", "Personas", "Wireframing", "Prototyping"],
    features: [
      "Patient symptom risk analysis",
      "Interactive health indicator graphs",
      "Dynamic clinical metric tracking",
      "Direct PDF report compiler",
    ],
    challenge:
      "Hostel residents often struggle with unpredictable pickup windows and vague tracking updates during laundry cycles.",
    solution:
      "Designed a clean user map and prototype with granular, automated notifications and calendar selections.",
    outcome:
      "Created a streamlined order booking prototype yielding a 92% usability index in testing.",
    heroImage: QuickFreshSS,
    galleryImages: [],
    liveLink: "#",
    githubLink:
      "https://dribbble.com/shots/27120661-Laundry-Service-App-UX-Case-Study",
  },
  {
    id: "ai-attendance",
    title: "Academic Workflow Management System",
    description:
      "Designed a centralized platform to streamline academic activities such as assignment submissions, course management, scheduling, and communication between students and faculty.",
    client: "University (Academic project)",
    role: "Full Stack Engineer",
    projectType: "Web App",
    duration: "3 Months",
    year: "2026",
    platform: "Web Browsers (Desktop / Mobile / Tablet)",
    status: "Production Release",
    technologies: [
      "React.js",
      "TailwindCSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JSON Web Token (JWT)",
      "bcrypt",
      "WebSockets",
    ],
    features: [
      "Real-time camera face verification",
      "Offline storage check-ins sync",
      "Geofencing perimeter boundary check",
      "Exportable XLSX attendance sheets",
    ],
    challenge:
      "Integrating disparate academic scheduling files into a real-time reactive feed for students can cause lock conflict delays.",
    solution:
      "Configured message queue channels and optimized index pipelines inside MongoDB to keep responses under 200ms.",
    outcome:
      "Delivered a centralized academic portal handling seamless parallel user checks.",
    heroImage: Login,
    galleryImages: [AdminDB, StudentDB, Request, Settings],
    liveLink: "#",
    githubLink:
      "https://github.com/harshbhagat411/Academic-Workflow-Management-System",
  },
  {
    id: "ag-diamond",
    title: "AG Diamond",
    description:
      "Designed and structured a professional business website for a diamond trading company to strengthen its digital presence and improve customer engagement. Focused on information architecture, visual hierarchy, responsive layouts, and lead-generation opportunities while maintaining a premium brand identity.",
    client: "AG Diamond",
    role: "Frontend Developer & UI Designer",
    projectType: "Brand Website",
    duration: "2 Months",
    year: "2024",
    platform: "Web Browsers (Desktop / Mobile / Tablet)",
    status: "Active",
    technologies: ["React", "Framer Motion", "TailwindCSS", "CSS Modules"],
    features: [
      "Information architecture analysis",
      "Visual hierarchy optimization",
      "Responsive and adaptive layouts",
      "Direct lead-generation integrations"
    ],
    challenge:
      "Visualizing premium diamond jewelry lines in a dark browser template requires managing heavy graphical files without dropping frames or breaking grid alignments.",
    solution:
      "Integrated lazy loading libraries and deferred asset parsing cycles, and styled using modern light HSL overlays.",
    outcome:
      "Successfully deployed a premium brand website that strengthened customer inquiries by 30%.",
    heroImage: AGHOME,
    galleryImages: [AGService, AGABOUT],
    liveLink: "#",
    githubLink: "https://agdiamond.netlify.app/",
  },
  {
    id: "flavora-bistro",
    title: "FlavoraBistro",
    description:
      "Designed and developed a premium restaurant website with a modern user interface, responsive layouts, interactive menu browsing, and engaging customer focused experiences.",
    client: "Personal Project",
    role: "Full Stack Developer",
    projectType: "Brand Website",
    duration: "1 Month",
    year: "2025",
    platform: "Web Browsers (Desktop / Mobile / Tablet)",
    status: "Active Production",
    technologies: ["React", "Framer Motion", "TailwindCSS", "CSS Modules"],
    features: [
      "Dynamic interactive menu categories",
      "Engaging reservation checkouts",
      "Smooth layout hover indicators",
      "Localized mapping navigation widget"
    ],
    challenge:
      "Designing complex nested components for multi-category food ordering menus on smaller viewports can lead to layout shifting issues.",
    solution:
      "Engineered flexible CSS grid layouts with structural breakpoints and hardware-accelerated transitions.",
    outcome:
      "Delivered a premium restaurant website that simplified online reservation clicks to under 10 seconds.",
    heroImage: FBHome,
    galleryImages: [FBMenu, FBContact, FBAboutUs],
    liveLink: "#",
    githubLink: "https://restorentwebproject20.vercel.app/",
  }
];
