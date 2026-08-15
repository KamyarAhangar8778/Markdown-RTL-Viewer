/**
 * @file tests/integration/markdown-converter.test.ts
 * @description Integration tests for full markdown document conversion workflow.
 */

import { convertToRtlMarkdown } from '../../utils/rtlConverter';
import { calculateDocumentStats } from '../../utils/statsCalculator';

describe('Markdown Converter Integration', () => {
  const sampleDoc = `# مقاله نمونه
این یک متن **تست** است.
1. آیتم اول
2. آیتم دوم

| عنوان | مقدار |
|---|---|
| تست | 100 |
`;

  test('calculates document stats correctly', () => {
    const stats = calculateDocumentStats(sampleDoc);
    expect(stats.lineCount).toBeGreaterThan(0);
    expect(stats.wordCount).toBeGreaterThan(0);
    expect(stats.persianCharCount).toBeGreaterThan(0);
  });

  test('aligns table columns to right for RTL', () => {
    const converted = convertToRtlMarkdown(sampleDoc, {
      wrapRtlContainer: true,
      persianizeDigits: true,
      preserveLtrCode: true,
      autoAlignParagraphs: true,
    });
    expect(converted).toContain('---:');
  });
});
