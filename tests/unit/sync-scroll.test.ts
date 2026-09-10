/**
 * @file tests/unit/sync-scroll.test.ts
 * @description Unit tests verifying proportional scroll ratio and loop-free target calculation for SyncScroll.
 */

import { describe, test, expect } from 'bun:test';
import { getScrollProgress, calculateTargetScrollTop } from '../../utils/syncScroll';

describe('SyncScroll Utility Suite', () => {
  test('returns 0 progress when content is at the top or non-scrollable', () => {
    expect(getScrollProgress(0, 1000, 500)).toBe(0);
    // When scrollHeight is less than or equal to clientHeight (no overflow)
    expect(getScrollProgress(0, 400, 500)).toBe(0);
    expect(getScrollProgress(100, 500, 500)).toBe(0);
  });

  test('returns 1 progress when scrolled to absolute bottom', () => {
    // maxScroll = 1000 - 400 = 600
    expect(getScrollProgress(600, 1000, 400)).toBe(1);
    // Clamped if slightly overscrolled (e.g. bounce on mobile)
    expect(getScrollProgress(650, 1000, 400)).toBe(1);
  });

  test('calculates accurate intermediate progress ratios', () => {
    // maxScroll = 1000 - 500 = 500. scrollTop = 250 -> 0.5
    expect(getScrollProgress(250, 1000, 500)).toBe(0.5);
    // scrollTop = 125 -> 0.25
    expect(getScrollProgress(125, 1000, 500)).toBe(0.25);
  });

  test('calculates target scroll top proportionally across differing heights', () => {
    // Source: 1000px height, 500px visible (maxScroll = 500px), scrollTop = 250px (50%)
    // Target: 2000px height, 600px visible (maxScroll = 1400px) -> targetScrollTop should be 700px (50%)
    const targetTop = calculateTargetScrollTop(250, 1000, 500, 2000, 600);
    expect(targetTop).toBe(700);
  });

  test('handles zero scrollable overflow on target safely without NaN', () => {
    const targetTop = calculateTargetScrollTop(200, 1000, 500, 400, 600);
    expect(targetTop).toBe(0);
    expect(Number.isNaN(targetTop)).toBe(false);
  });

  test('correctly aligns at bottom boundary across different panel lengths', () => {
    // Source at bottom (maxScroll = 400)
    // Target has 3000px height with 500px visible (maxScroll = 2500)
    const targetTop = calculateTargetScrollTop(400, 900, 500, 3000, 500);
    expect(targetTop).toBe(2500);
  });
});
