import React from "react";
import { motion } from "framer-motion";
import { SearchItem } from "./SearchIndex";
import SearchResult from "./SearchResult";

interface ResultGroupProps {
  category: string;
  items: SearchItem[];
  selectedItem: SearchItem | null;
  onItemClick: (item: SearchItem) => void;
  onItemMouseEnter: (item: SearchItem) => void;
}

const ResultGroup: React.FC<ResultGroupProps> = ({
  category,
  items,
  selectedItem,
  onItemClick,
  onItemMouseEnter,
}) => {
  if (items.length === 0) return null;

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.18,
      }}
      className="mb-7 last:mb-0"
    >
      {/* Category Header */}

      <div className="flex items-center px-3 pt-4 pb-1.5">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--theme-text-muted)]/80 select-none"
          style={{ padding: "5px" }}
        >
          {category}
        </span>
      </div>

      {/* Results */}

      <div className="flex flex-col gap-2" style={{ padding: "5px" }}>
        {items.map((item) => (
          <SearchResult
            key={item.id}
            item={item}
            isSelected={selectedItem?.id === item.id}
            onClick={() => onItemClick(item)}
            onMouseEnter={() => onItemMouseEnter(item)}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ResultGroup;
