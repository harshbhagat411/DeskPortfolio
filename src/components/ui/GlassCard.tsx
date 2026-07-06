import React from 'react';
import { cn } from '../../lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  size?: string | number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  hoverType?: 'default' | 'subtle' | 'none';
  aspectSquare?: boolean;
}

export const GlassCard = ({
  children,
  className,
  size,
  onClick,
  style,
  hoverType = 'default',
  aspectSquare = true,
  ...props
}: GlassCardProps) => {
  // If no size is supplied, we fallback to default responsive widths and heights (only if aspectSquare is true)
  const defaultSizeClass = (size !== undefined || !aspectSquare) 
    ? '' 
    : 'w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[240px] lg:h-[240px]';

  const hoverClass = 
    hoverType === 'default' 
      ? 'glass-card-hover' 
      : hoverType === 'subtle' 
      ? 'glass-card-hover-subtle' 
      : '';

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-panel rounded-[20px] select-none overflow-hidden",
        aspectSquare && "flex items-center justify-center aspect-square",
        hoverClass,
        defaultSizeClass,
        className
      )}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
