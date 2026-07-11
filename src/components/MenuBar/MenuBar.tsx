import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  Wifi,
  Battery,
  Sun,
  Moon,
  Monitor,
  Check,
  Laptop,
  Info,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useDeviceType } from "../../hooks/useDeviceType";
import { applyTheme, themesMap, getSavedTheme } from "../../lib/theme";
import { cn } from "../../lib/utils";

interface MenuBarProps {
  handleOpenApp: (appId: string) => void;
  handleOpenProjectApp?: (project: any) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  handleOpenApp,
  handleOpenProjectApp,
}) => {
  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";
  const isMobile = deviceType === "mobile";

  const { theme, setTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [desktopTheme, setDesktopTheme] = useState("monochrome");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [batteryLevel, setBatteryLevel] = useState("100%");

  const menuBarRef = useRef<HTMLDivElement>(null);

  // Time and Date auto-updating every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format Sat Jul 11
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      // Format 4:27 PM
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setDateStr(formattedDate);
      setTimeStr(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000); // check twice a minute
    return () => clearInterval(interval);
  }, []);

  // Fetch real battery status if available, fallback to mock 100%
  useEffect(() => {
    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(`${Math.round(battery.level * 100)}%`);
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
      });
    }
  }, []);

  // Monitor saved wallpaper theme changes
  useEffect(() => {
    setDesktopTheme(getSavedTheme());
    const handleThemeChange = (e: CustomEvent) => {
      setDesktopTheme(e.detail);
    };
    window.addEventListener("themechange", handleThemeChange as EventListener);
    return () =>
      window.removeEventListener(
        "themechange",
        handleThemeChange as EventListener,
      );
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (isMobile || isTablet) return null;

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const handleMenuMouseEnter = (menuId: string) => {
    if (activeMenu !== null) {
      setActiveMenu(menuId);
    }
  };

  const executeAction = (appId: string) => {
    handleOpenApp(appId);
    setActiveMenu(null);
  };

  const selectDesktopTheme = (themeId: string) => {
    applyTheme(themeId, setTheme);
    setActiveMenu(null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    setActiveMenu(null);
  };

  // Dropdown options config mapping
  const menuConfig = {
    portfolio: [
      { label: "About Me", action: () => executeAction("about") },
      { label: "Resume", action: () => executeAction("resume") },
      { label: "Contact", action: () => executeAction("contact") },
      { type: "separator" },
      { label: "Settings", action: () => executeAction("settings") },
    ],
    file: [
      {
        label: "About this Portfolio",
        action: () => executeAction("about-portfolio"),
      },
      { type: "separator" },
      {
        label: "Close Active App",
        action: () => {
          window.dispatchEvent(new CustomEvent("closeactivewindow"));
          setActiveMenu(null);
        },
      },
    ],
    edit: [
      { label: "Undo", action: () => {}, disabled: true },
      { label: "Redo", action: () => {}, disabled: true },
      { type: "separator" },
      { label: "Cut", action: () => {}, disabled: true },
      { label: "Copy", action: () => {}, disabled: true },
      { label: "Paste", action: () => {}, disabled: true },
    ],
    view: [
      { label: "Enter Full Screen", action: toggleFullScreen },
      {
        label: "Clean Up Desktop Icons",
        action: () => {
          window.dispatchEvent(new CustomEvent("cleanupicons"));
          setActiveMenu(null);
        },
      },
    ],
    go: [
      { label: "Projects", action: () => executeAction("projects") },
      { label: "Designs", action: () => executeAction("designs") },
      { label: "Settings", action: () => executeAction("settings") },
    ],
    window: [
      {
        label: "Minimize",
        action: () => {
          window.dispatchEvent(new CustomEvent("minimizeactivewindow"));
          setActiveMenu(null);
        },
      },
      {
        label: "Maximize",
        action: () => {
          window.dispatchEvent(new CustomEvent("maximizeactivewindow"));
          setActiveMenu(null);
        },
      },
    ],
    help: [
      {
        label: "Keyboard Shortcuts",
        action: () => executeAction("about-portfolio"),
      },
      { label: "Contact Developer", action: () => executeAction("contact") },
    ],
  };

  return (
    <div
      ref={menuBarRef}
      className={cn(
        "w-full fixed top-0 inset-x-0 z-50 flex items-center justify-between bg-white/25 dark:bg-black/25 backdrop-blur-[20px] border-b border-black/5 dark:border-white/5 shadow-sm select-none font-sans text-neutral-800 dark:text-neutral-200 transition-all duration-300",
        isTablet ? "h-9 text-[14px] px-5" : "h-8 text-[13px] px-4",
      )}
    >
      {/* Left side items */}
      <div
        className="flex items-center gap-1 text-neutral-800 dark:text-neutral-200 select-none"
        style={{ marginLeft: "15px" }}
      >
        <span
          className="font-bold tracking-tight"
          style={{ paddingRight: "5px" }}
        >
          HB
        </span>
        <span className="text-neutral-400 dark:text-neutral-600 px-0.5">|</span>
        <span
          className="font-medium tracking-tight "
          style={{ paddingLeft: "5px" }}
        >
          DeskPortfolio
        </span>
      </div>

      {/* Right side items */}
      <div
        className="flex items-center gap-1.5 md:gap-3"
        style={{ paddingRight: "15px" }}
      >
        {/* Spotlight Icon button */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("openspotlight"))}
          className={cn(
            "cursor-pointer rounded-md hover:bg-white/10 dark:hover:bg-white/[0.08] flex items-center justify-center",
            isTablet ? "p-1.5" : "p-1",
          )}
          title="Search Spotlight (Cmd + Space)"
        >
          <Search size={isTablet ? 17 : 15} />
        </button>

        {/* Dynamic theme mode controls dropdown */}
        <div className="relative menubar-item">
          <button
            onClick={() => handleMenuClick("theme-control")}
            className={cn(
              "cursor-pointer rounded-md hover:bg-white/10 dark:hover:bg-white/[0.08] flex items-center justify-center",
              activeMenu === "theme-control" &&
                "bg-white/15 dark:bg-white/10 text-white",
              isTablet ? "p-1.5" : "p-1",
            )}
            title="Appearance Settings"
          >
            {theme === "light" ? (
              <Sun size={isTablet ? 17 : 15} />
            ) : (
              <Moon size={isTablet ? 17 : 15} />
            )}
          </button>

          {activeMenu === "theme-control" && (
            <div
              className="absolute top-full right-0 mt-1 min-w-[200px] py-1 bg-white/75 dark:bg-black/75 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-lg z-50 text-neutral-800 dark:text-neutral-200 text-xs flex flex-col font-normal animate-in fade-in slide-in-from-top-1 duration-150"
              style={{ padding: "10px" }}
            >
              <span className="px-3.5 py-1 text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 block">
                Theme Mode
              </span>
              {[
                { value: "light", icon: Sun, label: "Light Mode" },
                { value: "dark", icon: Moon, label: "Dark Mode" },
                { value: "system", icon: Monitor, label: "System Theme" },
              ].map((opt) => {
                const isActive = theme === opt.value;
                const Icon = opt.icon;
                const isThemeDisabled = desktopTheme !== "monochrome";

                return (
                  <button
                    key={opt.value}
                    disabled={isThemeDisabled}
                    onClick={() => {
                      if (!isThemeDisabled) {
                        setTheme(opt.value);
                        setActiveMenu(null);
                      }
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-1.5 flex items-center justify-between transition-colors duration-150",
                      isThemeDisabled
                        ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                        : "hover:bg-[var(--theme-accent,#3b82f6)] hover:text-[var(--theme-accent-contrast,#ffffff)]",
                    )}
                    style={{ padding: "5px" }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={13} /> {opt.label}
                    </span>
                    {isActive && <Check size={12} />}
                  </button>
                );
              })}

              <div className="h-[1px] bg-black/5 dark:bg-white/5 my-1" />

              <span
                className="px-3.5 py-1 text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 block"
                style={{ paddingTop: "5px" }}
              >
                Desktop Appearance
              </span>
              {Object.keys(themesMap).map((themeKey) => {
                const isSelected = desktopTheme === themeKey;
                const themeData = themesMap[themeKey as keyof typeof themesMap];

                return (
                  <button
                    key={themeKey}
                    onClick={() => selectDesktopTheme(themeKey)}
                    className="w-full text-left px-3.5 py-1.5 flex items-center justify-between hover:bg-[var(--theme-accent,#3b82f6)] hover:text-[var(--theme-accent-contrast,#ffffff)] transition-colors duration-150"
                    style={{ padding: "5px" }}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={13} style={{ color: themeData.accent }} />{" "}
                      {themeData.name}
                    </span>
                    {isSelected && <Check size={12} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Wifi Icon status block */}
        <div
          className={cn(
            "rounded-md flex items-center justify-center cursor-default",
            isTablet ? "p-1.5" : "p-1",
          )}
          title="WiFi Status: Connected to HomeWifi"
        >
          <Wifi
            size={isTablet ? 17 : 15}
            className="text-neutral-700 dark:text-neutral-300"
          />
        </div>

        {/* Battery status block */}
        <div
          className="flex items-center gap-1.5 cursor-default text-neutral-700 dark:text-neutral-300"
          title={`Battery Level: ${batteryLevel}`}
        >
          <span className={cn(isTablet ? "text-[12px]" : "text-[11px]")}>
            {batteryLevel}
          </span>
          <Battery size={isTablet ? 17 : 15} />
        </div>

        {/* Date display string */}
        <div
          className="font-medium cursor-default text-neutral-700 dark:text-neutral-300 whitespace-nowrap"
          title="Current Date"
        >
          {dateStr}
        </div>

        {/* Time display string */}
        <div
          className="font-medium cursor-default text-neutral-700 dark:text-neutral-300 whitespace-nowrap"
          title="Current Time"
        >
          {timeStr}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
