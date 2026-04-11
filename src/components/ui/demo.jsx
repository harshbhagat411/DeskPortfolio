import React from 'react';
import { Component } from "@/components/ui/liquid-glass";

const DemoOne = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none z-50">
      <Component />
    </div>
  );
};

export default DemoOne;
