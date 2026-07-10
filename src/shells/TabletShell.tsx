import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { BGPattern } from "../components/ui/bg-pattern";
import Desktop from "../components/Desktop/Desktop";
import { applyTheme, getSavedTheme } from "../lib/theme";
import "../index.css";

export const TabletShell: React.FC = () => {
  const { theme } = useTheme();

  // Use a lighter gray for light mode pattern, darker gray for dark mode
  const patternFill = theme === "light" ? "#e5e7eb" : "#252525";

  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);
  }, []);

  return (
    <div className="tablet-version w-screen h-screen overflow-hidden relative z-0 bg-slate-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500 ease-in-out">
      {/* Wallpaper transition layer */}
      <div
        className="absolute inset-0 transition-all duration-[400ms] ease-in-out bg-cover bg-center z-[-1] tablet-wallpaper"
        style={{
          backgroundImage: `var(--theme-wallpaper)`,
          opacity: `var(--theme-wallpaper-opacity, 0)`,
        }}
      />
      <BGPattern variant="dots" mask="fade-center" fill={patternFill} />
      <Desktop />
    </div>
  );
};

export default TabletShell;
