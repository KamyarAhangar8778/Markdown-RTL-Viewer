/**
 * @file tests/unit/markdown-engine.test.ts
 * @description Deep module tests for the processDocument and prepareExportBundle interface seams.
 */

import { describe, test, expect } from 'bun:test';
import { processDocument, prepareExportBundle } from '../../services/markdownEngine';

describe('Markdown Engine Deep Module', () => {
  test('processes complete document across the unified interface', () => {
    const raw = `# عنوان مقاله نمونه
این یک پاراگراف فارسی برای تست است.

| ستون ۱ | ستون ۲ |
| --- | --- |
| داده | مقدار |

\`\`\`markdown
| دست‌نخورده |
|---|
\`\`\`
`;

    const result = processDocument(raw);

    // Interface asserts
    expect(result.raw).toBe(raw);
    expect(result.hasContent).toBe(true);
    expect(result.title).toBe('عنوان مقاله نمونه');

    // RTL Table alignment
    expect(result.rtlMarkdown).toContain('---:');

    // Code fence preservation
    expect(result.rtlMarkdown).toContain('| دست‌نخورده |\n|---|');

    // Metrics calculation
    expect(result.stats.lineCount).toBeGreaterThan(5);
    expect(result.stats.wordCount).toBeGreaterThan(5);
    expect(result.stats.persianCharCount).toBeGreaterThan(10);
    expect(result.stats.estimatedReadTimeMinutes).toBeGreaterThanOrEqual(1);
  });

  test('handles empty document gracefully with zeroed statistics', () => {
    const result = processDocument('');

    expect(result.raw).toBe('');
    expect(result.rtlMarkdown).toBe('');
    expect(result.hasContent).toBe(false);
    expect(result.title).toBe('');
    expect(result.stats.characterCount).toBe(0);
    expect(result.stats.wordCount).toBe(0);
    expect(result.stats.estimatedReadTimeMinutes).toBe(0);
  });

  test('supports custom options for reading speed and table alignment', () => {
    const tableMd = '| A | B |\n| --- | --- |\n| 1 | 2 |';
    const resultWithoutAlignment = processDocument(tableMd, { alignTablesRtl: false });
    expect(resultWithoutAlignment.rtlMarkdown).toBe(tableMd);

    const longText = 'کلمه '.repeat(360);
    const slowReadResult = processDocument(longText, { wordsPerMinute: 90 });
    expect(slowReadResult.stats.estimatedReadTimeMinutes).toBe(4);
  });

  test('extracts document title from Setext level-1 headings', () => {
    const setextRaw = `عنوان ستکس
===
این یک مقاله با عنوان ستکس است.`;
    const result = processDocument(setextRaw);
    expect(result.title).toBe('عنوان ستکس');

    const bundle = prepareExportBundle(setextRaw);
    expect(bundle.filename).toContain('عنوان-ستکس.md');
  });

  test('prepares export bundle cleanly without browser DOM dependency', () => {
    const md = '# مستندات تست\nمحتوای آزمایشی';
    const bundle = prepareExportBundle(md);

    expect(bundle.content).toBe(md);
    expect(bundle.filename).toContain('مستندات-تست.md');
    expect(bundle.mimeType).toBe('text/markdown;charset=utf-8');

    const fallbackBundle = prepareExportBundle('بدون عنوان', 'بدون عنوان');
    expect(fallbackBundle.filename).toBe('بدون-عنوان.md');

    const defaultBundle = prepareExportBundle('بدون هدر');
    expect(defaultBundle.filename).toBe('rtl-document.md');
  });
});
