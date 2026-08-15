'use client';

/**
 * @file components/ui/button.tsx
 * @description Accessible Glassmorphic button component supporting variant and size props.
 */

import React from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer';

    const variants = {
      primary:
        'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold shadow-md border border-zinc-200',
      secondary:
        'bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-100 backdrop-blur-md border border-zinc-800 shadow-sm',
      outline:
        'border border-zinc-800 hover:border-zinc-600 bg-black/60 text-zinc-300 hover:text-white backdrop-blur-md hover:bg-zinc-900/60',
      ghost:
        'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 backdrop-blur-sm',
      danger:
        'bg-red-600 hover:bg-red-500 text-white backdrop-blur-md border border-red-500/30 shadow-md shadow-red-950/40',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
    };

    return (
      <Comp
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

