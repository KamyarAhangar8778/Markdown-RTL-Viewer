/**
 * @file components/motion/loader-types.ts
 * @description Type definitions and ASCII glyph datasets for the modular motion loader system.
 */

import React from 'react';

/**
 * All supported visual variants for the motion loader component.
 */
export type LoaderVariant =
  | 'spinner'
  | 'dots'
  | 'bars'
  | 'dot-matrix'
  | 'dither'
  | 'ascii'
  | 'ascii-line'
  | 'ascii-braille'
  | 'ascii-blocks'
  | 'ascii-bounce'
  | 'morph'
  | 'comet'
  | 'scramble'
  | 'metaballs'
  | 'newton'
  | 'helix'
  | 'percent';

/**
 * Terminal-style frame sequences used by ASCII loaders.
 */
export const ASCII_SETS: Record<string, string[]> = {
  ascii: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  'ascii-line': ['|', '/', '-', '\\'],
  'ascii-braille': ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
  'ascii-blocks': ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂'],
  'ascii-bounce': ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
};

/**
 * Props for the primary Loader component.
 */
export interface LoaderProps {
  /**
   * Which animation variant to render.
   * Defaults to 'spinner'. Use 'ascii-line' for the classic line spinner.
   */
  variant?: LoaderVariant;
  /**
   * Base square size in pixels.
   * @default 32
   */
  size?: number;
  /**
   * Seconds per full animation cycle.
   * @default 1
   */
  speed?: number;
  /**
   * Accessible text label announced to screen readers.
   * @default 'Loading'
   */
  label?: string;
  /**
   * Additional Tailwind or CSS class names.
   */
  className?: string;
}

/**
 * Internal props passed to individual sub-loader parts.
 */
export interface PartProps {
  /** Base size in pixels */
  size: number;
  /** Animation speed in seconds */
  speed: number;
  /** Whether user prefers reduced motion */
  reduce: boolean;
}
