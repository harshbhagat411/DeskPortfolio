import React from 'react';
import { cn } from '../../lib/utils';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export const GlassButton = ({
  children,
  className,
  ...props
}: GlassButtonProps) => {
  return (
    <button
      className={cn(
        "glass-btn flex items-center justify-center gap-2 select-none overflow-hidden outline-none cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;
