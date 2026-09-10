/**
 * @file tests/unit/custom-cursor.test.ts
 * @description Unit tests for custom cursor detection utilities and heuristic classifiers.
 */

import { describe, test, expect } from 'bun:test';
import {
  checkClickable,
  checkHoveringText,
  isTouchDevice,
} from '../../components/custom-cursor/hooks/utils/cursor-detection';

describe('Custom Cursor Detection Utilities', () => {
  test('isTouchDevice behaves safely in environment without throwing', () => {
    expect(typeof isTouchDevice()).toBe('boolean');
  });

  test('checkClickable returns false for null target', () => {
    expect(checkClickable(null)).toBe(false);
  });

  test('checkClickable identifies interactive element types correctly', () => {
    const createMockElement = (matches: boolean) =>
      ({
        closest: (_selector: string) => (matches ? {} : null),
      }) as unknown as HTMLElement;

    expect(checkClickable(createMockElement(true))).toBe(true);
    expect(checkClickable(createMockElement(false))).toBe(false);
  });

  test('checkHoveringText identifies text elements when not clickable', () => {
    const createMockElement = (matches: boolean) =>
      ({
        closest: (_selector: string) => (matches ? {} : null),
      }) as unknown as HTMLElement;

    expect(checkHoveringText(createMockElement(true), false)).toBe(true);
    expect(checkHoveringText(createMockElement(false), false)).toBe(false);
    expect(checkHoveringText(createMockElement(true), true)).toBe(false);
  });

  test('checkHoveringText returns false for null target', () => {
    expect(checkHoveringText(null, false)).toBe(false);
  });
});
