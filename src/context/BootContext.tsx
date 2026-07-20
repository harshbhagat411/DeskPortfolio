import React, { createContext, useContext, useState, useEffect } from "react";

export type BootStatus = "booting" | "revealing" | "ready";

interface BootContextType {
  bootStatus: BootStatus;
  isSkipped: boolean;
  skipBoot: () => void;
  startRevealPhase: () => void;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

export const BootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bootStatus, setBootStatus] = useState<BootStatus>(() => {
    if (typeof window === "undefined") return "booting";

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check sessionStorage
    const hasBootedBefore = sessionStorage.getItem("portfolioBootPlayed") === "true";

    return (prefersReducedMotion || hasBootedBefore) ? "ready" : "booting";
  });

  const [isSkipped, setIsSkipped] = useState(false);

  const skipBoot = () => {
    setIsSkipped(true);
    setBootStatus("ready");
    sessionStorage.setItem("portfolioBootPlayed", "true");
  };

  const startRevealPhase = () => {
    if (bootStatus === "booting") {
      setBootStatus("revealing");
    }
  };

  // If we transition to revealing, we set a timer to finish the reveal and transition to ready
  useEffect(() => {
    if (bootStatus === "revealing") {
      const timer = setTimeout(() => {
        setBootStatus("ready");
        sessionStorage.setItem("portfolioBootPlayed", "true");
      }, 5000); // Reveal phase takes 5 seconds to complete

      return () => clearTimeout(timer);
    }
  }, [bootStatus]);

  return (
    <BootContext.Provider value={{ bootStatus, isSkipped, skipBoot, startRevealPhase }}>
      {children}
    </BootContext.Provider>
  );
};

export const useBoot = () => {
  const context = useContext(BootContext);
  if (!context) {
    throw new Error("useBoot must be used within a BootProvider");
  }
  return context;
};
