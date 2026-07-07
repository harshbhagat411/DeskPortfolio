import React from "react";
import { cn } from "../../lib/utils";
import { ExternalLink, BookOpen, Layers, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GlassButton = ({ href, children, variant = "primary" }) => {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 backdrop-blur-md border outline-none cursor-pointer select-none",
        variant === "primary"
          ? "bg-indigo-600/90 hover:bg-indigo-600 border-indigo-500/30 text-white shadow-[0_8px_24px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_32px_rgba(79,70,229,0.35)]"
          : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:border-black/20 dark:hover:border-white/20",
      )}
    >
      {children}
    </a>
  );
};

const ProjectDetail = ({ project }) => {
  if (!project) return null;

  const allScreenshots = [project.heroImage, ...(project.galleryImages || [])].filter(Boolean);

  return (
    <div className="w-full h-full overflow-y-auto bg-transparent text-zinc-900 dark:text-zinc-100 select-text scroll-smooth">
      <div
        className="max-w-5xl mx-auto flex flex-col"
        style={{ padding: "15px" }}
      >
        {/* SECTION 1: Header */}
        <div className="mb-16" style={{ paddingBottom: "20px" }}>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-8 leading-none"
            style={{ paddingBottom: "5px" }}
          >
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            {project.description}
          </p>
          {/* <br /> */}
        </div>

        {/* SECTION 2: Two-Column Information Grid */}
        <div
          className="grid grid-cols-2 gap-8 md:gap-12 mb-20 border-t border-b border-zinc-200/50 dark:border-zinc-800/50 py-14 "
          style={{ paddingBottom: "20px" }}
        >
          {/* Left Column */}
          <div className="space-y-6">
            <div style={{ paddingBottom: "10px" }}>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold block mb-1.5">
                Client
              </span>
              <span className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 block">
                {project.client}
              </span>
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold block mb-1.5">
                Project Type
              </span>
              <span className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 block">
                {project.projectType}
              </span>
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold block mb-1.5">
                Project in detail
              </span>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f05a5a] text-white active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(240,90,90,0.3)] hover:shadow-[0_8px_24px_rgba(240,90,90,0.55)] hover:scale-110 mt-1 select-none outline-none cursor-pointer overflow-hidden"
              >
                <span className="relative overflow-hidden w-6 h-6 block pointer-events-none">
                  <ArrowUpRight
                    size={24}
                    strokeWidth={2.5}
                    className="absolute inset-0 transition-transform duration-300 ease-out group-hover/btn:translate-x-full group-hover/btn:-translate-y-full"
                  />
                  <ArrowUpRight
                    size={24}
                    strokeWidth={2.5}
                    className="absolute inset-0 transition-transform duration-300 ease-out -translate-x-full translate-y-full group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                  />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div style={{ paddingBottom: "10px" }}>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold block mb-1.5">
                Year
              </span>
              <span className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 block">
                {project.year}
              </span>
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold block mb-1.5">
                Platform
              </span>
              <span className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 block">
                {project.platform}
              </span>
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold block mb-1.5">
                Tech Stack
              </span>
              <span className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 block">
                {project.technologies.join(", ")}
              </span>
            </div>
          </div>
        </div>
        <br />

        {/* SECTION 4: Multiple Hero Sections */}
        {allScreenshots.map((img, index) => (
          <div 
            key={index}
            className="w-full relative rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)] mb-14"
          >
            <img
              src={img}
              alt={`${project.title} Screenshot Section ${index + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
