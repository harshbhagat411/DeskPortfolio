import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSavedTheme } from '../../lib/theme';

const OPTIONS = [
  { value: 'light', icon: Sun, label: 'Light Mode' },
  { value: 'system', icon: Monitor, label: 'System Theme' },
  { value: 'dark', icon: Moon, label: 'Dark Mode' },
];

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [desktopTheme, setDesktopTheme] = useState('monochrome');

  useEffect(() => {
    setMounted(true);
    setDesktopTheme(getSavedTheme());

    const handleThemeChange = (e) => {
      setDesktopTheme(e.detail);
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  if (!mounted) {
    return <div className="w-[164px] h-[60px]" />; // placeholder to prevent layout shift
  }

  // Ensure default fallback if theme is undefined initially
  const activeTheme = theme || 'system';
  const isDisabled = desktopTheme !== 'monochrome';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`group flex items-center p-1.5 gap-1 rounded-3xl bg-white/70 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/20 shadow-lg transition-all duration-300 ${
        isDisabled ? 'opacity-35 cursor-not-allowed scale-95 hover:scale-95' : 'hover:scale-105'
      }`}
      title={isDisabled ? 'Theme toggle is locked on custom wallpaper appearances' : 'Toggle Theme'}
    >
      {OPTIONS.map((option) => {
        const isActive = activeTheme === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                setTheme(option.value);
              }
            }}
            className={`relative flex items-center justify-center w-12 h-12 rounded-2xl outline-none transition-all duration-200 ease-out z-10 ${
              isDisabled ? 'cursor-not-allowed' : 'hover:scale-110 active:scale-95'
            } ${
              isActive ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title={option.label}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-2xl bg-white dark:bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border-[1.5px] border-black/10 dark:border-white/20 z-0"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                  mass: 0.8
                }}
              />
            )}
            <Icon size={22} strokeWidth={1.5} className="relative z-10" />
          </button>
        );
      })}
    </motion.div>
  );
};
