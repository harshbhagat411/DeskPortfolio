import React, { useState, useEffect } from 'react';
import styles from './Taskbar.module.css';
import { Command } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Taskbar = ({ openWindows, activeWindowId, onAppClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.taskbar}>
      <div className={styles.leftControls}>
        <div className={styles.startButton} title="Start">
          <Command size={20} />
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.openApps}>
          {openWindows.map(app => {
            const IconComponent = LucideIcons[app.icon] || LucideIcons.File;
            const isActive = activeWindowId === app.id && !app.isMinimized;
            
            return (
              <div 
                key={app.id}
                className={`${styles.taskbarApp} ${isActive ? styles.active : ''} ${app.isMinimized ? styles.minimized : ''}`}
                onClick={() => onAppClick(app.id)}
                title={app.title}
              >
                <IconComponent size={20} strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>
      
      <div className={styles.rightControls}>
        <div className={styles.clock}>
          <span>{formatTime(time)}</span>
          <span className={styles.date}>{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
