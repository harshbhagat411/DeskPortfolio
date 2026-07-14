import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BGPattern } from "../components/ui/bg-pattern";
import Desktop from "../components/Desktop/Desktop";
import { applyTheme, getSavedTheme } from "../lib/theme";
import { useBoot } from "../context/BootContext";
import "../index.css";

export const TabletShell: React.FC = () => {
  const { theme } = useTheme();
  const { bootStatus } = useBoot();

  // Use a lighter gray for light mode pattern, darker gray for dark mode
  const patternFill = theme === "light" ? "#e5e7eb" : "#252525";

  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);
  }, []);

  return (
    <div className="tablet-version w-screen h-screen overflow-hidden relative z-0 bg-slate-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500 ease-in-out">
      {/* Wallpaper transition layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-[-1] tablet-wallpaper"
        style={{
          backgroundImage: `var(--theme-wallpaper)`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: bootStatus === "booting" ? 0 : "var(--theme-wallpaper-opacity, 1)"
        }}
        transition={{
          duration: bootStatus === "ready" ? 0.4 : 1.5,
          ease: "easeInOut"
        }}
      />
      <BGPattern variant="dots" mask="fade-center" fill={patternFill} />
      <Desktop />
    </div>
  );
};

export default TabletShell;
