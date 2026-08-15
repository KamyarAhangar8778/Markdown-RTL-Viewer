'use client';

/**
 * @file components/ui/badge.tsx
 * @description Status badge component.
 */

import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-zinc-800/80 text-zinc-200 border-zinc-700',
    success: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-800/50',
    info: 'bg-zinc-800/90 text-zinc-100 border-zinc-600',
    outline: 'bg-transparent text-zinc-300 border-zinc-800',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
