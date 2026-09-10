/**
 * @file lib/ease.ts
 * @description Motion design tokens, easing curves, duration palettes, and physics-based springs.
 * Implements the Corporate/Premium Studio motion personality archetype.
 */

/**
 * Standard duration palette in seconds.
 * Entrances use base durations; exits scale to 65-75% per motion-design guidelines.
 */
export const DURATION = {
  instant: 0.08, // Micro-interactions, tooltips, instant taps (<100ms)
  quick: 0.15, // Icon transitions, button presses, badge reveals
  standard: 0.25, // Cards, view toggles, primary component entrances
  slow: 0.38, // Modals, overlays, focus mode transitions
  ambient: 2.5, // Continuous breathing and pulse loops
  exitRatio: 0.7, // Exits run at 70% duration of entrance
} as const;

/** Easing curves (cubic-bezier tuples) */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // Decelerating entrance curve
export const EASE_IN = [0.7, 0, 0.84, 0] as const; // Accelerating exit curve
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const; // On-screen transitions
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const; // Bottom drawer/panel reveal
export const EASE_EMPHASIZED = [0.05, 0.7, 0.1, 1] as const; // MD3 Emphasized entrance
export const EASE_OUT_BACK = [0.34, 1.3, 0.64, 1] as const; // Controlled 5-10% overshoot

/** CSS string representations for inline styles and transitions */
export const EASE_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_IN_CSS = "cubic-bezier(0.7, 0, 0.84, 0)";
export const EASE_IN_OUT_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

/**
 * Physics-based spring configurations
 */

/** Press feedback on buttons and interactive surfaces (snappy settle) */
export const SPRING_PRESS = {
  type: "spring",
  stiffness: 480,
  damping: 28,
  mass: 0.5,
} as const;

/** Content swaps — label/icon slots trading places inside a control */
export const SPRING_SWAP = {
  type: "spring",
  stiffness: 460,
  damping: 30,
  mass: 0.55,
} as const;

/** Overlay panel entrances — modals and dialogs with smooth landing */
export const SPRING_PANEL = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.6,
} as const;

/** Shared-layout glides — pills, indicators and panels morphing between positions */
export const SPRING_LAYOUT = {
  type: "spring",
  stiffness: 340,
  damping: 28,
  mass: 0.6,
} as const;

/** Dock magnification physics matching Apple HIG spring guidelines */
export const SPRING_DOCK = {
  mass: 0.1,
  stiffness: 280,
  damping: 18,
} as const;

/** Bouncy feedback for success badge pop and delightful confirmations */
export const SPRING_BOUNCE = {
  type: "spring",
  stiffness: 320,
  damping: 16,
  mass: 0.5,
} as const;

/** Cursor-follow physics for decorative mouse tracking (magnetic, tilt, dock) */
export const SPRING_MOUSE = {
  stiffness: 200,
  damping: 15,
  mass: 0.3,
} as const;

/** Dragged handles and fills — critically damped config without rebounding */
export const SPRING_GLIDE = {
  stiffness: 700,
  damping: 50,
  mass: 0.5,
} as const;

