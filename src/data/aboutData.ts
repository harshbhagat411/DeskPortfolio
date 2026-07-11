export const skills = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Design Systems",
  "JavaScript",
  "React.js",
  "Node.js",
  "Typescript",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Python",
  "C++",
  "SQL",
  "Git & GitHub",
];

export const tools = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Canva",
  "Visual Studio Code",
  "Android Studio",
  "GitHub ",
  "Antigravity",
];

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export const education: EducationItem[] = [
  {
    institution: "Uka Tarsadia University",
    degree: "Integrated Master of Science in Information Technology",
    duration: "Ongoing",
    description: "Specializing in software engineering, frontend technologies, and user-centered system design."
  }
];

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "AG Diamonds",
    role: "Freelance UI Designer & Developer",
    duration: "2024",
    description: "Designed a premium website experience for a diamond trading company, optimizing lead generation and information architecture."
  },
  {
    company: "Better Call Thrift",
    role: "Freelance Brand Designer",
    duration: "2023",
    description: "Designed the brand identity and custom icon assets for an emerging clothing brand."
  }
];

export interface CertificationItem {
  title: string;
  issuer: string;
}

export const certifications: CertificationItem[] = [
  {
    title: "Design Psychology: Master the Art and Science of UX Design",
    issuer: "LinkedIn Learning"
  },
  {
    title: "UI/UX Course",
    issuer: "Tutedude"
  },
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp"
  }
];
