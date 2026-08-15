'use client';

/**
 * @file components/ui/magnification-dock.tsx
 * @description macOS-inspired fluid magnification dock component with spring physics and glass styling.
 */

import React from 'react';
import { motion, useMotionValue } from 'motion/react';
import { DockProps } from '@/types/dock';
import { DockItem, DockIcon, DockLabel } from '@/components/ui/dock-item';
import { useMarkdownContext } from '@/store/MarkdownContext';

export { DockItem, DockIcon, DockLabel };

/**
 * MagnificationDock Component providing fluid dock interaction with spring physics.
 *
 * @param props - Dock properties including items, styling classes, dimensions, and spring physics options.
 * @returns Fluid macOS-style magnification toolbar container.
 */
export function MagnificationDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 160, damping: 14 },
  magnification = 62,
  distance = 150,
  panelHeight = 58,
  baseItemSize = 42,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <div className="flex max-w-full items-end justify-center overflow-visible">
      <motion.div
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={`flex items-end w-fit gap-2 rounded-2xl border backdrop-blur-2xl pb-2 px-3 shadow-2xl select-none transition-colors duration-200 ${
          isDark
            ? 'border-white/10 bg-zinc-950/85 shadow-black/80'
            : 'border-zinc-300/80 bg-white/90 shadow-xl shadow-zinc-300/60'
        } ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.id || index}
            id={item.id}
            isActive={item.isActive}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

export default MagnificationDock;


