'use client';

/**
 * @file components/ui/dock-item.tsx
 * @description Dock item component with dynamic spring physics, magnetic magnification, and hover state tracking.
 */

import React, { Children, cloneElement, useRef } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from 'motion/react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { DockLabel, DockIcon, DockLabelProps, DockIconProps } from '@/components/ui/dock-label';

export { DockLabel, DockIcon };
export type { DockLabelProps, DockIconProps };

export interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  isActive?: boolean;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
}

/**
 * DockItem component with dynamic spring scaling and hover state tracking.
 */
export function DockItem({
  children,
  className = '',
  onClick,
  id,
  isActive,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-2xl border cursor-pointer transition-colors shadow-lg ${
        isActive
          ? isDark
            ? 'bg-zinc-800/95 border-emerald-500/60 text-emerald-400 shadow-emerald-950/40'
            : 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-emerald-200/50'
          : isDark
            ? 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 hover:border-white/20'
            : 'bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300'
      } ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(
              child as React.ReactElement<{ isHovered?: MotionValue<number> }>,
              { isHovered }
            )
          : child
      )}
      {isActive && (
        <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
      )}
    </motion.div>
  );
}


