import React, { useState } from 'react';
import { Home, Search, MessageSquare, Bell, Settings, User } from 'lucide-react';

const GlassDock = ({ icons }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div 
      className="flex items-end justify-center px-6 pb-4 pt-4 rounded-3xl mx-auto backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 gap-5 transition-all duration-300"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {icons.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
        const isSecondNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 2;

        let scale = "scale-100";
        let translateY = "translate-y-0";
        let width = "w-12";
        let height = "h-12";
        
        if (isHovered) {
           scale = "scale-[1.5]";
           translateY = "-translate-y-4";
           width = "w-16";
           height = "h-16";
        } else if (isNeighbor) {
           scale = "scale-[1.25]";
           translateY = "-translate-y-2";
           width = "w-14";
           height = "h-14";
        } else if (isSecondNeighbor) {
           scale = "scale-[1.1]";
           translateY = "-translate-y-1";
           width = "w-[3.25rem]";
           height = "h-[3.25rem]";
        }

        return (
          <div
            key={index}
            className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-white/10 to-white/30 border border-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out origin-bottom cursor-pointer hover:bg-white/25 hover:border-white/40 z-10 hover:z-20 ${width} ${height} ${scale} ${translateY}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Clicked on ${item.label}`);
              if (item.onClick) item.onClick();
            }}
            title={item.label}
          >
            <item.icon size={24} strokeWidth={1.5} className="transition-transform duration-300 pointer-events-none" />
          </div>
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
    <div className="absolute bottom-5 inset-x-0 w-full flex justify-center z-50 pointer-events-auto">
      <GlassDock icons={dockIcons} />
    </div>
  );
};

export { GlassDock };
