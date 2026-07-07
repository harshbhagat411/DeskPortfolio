import React, { useState, useEffect } from "react";
import styles from "./Desktop.module.css";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { GlassDock } from "../ui/liquid-glass";
import { ToggleTheme } from "../ui/toggle-theme";
import { useTheme } from "next-themes";

import Window from "../Window/Window";
import FaceWidget from "../ui/FaceWidget";
import { projects } from "../../data/projects";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import ProjectDetail from "../ProjectDetail/ProjectDetail";

// Import App Components
import AboutApp from "../../screens/AboutApp/AboutApp";
import DesignsApp from "../../screens/DesignsApp/DesignsApp";
import profileLight from "../../assets/icon/profile_light_mode.png";
import profileDark from "../../assets/icon/profile_dark_mode.png";
import instaLogo from "../../assets/icon/Instagram_icon.png";
import linkedinLogo from "../../assets/icon/LinkedIn_logo.png";
import instaDesignLogo from "../../assets/icon/Instagram_design_icon.png";
import projectFolder from "../../assets/system/ProjectFolder.png";
import projectFolderHover from "../../assets/system/ProjectFolderHower.png";

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

// Define the available applicationss
const appsConfig = [
  {
    id: "about",
    title: "About Me",
    customIcon: ProfileIcon,
    component: <AboutApp />,
  },
  {
    id: "designs",
    title: "Designs",
    icon: "Folder",
    component: <DesignsApp />,
  },
];

const Desktop = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [folderPos, setFolderPos] = useState({ x: 120, y: 100 });
  const [projectPositions, setProjectPositions] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setFolderPos({
        x: width / 2 - 180,
        y: height / 2 - 100,
      });

      const isMobile = width <= 640;
      const isTablet = width <= 1024;

      const coordsMap = {
        "tasker-ai": {
          x: isMobile ? 20 : isTablet ? width * 0.15 : width * 0.2,
          y: isMobile ? 180 : isTablet ? height * 0.18 : height * 0.2,
        },
        "portfolio-os": {
          x: isMobile ? width * 0.55 : isTablet ? width * 0.55 : width * 0.52,
          y: isMobile ? 180 : isTablet ? height * 0.2 : height * 0.22,
        },
        "flavora-bistro": {
          x: isMobile ? width * 0.55 : isTablet ? width * 0.65 : width * 0.72,
          y: isMobile ? 320 : isTablet ? height * 0.35 : height * 0.38,
        },
        "heart-disease-ai": {
          x: isMobile ? width * 0.55 : isTablet ? width * 0.55 : width * 0.54,
          y: isMobile ? 460 : isTablet ? height * 0.52 : height * 0.56,
        },
        "ai-attendance": {
          x: isMobile ? 20 : isTablet ? width * 0.25 : width * 0.28,
          y: isMobile ? 460 : isTablet ? height * 0.68 : height * 0.73,
        },
        "ag-diamond": {
          x: isMobile ? 20 : isTablet ? width * 0.15 : width * 0.18,
          y: isMobile ? 320 : isTablet ? height * 0.45 : height * 0.49,
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
      .filter((app) => app.id !== "designs")
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
      <div
        className={styles.workspace}
        onClick={() => {
          setActiveWindowId(null);
          setSelectedProjectId(null);
        }}
      >
        {/* Designs Desktop Folder */}
        <motion.div
          key={`folder-${folderPos.x}-${folderPos.y}`}
          drag
          dragMomentum={false}
          initial={folderPos}
          className="absolute flex flex-col items-center justify-center gap-2 cursor-pointer w-[130px] rounded-[14px] border border-transparent hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:hover:bg-white/10 dark:hover:border-white/20 p-3 z-0 group"
          style={{
            transitionProperty:
              "background-color, border-color, box-shadow, backdrop-filter, opacity",
            transitionDuration: "300ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleOpenApp("designs");
          }}
        >
          <div className="w-[90px] h-[90px] relative pointer-events-none">
            <img
              src={projectFolder}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
              draggable="false"
              alt="Designs"
            />
            <img
              src={projectFolderHover}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
              draggable="false"
              alt="Designs Hover"
            />
          </div>
          <span className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 font-sans tracking-wide px-2 py-0.5 rounded pointer-events-none">
            Designs
          </span>
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

      <div className="absolute bottom-6 inset-x-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <GlassDock icons={dockIcons} />
        </div>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Desktop;
