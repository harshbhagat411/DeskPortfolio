import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-14" />; // placeholder to prevent layout shift
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center p-3 w-16 h-16 rounded-2xl text-black dark:text-white outline-none cursor-pointer scale-100 translate-y-0 transition-colors"
      title="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1
        }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {!isDark ? <Sun size={30} strokeWidth={1.5} /> : null}
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0.8
        }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {isDark ? <Moon size={30} strokeWidth={1.5} /> : null}
      </motion.div>
    </button>
  );
};
