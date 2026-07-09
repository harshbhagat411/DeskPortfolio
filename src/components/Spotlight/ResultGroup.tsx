import React from "react";
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
    <div className="flex flex-col gap-1 mb-3.5 last:mb-0">
      <div className="px-4 py-1 text-[10px] font-extrabold tracking-wider text-[var(--theme-text-muted)] uppercase select-none opacity-80">
        {category}
      </div>
      <div className="flex flex-col gap-0.5">
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
    </div>
  );
};

export default ResultGroup;
