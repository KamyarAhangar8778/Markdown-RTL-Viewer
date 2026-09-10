'use client';

/**
 * @file components/motion/loader.tsx
 * @description Motion-powered modular loader supporting terminal ASCII spinners (including ascii-line), geometric morphs, and pulse effects.
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_IN_OUT } from '@/lib/ease';
import { cn } from '@/lib/utils';
import {
  LoaderProps,
  LoaderVariant,
  PartProps,
  ASCII_SETS,
} from './loader-types';
import {
  Morph,
  Comet,
  Scramble,
  Metaballs,
  Newton,
  Helix,
  Percent,
  DotMatrix,
  Dither,
} from './loader-shapes';

export type { LoaderProps, LoaderVariant };
export { ASCII_SETS };

const REDUCED = {
  animate: { opacity: [1, 0.4, 1] },
  transition: { duration: 1.4, ease: EASE_IN_OUT, repeat: Infinity },
};

/**
 * Smooth SVG circular spinner with partial stroke arc.
 */
function Spinner({ size, speed, reduce }: PartProps): React.JSX.Element {
  const stroke = Math.max(2, size * 0.09);
  const r = (size - stroke) / 2;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      animate={reduce ? REDUCED.animate : { rotate: 360 }}
      transition={
        reduce
          ? REDUCED.transition
          : { duration: speed, ease: 'linear', repeat: Infinity }
      }
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.2}
        strokeWidth={stroke}
      />
      <path
        d={`M ${size / 2} ${size / 2 - r} A ${r} ${r} 0 0 1 ${size / 2 + r} ${size / 2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/**
 * Three bouncing dots with phased delay.
 */
function Dots({ size, speed, reduce }: PartProps): React.JSX.Element {
  const dot = size * 0.24;
  return (
    <span className="flex items-center" style={{ gap: size * 0.14 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full bg-current"
          style={{ width: dot, height: dot }}
          animate={
            reduce
              ? { opacity: [0.4, 1, 0.4] }
              : { y: [0, -size * 0.3, 0], opacity: [0.5, 1, 0.5] }
          }
          transition={{
            duration: speed,
            ease: EASE_IN_OUT,
            repeat: Infinity,
            delay: i * speed * 0.16,
          }}
        />
      ))}
    </span>
  );
}

/**
 * Equalizer bars with vertical scale keyframes.
 */
function Bars({ size, speed, reduce }: PartProps): React.JSX.Element {
  const bar = size * 0.16;
  return (
    <span className="flex items-center" style={{ gap: size * 0.1, height: size }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="rounded-full bg-current"
          style={{ width: bar, height: size, originY: 1 }}
          animate={
            reduce ? { opacity: [0.4, 1, 0.4] } : { scaleY: [0.3, 1, 0.3] }
          }
          transition={{
            duration: speed,
            ease: EASE_IN_OUT,
            repeat: Infinity,
            delay: i * speed * 0.12,
          }}
        />
      ))}
    </span>
  );
}

/**
 * Monospace ASCII character cycle renderer (powers ASCII Line, Braille, Blocks, etc.).
 */
export function Ascii({
  frames,
  size,
  speed,
  reduce,
}: PartProps & { frames: string[] }): React.JSX.Element {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const step = ((reduce ? speed * 2.5 : speed) / frames.length) * 1000;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % frames.length),
      step,
    );
    return () => clearInterval(id);
  }, [frames.length, speed, reduce]);

  return (
    <span
      className="font-mono leading-none tabular-nums inline-block select-none"
      style={{ fontSize: size, lineHeight: 1 }}
    >
      {frames[frame % frames.length]}
    </span>
  );
}

/**
 * Universal Loader component rendering any chosen motion variant.
 * Supports standard ASCII line spinner: `variant="ascii-line"`.
 *
 * @param {LoaderProps} props - Component properties.
 * @returns {React.JSX.Element} The rendered loader.
 */
export function Loader({
  variant = 'spinner',
  size = 32,
  speed,
  label = 'Loading',
  className,
}: LoaderProps): React.JSX.Element {
  const reduce = useReducedMotion() ?? false;
  // ASCII line has 4 frames. 0.8s cycle gives 200ms/frame (50ms faster than standard 250ms/frame).
  const effectiveSpeed = speed ?? (variant === 'ascii-line' ? 0.8 : 1);

  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center text-foreground',
        className,
      )}
    >
      {variant === 'spinner' && <Spinner size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'dots' && <Dots size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'bars' && <Bars size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'dot-matrix' && (
        <DotMatrix size={size} speed={effectiveSpeed} reduce={reduce} />
      )}
      {variant === 'dither' && <Dither size={size} speed={effectiveSpeed} reduce={reduce} />}
      {ASCII_SETS[variant] && (
        <Ascii frames={ASCII_SETS[variant]} size={size} speed={effectiveSpeed} reduce={reduce} />
      )}
      {variant === 'morph' && <Morph size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'comet' && <Comet size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'scramble' && (
        <Scramble size={size} speed={effectiveSpeed} reduce={reduce} />
      )}
      {variant === 'metaballs' && (
        <Metaballs size={size} speed={effectiveSpeed} reduce={reduce} />
      )}
      {variant === 'newton' && <Newton size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'helix' && <Helix size={size} speed={effectiveSpeed} reduce={reduce} />}
      {variant === 'percent' && (
        <Percent size={size} speed={effectiveSpeed} reduce={reduce} />
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}

/**
 * Preconfigured ASCII Line Loader cycling through ["|", "/", "-", "\\"].
 *
 * @param {Omit<LoaderProps, 'variant'>} props - Component properties without variant.
 * @returns {React.JSX.Element} Dedicated ASCII Line loader.
 */
export function AsciiLineLoader({
  size = 16,
  speed = 0.8,
  label = 'Processing',
  className,
}: Omit<LoaderProps, 'variant'>): React.JSX.Element {
  return (
    <Loader
      variant="ascii-line"
      size={size}
      speed={speed}
      label={label}
      className={className}
    />
  );
}
