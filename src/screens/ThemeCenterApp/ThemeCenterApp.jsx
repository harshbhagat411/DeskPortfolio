import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { themesMap, applyTheme, getSavedTheme } from "../../lib/theme";
import oceanBg from "../../wallpapers/ocean.jpg";
import goldenHourBg from "../../wallpapers/golden-hour.jpg";
import arcticNightBg from "../../wallpapers/arctic-night.jpg";

const ThemeCenterApp = () => {
  const [currentThemeKey, setCurrentThemeKey] = useState(getSavedTheme());
  const { setTheme } = useTheme();

  const handleSelectTheme = (key) => {
    setCurrentThemeKey(key);
    applyTheme(key, setTheme);
  };

  // Synchronize state if changed elsewhere
  useEffect(() => {
    const handleThemeChange = (e) => {
      setCurrentThemeKey(e.detail);
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => {
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  const themeList = [
    {
      key: "monochrome",
      name: "Monochrome",
      previewBg: "bg-slate-200 dark:bg-[#121212]",
      previewStyle: {
        backgroundImage:
          "radial-gradient(circle, var(--mono-accent-muted) 1.5px, transparent 1.5px)",
        backgroundSize: "16px 16px",
      },
    },
    {
      key: "ocean",
      name: "Ocean",
      previewImage: oceanBg,
    },
    {
      key: "golden-hour",
      name: "Golden Hour",
      previewImage: goldenHourBg,
    },
    {
      key: "arctic-night",
      name: "Arctic Night",
      previewImage: arcticNightBg,
    },
  ];

  return (
    <div
      className="w-full h-full overflow-y-auto bg-transparent text-zinc-900 dark:text-zinc-100 select-none scroll-smooth"
      style={{ padding: "10px" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col p-8 md:p-10">
        {/* Header Section */}
        <div className="flex justify-between items-center pb-6 mb-8 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <div>
            <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              THEME
            </span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1">
              Appearance
            </h1>
          </div>
          <div className="text-right">
            br
            <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block">
              CURRENT
            </span>
            <span
              className="text-sm font-bold text-[var(--theme-accent)] uppercase mt-1 block"
              style={{ paddingBottom: "10px" }}
            >
              {themesMap[currentThemeKey]?.name || "Monochrome"}
            </span>
          </div>
        </div>
        <br />
        {/* Horizontal Theme Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full"
          style={{ padding: "25px" }}
        >
          {themeList.map((theme) => {
            const isActive = theme.key === currentThemeKey;
            return (
              <div
                key={theme.key}
                onClick={() => handleSelectTheme(theme.key)}
                className={`group flex flex-col gap-3 cursor-pointer select-none transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-[1.02]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {/* Wallpaper Preview Container */}
                <div
                  className={`relative aspect-[4/3] rounded-[16px] overflow-hidden border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[var(--theme-accent)] shadow-lg"
                      : "border-zinc-200/50 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-md group-hover:-translate-y-1"
                  }`}
                >
                  {/* Background Image / Pattern */}
                  {theme.previewImage ? (
                    <img
                      src={theme.previewImage}
                      alt={theme.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      draggable="false"
                    />
                  ) : (
                    <div
                      className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.03] ${theme.previewBg}`}
                      style={theme.previewStyle}
                    />
                  )}

                  {/* Dark Vignette Overlay on Preview */}
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/15 transition-opacity duration-300" />

                  {/* Selection Checkmark Badge */}
                  {isActive && (
                    <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--theme-accent)] text-[var(--theme-accent-contrast,#ffffff)] shadow-md transition-all duration-300">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Theme Name Label */}
                <span
                  className={`text-sm font-semibold tracking-wide text-center transition-colors duration-200 ${
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                  }`}
                >
                  {theme.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeCenterApp;
