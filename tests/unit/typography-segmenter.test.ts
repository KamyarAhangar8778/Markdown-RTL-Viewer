/**
 * @file tests/unit/typography-segmenter.test.ts
 * @description Unit tests for character-level and token-level script segmentation between Persian and Latin fonts.
 */

import { describe, it, expect } from 'bun:test';
import {
  isLatinLetter,
  segmentTextByScript,
  segmentHtmlByLanguage,
  FONT_VAZIR_STYLE,
  FONT_MONO_STYLE,
} from '@/utils/typographySegmenter';

describe('Typography Segmenter Unit Tests', () => {
  it('correctly identifies Latin alphabet characters', () => {
    expect(isLatinLetter('a')).toBe(true);
    expect(isLatinLetter('Z')).toBe(true);
    expect(isLatinLetter('گ')).toBe(false);
    expect(isLatinLetter('1')).toBe(false);
    expect(isLatinLetter('')).toBe(false);
  });

  it('segments pure Persian text into a single Persian segment', () => {
    const text = 'سلام دنیا و خوش آمدید';
    const segments = segmentTextByScript(text);
    expect(segments.length).toBe(1);
    expect(segments[0].script).toBe('persian');
    expect(segments[0].text).toBe(text);
  });

  it('segments pure Latin text into a single Latin segment', () => {
    const text = 'const greeting = "Hello World";';
    const segments = segmentTextByScript(text);
    expect(segments.length).toBe(1);
    expect(segments[0].script).toBe('latin');
    expect(segments[0].text).toBe(text);
  });

  it('segments mixed Persian and English text accurately', () => {
    const text = 'متن فارسی با کلمه Next.js و React است';
    const segments = segmentTextByScript(text);
    
    // Expect: Persian -> Latin (Next.js ) -> Persian (و ) -> Latin (React ) -> Persian (است)
    expect(segments.length).toBeGreaterThan(2);
    expect(segments[0].script).toBe('persian');
    expect(segments[0].text).toBe('متن فارسی با کلمه ');
    expect(segments[1].script).toBe('latin');
    expect(segments[1].text).toBe('Next.js ');
    expect(segments[2].script).toBe('persian');
    expect(segments[2].text).toBe('و ');
    expect(segments[3].script).toBe('latin');
    expect(segments[3].text).toBe('React ');
    expect(segments[4].script).toBe('persian');
    expect(segments[4].text).toBe('است');
  });

  it('segments HTML markup without corrupting tags and entities', () => {
    const rawHtml = '<span class="hljs-comment">// تست کامنت فارسی with English</span>';
    const segmented = segmentHtmlByLanguage(rawHtml);

    expect(segmented.startsWith('<span class="hljs-comment">')).toBe(true);
    expect(segmented.endsWith('</span>')).toBe(true);
    expect(segmented).toContain(FONT_VAZIR_STYLE);
    expect(segmented).toContain(FONT_MONO_STYLE);
    expect(segmented).toContain('تست کامنت فارسی');
    expect(segmented).toContain('with English');
  });

  it('segments plain text block with both Persian and English', () => {
    const plainText = 'این یک متن تستی است Test 123';
    const segmented = segmentHtmlByLanguage(plainText);

    expect(segmented).toContain(`style="font-family: ${FONT_VAZIR_STYLE};"`);
    expect(segmented).toContain(`style="font-family: ${FONT_MONO_STYLE};"`);
  });

  it('correctly segments code blocks with language text and preserves valid HTML style quotes', () => {
    const code = 'سلام دنیا\nconsole.log("خروجی");';
    const segmented = segmentHtmlByLanguage(code);

    // Persian text must have Vazirmatn font token
    expect(segmented).toContain('font-persian-token');
    expect(segmented).toContain('سلام دنیا');
    expect(segmented).toContain('خروجی');

    // Latin code tokens must have JetBrains Mono font token
    expect(segmented).toContain('font-latin-token');
    expect(segmented).toContain('console.log');

    // Font family constant strings must not contain unescaped double quotes that break HTML style attributes
    expect(FONT_VAZIR_STYLE).not.toContain('"');
    expect(FONT_MONO_STYLE).not.toContain('"');
  });

  it('correctly associates leading numbers with Persian when followed by Persian text', () => {
    const numberedList = '1. تراز خودکار متن';
    const segments = segmentTextByScript(numberedList, 'persian');

    expect(segments.length).toBe(1);
    expect(segments[0].script).toBe('persian');
    expect(segments[0].text).toBe(numberedList);
  });
});
