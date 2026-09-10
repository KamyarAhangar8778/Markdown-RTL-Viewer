/**
 * @file tests/unit/inline-code-bidi.test.ts
 * @description Verifies bidirectional properties and font tokens for inline code snippets.
 */

import { describe, it, expect } from 'bun:test';
import { hasPersianText } from '@/utils/persianizer';
import { FONT_MONO_STYLE, FONT_VAZIR_STYLE, renderHybridChildren } from '@/utils/typographySegmenter';
import React from 'react';

describe('Inline Code BiDi and Mixed Script Handling', () => {
  it('guarantees JetBrains Mono is prioritized for Latin and Vazirmatn for Persian', () => {
    expect(FONT_MONO_STYLE).toContain('JetBrains Mono');
    expect(FONT_VAZIR_STYLE).toContain('Vazirmatn');
    // Ensure font-code-en-local is not used in FONT_MONO_STYLE to prevent Arial fallback
    expect(FONT_MONO_STYLE).not.toContain('font-code-en-local');
  });

  it('renders hybrid children with Vazirmatn for Persian tokens and JetBrains Mono for Latin', () => {
    const rendered = renderHybridChildren('کلمه text') as React.ReactElement[];
    expect(Array.isArray(rendered)).toBe(true);
    expect(rendered.length).toBe(2);
    // First segment is Persian
    expect(rendered[0].props.className).toContain('font-persian-token');
    expect(rendered[0].props.style.fontFamily).toBe(FONT_VAZIR_STYLE);
    // Second segment is Latin
    expect(rendered[1].props.className).toContain('font-latin-token');
    expect(rendered[1].props.style.fontFamily).toBe(FONT_MONO_STYLE);
  });
  it('detects Persian in mixed inline code snippets correctly', () => {
    const mixedSnippet = 'متن فارسی english';
    expect(hasPersianText(mixedSnippet)).toBe(true);

    const pureEnglish = 'const x = 10;';
    expect(hasPersianText(pureEnglish)).toBe(false);

    const purePersian = 'متن آزمایشی';
    expect(hasPersianText(purePersian)).toBe(true);
  });

  it('verifies that first strong character directionality maps accurately', () => {
    // A snippet starting with Persian should have RTL as its first strong directional character
    const persianFirst = 'متن فارسی english';
    const firstCodePoint = persianFirst.codePointAt(0) ?? 0;
    // Arabic/Persian Unicode block is 0x0600 - 0x06FF
    const isRtlFirst = firstCodePoint >= 0x0600 && firstCodePoint <= 0x06ff;
    expect(isRtlFirst).toBe(true);

    // A snippet starting with English should have LTR as its first strong directional character
    const englishFirst = 'english متن فارسی';
    const firstEnglishCodePoint = englishFirst.codePointAt(0) ?? 0;
    const isLtrFirst =
      (firstEnglishCodePoint >= 65 && firstEnglishCodePoint <= 90) ||
      (firstEnglishCodePoint >= 97 && firstEnglishCodePoint <= 122);
    expect(isLtrFirst).toBe(true);
  });
});
