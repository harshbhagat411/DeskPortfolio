import React, { useState } from 'react';
import styles from './Desktop.module.css';

import Window from '../Window/Window';

// Import App Components
import ProjectsApp from '../../screens/ProjectsApp/ProjectsApp';
import AboutApp from '../../screens/AboutApp/AboutApp';
import ContactApp from '../../screens/ContactApp/ContactApp';
import ResumeApp from '../../screens/ResumeApp/ResumeApp';

// Define the available applications
const appsConfig = [
  { id: 'projects', title: 'Projects', icon: 'FolderGit2', component: <ProjectsApp /> },
  { id: 'about', title: 'About Me', icon: 'User', component: <AboutApp /> },
  { id: 'contact', title: 'Contact', icon: 'Mail', component: <ContactApp /> },
  { id: 'resume', title: 'Resume', icon: 'FileText', component: <ResumeApp /> }
];

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  
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

  return (
    <div className={styles.desktop}>
      <div className={styles.workspace} onClick={() => setActiveWindowId(null)}>

        
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
      

    </div>
  );
};

export default Desktop;
