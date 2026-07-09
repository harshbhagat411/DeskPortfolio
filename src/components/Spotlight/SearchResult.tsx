import React from "react";
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
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-[180ms] ease-out select-none border ${
        isSelected
          ? "bg-white/15 dark:bg-white/10 border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] scale-[1.01] translate-x-1"
          : "border-transparent hover:bg-white/10 dark:hover:bg-white/5 hover:scale-[1.005]"
      }`}
    >
      <span className="text-lg flex items-center justify-center w-6 h-6 select-none leading-none">
        {item.icon}
      </span>
      <span className="text-[13px] font-semibold text-[var(--theme-text-main)] flex-1">
        {item.title}
      </span>
      {isSelected && (
        <span className="text-[9px] uppercase font-extrabold tracking-widest text-[var(--theme-text-muted)] bg-white/10 dark:bg-black/20 px-2 py-0.5 rounded border border-white/5 select-none">
          Open
        </span>
      )}
    </div>
  );
};

export default SearchResult;
