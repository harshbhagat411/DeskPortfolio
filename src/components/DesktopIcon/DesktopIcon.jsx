import React from "react";
import styles from "./DesktopIcon.module.css";
import { cn } from "../../lib/utils";
import { useTheme } from "next-themes";
import projectIconLight from "../../assets/system/project-icon-light.png";
import projectIconDark from "../../assets/system/project-icon-dark.png";
import projectFolder from "../../assets/system/ProjectFolder.png";
import projectFolderHover from "../../assets/system/ProjectFolderHower.png";

const DesktopIcon = ({
  project,
  title: propTitle,
  isFolder = false,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const title = project ? project.title : propTitle;

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onDoubleClick();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDoubleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${isFolder ? "folder" : "project"} ${title}`}
      className={cn(
        styles.container,
        isFolder ? styles.containerFolder : styles.containerFile,
        isSelected && styles.containerSelected,
        "group"
      )}
    >
      {isFolder ? (
        <div className={styles.folderIconWrapper}>
          <img
            src={projectFolder}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
            draggable="false"
            alt={title}
          />
          <img
            src={projectFolderHover}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
            draggable="false"
            alt={`${title} Hover`}
          />
        </div>
      ) : (
        <div className={styles.fileIconWrapper}>
          <img
            src={isDark ? projectIconDark : projectIconLight}
            alt={title}
            className="w-full h-full object-contain"
            draggable="false"
          />
        </div>
      )}
      
      <span className={cn(styles.label, isSelected && styles.labelSelected)}>
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;
