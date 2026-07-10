import React, { useEffect } from "react";
import { useDeviceType } from "./hooks/useDeviceType";
import DesktopShell from "./shells/DesktopShell";
import TabletShell from "./shells/TabletShell";
import MobileShell from "./shells/MobileShell";
import { applyTheme, getSavedTheme } from "./lib/theme";
import "./index.css";

export const App: React.FC = () => {
  const deviceType = useDeviceType();

  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);
  }, []);

  if (deviceType === "tablet") {
    return <TabletShell />;
  }

  if (deviceType === "mobile") {
    return <MobileShell />;
  }

  return <DesktopShell />;
};

export default App;
