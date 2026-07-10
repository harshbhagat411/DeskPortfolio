import React from 'react';
import { Home, Search, MessageSquare, Bell, Settings, User } from 'lucide-react';
import { useDeviceType } from '../../hooks/useDeviceType';

const GlassDock = ({ icons }) => {
  const deviceType = useDeviceType();
  const isTablet = deviceType === "tablet";

  return (
    <div 
      className={`flex items-center justify-center mx-auto glass-panel transition-all duration-300 ease-out ${
        isTablet ? 'px-7 py-4 rounded-[28px] hover:scale-100' : 'px-5 py-2.5 rounded-[20px] hover:scale-[1.02]'
      }`}
    >
      {icons.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={`flex items-center justify-center text-black dark:text-white outline-none cursor-pointer scale-100 translate-y-0 transition-all duration-350 ${
                isTablet 
                  ? 'p-4.5 w-22 h-22 rounded-[24px] active:scale-[0.88] active:bg-black/5 dark:active:bg-white/5' 
                  : 'p-3 w-16 h-16 rounded-2xl active:scale-[0.98]'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (item.onClick) item.onClick();
              }}
              title={item.label}
            >
              {item.customIcon ? (
                <item.customIcon size={isTablet ? 46 : 30} className="overflow-hidden" />
              ) : (
                <item.icon 
                  size={isTablet ? 46 : 30} 
                  strokeWidth={1.5} 
                />
              )}
            </div>

            {index === 0 ? (
              <>
                <div className={isTablet ? "w-4 shrink-0" : "w-2 shrink-0"} />
                <div className={`bg-black/20 dark:bg-white/30 rounded-full shrink-0 transition-colors duration-300 ${
                  isTablet ? 'w-[1.5px] h-12' : 'w-[1px] h-10'
                }`} />
                <div className={isTablet ? "w-4 shrink-0" : "w-2 shrink-0"} />
              </>
            ) : index !== icons.length - 1 ? (
              <div className={isTablet ? "w-6 shrink-0" : "w-4 shrink-0"} />
            ) : null}
          </React.Fragment>
        );
      })}

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