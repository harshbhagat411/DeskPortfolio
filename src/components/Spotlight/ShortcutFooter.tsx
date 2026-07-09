import React from "react";

const ShortcutFooter: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--theme-glass-border)] bg-black/10 text-[11px] text-[var(--theme-text-muted)] select-none">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans shadow-sm">↑</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans shadow-sm">↓</kbd>
          <span>Navigate</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans shadow-sm">Enter</kbd>
          <span>Open</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans shadow-sm">Esc</kbd>
          <span>Close</span>
        </span>
      </div>
      <div className="flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans shadow-sm">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-sans shadow-sm">K</kbd>
        <span>Search</span>
      </div>
    </div>
  );
};

export default ShortcutFooter;
