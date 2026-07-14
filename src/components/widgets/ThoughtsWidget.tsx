import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { thoughts } from "../../data/thoughts";
import { cn } from "../../lib/utils";
import GlassCard from "../ui/GlassCard";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useBoot } from "../../context/BootContext";

const ThoughtsWidget: React.FC = () => {
  const { bootStatus } = useBoot();
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

  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className={cn("absolute z-20 select-none", isTablet ? "top-[475px] right-10" : "top-[430px] right-6")}
      style={{ touchAction: "none" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={bootStatus === "ready" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={bootStatus === "booting" ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: bootStatus === "ready" ? 0 : 3.6
      }}
    >
      <GlassCard
        aspectSquare={false}
        hoverType="none" // Custom hover styling below
        className={cn(
          isTablet ? "w-[280px] h-[215px] rounded-[24px]" : "w-[240px] h-[190px] rounded-[20px]",
          "pt-[20px] pl-[16px] pr-[16px] pb-[16px] transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
        )}
      >
        <div
          className="w-full h-full flex flex-col justify-between"
          style={{ padding: isTablet ? "20px" : "15px" }}
        >
          {/* Centered Drag Handle Container */}
          <div
            className={cn(
              "w-full pb-2.5 mb-4 border-b border-zinc-200/50 dark:border-zinc-100/25 flex justify-center",
              isTablet && "pb-3.5 mb-5"
            )}
            style={{ paddingBottom: "5px" }}
          >
            <div
              onPointerDown={handleDragStart}
              className={cn(
                "bg-zinc-400/60 dark:bg-zinc-600/50 rounded-full cursor-grab active:cursor-grabbing hover:bg-zinc-500 dark:hover:bg-zinc-400 transition-colors",
                isTablet ? "w-14 h-2" : "w-10 h-1"
              )}
              style={{ marginBottom: "5px" }}
            />
          </div>

          {/* Thought content container with exit/enter transitions */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Category */}
            <span 
              className={cn(
                "font-medium font-sans tracking-wider text-[var(--theme-text-muted)] uppercase",
                isTablet ? "text-[14px]" : "text-[12px]"
              )}
            >
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
                  <p 
                    className={cn(
                      "font-medium font-sans text-[var(--theme-text-main)] leading-relaxed italic pr-1 text-left",
                      isTablet ? "text-[17px]" : "text-[15px]"
                    )}
                  >
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
                      "rounded-full transition-all duration-500 outline-none",
                      isTablet ? "h-[5px]" : "h-[3px]",
                      isActive
                        ? (isTablet ? "w-4 bg-[var(--theme-accent)]" : "w-3 bg-[var(--theme-accent)]")
                        : (isTablet ? "w-[5px] bg-zinc-300/60 dark:bg-zinc-700/60 hover:bg-zinc-400 dark:hover:bg-zinc-500" : "w-[3px] bg-zinc-300/60 dark:bg-zinc-700/60 hover:bg-zinc-400 dark:hover:bg-zinc-500"),
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Author */}
            <span 
              className={cn(
                "font-medium font-sans text-[var(--theme-text-muted)] text-right self-end block",
                isTablet ? "text-[14px]" : "text-[12px]"
              )}
            >
              — {currentThought.author}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ThoughtsWidget;
