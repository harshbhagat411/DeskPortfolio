import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBoot } from "../../context/BootContext";

export const WelcomeNotification: React.FC = () => {
  const { bootStatus } = useBoot();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (bootStatus === "ready") {
      // Delay showing the notification slightly after the reveal phase finishes
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 700);

      // Auto-hide the notification after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5700);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [bootStatus]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 320, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 200, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 130, damping: 19 }}
          className="fixed top-20 right-6 w-[290px] md:w-80 z-[999] pointer-events-auto rounded-2xl bg-white/75 dark:bg-[#161618]/75 border border-zinc-200/50 dark:border-white/10 backdrop-blur-xl shadow-2xl p-4 flex flex-col gap-1 text-black dark:text-white select-none"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-start"
            style={{ padding: "10px" }}
          >
            <span className="font-semibold text-sm flex items-center gap-1.5">
              👋 Welcome!
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X size={13} />
            </button>
          </div>

          {/* Body content */}
          <div
            className="text-[12px] text-zinc-500 dark:text-neutral-400 leading-relaxed font-normal mt-0.5"
            style={{ paddingLeft: "10px", paddingBottom: "10px" }}
          >
            Thanks for visiting my portfolio.
            <br />
            Feel free to explore my work.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeNotification;
