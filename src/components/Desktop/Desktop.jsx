import React, { useState, useEffect, useRef } from "react";
import styles from "./Desktop.module.css";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { GlassDock } from "../ui/liquid-glass";
import { useDeviceType } from "../../hooks/useDeviceType";
import Spotlight from "../Spotlight/Spotlight";
import ProjectsApp from "../../screens/ProjectsApp/ProjectsApp";
import MenuBar from "../MenuBar/MenuBar";
import { ToggleTheme } from "../ui/toggle-theme";

import Window from "../Window/Window";
import FaceWidget from "../ui/FaceWidget";
import { projects } from "../../data/projects";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import ProjectDetail from "../ProjectDetail/ProjectDetail";
import CalendarWidget from "../widgets/CalendarWidget";
import ThoughtsWidget from "../widgets/ThoughtsWidget";
import ThemeWidget from "../widgets/ThemeWidget";
import VisitorsWidget from "../widgets/VisitorsWidget";

// Import App Components
import AboutApp from "../../screens/AboutApp/AboutApp";
import DesignsApp from "../../screens/DesignsApp/DesignsApp";
import ThemeCenterApp from "../../screens/ThemeCenterApp/ThemeCenterApp";
import AboutPortfolioWindow from "../AboutPortfolioWindow";
import ContactWindow from "../ContactWindow";
import DesktopContextMenu from "../DesktopContextMenu";
import profileLight from "../../assets/icon/profile_light_mode.png";
import profileDark from "../../assets/icon/profile_dark_mode.png";
import instaLogo from "../../assets/icon/Instagram_icon.png";
import linkedinLogo from "../../assets/icon/LinkedIn_logo.png";
import instaDesignLogo from "../../assets/icon/Instagram_design_icon.png";

const InstaDesignIcon = ({ size, className }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ""}`}
  >
    <img
      src={instaDesignLogo}
      className="w-full h-full object-cover"
      draggable="false"
      alt="Design IG"
    />
  </div>
);

const InstaIcon = ({ size, className }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ""}`}
  >
    <img
      src={instaLogo}
      className="w-full h-full object-cover"
      draggable="false"
      alt="Instagram"
    />
  </div>
);

const LinkedinIcon = ({ size, className }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ""}`}
  >
    <img
      src={linkedinLogo}
      className="w-full h-full object-cover"
      draggable="false"
      alt="LinkedIn"
    />
  </div>
);

const ProfileIcon = ({ size, className }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ""}`}
  >
    <img
      src={profileLight}
      className="dark:hidden w-full h-full object-cover"
      draggable="false"
      alt="Profile"
    />
    <img
      src={profileDark}
      className="hidden dark:block w-full h-full object-cover"
      draggable="false"
      alt="Profile"
    />
  </div>
);

const ResumeApp = () => (
  <div className="w-full h-full bg-zinc-900 flex flex-col">
    <iframe
      src="/resume/Harsh_Bhagat_Resume.pdf"
      title="Resume"
      className="w-full h-full border-none"
    />
  </div>
);

