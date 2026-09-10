/**
 * @file components/motion/motion-variants.ts
 * @description Standard motion variants adhering to the 3-layer motion design guidelines.
 * Covers entrance/exit, micro-feedback, state changes, and ambient loops.
 */

import type { Variants } from 'motion/react';
import {
  DURATION,
  EASE_OUT,
  EASE_IN,
  EASE_IN_OUT,
  SPRING_PANEL,
  SPRING_BOUNCE,
} from '@/lib/ease';

/**
 * Modal dialog overlay backdrop variants.
 * Decelerates in smoothly; accelerates out quickly.
 */
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.standard,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.standard * DURATION.exitRatio,
      ease: EASE_IN,
    },
  },
};

/**
 * Modal content dialog variants.
 * Emergent entrance: scale 94% + 14px Y offset to 100%.
 * Exit: accelerates away with slight shrink and Y drop.
 */
export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 14,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING_PANEL,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: {
      duration: DURATION.quick,
      ease: EASE_IN,
    },
  },
};

/**
 * View mode transition variants for smooth cross-fading between
 * Split, Editor, and Preview views.
 */
export const viewModeVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.standard,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -6,
    transition: {
      duration: DURATION.quick,
      ease: EASE_IN,
    },
  },
};

/**
 * Toast banner animation variants.
 * Includes directional slide up on entrance and clean exit.
 */
export const toastNotificationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.94,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.standard,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.95,
    transition: {
      duration: DURATION.quick,
      ease: EASE_IN,
    },
  },
};

/**
 * Error shake horizontal keyframes (±10px, 3 oscillations settling to origin).
 * Follows patterns/state-feedback.md for firm, decisive error feedback.
 */
export const ERROR_SHAKE_X = [0, -10, 10, -6, 6, -2, 2, 0];
export const ERROR_SHAKE_TRANSITION = {
  duration: 0.35,
  ease: EASE_IN_OUT,
} as const;

/**
 * Success pop animation for icons and confirmation badges.
 * Uses spring physics from initial scale (0.5) to settle at 1 with natural overshoot.
 */
export const SUCCESS_POP_VARIANTS: Variants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: SPRING_BOUNCE,
  },
};

/**
 * Ambient breathing pulse variants for idle and active status indicators.
 * Follows patterns/ambient-continuous.md (sine oscillation, 2-3s cycle).
 */
export const ambientPulseVariants: Variants = {
  idle: {
    scale: [1, 1.05, 1],
    opacity: [0.85, 1, 0.85],
    transition: {
      duration: DURATION.ambient,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
