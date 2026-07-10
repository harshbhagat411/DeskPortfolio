import React, { useState, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useTheme } from "next-themes";
import { themesMap, applyTheme, getSavedTheme } from "../../lib/theme";
import GlassCard from "../ui/GlassCard";
import { cn } from "../../lib/utils";
import { useDeviceType } from "../../hooks/useDeviceType";
import oceanBg from "../../wallpapers/ocean.jpg";
import goldenHourBg from "../../wallpapers/golden-hour.jpg";
import arcticNightBg from "../../wallpapers/arctic-night.jpg";

const ThemeWidget: React.FC = () => {
  const dragControls = useDragControls();
  const [currentThemeKey, setCurrentThemeKey] = useState(getSavedTheme());
  const { setTheme } = useTheme();

  const handleDragStart = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  const handleSelectTheme = (key: string) => {
    setCurrentThemeKey(key);
    applyTheme(key, setTheme);
  };

  useEffect(() => {
    const handleThemeChange = (e: Event & { detail?: string }) => {
      if (e.detail) {
        setCurrentThemeKey(e.detail);
      }
    };
    window.addEventListener("themechange", handleThemeChange as EventListener);
    return () => {
      window.removeEventListener(
        "themechange",
        handleThemeChange as EventListener,
      );
    };
  }, []);

  const themeList = [
    {
      key: "monochrome",
      name: "Default",
      previewBg: "bg-zinc-800 dark:bg-zinc-950",
      previewStyle: {
        background:
          "radial-gradient(circle, rgba(255,255,255,0.15) 20%, transparent 20%)",
        backgroundSize: "8px 8px",
      },
    },
    {
      key: "ocean",
      name: "Ocean",
      previewImage: oceanBg,
    },
    {
      key: "golden-hour",
      name: "Golden H",
      previewImage: goldenHourBg,
    },
    {
      key: "arctic-night",
      name: "Arctic N",
      previewImage: arcticNightBg,
    },
  ];

  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className={cn("absolute left-6 z-20 select-none", isTablet ? "bottom-[355px]" : "bottom-[295px]")}
      style={{ touchAction: "none" }}
    >
      <GlassCard
        aspectSquare={false}
        hoverType="none"
        className={cn(
          isTablet ? "w-[280px] h-[185px] rounded-[24px]" : "w-[240px] h-[160px] rounded-[20px]",
          "pt-[20px] pl-[16px] pr-[16px] pb-[16px] transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
        )}
      >
        <div
          className="w-full h-full flex flex-col justify-between"
          style={{ padding: isTablet ? "20px" : "15px" }}
        >
          {/* Centered Drag Handle Container */}
          <div
            className={cn(
              "w-full pb-2.5 mb-2.5 border-b border-zinc-200/50 dark:border-zinc-100/25 flex justify-center",
              isTablet && "pb-3.5 mb-3.5"
            )}
            style={{ paddingBottom: "5px" }}
          >
            <div
              onPointerDown={handleDragStart}
              className={cn(
                "bg-zinc-400/60 dark:bg-zinc-600/50 rounded-full cursor-grab active:cursor-grabbing hover:bg-zinc-500 dark:hover:bg-zinc-400 transition-colors",
                isTablet ? "w-14 h-2" : "w-10 h-1"
              )}
              style={{ marginBottom: "5px" }}
            />
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-2 px-0.5 select-none">
            <span 
              className={cn(
                "font-bold font-sans tracking-wider text-[var(--theme-text-muted)] uppercase",
                isTablet ? "text-[12px]" : "text-[10px]"
              )}
            >
              THEME
            </span>
            <span 
              className={cn(
                "font-bold font-sans tracking-wider text-[var(--theme-accent)] uppercase",
                isTablet ? "text-[12px]" : "text-[10px]"
              )}
            >
              {themesMap[currentThemeKey]?.name || "Monochrome"}
            </span>
          </div>

          {/* horizontal list of 4 themes */}
          <div className="flex gap-2 justify-between items-center w-full mt-1">
            {themeList.map((theme) => {
              const isActive = theme.key === currentThemeKey;
              return (
                <div
                  key={theme.key}
                  onClick={() => handleSelectTheme(theme.key)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer flex-1"
                >
                  {/* Card Thumbnail */}
                  <div
                    className={cn(
                      "relative overflow-hidden border transition-all duration-300",
                      isTablet ? "w-12 h-12 rounded-[10px]" : "w-10 h-10 rounded-[8px]",
                      isActive
                        ? "border-[var(--theme-accent)] scale-105 shadow-sm"
                        : "border-zinc-200/50 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-600 hover:scale-[1.03]"
                    )}
                  >
                    {theme.previewImage ? (
                      <img
                        src={theme.previewImage}
                        alt={theme.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    ) : (
                      <div
                        className={cn(
                          "w-full h-full flex items-center justify-center relative",
                          theme.previewBg
                        )}
                        style={theme.previewStyle}
                      >
                        {/* Center Concentric Circle Graphics for Default */}
                        <div 
                          className={cn(
                            "rounded-full border border-zinc-600/35 dark:border-zinc-400/25 flex items-center justify-center",
                            isTablet ? "w-5 h-5" : "w-4 h-4"
                          )}
                        >
                          <div 
                            className={cn(
                              "rounded-full bg-zinc-600/50 dark:bg-zinc-400/50",
                              isTablet ? "w-2.5 h-2.5" : "w-1.5 h-1.5"
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Small dot in bottom-right corner for selection indicator */}
                    {isActive && (
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
                    )}
                  </div>

                  {/* Theme Label */}
                  <span
                    className={cn(
                      "font-bold font-sans uppercase tracking-tight text-center transition-colors duration-200",
                      isTablet ? "text-[10px]" : "text-[8px]",
                      isActive
                        ? "text-[var(--theme-text-main)]"
                        : "text-[var(--theme-text-muted)]"
                    )}
                  >
                    {theme.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ThemeWidget;
