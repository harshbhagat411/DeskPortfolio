import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep input focused when Spotlight is open
    const focusInput = () => inputRef.current?.focus();
    focusInput();

    // Re-focus on click anywhere inside Spotlight (excluding overlays that close it)
    window.addEventListener("focus", focusInput);
    return () => {
      window.removeEventListener("focus", focusInput);
    };
  }, []);

  return (
    <div className="flex items-center gap-3.5 px-5 py-4 border-b border-[var(--theme-glass-border)] bg-transparent">
      <Search
        className="w-5 h-5 text-[var(--theme-text-muted)] flex-shrink-0 select-none"
        strokeWidth={2.5}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search Portfolio..."
        className="w-full bg-transparent text-[15px] font-medium text-[var(--theme-text-main)] placeholder-zinc-400 dark:placeholder-zinc-500 outline-none border-none select-text"
        aria-label="Search portfolio"
      />
    </div>
  );
};

export default SearchInput;
