'use client';

/**
 * @file components/ui/button.tsx
 * @description Accessible Glassmorphic button component supporting variant and size props.
 */

import React from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';
import { m, useReducedMotion } from 'motion/react';
import { SPRING_PRESS } from '@/lib/ease';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const BASE_STYLES =
  'inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer touch-manipulation';

const BUTTON_VARIANTS = {
  primary:
    'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold shadow-md border border-zinc-200 active:scale-[0.98]',
  secondary:
    'bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-100 backdrop-blur-md border border-zinc-800 shadow-sm active:scale-[0.98]',
  outline:
    'border border-zinc-800 hover:border-zinc-600 bg-black/60 text-zinc-300 hover:text-white backdrop-blur-md hover:bg-zinc-900/60 active:scale-[0.98]',
  ghost:
    'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 backdrop-blur-sm active:scale-[0.98]',
  danger:
    'bg-red-600 hover:bg-red-500 text-white backdrop-blur-md border border-red-500/30 shadow-md shadow-red-950/40 active:scale-[0.98]',
};

const BUTTON_SIZES = {
  sm: 'px-3 py-2 text-xs gap-1.5 min-h-[36px] sm:min-h-[34px]',
  md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]',
  lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, disabled, ...props }, ref) => {
    const reduceMotion = useReducedMotion();

    const combinedClassName = clsx(BASE_STYLES, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={combinedClassName}
          {...props}
        />
      );
    }

    return (
      <m.button
        ref={ref}
        disabled={disabled}
        whileTap={reduceMotion || disabled ? undefined : { scale: 0.97 }}
        whileHover={reduceMotion || disabled ? undefined : { scale: 1.01 }}
        transition={SPRING_PRESS}
        className={combinedClassName}
        {...(props as React.ComponentPropsWithoutRef<typeof m.button>)}
      />
    );
  }
);

Button.displayName = 'Button';

