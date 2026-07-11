import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Sparkles,
  Users,
  Palette,
  Handshake,
  Download,
  ExternalLink,
  Mail,
  Layers,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  Monitor,
} from "lucide-react";
import { applyTheme, getSavedTheme } from "../lib/theme";
import { projects } from "../data/projects";

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className,
}) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ display: "inline-block", verticalAlign: "text-bottom" }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2 1.08.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
import {
  skills,
  tools,
  education,
  experience,
  certifications,
} from "../data/aboutData";
import { contactData } from "../data/contactData";
import { cn } from "../lib/utils";
import { BGPattern } from "../components/ui/bg-pattern";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";
import headImg from "../assets/avatar/head.png";
import logoLight from "../assets/branding/personal-logo-light.png";
import logoDark from "../assets/branding/personal-logo-dark.png";

// Map section IDs to display names for Navbar
const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const MobileShell: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [logoError, setLogoError] = useState(false);

  // Initialize theme setup and unlock body scrolling on mount
  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);

    // Enable scrolling on html/body for mobile companion
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.height = "auto";

    return () => {
      // Re-lock scroll if leaving mobile viewport
      document.body.style.overflow = "hidden";
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overflowY = "hidden";
      document.documentElement.style.height = "100vh";
    };
  }, []);

  // Reset logo error when theme changes
  useEffect(() => {
    setLogoError(false);
  }, [resolvedTheme]);

  // Scroll Spy listener to auto-update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(item.id);
          break;
        }
      }

      // Special check for Education to highlight Experience
      const eduEl = document.getElementById("education");
      if (eduEl) {
        const top = eduEl.offsetTop;
        const height = eduEl.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection("experience");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to render philosophy card icons
  const getPhilosophyIcon = (iconName: string) => {
    switch (iconName) {
      case "Simplicity First":
        return <Sparkles className="text-yellow-500 w-6 h-6" />;
      case "Users Before Features":
        return <Users className="text-blue-500 w-6 h-6" />;
      case "Design With Purpose":
        return <Palette className="text-pink-500 w-6 h-6" />;
      case "Collaboration Matters":
        return <Handshake className="text-green-500 w-6 h-6" />;
      default:
        return <Sparkles className="text-indigo-500 w-6 h-6" />;
    }
  };

  // Helper to render contact item icons
  const getContactIcon = (item: (typeof contactData)[0]) => {
    if (item.imageIcon) {
      return (
        <img
          src={item.imageIcon}
          alt={item.label}
          className="w-5 h-5 object-contain"
        />
      );
    }
    return <Mail className="w-5 h-5 text-neutral-400" />;
  };

  const patternFill = "#1e1e1e";

  return (
    <div className="mobile-version dark w-full min-h-screen overflow-x-hidden relative z-0 bg-[#080808] text-white font-sans select-none">
      {/* Monochrome Dark Mode Wallpaper Backdrop */}
      <div className="fixed inset-0 z-[-2] pointer-events-none bg-gradient-to-b from-[#121214] via-[#09090b] to-[#040405]" />

      {/* Background Dots Pattern */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <BGPattern variant="dots" mask="fade-center" fill={patternFill} />
      </div>

      {/* Sticky Translucent Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/10 dark:border-white/5 bg-white/20 dark:bg-black/10 backdrop-blur-lg flex items-center justify-between px-5">
        <span
          className="font-semibold text-base tracking-tight text-neutral-800 dark:text-neutral-100 flex items-center gap-2"
          style={{ padding: "10px" }}
        >
          {/* {!logoError ? (
            <img
              src={resolvedTheme === "dark" ? logoDark : logoLight}
              alt="H"
              className="w-6 h-6 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            "H"
          )} */}
          HB
        </span>

        {/* Scroll Nav Links */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto max-w-[70%] no-scrollbar py-1"
          style={{ paddingRight: "10px" }}
        >
          {navItems
            .filter((item) => item.id !== "hero")
            .map((item) => {
              const isSelected =
                activeSection === item.id ||
                (item.id === "experience" && activeSection === "education");
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
                    isSelected
                      ? "bg-[var(--theme-accent-muted,rgba(59,130,246,0.15))] text-[var(--theme-accent,#3b82f6)] scale-105"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 relative"
      >
        {/* Floating Head Avatar Wrapper with Radial Glow */}
        <div className="relative mb-12 flex justify-center items-center">
          <div
            className="absolute w-44 h-44 rounded-full blur-[35px] opacity-[0.25] pointer-events-none"
            style={{ backgroundColor: "var(--theme-avatar-glow, #3b82f6)" }}
          />
          <img
            src={headImg}
            alt="Floating Head"
            className="w-50 h-50 object-contain pointer-events-none select-none animate-bounce-slow"
            style={{
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.22))",
              paddingBottom: "20px",
              marginTop: "20px",
            }}
          />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
          Harsh Bhagat
        </h1>
        <h2 className="mt-5 text-xl font-medium text-[var(--theme-accent,#3b82f6)]">
          UI/UX Designer & Front-End Developer
        </h2>

        <p
          className="mt-8 text-sm max-w-sm text-neutral-500 dark:text-neutral-400 leading-relaxed"
          style={{ paddingBottom: "20px" }}
        >
          Visual storyteller turning complex ideas into intuitive digital
          journeys and interactive layouts that just feel right.
        </p>

        {/* Hero Actions */}
        <div className="mt-14 flex flex-col gap-3.5 w-full max-w-[260px]">
          <GlassButton
            className="w-full py-3.5 text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 text-white bg-[var(--theme-accent,#3b82f6)] border-none"
            onClick={() => scrollToSection("projects")}
          >
            View Projects <ArrowRight size={16} />
          </GlassButton>

          <button
            onClick={() => scrollToSection("contact")}
            className="w-full py-3.5 text-sm font-semibold rounded-2xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors"
            style={{ padding: "10px" }}
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-36 px-6 max-w-lg mx-auto border-t border-white/10"
      >
        <div className="space-y-2 mb-16" style={{ padding: "10px" }}>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block">
            About Me
          </span>
          <h2 className="text-2xl font-bold tracking-tight">My Journey</h2>
        </div>

        <div
          className="space-y-5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
          style={{ paddingLeft: "20px", paddingBottom: "20px" }}
        >
          <p>
            Hi, I'm Harsh Bhagat, a UI/UX Designer and Front-End Developer with
            a passion for creating digital products that are intuitive,
            functional, and visually engaging.
          </p>
          <br />
          <p>
            My journey began with development, where I learned how products are
            built. Over time, I became fascinated by the decisions behind great
            user experiences—why some interfaces feel effortless while others
            create friction. That curiosity led me into UI/UX design.
          </p>
          <br />
          <p>
            Today, I enjoy working across the entire product design process,
            from understanding user problems and wireframing to designing
            polished interfaces and collaborating on implementation.
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="mt-24 space-y-6">
          <h3
            className="text-[15px] font-semibold text-neutral-400 uppercase tracking-widest mb-6"
            style={{ paddingBottom: "10px" }}
          >
            Design Philosophy
          </h3>

          <div className="grid grid-cols-2 gap-3" style={{ padding: "10px" }}>
            {[
              {
                title: "Simplicity First",
                desc: "I believe the best interfaces remove unnecessary complexity and help users accomplish their goals with confidence.",
              },
              {
                title: "Users Before Features",
                desc: "Every design decision should solve a real user problem rather than simply adding more functionality.",
              },
              {
                title: "Design With Purpose",
                desc: "Good visuals attract attention, but thoughtful interactions build trust and create lasting experiences.",
              },
              {
                title: "Collaboration Matters",
                desc: "The best products come from designers, developers, and stakeholders working together toward a shared goal.",
              },
            ].map((card, idx) => (
              <GlassCard
                key={idx}
                hoverType="subtle"
                aspectSquare={false}
                className="p-5 flex flex-col items-start gap-3.5 border-white/20 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                style={{ padding: "15px" }}
              >
                {getPhilosophyIcon(card.title)}
                <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                  {card.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {card.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <br />
      <br />
      {/* Skills Section */}
      <section
        id="skills"
        className="py-36 px-6 max-w-lg mx-auto border-t border-white/10"
      >
        <br />
        <div className="space-y-2 mb-16" style={{ padding: "10px" }}>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block">
            Competencies
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Skills & Tools</h2>
        </div>

        {/* Technical Skills */}
        <div className="space-y-14">
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 block">
              Technical Expertise
            </h3>
            <div
              className="flex flex-wrap gap-2.5 mt-2"
              style={{ padding: "10px", paddingBottom: "15px" }}
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/[0.05] dark:bg-white/[0.3] border border-neutral-200/50 dark:border-white/150 backdrop-blur-md text-neutral-700 dark:text-neutral-300"
                  style={{ padding: "7px", margin: "0px" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="pt-6">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 block">
              Software & Utilities
            </h3>
            <div
              className="flex flex-wrap gap-2.5 mt-2"
              style={{ padding: "10px", paddingBottom: "15px" }}
            >
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[var(--theme-accent-muted,rgba(59,130,246,0.1))] border border-white/150 text-[var(--theme-accent,#3b82f6)]"
                  style={{ padding: "7px", margin: "0px" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <br />

      {/* Featured Projects Section */}
      <section
        id="projects"
        className="py-36 px-6 max-w-lg mx-auto border-t border-white/10"
      >
        <br />
        <div className="space-y-2 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block">
            Work Samples
          </span>
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Projects
          </h2>
        </div>

        <div className="flex flex-col gap-10" style={{ padding: "10px" }}>
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              hoverType="subtle"
              aspectSquare={false}
              className="overflow-hidden flex flex-col border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[24px]"
            >
              {/* Project Hero Image */}
              <div className="w-full h-44 overflow-hidden relative border-b border-white/10 dark:border-white/5">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>

              {/* Card Meta Content */}
              <div className="p-8 space-y-5">
                <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  {project.title}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-white/5">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <GlassButton className="w-full py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5">
                        <GithubIcon size={14} /> Repository
                      </GlassButton>
                    </a>
                  )}

                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <button className="w-full py-2.5 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-all flex items-center justify-center gap-1.5">
                        <ExternalLink size={14} /> Launch App
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        <br />
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-36 px-6 max-w-lg mx-auto border-t border-white/10"
      >
        <br />
        <div className="space-y-2 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block">
            Timeline
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
        </div>

        {/* Experience vertical timeline */}
        <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800 space-y-20 py-4 mt-6">
          {experience.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-4 border-slate-50 dark:border-[#080808] bg-[var(--theme-accent,#3b82f6)] shadow-[0_0_8px_var(--theme-accent)]" />

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[var(--theme-accent,#3b82f6)]">
                  {item.duration}
                </span>
                <h3 className="font-bold text-base text-neutral-950 dark:text-white">
                  {item.company}
                </h3>
                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {item.role}
                </h4>
                <p className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <br />

      {/* Education & Certifications Section */}
      <section
        id="education"
        className="py-36 px-6 max-w-lg mx-auto border-t border-white/10"
      >
        <br />
        <div className="space-y-2 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block">
            Credentials
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
        </div>

        {/* Education vertical timeline */}
        <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800 space-y-16 py-4 mt-6">
          {education.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-4 border-slate-50 dark:border-[#080808] bg-[var(--theme-accent,#3b82f6)] shadow-[0_0_8px_var(--theme-accent)]" />

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[var(--theme-accent,#3b82f6)]">
                  {item.duration}
                </span>
                <h3 className="font-bold text-base text-neutral-950 dark:text-white leading-snug">
                  {item.institution}
                </h3>
                <h4 className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {item.degree}
                </h4>
                <p className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <br />
        {/* Certifications lists */}
        <div className="mt-24">
          <h3
            className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6"
            style={{ padding: "10px" }}
          >
            Certifications
          </h3>

          <div className="space-y-7 mt-6">
            {certifications.map((cert, idx) => (
              <GlassCard
                key={idx}
                hoverType="subtle"
                aspectSquare={false}
                className="p-4 flex items-center gap-3.5 border-white/20 dark:border-white/10"
                style={{ padding: "10px", marginBottom: "10px" }}
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-neutral-400 flex-shrink-0">
                  <Award size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                    {cert.title}
                  </h4>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <br />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-36 px-6 max-w-lg mx-auto border-t border-white/10"
      >
        <br />
        <div className="space-y-2 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 block">
            Get in touch
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
        </div>

        <p
          className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8"
          style={{ paddingBottom: "5px" }}
        >
          Open to collaborations, freelance work, internship opportunities, or
          simply having a conversation.
        </p>

        {/* Mobile Contact Cards */}
        <div className="space-y-7 mt-6">
          {contactData.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <GlassCard
                hoverType="subtle"
                aspectSquare={false}
                className="p-4 flex items-center justify-between border-white/20 dark:border-white/10 group-active:scale-[0.985] transition-all"
                style={{ marginBottom: "10px", padding: "10px" }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.08] flex items-center justify-center transition-colors">
                    {getContactIcon(item)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-neutral-950 dark:text-white">
                      {item.label}
                    </h4>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-neutral-400 group-hover:text-white transition-colors"
                />
              </GlassCard>
            </a>
          ))}
        </div>

        {/* Resume Download CTA */}
        <div className="mt-12">
          <a
            href="/resume/Harsh_Bhagat_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GlassButton className="w-full py-4 text-xs font-semibold rounded-2xl flex items-center justify-center gap-1.5">
              <Download size={15} /> Download Full Resume (PDF)
            </GlassButton>
          </a>
        </div>
      </section>
      <br />
      <br />

      {/* Footer Section */}
      <footer className="py-24 px-6 bg-white/[0.01] dark:bg-black/[0.1] border-t border-white/10 text-center">
        <div
          className="max-w-sm mx-auto space-y-12 flex flex-col items-center justify-center"
          style={{ padding: "10px" }}
        >
          <br />
          {/* OS Desktop simulation recommendation banner */}
          <div
            className="w-full p-6 rounded-2xl border border-white/15 dark:border-white/5 bg-white/[0.03] dark:bg-white/[0.05] backdrop-blur-md flex flex-col items-center text-center space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            style={{ padding: "20px", paddingBottom: "20px" }}
          >
            <br />
            <div className="w-12 h-12 rounded-full bg-[var(--theme-accent-muted,rgba(59,130,246,0.1))] flex items-center justify-center text-[var(--theme-accent,#3b82f6)]">
              <Monitor size={20} />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Try the Desktop Experience
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[280px] mx-auto">
              Visit this portfolio on a larger screen (PC, Mac, or iPad) to
              experience the full interactive macOS desktop simulation!
            </p>
          </div>
          <br />

          <div className="w-full space-y-3 pt-8 border-t border-neutral-100 dark:border-neutral-900/60">
            <br />
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 dark:text-neutral-500 block uppercase">
              Harsh Bhagat &copy; {new Date().getFullYear()}
            </span>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
              Made with React & Framer Motion
            </p>
          </div>
        </div>
        <br />
        <br />
      </footer>
    </div>
  );
};

export default MobileShell;
