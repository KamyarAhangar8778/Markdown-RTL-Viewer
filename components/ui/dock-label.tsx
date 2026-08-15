'use client';

/**
 * @file components/ui/dock-label.tsx
 * @description Animated tooltip label and icon wrappers for dock items.
 */

import React, { useEffect, useState } from 'react';
import { motion, MotionValue, AnimatePresence } from 'motion/react';

export interface DockLabelProps {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
}

export interface DockIconProps {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
}

/**
 * DockLabel component providing an animated tooltip for dock items.
 */
export function DockLabel({
  children,
  className = '',
  isHovered,
}: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.15 }}
          className={`absolute -top-8 left-1/2 pointer-events-none z-50 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900/95 px-2.5 py-1 text-xs font-vazir text-zinc-100 shadow-xl backdrop-blur-md select-none ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * DockIcon component wrapping and centering the item's icon.
 */
export function DockIcon({ children, className = '' }: DockIconProps) {
  return (
    <div
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
