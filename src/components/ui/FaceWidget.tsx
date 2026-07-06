import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import GlassCard from './GlassCard';
import headImg from '../../assets/avatar/head.png';

export const FaceWidget = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth tilt effect (max 6° tilt)
  const springConfig = { stiffness: 120, damping: 25, mass: 0.6 };
  
  const tiltX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]), 
    springConfig
  );
  const tiltY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]), 
    springConfig
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse positions (-0.5 to 0.5) from center of screen
      const ratioX = (e.clientX - innerWidth / 2) / innerWidth;
      const ratioY = (e.clientY - innerHeight / 2) / innerHeight;

      mouseX.set(ratioX);
      mouseY.set(ratioY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  // Handle reset tilt when mouse leaves window
  useEffect(() => {
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Anti-gravity float animation variants (floating, breathing, rotation)
  const floatVariants = {
    animate: {
      y: [0, -6, 0],
      rotate: [0, 1, -1, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute left-6 bottom-6 z-50 cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard className="flex items-center justify-center p-4">
        {/* Subtle radial glow behind the head */}
        <div 
          className="absolute w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-[40px] z-0 pointer-events-none transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />

        <motion.div
          className="w-[125px] h-[125px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] relative z-10 flex items-center justify-center pointer-events-none"
          variants={shouldReduceMotion ? {} : floatVariants}
          animate={shouldReduceMotion ? {} : 'animate'}
        >
          {/* Interactive Cursor Tilt Container */}
          <motion.div
            style={{
              rotateX: shouldReduceMotion ? 0 : tiltX,
              rotateY: shouldReduceMotion ? 0 : tiltY,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              scale: isHovered ? 1.05 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              mass: 0.5
            }}
            className="w-full h-full relative flex items-center justify-center pointer-events-none"
          >
            {/* Transparent PNG Head Image */}
            <img
              src={headImg}
              alt="Floating Head"
              className="w-full h-full object-contain pointer-events-none select-none"
              draggable="false"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.12))',
              }}
            />
          </motion.div>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
};

export default FaceWidget;
