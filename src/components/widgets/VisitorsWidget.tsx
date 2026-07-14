import React, { useState, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Eye } from "lucide-react";
import { cn } from "../../lib/utils";
import GlassCard from "../ui/GlassCard";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useBoot } from "../../context/BootContext";

const VisitorsWidget: React.FC = () => {
  const { bootStatus } = useBoot();
  const dragControls = useDragControls();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<string>("--");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const handleDragStart = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";

  useEffect(() => {
    let isMounted = true;

    const fetchVisitors = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/visitors");
        if (!res.ok) {
          throw new Error(`Failed to fetch visitor count: ${res.statusText}`);
        }
        const data = await res.json();
        if (isMounted) {
          setVisitorCount(data.totalVisitors);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
          setDisplayCount("--");
        }
      }
    };

    fetchVisitors();

    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth count-up animation when visitorCount changes
  useEffect(() => {
    if (visitorCount === null || isError) return;

    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds count-up duration
    const startValue = 0;
    const endValue = visitorCount;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out quadratic progression
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(
        easeProgress * (endValue - startValue) + startValue,
      );

      setDisplayCount(currentCount.toLocaleString());

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [visitorCount, isError]);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className={cn(
        "absolute z-20 select-none",
        isTablet ? "top-[705px] right-10" : "bottom-[465px] left-6",
      )}
      style={{ touchAction: "none" }}
      initial={bootStatus === "ready" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={bootStatus === "booting" ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: bootStatus === "ready" ? 0 : 4.4
      }}
    >
      <GlassCard
        aspectSquare={false}
        hoverType="none" // Settle on custom styling below
        className={cn(
          isTablet
            ? "w-[280px] h-[155px] rounded-[24px]"
            : "w-[240px] h-[130px] rounded-[20px]",
          "pt-[20px] pl-[16px] pr-[16px] pb-[16px] transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
        )}
      >
        <div
          className="w-full h-full flex flex-col justify-between"
          style={{ padding: isTablet ? "12px" : "8px" }}
        >
          {/* Centered Top Handle Capsule (Dragger) */}
          <div
            className={cn(
              "w-full pb-2.5 mb-3 border-b border-zinc-200/50 dark:border-zinc-100/25 flex justify-center",
              isTablet && "pb-3.5 mb-4",
            )}
            style={{ paddingBottom: "5px", paddingTop: "5px" }}
          >
            <div
              onPointerDown={handleDragStart}
              className={cn(
                "bg-zinc-400/60 dark:bg-zinc-600/50 rounded-full cursor-grab active:cursor-grabbing hover:bg-zinc-500 dark:hover:bg-zinc-400 transition-colors",
                isTablet ? "w-14 h-2" : "w-10 h-1",
              )}
              style={{ marginBottom: "5 px" }}
            />
          </div>

          {/* Title Row */}
          <div
            className="flex items-center gap-2 select-none mb-1.5"
            style={{ paddingTop: "15px" }}
          >
            <Eye
              size={isTablet ? 16 : 14}
              className="text-[var(--theme-accent)]"
            />
            <span
              className={cn(
                "font-bold font-sans tracking-wider text-[var(--theme-text-muted)] uppercase",
                isTablet ? "text-[12px]" : "text-[10px]",
              )}
            >
              Total Visitors
            </span>
          </div>

          {/* Counter Display */}
          <div className="flex-1 flex items-center justify-start min-h-[41px]">
            {isLoading ? (
              // Pulse Loading State Skeleton
              <div className="w-2/3 h-8 bg-zinc-200/40 dark:bg-zinc-800/40 rounded-md animate-pulse" />
            ) : (
              // Active Value or Error state
              <span
                className={cn(
                  "font-bold font-sans text-[var(--theme-text-main)] tracking-tight",
                  isTablet ? "text-[38px]" : "text-[32px]",
                )}
              >
                {displayCount}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default VisitorsWidget;
