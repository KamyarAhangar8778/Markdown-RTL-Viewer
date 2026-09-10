/**
 * @file tests/unit/active-line-position.test.ts
 * @description Unit tests for active line cursor position calculation hook logic.
 */

import { describe, test, expect } from 'bun:test';
import { calculateActiveLinePosition } from '../../hooks/useActiveLinePosition';

describe('calculateActiveLinePosition Utility', () => {
  test('returns line 1 for empty or 0 cursor position', () => {
    const res = calculateActiveLinePosition(0, '', 0, 500);

    expect(res.lineNumber).toBe(1);
    expect(res.top).toBe(16);
    expect(res.height).toBe(24);
    expect(res.isVisible).toBe(true);
  });

  test('calculates line number based on cursor selection offset', () => {
    const text = 'Line 1\nLine 2\nLine 3\nLine 4';
    // Offset 18 is inside "Line 3"
    const res = calculateActiveLinePosition(18, text, 0, 500);

    expect(res.lineNumber).toBe(3);
    expect(res.top).toBe(16 + (3 - 1) * 24); // 64
    expect(res.isVisible).toBe(true);
  });

  test('supports custom line-height and top padding overrides', () => {
    const text = 'Line 1\nLine 2';
    const res = calculateActiveLinePosition(8, text, 0, 500, { lineHeight: 28, paddingTop: 20 });

    expect(res.lineNumber).toBe(2);
    expect(res.top).toBe(20 + (2 - 1) * 28); // 48
    expect(res.height).toBe(28);
  });
});
