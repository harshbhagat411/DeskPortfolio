import React from "react";
import { motion } from "framer-motion";
import { SearchItem } from "./SearchIndex";

interface SearchResultProps {
  item: SearchItem;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  item,
  isSelected,
  onClick,
  onMouseEnter,
}) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.12,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{ padding: "5px" }}
      className={`
        group
        flex
        items-center
        gap-4
        rounded-xl
        px-3.5
        py-2.5
        cursor-pointer
        transition-all
        duration-150
        border

        ${
          isSelected
            ? `
              bg-white/10
              dark:bg-white/8
              border-white/10
              shadow-[0_4px_12px_rgba(0,0,0,0.15)]
            `
            : `
              border-transparent
              hover:bg-white/5
              hover:border-white/5
            `
        }
      `}
    >
      {/* Icon */}

      <div
        className={`
          w-9
          h-9
          rounded-lg
          flex
          items-center
          justify-center
          text-lg
          transition-all

          ${isSelected ? "bg-white/10" : "bg-white/5 group-hover:bg-white/8"}
        `}
      >
        {item.icon}
      </div>

      {/* Content */}

      <div className="flex-1 min-w-0">
        <div
          className="
            text-[15px]
            font-semibold
            text-[var(--theme-text-main)]
            truncate
          "
        >
          {item.title}
        </div>

        <div
          className="
            mt-1
            text-[12px]
            text-[var(--theme-text-muted)]
            truncate
          "
        >
          {item.description}
        </div>
      </div>

      {/* Right Action */}

      <div
        className={`
          transition-all
          duration-200

          ${
            isSelected
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }
        `}
      >
        <span
          className="
            px-3
            py-1.5
            rounded-full
            bg-white/10
            border
            border-white/10
            text-[10px]
            uppercase
            tracking-[0.18em]
            font-semibold
            text-[var(--theme-text-muted)]
          "
        >
          ↵ Open
        </span>
      </div>
    </motion.div>
  );
};

export default SearchResult;
