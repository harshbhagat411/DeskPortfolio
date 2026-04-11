import React from 'react';
import DemoOne from "./components/ui/demo";
import './index.css';

function App() {
  return (
    <div 
      className="w-screen h-screen overflow-hidden relative" 
      style={{ 
        background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
      }}
    >
      <DemoOne />
    </div>
  );
}

export default App;


