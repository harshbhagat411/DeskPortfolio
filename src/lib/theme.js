import oceanBg from "../wallpapers/ocean.jpg";
import goldenHourBg from "../wallpapers/golden-hour.jpg";
import arcticNightBg from "../wallpapers/arctic-night.jpg";

export const themesMap = {
  monochrome: {
    id: "monochrome",
    name: "Monochrome",
    accent: "var(--mono-accent)",
    accentContrast: "var(--mono-accent-contrast)",
    accentMuted: "var(--mono-accent-muted)",
    widgetTint: "var(--mono-widget-tint)",
    wallpaper: "none",
    wallpaperOpacity: "0",
    glassBg: "var(--default-glass-bg)",
    glassBgContent: "var(--default-glass-bg-content)",
    glassBorder: "var(--default-glass-border)",
    shadow: "var(--default-shadow)",
    selection: "var(--mono-selection)",
    avatarGlow: "var(--mono-avatar-glow)",
    folderHover: "var(--mono-folder-hover)",
    textMain: "var(--text-main)",
    textMuted: "var(--text-muted)",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    accent: "#64C7FF",
    accentContrast: "#000000",
    accentMuted: "rgba(100, 199, 255, 0.25)",
    widgetTint: "rgba(100, 199, 255, 0.15)",
    wallpaper: `url(${oceanBg})`,
    wallpaperOpacity: "1",
    glassBg: "rgba(100, 199, 255, 0.08)",
    glassBgContent: "rgba(235, 245, 255, 0.5)",
    glassBorder: "rgba(100, 199, 255, 0.25)",
    shadow: "0 12px 48px rgba(10, 30, 60, 0.45)",
    selection: "rgba(100, 199, 255, 0.3)",
    avatarGlow: "rgba(100, 199, 255, 0.4)",
    folderHover: "rgba(100, 199, 255, 0.25)",
    textMain: "var(--ocean-text-main)",
    textMuted: "var(--ocean-text-muted)",
  },
  "golden-hour": {
    id: "golden-hour",
    name: "Golden Hour",
    accent: "#F3A847",
    accentContrast: "#000000",
    accentMuted: "rgba(243, 168, 71, 0.25)",
    widgetTint: "rgba(243, 168, 71, 0.15)",
    wallpaper: `url(${goldenHourBg})`,
    wallpaperOpacity: "1",
    glassBg: "rgba(243, 168, 71, 0.08)",
    glassBgContent: "rgba(50, 30, 20, 0.4)",
    glassBorder: "rgba(243, 168, 71, 0.25)",
    shadow: "0 12px 48px rgba(80, 40, 10, 0.45)",
    selection: "rgba(243, 168, 71, 0.3)",
    avatarGlow: "rgba(243, 168, 71, 0.4)",
    folderHover: "rgba(243, 168, 71, 0.25)",
    textMain: "var(--golden-text-main)",
    textMuted: "var(--golden-text-muted)",
  },
  "arctic-night": {
    id: "arctic-night",
    name: "Arctic Night",
    accent: "#82D9FF",
    accentContrast: "#000000",
    accentMuted: "rgba(130, 217, 255, 0.25)",
    widgetTint: "rgba(130, 217, 255, 0.15)",
    wallpaper: `url(${arcticNightBg})`,
    wallpaperOpacity: "1",
    glassBg: "rgba(130, 217, 255, 0.08)",
    glassBgContent: "rgba(20, 25, 40, 0.4)",
    glassBorder: "rgba(130, 217, 255, 0.25)",
    shadow: "0 12px 48px rgba(10, 25, 45, 0.45)",
    selection: "rgba(130, 217, 255, 0.3)",
    avatarGlow: "rgba(130, 217, 255, 0.4)",
    folderHover: "rgba(130, 217, 255, 0.25)",
    textMain: "var(--arctic-text-main)",
    textMuted: "var(--arctic-text-muted)",
  },
};

export const applyTheme = (themeKey, setTheme) => {
  const currentTheme = themesMap[themeKey] || themesMap.monochrome;

  localStorage.setItem("desktop-theme", themeKey);

  // Force theme mode lock based on selection
  if (setTheme) {
    if (themeKey === "ocean") {
      setTheme("light");
    } else if (themeKey === "golden-hour" || themeKey === "arctic-night") {
      setTheme("dark");
    }
  } else {
    // DOM Fallback on load
    if (themeKey === "ocean") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (themeKey === "golden-hour" || themeKey === "arctic-night") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  const root = document.documentElement;
  root.style.setProperty("--theme-accent", currentTheme.accent);
  root.style.setProperty("--theme-accent-contrast", currentTheme.accentContrast || "#ffffff");
  root.style.setProperty("--theme-accent-muted", currentTheme.accentMuted);
  root.style.setProperty("--theme-widget-tint", currentTheme.widgetTint);
  root.style.setProperty("--theme-wallpaper", currentTheme.wallpaper);
  root.style.setProperty(
    "--theme-wallpaper-opacity",
    currentTheme.wallpaperOpacity,
  );
  root.style.setProperty("--theme-glass-bg", currentTheme.glassBg);
  root.style.setProperty(
    "--theme-glass-bg-content",
    currentTheme.glassBgContent,
  );
  root.style.setProperty("--theme-glass-border", currentTheme.glassBorder);
  root.style.setProperty("--theme-shadow", currentTheme.shadow);
  root.style.setProperty("--theme-selection", currentTheme.selection);
  root.style.setProperty("--theme-avatar-glow", currentTheme.avatarGlow);
  root.style.setProperty("--theme-folder-hover", currentTheme.folderHover);
  root.style.setProperty("--theme-text-main", currentTheme.textMain);
  root.style.setProperty("--theme-text-muted", currentTheme.textMuted);

  // Custom event to notify React components
  window.dispatchEvent(new CustomEvent("themechange", { detail: themeKey }));
};

export const getSavedTheme = () => {
  return localStorage.getItem("desktop-theme") || "monochrome";
};
