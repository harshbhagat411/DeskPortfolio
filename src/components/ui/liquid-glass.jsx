import React, { useState } from 'react';
import { Home, Search, MessageSquare, Bell, Settings, User } from 'lucide-react';
import { ToggleTheme } from './toggle-theme';

const GlassDock = ({ icons }) => {
  return (
    <div 
      className="flex items-center justify-center px-10 py-5 rounded-full mx-auto backdrop-blur-xl bg-black/10 dark:bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-black/10 dark:border-white/20 transition-colors duration-300"
    >
      {icons.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={`flex items-center justify-center p-3 w-16 h-16 rounded-2xl text-black dark:text-white outline-none cursor-pointer scale-100 translate-y-0 transition-colors duration-300`}
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Clicked on ${item.label}`);
                if (item.onClick) item.onClick();
              }}
              title={item.label}
            >
              <item.icon 
                size={30} 
                strokeWidth={1.5} 
              />
            </div>

            {index === 0 ? (
              <>
                <div className="w-2 shrink-0" />
                <div className="w-[1px] h-10 bg-black/20 dark:bg-white/30 rounded-full shrink-0 transition-colors duration-300" />
                <div className="w-2 shrink-0" />
              </>
            ) : index !== icons.length - 1 ? (
              <div className="w-4 shrink-0" />
            ) : null}
          </React.Fragment>
        );
      })}

      <div className="w-2 shrink-0" />
      <div className="w-[1px] h-10 bg-black/20 dark:bg-white/30 rounded-full shrink-0 transition-colors duration-300" />
      <div className="w-2 shrink-0" />
      <ToggleTheme />
    </div>
  );
};


export const Component = () => {
  const dockIcons = [
    { label: "Home", icon: Home },
    { label: "Search", icon: Search },
    { label: "Messages", icon: MessageSquare },
    { label: "Notifications", icon: Bell },
    { label: "Profile", icon: User },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="absolute bottom-6 inset-x-0 w-full flex justify-center z-50">
      <GlassDock icons={dockIcons} />
    </div>
  );
};

export { GlassDock };