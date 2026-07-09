import React from "react";

const Key = ({ children }: { children: React.ReactNode }) => (
  <kbd
    className="
      min-w-[20px]
      h-5
      px-1.5
      flex
      items-center
      justify-center
      rounded-md
      border
      border-white/10
      bg-white/5
      text-[10px]
      font-medium
      text-[var(--theme-text-muted)]
      shadow-sm
    "
  >
    {children}
  </kbd>
);

const ShortcutFooter: React.FC = () => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-5
        py-3
        border-t
        border-white/10
        bg-white/[0.02]
        backdrop-blur-md
        select-none
      "
      style={{ padding: "10px" }}
    >
      {/* Left Side */}

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <Key>↑</Key>
          <Key>↓</Key>

          <span className="text-[11px] text-[var(--theme-text-muted)]">
            Navigate
          </span>
        </div>

        <div className="w-px h-3.5 bg-white/10" />

        <div className="flex items-center gap-1.5">
          <Key>↵</Key>

          <span className="text-[11px] text-[var(--theme-text-muted)]">
            Open
          </span>
        </div>

        <div className="w-px h-3.5 bg-white/10" />

        <div className="flex items-center gap-1.5">
          <Key>Esc</Key>

          <span className="text-[11px] text-[var(--theme-text-muted)]">
            Close
          </span>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-1.5">
        <Key>Ctrl</Key>

        <span className="text-white/40 text-[10px]">+</span>

        <Key>K</Key>

        <span className="text-[11px] text-[var(--theme-text-muted)]">
          Spotlight
        </span>
      </div>
    </div>
  );
};

export default ShortcutFooter;
