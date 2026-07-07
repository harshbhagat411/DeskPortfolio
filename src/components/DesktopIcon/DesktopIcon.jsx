import React, { useState } from "react";
import styles from "./DesktopIcon.module.css";
import { cn } from "../../lib/utils";
import { useTheme } from "next-themes";
import projectIconLight from "../../assets/system/project-icon-light.png";
import projectIconDark from "../../assets/system/project-icon-dark.png";

const DesktopIcon = ({ project, isSelected, onClick, onDoubleClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleClick = async (e) => {
    e.stopPropagation();
    setIsClicked(true);
    onClick(e);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsClicked(false);
  };

  return (
    <div
      className={styles.iconContainer}
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDoubleClick();
        }
      }}
    >
      <div
        className={cn(
          styles.screenshotContainer,
          isClicked && styles.clickScale,
        )}
      >
        <img
          src={isDark ? projectIconDark : projectIconLight}
          alt={project.title}
          className={styles.screenshot}
          draggable="false"
        />
      </div>
      <span className={cn(styles.label, isSelected && styles.labelSelected)}>
        {project.title}
      </span>
    </div>
  );
};

export default DesktopIcon;
