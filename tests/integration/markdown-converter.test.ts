/**
 * @file tests/integration/markdown-converter.test.ts
 * @description Integration tests for full markdown document conversion workflow.
 */

import { describe, test, expect } from 'bun:test';
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
    const converted = convertToRtlMarkdown(sampleDoc);
    expect(converted).toContain('---:');
  });

  test('handles empty or whitespace-only documents with 0 read time', () => {
    const emptyStats = calculateDocumentStats('');
    expect(emptyStats.wordCount).toBe(0);
    expect(emptyStats.estimatedReadTimeMinutes).toBe(0);

    const whitespaceStats = calculateDocumentStats('   \n\n\t  ');
    expect(whitespaceStats.wordCount).toBe(0);
    expect(whitespaceStats.estimatedReadTimeMinutes).toBe(0);
  });
});
