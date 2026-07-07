import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { thoughts } from "../../data/thoughts";
import { cn } from "../../lib/utils";
import GlassCard from "../ui/GlassCard";

const ThoughtsWidget: React.FC = () => {
  const dragControls = useDragControls();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentThought = useMemo(() => thoughts[currentIndex], [currentIndex]);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className="absolute top-[430px] right-6 z-20 select-none"
      style={{ touchAction: "none" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard
        aspectSquare={false}
        hoverType="none" // Custom hover styling below
        className="w-[240px] h-[190px] rounded-[20px] pt-[20px] pl-[16px] pr-[16px] pb-[16px] transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
      >
        <div
          className="w-full h-full flex flex-col justify-between"
          style={{ padding: "15px" }}
        >
          {/* Centered Drag Handle Container */}
          <div
            className="w-full pb-2.5 mb-4 border-b border-zinc-200/50 dark:border-zinc-100/25 flex justify-center"
            style={{ paddingBottom: "5px" }}
          >
            <div
              onPointerDown={handleDragStart}
              className="w-10 h-1 bg-zinc-400/60 dark:bg-zinc-600/50 rounded-full cursor-grab active:cursor-grabbing hover:bg-zinc-500 dark:hover:bg-zinc-400 transition-colors"
              style={{ marginBottom: "5px" }}
            />
          </div>

          {/* Thought content container with exit/enter transitions */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Category */}
            <span className="text-[12px] font-medium font-sans tracking-wider text-[var(--theme-text-muted)] uppercase">
              {currentThought.category}
            </span>

            {/* Quote Text (Only this animates) */}
            <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[50px] my-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="w-full"
                >
                  <p className="text-[15px] font-medium font-sans text-[var(--theme-text-main)] leading-relaxed italic pr-1 text-left">
                    "{currentThought.text}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Page Dot Indicators */}
            <div className="flex gap-1.5 items-center my-1 select-none">
              {thoughts.map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "h-[3px] rounded-full transition-all duration-500 outline-none",
                      isActive
                        ? "w-3 bg-[var(--theme-accent)]"
                        : "w-[3px] bg-zinc-300/60 dark:bg-zinc-700/60 hover:bg-zinc-400 dark:hover:bg-zinc-500",
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Author */}
            <span className="text-[12px] font-medium font-sans text-[var(--theme-text-muted)] text-right self-end block">
              — {currentThought.author}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ThoughtsWidget;
