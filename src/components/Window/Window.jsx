import React, { useState, useRef, useEffect } from 'react';
import styles from './Window.module.css';
import { X, Minus, Square, Copy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Window = ({ window: appWindow, isActive, onActivate, onClose, onMinimize, onMaximize, children }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  
  const IconComponent = LucideIcons[appWindow.icon] || LucideIcons.File;

  useEffect(() => {
    // Initial random slight offset so windows don't perfectly stack
    const offset = Math.floor(Math.random() * 40) - 20;
    setPosition(prev => ({ x: prev.x + offset, y: prev.y + offset }));
  }, []);

  const handlePointerDown = (e) => {
    if (appWindow.isMaximized) return;
    setIsDragging(true);
    
    // Store where within the header we clicked so the window doesn't snap to top-left of cursor
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: position.x,
      initialPosY: position.y
    };
    
    // Using pointer-events to lock dragging
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!isDragging && dragRef.current) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      
      let newY = dragRef.current.initialPosY + dy;
      if (newY < 0) newY = 0; // Prevent dragging above top screen
      
      setPosition({
        x: dragRef.current.initialPosX + dx,
        y: newY
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragRef.current = null;
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  const windowStyle = {
    width: size.width,
    height: size.height,
    left: position.x,
    top: position.y,
    zIndex: isActive ? 100 : 10,
  };

  return (
    <div 
      className={`
        ${styles.window} 
        ${appWindow.isMinimized ? styles.minimized : ''} 
        ${appWindow.isMaximized ? styles.maximized : ''}
      `}
      style={appWindow.isMaximized ? { zIndex: isActive ? 100 : 10 } : windowStyle}
      onClick={onActivate}
    >
      <div 
        className={styles.header} 
        onPointerDown={handlePointerDown}
        onDoubleClick={onMaximize}
      >
        <div className={styles.controls}>
          <button className={`${styles.controlBtn} ${styles.close}`} onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <X size={8} strokeWidth={3} />
          </button>
          <button className={`${styles.controlBtn} ${styles.minimize}`} onClick={(e) => { e.stopPropagation(); onMinimize(); }}>
            <Minus size={8} strokeWidth={3} />
          </button>
          <button className={`${styles.controlBtn} ${styles.maximize}`} onClick={(e) => { e.stopPropagation(); onMaximize(); }}>
            {appWindow.isMaximized ? <Copy size={8} strokeWidth={2} /> : <Square size={8} strokeWidth={3} />}
          </button>
        </div>
        
        <div className={styles.title}>
          <IconComponent size={14} />
          {appWindow.title}
        </div>
        
        {/* Invisible spacer for center flex alignment */}
        <div style={{width: '56px'}}></div>
      </div>
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Window;
