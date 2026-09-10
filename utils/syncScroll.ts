/**
 * @file utils/syncScroll.ts
 * @description Pure calculation utilities for proportional synchronized scrolling between split editor panels.
 */

/**
 * Calculates the normalized scroll progress ratio (0 to 1) for a given scroll container.
 *
 * @param {number} scrollTop - Current vertical scroll offset in pixels.
 * @param {number} scrollHeight - Total scrollable height of the element.
 * @param {number} clientHeight - Visible client height of the element viewport.
 * @returns {number} Normalized progress ratio between 0 and 1.
 */
export function getScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 0) return 0;
  const progress = scrollTop / maxScroll;
  return Math.min(1, Math.max(0, progress));
}

/**
 * Calculates the exact target scroll top in pixels mapped proportionally from a source element.
 *
 * @param {number} sourceScrollTop - Scroll offset of the driving container.
 * @param {number} sourceScrollHeight - Total scrollable height of the driving container.
 * @param {number} sourceClientHeight - Visible height of the driving container.
 * @param {number} targetScrollHeight - Total scrollable height of the target container.
 * @param {number} targetClientHeight - Visible height of the target container.
 * @returns {number} Target scroll offset in pixels rounded to whole integer.
 */
export function calculateTargetScrollTop(
  sourceScrollTop: number,
  sourceScrollHeight: number,
  sourceClientHeight: number,
  targetScrollHeight: number,
  targetClientHeight: number,
): number {
  const maxTargetScroll = targetScrollHeight - targetClientHeight;
  if (maxTargetScroll <= 0) return 0;

  const progress = getScrollProgress(sourceScrollTop, sourceScrollHeight, sourceClientHeight);
  return Math.round(progress * maxTargetScroll);
}
