import React from 'react';
import { useTheme } from 'next-themes';
import { BGPattern } from "./components/ui/bg-pattern";
import Desktop from "./components/Desktop/Desktop";
import './index.css';

function App() {
  const { theme } = useTheme();
  
  // Use a lighter gray for light mode pattern, darker gray for dark mode
  const patternFill = theme === 'light' ? '#e5e7eb' : '#252525';

  return (
    <div className="w-screen h-screen overflow-hidden relative z-0 bg-slate-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <BGPattern variant="dots" mask="fade-center" fill={patternFill} />
      <Desktop />
    </div>
  );
}

export default App;
