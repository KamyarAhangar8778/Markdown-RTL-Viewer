'use client';

/**
 * @file components/ui/card.tsx
 * @description Glassmorphic Card component container.
 */

import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'interactive';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', ...props }, ref) => {
    const variants = {
      glass: 'glass-card rounded-2xl p-5',
      solid: 'bg-slate-900 border border-slate-800 rounded-2xl p-5',
      interactive:
        'glass-card rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer',
    };

    return (
      <div
        ref={ref}
        className={clsx(variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
