import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "./SearchInput";
import ResultGroup from "./ResultGroup";
import ShortcutFooter from "./ShortcutFooter";
import { SearchItem, searchIndexItems, performSearch } from "./SearchIndex";

interface SpotlightProps {
  onOpenApp: (appId: string) => void;
  onOpenProject: (project: any) => void;
}

const DEFAULT_RECENTS = ["tasker-ai", "resume-preview", "skill-react", "about"];

const Spotlight: React.FC<SpotlightProps> = ({ onOpenApp, onOpenProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("spotlight-recent");
      if (saved) {
        setRecentIds(JSON.parse(saved));
      } else {
        setRecentIds(DEFAULT_RECENTS);
        localStorage.setItem(
          "spotlight-recent",
          JSON.stringify(DEFAULT_RECENTS),
        );
      }
    } catch (e) {
      setRecentIds(DEFAULT_RECENTS);
    }
  }, []);

  // Sync recent searches helper
  const addToRecents = (id: string) => {
    setRecentIds((prev) => {
      const updated = [id, ...prev.filter((x) => x !== id)].slice(0, 8);
      try {
        localStorage.setItem("spotlight-recent", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  // Listeners for triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdSpace =
        (e.metaKey && e.key === " ") || (e.metaKey && e.code === "Space");
      const isCtrlK = e.ctrlKey && (e.key === "k" || e.key === "K");

      if (isCmdSpace || isCtrlK) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleOpenRequest = () => setIsOpen(true);
    const handleCloseRequest = () => setIsOpen(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("openspotlight", handleOpenRequest);
    window.addEventListener("closespotlight", handleCloseRequest);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("openspotlight", handleOpenRequest);
      window.removeEventListener("closespotlight", handleCloseRequest);
    };
  }, []);

  // Reset search states on open/close toggle
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Compute results
  const results = useMemo(() => {
    if (!query.trim()) {
      // Return recent search items
      return recentIds
        .map((id) => searchIndexItems.find((item) => item.id === id))
        .filter(Boolean) as SearchItem[];
    }
    return performSearch(query);
  }, [query, recentIds]);

  const isEmptyState = query.trim() !== "" && results.length === 0;

  // Suggestions for empty state
  const suggestions = useMemo(() => {
    const ids = [
      "tasker-ai",
      "portfolio-os",
      "skill-react",
      "skill-typescript",
      "resume-preview",
      "contact-linkedin",
      "contact-github",
    ];
    return ids
      .map((id) => searchIndexItems.find((item) => item.id === id))
      .filter(Boolean) as SearchItem[];
  }, []);

  // Active items list (results or suggestions)
  const activeItems = isEmptyState ? suggestions : results;

  // Group items by category for layout
  const categories: SearchItem["category"][] = [
    "Applications",
    "Projects",
    "Skills",
    "Resume",
    "Contact",
    "Settings",
  ];

  const groupedItems = useMemo(() => {
    return categories.reduce(
      (acc, cat) => {
        const matches = activeItems.filter((item) => item.category === cat);
        if (matches.length > 0) {
          acc[cat] = matches;
        }
        return acc;
      },
      {} as Record<string, SearchItem[]>,
    );
  }, [activeItems]);

  // Flat list for sequential index navigation
  const flatItems = useMemo(() => {
    return Object.values(groupedItems).flat();
  }, [groupedItems]);

  // Handle index wrapping
  useEffect(() => {
    if (selectedIndex >= flatItems.length) {
      setSelectedIndex(0);
    }
  }, [flatItems, selectedIndex]);

  const selectedItem = flatItems[selectedIndex] || null;

  // Keyboard navigation inside input / modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (flatItems.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatItems.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + flatItems.length) % flatItems.length,
        );
        break;
      case "Tab":
        e.preventDefault();
        if (flatItems.length > 1 && selectedItem) {
          const currentCategory = selectedItem.category;
          let nextIndex = (selectedIndex + 1) % flatItems.length;
          while (nextIndex !== selectedIndex) {
            if (flatItems[nextIndex].category !== currentCategory) {
              setSelectedIndex(nextIndex);
              return;
            }
            nextIndex = (nextIndex + 1) % flatItems.length;
          }
        }
        break;
      case "Enter":
        e.preventDefault();
        if (selectedItem) {
          handleActivate(selectedItem);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleActivate = (item: SearchItem) => {
    addToRecents(item.id);

    switch (item.actionType) {
      case "open-app":
        if (item.actionValue) {
          onOpenApp(item.actionValue);
        }
        break;
      case "open-project":
        if (item.actionValue) {
          // Find project details from projects list and open
          onOpenProject(item.actionValue);
        }
        break;
      case "social-link":
        if (item.actionValue) {
          window.open(item.actionValue, "_blank", "noopener,noreferrer");
        }
        break;
      case "resume-action":
        if (item.actionValue === "preview") {
          window.open("/resume/Harsh_Bhagat_Resume.pdf", "_blank");
        } else if (item.actionValue === "download") {
          const link = document.createElement("a");
          link.href = "/resume/Harsh_Bhagat_Resume.pdf";
          link.download = "Harsh_Bhagat_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;
      default:
        break;
    }

    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Spotlight Dialog Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-[720px] mx-4 rounded-2xl overflow-hidden border border-zinc-200/25 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <SearchInput
              value={query}
              onChange={setQuery}
              onKeyDown={handleKeyDown}
            />

            {/* Results Scrollbox */}
            <div className="max-h-[360px] overflow-y-auto p-3 flex flex-col scroll-smooth">
              {isEmptyState && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <span className="text-[14px] font-semibold text-[var(--theme-text-main)] mb-1">
                    No results found
                  </span>
                  <span className="text-[11px] text-[var(--theme-text-muted)] mb-5">
                    Try searching for different keywords or check out the
                    suggestions below.
                  </span>
                </div>
              )}

              {categories.map((cat) => (
                <ResultGroup
                  key={cat}
                  category={
                    cat === "Applications" && !query.trim()
                      ? "Recent Searches"
                      : cat
                  }
                  items={groupedItems[cat] || []}
                  selectedItem={selectedItem}
                  onItemClick={handleActivate}
                  onItemMouseEnter={(item) => {
                    const idx = flatItems.findIndex((x) => x.id === item.id);
                    if (idx !== -1) setSelectedIndex(idx);
                  }}
                />
              ))}
            </div>

            {/* Hotkey Guide Footer */}
            <ShortcutFooter />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Spotlight;
