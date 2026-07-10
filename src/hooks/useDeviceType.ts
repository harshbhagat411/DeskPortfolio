import { useState, useEffect } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

const getDeviceType = (width: number): DeviceType => {
  if (width >= 1200) {
    return "desktop";
  }
  if (width >= 768) {
    return "tablet";
  }
  return "mobile";
};

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (typeof window !== "undefined") {
      return getDeviceType(window.innerWidth);
    }
    return "desktop"; // Default fallback for SSR/server-side execution
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    
    // Initial call to ensure accuracy on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};
