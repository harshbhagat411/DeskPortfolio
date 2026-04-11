import React from 'react';
import styles from './DesktopIcon.module.css';
import * as LucideIcons from 'lucide-react';

const DesktopIcon = ({ app, onDoubleClick }) => {
  // Dynamically resolve the icon from Lucide
  const IconComponent = LucideIcons[app.icon] || LucideIcons.File;
  
  return (
    <div 
      className={styles.iconContainer} 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      <div className={styles.iconWrapper}>
        <IconComponent size={28} strokeWidth={1.5} />
      </div>
      <span className={styles.iconLabel}>{app.title}</span>
    </div>
  );
};

export default DesktopIcon;