// Define the available applications
const appsConfig = [
  {
    id: "about",
    title: "About Me",
    customIcon: ProfileIcon,
    component: <AboutApp />,
  },
  {
    id: "about-portfolio",
    title: "About this Portfolio",
    icon: "Info",
    component: <AboutPortfolioWindow />,
    defaultWidth: 360,
    defaultHeight: 400,
    hideMinimize: true,
    hideMaximize: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "Layers",
    component: <ProjectsApp />,
    defaultWidth: 950,
    defaultHeight: 650,
  },
  {
    id: "designs",
    title: "Designs",
    icon: "Folder",
    component: <DesignsApp />,
  },
  {
    id: "resume",
    title: "Resume Preview",
    icon: "FileText",
    component: <ResumeApp />,
    defaultWidth: 850,
    defaultHeight: 600,
  },
  {
    id: "contact",
    title: "Contact",
    icon: "Phone",
    component: <ContactWindow />,
    defaultWidth: 500,
    defaultHeight: 400,
    hideMinimize: true,
    hideMaximize: true,
  },
  {
    id: "settings",
    title: "Settings",
    icon: "Settings",
    component: <ThemeCenterApp />,
    defaultWidth: 800,
    defaultHeight: 550,
  },
];
const Desktop = () => {
  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";

  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [folderPos, setFolderPos] = useState({ x: 120, y: 100 });
  const [projectPositions, setProjectPositions] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);

  const touchTimeoutRef = useRef(null);
  const touchStartPosRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    
    // Ignore if touching interactive elements
    if (
      e.target.closest(`.${styles.window}`) ||
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("input") ||
      e.target.closest(".cursor-grab") ||
      e.target.closest(".pointer-events-auto") ||
      e.target.closest("[role='button']")
    ) {
      return;
    }

    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };

    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);

    touchTimeoutRef.current = setTimeout(() => {
      setContextMenu({
        x: touch.clientX,
        y: touch.clientY,
      });
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      touchTimeoutRef.current = null;
    }, 600);
  };

  const handleTouchMove = (e) => {
    if (!touchStartPosRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPosRef.current.x;
    const dy = touch.clientY - touchStartPosRef.current.y;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    touchStartPosRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1200;

      setFolderPos({
        x: width / 2 - 180,
        y: height / 2 - 100,
      });

      const coordsMap = {
        "tasker-ai": {
          x: isMobile ? 20 : isTablet ? width * 0.14 : width * 0.2,
          y: isMobile ? 180 : isTablet ? height * 0.16 : height * 0.2,
        },
        "portfolio-os": {
          x: isMobile ? width * 0.55 : isTablet ? width * 0.56 : width * 0.52,
          y: isMobile ? 180 : isTablet ? height * 0.18 : height * 0.22,
        },
        "flavora-bistro": {
          x: isMobile ? width * 0.55 : isTablet ? width * 0.36 : width * 0.72,
          y: isMobile ? 320 : isTablet ? height * 0.30 : height * 0.38,
        },
        "heart-disease-ai": {
          x: isMobile ? width * 0.55 : isTablet ? width * 0.56 : width * 0.54,
          y: isMobile ? 460 : isTablet ? height * 0.48 : height * 0.56,
        },
        "ai-attendance": {
          x: isMobile ? 20 : isTablet ? width * 0.36 : width * 0.28,
          y: isMobile ? 460 : isTablet ? height * 0.64 : height * 0.73,
        },
        "ag-diamond": {
          x: isMobile ? 20 : isTablet ? width * 0.14 : width * 0.18,
          y: isMobile ? 320 : isTablet ? height * 0.44 : height * 0.49,
        },
      };

      const positions = projects.map((p) => {
        const coords = coordsMap[p.id] || { x: 300, y: 300 };
        return { id: p.id, x: coords.x, y: coords.y };
      });

      setProjectPositions(positions);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenProjectApp = (project) => {
    const appId = `project-${project.id}`;

    // Check if app is already open
    const existingWindow = openWindows.find((w) => w.id === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setOpenWindows((prev) =>
          prev.map((w) => (w.id === appId ? { ...w, isMinimized: false } : w)),
        );
      }
      setActiveWindowId(appId);
      return;
    }

    const newWindow = {
      id: appId,
      title: project.title,
      icon: "FolderGit2",
      component: <ProjectDetail project={project} />,
      isMinimized: false,
      isMaximized: false,
      defaultWidth: 950,
      defaultHeight: 650,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(appId);
  };

  const handleOpenApp = (appId) => {
    // Check if app is already open
    const existingWindow = openWindows.find((w) => w.id === appId);
    if (existingWindow) {
      // If it's minimized, restore it
      if (existingWindow.isMinimized) {
        setOpenWindows((prev) =>
          prev.map((w) => (w.id === appId ? { ...w, isMinimized: false } : w)),
        );
      }
      setActiveWindowId(appId);
      return;
    }

    // Open new app
    const app = appsConfig.find((a) => a.id === appId);
    if (!app) return;

    const newWindow = {
      ...app,
      isMinimized: false,
      isMaximized: false,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(appId);
  };

  const handleContextMenu = (e) => {
    if (
      e.target.closest(`.${styles.window}`) ||
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("input") ||
      e.target.closest(".cursor-grab") ||
      e.target.closest(".pointer-events-auto")
    ) {
      return;
    }

    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.ctrlKey && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        handleOpenApp("about");
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [openWindows]);

  const handleCloseWindow = (appId) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const handleMinimizeWindow = (appId) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, isMinimized: true } : w)),
    );
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const handleMaximizeWindow = (appId) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w,
      ),
    );
  };

  const handleActivateWindow = (appId) => {
    setActiveWindowId(appId);
    // If it was minimized, restore it
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, isMinimized: false } : w)),
    );
  };

  const dockIcons = [
    ...appsConfig
      .filter((app) => app.id === "about")
      .map((app) => ({
        label: app.title,
        icon: app.icon ? LucideIcons[app.icon] || LucideIcons.File : null,
        customIcon: app.customIcon,
        onClick: () => handleOpenApp(app.id),
      })),
    {
      label: "Instagram",
      customIcon: InstaIcon,
      onClick: () =>
        window.open(
          "https://www.instagram.com/harsh.bhagat411/",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      label: "Design IG",
      customIcon: InstaDesignIcon,
      onClick: () =>
        window.open(
          "https://www.instagram.com/harshui.ux/",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      label: "LinkedIn",
      customIcon: LinkedinIcon,
      onClick: () =>
        window.open(
          "https://www.linkedin.com/in/harsh-bhagat-863741356/",
          "_blank",
          "noopener,noreferrer",
        ),
    },
  ];

  return (
    <div className={styles.desktop}>
      <MenuBar handleOpenApp={handleOpenApp} />
      <div
        className={styles.workspace}
        onClick={() => {
          setActiveWindowId(null);
          setSelectedProjectId(null);
          setContextMenu(null);
        }}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Designs Desktop Folder */}
        <motion.div
          key={`folder-${folderPos.x}-${folderPos.y}`}
          drag
          dragMomentum={false}
          initial={folderPos}
          className="absolute cursor-grab active:cursor-grabbing z-10"
          style={{ touchAction: "none" }}
        >
          <DesktopIcon
            id="designs"
            title="Designs"
            isFolder={true}
            isSelected={selectedProjectId === "designs"}
            onClick={() => setSelectedProjectId("designs")}
            onDoubleClick={() => handleOpenApp("designs")}
          />
        </motion.div>

        {/* Desktop Icons for standalone projects (staggered & draggable) */}
        {projectPositions.map((pos) => {
          const project = projects.find((p) => p.id === pos.id);
          if (!project) return null;

          return (
            <motion.div
              key={`project-icon-${project.id}-${pos.x}-${pos.y}`}
              drag
              dragMomentum={false}
              initial={{ x: pos.x, y: pos.y }}
              className="absolute cursor-grab active:cursor-grabbing z-10"
              style={{ touchAction: "none" }}
            >
              <DesktopIcon
                project={project}
                isSelected={selectedProjectId === project.id}
                onClick={() => setSelectedProjectId(project.id)}
                onDoubleClick={() => handleOpenProjectApp(project)}
              />
            </motion.div>
          );
        })}

        {openWindows.map((window) => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindowId === window.id}
            onActivate={() => handleActivateWindow(window.id)}
            onClose={() => handleCloseWindow(window.id)}
            onMinimize={() => handleMinimizeWindow(window.id)}
            onMaximize={() => handleMaximizeWindow(window.id)}
          >
            {window.component}
          </Window>
        ))}
      </div>
      {/* Draggable Face Widget in Bottom Left Corner */}
      <FaceWidget onClick={() => handleOpenApp("about")} />

      <div className={`absolute inset-x-0 w-full flex justify-center z-50 pointer-events-none ${isTablet ? "bottom-12" : "bottom-6"}`}>
        <div className="pointer-events-auto">
          <GlassDock icons={dockIcons} />
        </div>
      </div>

      {isTablet && (
        <div className="absolute z-50 flex items-center gap-3 top-10 right-10">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openspotlight"))}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-zinc-200/25 dark:border-white/10 flex items-center justify-center text-[var(--theme-text-main)] hover:scale-105 transition-all duration-200 cursor-pointer shadow-md backdrop-blur-md outline-none"
            title="Search (Ctrl + K / Cmd + Space)"
            aria-label="Search"
          >
            <LucideIcons.Search size={18} strokeWidth={2.5} />
          </button>
          <ToggleTheme />
        </div>
      )}
      <Spotlight
        onOpenApp={handleOpenApp}
        onOpenProject={(projectId) => {
          const project = projects.find((p) => p.id === projectId);
          if (project) {
            handleOpenProjectApp(project);
          }
        }}
      />
      {/* Calendar Desktop Widget */}
      <CalendarWidget />

      {/* Thoughts Desktop Widget */}
      <ThoughtsWidget />

      {/* Theme Desktop Widget */}
      <ThemeWidget />

      {/* Total Visitors Desktop Widget */}
      <VisitorsWidget />

      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onNewWindow={() => {
            handleOpenApp("about");
            setContextMenu(null);
          }}
          onAboutPortfolio={() => {
            handleOpenApp("about-portfolio");
            setContextMenu(null);
          }}
          onContact={() => {
            handleOpenApp("contact");
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
};

export default Desktop;
