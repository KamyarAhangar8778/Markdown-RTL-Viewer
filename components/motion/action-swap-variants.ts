/**
 * @file components/motion/action-swap-variants.ts
 * @description Animation variants, transitions, and style mappings for action-swap motion components.
 */

import type { Variants } from "motion/react";
import { EASE_OUT, SPRING_SWAP } from "@/lib/ease";
import type {
  ActionSwapAnimation,
  ActionSwapButtonSize,
  ActionSwapButtonVariant,
} from "./action-swap-types";

/** Animations with a single-element variant set (cascade animates per letter). */
export type CoreAnimation = "blur" | "roll";

const BLUR_TRANSITION = { duration: 0.2, ease: "easeInOut" } as const;
const ROLL_TRANSITION = SPRING_SWAP;
const ROLL_EXIT_TRANSITION = { duration: 0.14, ease: EASE_OUT } as const;
const SWAP_BLUR = "blur(8px)";
const ROLL_BLUR = "blur(3px)";
export const CASCADE_STAGGER = 0.025;

export const CASCADE_LETTER_VARIANTS: Variants = {
  initial: { opacity: 0, y: "105%", filter: ROLL_BLUR },
  animate: (delay: number = 0) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { ...SPRING_SWAP, delay },
  }),
  exit: (delay: number = 0) => ({
    opacity: 0,
    y: "-105%",
    filter: ROLL_BLUR,
    transition: { duration: 0.16, ease: EASE_OUT, delay: delay * 0.5 },
  }),
};

export const TEXT_VARIANTS: Record<CoreAnimation, Variants> = {
  blur: {
    initial: { opacity: 0, scale: 0.94, filter: SWAP_BLUR },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: BLUR_TRANSITION,
    },
    exit: {
      opacity: 0,
      scale: 0.94,
      filter: SWAP_BLUR,
      transition: BLUR_TRANSITION,
    },
  },
  roll: {
    initial: { opacity: 0, y: "90%", filter: ROLL_BLUR },
    animate: {
      opacity: 1,
      y: "0%",
      filter: "blur(0px)",
      transition: ROLL_TRANSITION,
    },
    exit: {
      opacity: 0,
      y: "-90%",
      filter: ROLL_BLUR,
      transition: ROLL_EXIT_TRANSITION,
    },
  },
};

export const ICON_VARIANTS: Record<CoreAnimation, Variants> = {
  blur: {
    initial: { opacity: 0, scale: 0.25, filter: SWAP_BLUR },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: BLUR_TRANSITION,
    },
    exit: {
      opacity: 0,
      scale: 0.25,
      filter: SWAP_BLUR,
      transition: BLUR_TRANSITION,
    },
  },
  roll: {
    initial: { opacity: 0, y: 12, filter: ROLL_BLUR },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: ROLL_TRANSITION,
    },
    exit: {
      opacity: 0,
      y: -12,
      filter: ROLL_BLUR,
      transition: ROLL_EXIT_TRANSITION,
    },
  },
};

export const VARIANT_CLASS: Record<ActionSwapButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border bg-card text-foreground hover:border-border",
  outline: "border border-border bg-transparent text-foreground hover:bg-primary/5",
  ghost: "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
};

export const SIZE_CLASS: Record<ActionSwapButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-full px-3 text-xs",
  md: "h-10 gap-2 rounded-full px-4 text-sm",
  lg: "h-12 gap-2.5 rounded-full px-5 text-base",
  icon: "h-10 w-10 rounded-full",
};
