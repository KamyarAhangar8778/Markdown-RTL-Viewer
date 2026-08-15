/**
 * @file utils/deviceDetector.ts
 * @description Device capability detection utility to identify desktop and laptop environments.
 */

/**
 * Checks if the current client environment matches a desktop or laptop profile.
 * Evaluates viewport dimension (>= 1024px), fine mouse/trackpad pointer capabilities,
 * and user motion accessibility preferences.
 *
 * @returns {boolean} True if the client is running on a desktop or laptop device with fine pointer; false otherwise.
 */
export function isDesktopOrLaptop(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const isWideScreen = window.innerWidth >= 1024;
  const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return isWideScreen && hasFinePointer && !prefersReducedMotion;
}
