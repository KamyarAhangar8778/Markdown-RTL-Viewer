/**
 * @file components/custom-cursor/hooks/utils/cursor-detection.ts
 * @description Helper utilities for detecting hover states, interactive elements,
 * and device input characteristics for the custom kinematic cursor.
 */

/**
 * Checks if the user device has coarse pointer capabilities (touchscreen/mobile).
 *
 * @returns {boolean} True if coarse pointer (touch device) is detected, false otherwise.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Highly optimized check to determine whether a DOM element is clickable or interactive.
 * Avoids window.getComputedStyle to eliminate layout reflow thrashing.
 *
 * @param {HTMLElement | null} target - Target DOM element from mouse events.
 * @returns {boolean} True if element or its closest ancestor is interactive.
 */
export function checkClickable(target: HTMLElement | null): boolean {
  if (!target) return false;
  return !!target.closest(
    'a, button, input, select, textarea, [role="button"], [role="tab"], [role="menuitem"], [role="switch"], .cursor-pointer, [onclick], [tabindex]:not([tabindex="-1"]), label, summary'
  );
}

/**
 * Highly optimized check to determine whether a DOM element represents readable text.
 *
 * @param {HTMLElement | null} target - Target DOM element from mouse events.
 * @param {boolean} isClickable - Whether the element has already been identified as clickable.
 * @returns {boolean} True if element is a text container and not clickable.
 */
export function checkHoveringText(target: HTMLElement | null, isClickable: boolean): boolean {
  if (!target || isClickable) return false;
  return !!target.closest('p, h1, h2, h3, h4, h5, h6, span, li, blockquote, code, pre, td, th');
}

