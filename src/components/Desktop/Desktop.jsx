import React, { useState } from 'react';
import styles from './Desktop.module.css';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassDock } from '../ui/liquid-glass';
import { ToggleTheme } from '../ui/toggle-theme';

import Window from '../Window/Window';

// Import App Components
import ProjectsApp from '../../screens/ProjectsApp/ProjectsApp';
import AboutApp from '../../screens/AboutApp/AboutApp';
import ResumeApp from '../../screens/ResumeApp/ResumeApp';

import profileLight from '../../assets/icon/profile_light_mode.png';
import profileDark from '../../assets/icon/profile_dark_mode.png';
import instaLogo from '../../assets/icon/Instagram_icon.png';
import linkedinLogo from '../../assets/icon/LinkedIn_logo.png';
import instaDesignLogo from '../../assets/icon/Instagram_design_icon.png';
import folderDarkMode from '../../assets/system/folderDarkMode.png';
import folderLightMode from '../../assets/system/folderLightMode.png';

const InstaDesignIcon = ({ size, className }) => (
  <div style={{ width: size, height: size }} className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ''}`}>
    <img src={instaDesignLogo} className="w-full h-full object-cover" draggable="false" alt="Design IG" />
  </div>
);

const InstaIcon = ({ size, className }) => (
  <div style={{ width: size, height: size }} className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ''}`}>
    <img src={instaLogo} className="w-full h-full object-cover" draggable="false" alt="Instagram" />
  </div>
);

const LinkedinIcon = ({ size, className }) => (
  <div style={{ width: size, height: size }} className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ''}`}>
    <img src={linkedinLogo} className="w-full h-full object-cover" draggable="false" alt="LinkedIn" />
  </div>
);

const ProfileIcon = ({ size, className }) => (
  <div style={{ width: size, height: size }} className={`relative flex-shrink-0 overflow-hidden rounded-md ${className || ''}`}>
    <img src={profileLight} className="dark:hidden w-full h-full object-cover" draggable="false" alt="Profile" />
    <img src={profileDark} className="hidden dark:block w-full h-full object-cover" draggable="false" alt="Profile" />
  </div>
);

// Define the available applicationss
const appsConfig = [
  { id: 'about', title: 'About Me', customIcon: ProfileIcon, component: <AboutApp /> },
  { id: 'projects', title: 'Projects', icon: 'FolderGit2', component: <ProjectsApp /> },
  { id: 'resume', title: 'Resume', icon: 'FileText', component: <ResumeApp /> } 
];

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  
  // Fixed starting position for the folder
  const [folderPos] = useState({
    x: 120,
    y: 100
  });

  const handleOpenApp = (appId) => {
    // Check if app is already open
    const existingWindow = openWindows.find(w => w.id === appId);
    if (existingWindow) {
      // If it's minimized, restore it
      if (existingWindow.isMinimized) {
        setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false } : w));
      }
      setActiveWindowId(appId);
      return;
    }
    
    // Open new app
    const app = appsConfig.find(a => a.id === appId);
    if (!app) return;
    
    const newWindow = {
      ...app,
      isMinimized: false,
      isMaximized: false,
    };
    
    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindowId(appId);
  };
  
  const handleCloseWindow = (appId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== appId));
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };
  
  const handleMinimizeWindow = (appId) => {
    setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: true } : w));
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };
  
  const handleMaximizeWindow = (appId) => {
    setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w));
  };
  
  const handleActivateWindow = (appId) => {
    setActiveWindowId(appId);
    // If it was minimized, restore it
    setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false } : w));
  };

  const dockIcons = [
    ...appsConfig.filter(app => app.id !== 'projects').map(app => ({
      label: app.title,
      icon: app.icon ? (LucideIcons[app.icon] || LucideIcons.File) : null,
      customIcon: app.customIcon,
      onClick: () => handleOpenApp(app.id)
    })),
    {
      label: 'Instagram',
      customIcon: InstaIcon,
      onClick: () => window.open('https://www.instagram.com/harsh.bhagat411/', '_blank', 'noopener,noreferrer')
    },
    {
      label: 'Design IG',
      customIcon: InstaDesignIcon,
      onClick: () => window.open('https://www.instagram.com/harshui.ux/', '_blank', 'noopener,noreferrer')
    },
    {
      label: 'LinkedIn',
      customIcon: LinkedinIcon,
      onClick: () => window.open('https://www.linkedin.com/in/harsh-bhagat-863741356/', '_blank', 'noopener,noreferrer')
    }
  ];

  return (
    <div className={styles.desktop}>
      <div className={styles.workspace} onClick={() => setActiveWindowId(null)}>

        {/* Projects Desktop Folder */}
        <motion.div 
          drag
          dragMomentum={false}
          initial={folderPos}
          className="absolute flex flex-col items-center justify-center gap-3 cursor-pointer w-[200px] rounded-[16px] border border-transparent hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:hover:bg-white/10 dark:hover:border-white/20 p-4 transition-all duration-300 z-0"
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleOpenApp('projects');
          }}
        >
          <div className="w-[160px] h-[160px] relative pointer-events-none">
            <img src={folderLightMode} className="w-full h-full object-contain dark:hidden" draggable="false" alt="Projects" />
            <img src={folderDarkMode} className="hidden dark:block w-full h-full object-contain" draggable="false" alt="Projects" />
          </div>
          <span className="text-[18px] font-semibold text-gray-800 dark:text-gray-100 font-sans tracking-wide px-3 py-1 rounded pointer-events-none">Projects</span>
        </motion.div>

        
        {openWindows.map(window => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindowId === window.id}
            onActivate={() => handleActivateWindow(window.id)}
            onClose={() => handleCloseWindow(window.id)}
            onMinimize={() => handleMinimizeWindow(window.id)}
            onMaximize={() => handleMaximizeWindow(window.id)}
          >
            {window.component}
          </Window>
        ))}
      </div>
      
      <div className="absolute bottom-6 inset-x-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <GlassDock icons={dockIcons} />
        </div>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Desktop;
