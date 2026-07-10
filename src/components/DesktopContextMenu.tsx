import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const GITHUB_REPO_URL =
  "https://github.com/harshbhagat411/DeskPortfolio";

interface MenuItemProps {
  label: string;
  shortcut?: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, shortcut, onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="w-full flex items-center justify-between px-3 py-1.5 text-left text-[13px] text-zinc-200 dark:text-zinc-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors duration-100 cursor-pointer outline-none"
    style={{ padding: "4px" }}
  >
    <span>{label}</span>
    {shortcut && (
      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light">
        {shortcut}
      </span>
    )}
  </button>
);

const Divider: React.FC = () => (
  <div className="h-px bg-white/10 my-1.5 mx-1" />
);

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onNewWindow: () => void;
  onAboutPortfolio: () => void;
  onContact: () => void;
}

const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({
  x,
  y,
  onClose,
  onNewWindow,
  onAboutPortfolio,
  onContact,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseEvents = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") {
          onClose();
        }
      } else {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          onClose();
        }
      }
    };

    window.addEventListener("pointerdown", handleCloseEvents);
    window.addEventListener("keydown", handleCloseEvents);
    return () => {
      window.removeEventListener("pointerdown", handleCloseEvents);
      window.removeEventListener("keydown", handleCloseEvents);
    };
  }, [onClose]);

  // Menu dimensions (approximate) for edge collision checks
  const menuWidth = 180;
  const menuHeight = 170;

  const posX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
  const posY = y + menuHeight > window.innerHeight ? y - menuHeight : y;

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className="fixed z-[99999] w-[180px] rounded-xl border border-white/10 bg-zinc-900/75 dark:bg-zinc-950/80 backdrop-blur-md shadow-2xl p-1.5 flex flex-col select-none"
      style={{ left: posX, top: posY, padding: "5px" }}
    >
      <MenuItem label="New Window" shortcut="Ctrl N" onClick={onNewWindow} />
      <Divider />
      <MenuItem label="About this Portfolio" onClick={onAboutPortfolio} />
      <MenuItem
        label="View Source"
        onClick={() => {
          window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer");
          onClose();
        }}
      />
      <Divider />
      <MenuItem label="Contact" onClick={onContact} />
    </motion.div>
  );
};

export default DesktopContextMenu;
