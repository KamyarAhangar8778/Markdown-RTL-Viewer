'use client';

/**
 * @file components/ui/dock-item.tsx
 * @description Dock item component with dynamic spring physics, magnetic magnification, and hover state tracking.
 */

import React, { Children, cloneElement, useRef } from 'react';
import {
  m,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type SpringOptions,
} from 'motion/react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { DockLabel, DockIcon, DockLabelProps, DockIconProps } from '@/components/ui/dock-label';
import { SPRING_LAYOUT, SPRING_PRESS } from '@/lib/ease';

export { DockLabel, DockIcon };
export type { DockLabelProps, DockIconProps };

export interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  label?: string;
  ariaLabel?: string;
  isActive?: boolean;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
}

function getDockItemStateClass(isActive: boolean, isDark: boolean): string {
  if (isActive) {
    if (isDark) {
      return 'bg-zinc-800/95 border-emerald-500/60 text-emerald-400 shadow-emerald-950/40';
    }
    return 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-emerald-200/50';
  }

  if (isDark) {
    return 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 hover:border-white/20';
  }
  return 'bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300';
}

/**
 * DockItem component with dynamic spring scaling, accessible keyboard activation, and hover tracking.
 * Memoized with React.memo to eliminate redundant re-render cycles during typing or scrolling.
 *
 * @param {DockItemProps} props - Component properties for dock item.
 * @returns {React.JSX.Element} Interactive dock item element.
 */
export const DockItem = React.memo(function DockItem({
  children,
  className = '',
  onClick,
  id,
  label,
  ariaLabel,
  isActive = false,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  // Cached center X to eliminate layout thrashing (getBoundingClientRect) on high-frequency mouse movements
  const cachedCenterXRef = useRef<number | null>(null);

  React.useEffect(() => {
    const handleRecalculate = () => {
      cachedCenterXRef.current = null;
    };
    window.addEventListener('resize', handleRecalculate, { passive: true });
    window.addEventListener('scroll', handleRecalculate, { passive: true });
    return () => {
      window.removeEventListener('resize', handleRecalculate);
      window.removeEventListener('scroll', handleRecalculate);
    };
  }, []);

  const mouseDistance = useTransform(mouseX, (val) => {
    if (val === Infinity) return Infinity;

    if (cachedCenterXRef.current === null && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      cachedCenterXRef.current = rect.x + rect.width / 2;
    }

    const centerX = cachedCenterXRef.current ?? 0;
    return val - centerX;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  /**
   * Keyboard activation handler for WCAG 2.1 compliance (Enter / Space keys).
   *
   * @param {React.KeyboardEvent<HTMLDivElement>} e - Keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const computedAriaLabel = ariaLabel || label || id || 'Dock item';
  const stateClass = getDockItemStateClass(isActive, isDark);
  const focusOffsetClass = isDark ? 'focus-visible:ring-offset-zinc-950' : 'focus-visible:ring-offset-white';

  return (
    <m.div
      ref={ref}
      id={id}
      style={{
        width: size,
        height: size,
      }}
      whileTap={reduceMotion ? undefined : { scale: 0.92 }}
      transition={SPRING_PRESS}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center justify-center rounded-2xl border cursor-pointer transition-colors shadow-lg touch-manipulation min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 ${focusOffsetClass} ${stateClass} ${className}`}
      tabIndex={0}
      role="button"
      aria-label={computedAriaLabel}
      aria-pressed={isActive}
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
        <m.span
          layoutId="dock-active-indicator"
          transition={SPRING_LAYOUT}
          className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
        />
      )}
    </m.div>
  );
});

DockItem.displayName = 'DockItem';


