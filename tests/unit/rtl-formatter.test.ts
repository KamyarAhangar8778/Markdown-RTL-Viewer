/**
 * @file tests/unit/rtl-formatter.test.ts
 * @description Unit tests for RTL conversion utilities and Persian digit transformation.
 */

import { convertToRtlMarkdown } from '../../utils/rtlConverter';
import { toPersianDigits } from '../../utils/persianizer';

describe('RTL Converter Utilities', () => {
  test('converts English digits to Persian digits correctly', () => {
    const input = 'سال 2026 در ایران 1404 است.';
    const output = toPersianDigits(input);
    expect(output).toBe('سال ۲۰۲۶ در ایران ۱۴۰۴ است.');
  });

  test('skips converting numbers inside code blocks', () => {
    const input = 'کد نمونه: `const count = 123;`';
    const output = toPersianDigits(input);
    expect(output).toBe('کد نمونه: `const count = 123;`');
  });

  test('wraps markdown with dir="rtl" container when option is enabled', () => {
    const md = '# سلام دنیا';
    const result = convertToRtlMarkdown(md, {
      wrapRtlContainer: true,
      persianizeDigits: false,
      preserveLtrCode: true,
      autoAlignParagraphs: true,
    });
    expect(result).toContain('<div dir="rtl"');
  });
});
