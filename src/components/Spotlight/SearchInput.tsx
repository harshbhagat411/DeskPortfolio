import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

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
    inputRef.current?.focus();

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div
      className="w-full flex items-center gap-4 px-6 h-[72px] border-b border-white/10 bg-white/[0.02]"
      style={{ padding: "10px" }}
    >
      <Search className="w-6 h-6 text-zinc-400 dark:text-zinc-500 shrink-0" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search apps, projects, skills and more..."
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className="flex-1 bg-transparent outline-none border-none text-[18px] font-normal text-[var(--theme-text-main)] placeholder:text-zinc-500"
        aria-label="Search Portfolio"
      />
    </div>
  );
};

export default SearchInput;
