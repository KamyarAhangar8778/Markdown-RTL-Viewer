/**
 * @file tests/unit/rtl-formatter.test.ts
 * @description Unit tests for RTL conversion utilities and Persian character detection.
 */

import { describe, test, expect } from 'bun:test';
import { convertToRtlMarkdown } from '../../utils/rtlConverter';
import { isPersianChar } from '../../utils/persianizer';

describe('RTL Converter Utilities', () => {
  test('identifies Persian characters correctly', () => {
    expect(isPersianChar('س')).toBe(true);
    expect(isPersianChar('a')).toBe(false);
  });

  test('aligns markdown tables to the right', () => {
    const md = '| نام | سن |\n| --- | --- |\n| کاوه | ۲۸ |';
    const result = convertToRtlMarkdown(md);
    expect(result).toContain('---:');
  });

  test('preserves markdown tables unchanged inside fenced code blocks', () => {
    const codeWithTable = '```markdown\n| col1 | col2 |\n|---|---|\n| val1 | val2 |\n```';
    const result = convertToRtlMarkdown(codeWithTable);
    expect(result).toBe(codeWithTable);
    expect(result).not.toContain('---:');
  });
});

