import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";
import headImg from "../../assets/avatar/head.png";
import { cn } from "../../lib/utils";
import { useDeviceType } from "../../hooks/useDeviceType";

interface FaceWidgetProps {
  onClick?: () => void;
}

export const FaceWidget = ({ onClick }: FaceWidgetProps) => {
  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleClick = async () => {
    setIsClicked(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsClicked(false);
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // Motion values for tracking cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth tilt effect (max 4° tilt)
  const springConfig = { stiffness: 120, damping: 25, mass: 0.6 };

  const tiltX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [4, -4]),
    springConfig,
  );
  const tiltY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-4, 4]),
    springConfig,
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // Calculate normalized mouse positions (-0.5 to 0.5) from center of screen
      const ratioX = (e.clientX - innerWidth / 2) / innerWidth;
      const ratioY = (e.clientY - innerHeight / 2) / innerHeight;

      mouseX.set(ratioX);
      mouseY.set(ratioY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  // Handle reset tilt when mouse leaves window
  useEffect(() => {
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Anti-gravity float animation variants (floating, breathing, rotation)
  const floatVariants = {
    animate: {
      y: [0, -6, 0],
      rotate: [0, 1, -1, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      role="button"
      tabIndex={0}
      aria-label="Open Profile"
      className={cn(
        "absolute left-6 z-50 select-none rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4",
        isTablet ? "bottom-8" : "bottom-6"
      )}
      style={{
        cursor: isHovered ? "pointer" : "grab",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
          scale: isClicked ? 0.98 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <GlassCard
          hoverType="none"
          className={cn(
            "flex items-center justify-center transition-all duration-300",
            isTablet ? "w-[280px] h-[215px] p-5" : "p-4",
            isHovered
              ? "border-white/50 dark:border-white/25 shadow-[0_12px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)]"
              : "border-white/30 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]",
          )}
        >
          {/* Subtle radial glow behind the head - opacity increases by 15% (from 0.05 to 0.20) on hover */}
          <div
            className="absolute w-[70%] h-[70%] rounded-full blur-[40px] z-0 pointer-events-none transition-all duration-500"
            style={{
              backgroundColor: "var(--theme-avatar-glow, #3b82f6)",
              opacity: isHovered ? 0.35 : 0.15,
              transform: isHovered ? "scale(1.2)" : "scale(1)",
            }}
          />

          <motion.div
            className="w-[125px] h-[125px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] relative z-10 flex items-center justify-center pointer-events-none"
            variants={shouldReduceMotion ? {} : floatVariants}
            animate={shouldReduceMotion ? {} : "animate"}
          >
            {/* Interactive Cursor Tilt Container */}
            <motion.div
              style={{
                rotateX: shouldReduceMotion ? 0 : tiltX,
                rotateY: shouldReduceMotion ? 0 : tiltY,
                transformStyle: "preserve-3d",
              }}
              animate={{
                scale: isHovered ? 1.03 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.5,
              }}
              className="w-full h-full relative flex items-center justify-center pointer-events-none"
            >
              {/* Transparent PNG Head Image */}
              <img
                src={headImg}
                alt="Floating Head"
                className="w-full h-full object-contain pointer-events-none select-none"
                draggable="false"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.12))",
                }}
              />
            </motion.div>
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Floating tooltip hint: open profile */}
      <AnimatePresence>
        {isHovered && !isTouchDevice && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: -8, x: "-50%" }}
            exit={{ opacity: 0, y: 6, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 mb-2 z-50 glass-panel px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-lg pointer-events-none select-none text-gray-800 dark:text-gray-100 whitespace-nowrap rounded-[12px]"
          >
            <ChevronRight
              size={12}
              className="text-indigo-500 dark:text-indigo-400"
            />
            Open Profile
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaceWidget;
