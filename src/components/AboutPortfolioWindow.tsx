import React from "react";
import { Monitor } from "lucide-react";

const AboutPortfolioWindow: React.FC = () => {
  const specs = [
    { label: "Runtime", value: "React 19 · Vite 8" },
    { label: "Language", value: "TypeScript · JavaScript" },
    { label: "Styling", value: "Tailwind CSS v4" },
    { label: "Animation", value: "Framer Motion v12" },
    { label: "Font", value: "System UI" },
    { label: "Deployment", value: "Vercel" },
  ];

  return (
    <div
      className="w-full h-full flex flex-col items-center p-6 text-[var(--theme-text-main)] overflow-y-auto bg-transparent"
      style={{
        paddingTop: "20px",
        // paddingBottom: "20px",
      }}
    >
      {/* System Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mb-4">
        <Monitor className="w-8 h-8 text-white/80" />
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold tracking-wide">Desk Portfolio</h1>
      <p
        className="text-[11px] text-[var(--theme-text-muted)] font-medium mt-0.5 mb-5"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Version 1.0.0
      </p>

      {/* Specs Divider */}
      <div className="w-full h-px bg-white/10 mb-4" />

      {/* Specs Grid */}
      <div
        className="w-full flex flex-col gap-2.5 max-w-sm px-2"
        style={{
          paddingTop: "20px",
          paddingBottom: "10px",
          paddingRight: "30px",
          paddingLeft: "30px",
        }}
      >
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between items-center text-[12px]"
          >
            <span className="text-[var(--theme-text-muted)] font-medium">
              {spec.label}
            </span>
            <span className="font-semibold text-white/90 text-right">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPortfolioWindow;
