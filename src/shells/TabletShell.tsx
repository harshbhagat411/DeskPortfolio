import React from "react";

export const TabletShell: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] text-black dark:text-white font-sans transition-colors duration-500 ease-in-out">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Tablet Version</h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Coming Soon
        </p>
      </div>
    </div>
  );
};

export default TabletShell;
