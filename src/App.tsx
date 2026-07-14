import React, { useEffect } from "react";
import { useDeviceType } from "./hooks/useDeviceType";
import DesktopShell from "./shells/DesktopShell";
import TabletShell from "./shells/TabletShell";
import MobileShell from "./shells/MobileShell";
import { applyTheme, getSavedTheme } from "./lib/theme";
import { BootProvider, useBoot } from "./context/BootContext";
import BootScreen from "./components/BootScreen/BootScreen";
import WelcomeNotification from "./components/ui/WelcomeNotification";
import "./index.css";

const AppContent: React.FC<{ deviceType: string }> = ({ deviceType }) => {
  const { bootStatus } = useBoot();

  const renderShell = () => {
    if (deviceType === "tablet") {
      return <TabletShell />;
    }

    if (deviceType === "mobile") {
      return <MobileShell />;
    }

    return <DesktopShell />;
  };

  // Disable all desktop/shell interaction and hide cursor during booting and revealing phases
  const isBlocking = bootStatus === "booting" || bootStatus === "revealing";

  return (
    <div className={isBlocking ? "boot-cursor-none pointer-events-none select-none overflow-hidden h-screen w-screen" : ""}>
      {renderShell()}
    </div>
  );
};

export const App: React.FC = () => {
  const deviceType = useDeviceType();

  useEffect(() => {
    const saved = getSavedTheme();
    applyTheme(saved);
  }, []);

  return (
    <BootProvider>
      <AppContent deviceType={deviceType} />
      <BootScreen />
      <WelcomeNotification />
    </BootProvider>
  );
};

export default App;
