'use client';

/**
 * @file components/ui/tooltip.tsx
 * @description Radix UI Tooltip component with dark glassmorphism styling.
 */

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ content, children, side = 'top' }) => {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={clsx(
            'z-50 px-3 py-1.5 text-xs text-slate-200 bg-slate-900/90 border border-white/10 rounded-lg backdrop-blur-md shadow-xl animate-in fade-in-0 zoom-in-95 select-none'
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-slate-900" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};
