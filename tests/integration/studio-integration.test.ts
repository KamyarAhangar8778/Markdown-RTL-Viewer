import { describe, it, expect } from 'bun:test';
import { processDocument, prepareExportBundle } from '@/services/markdownEngine';
import { TRANSLATIONS } from '@/constants/translations';
import { SAMPLE_RTL_MARKDOWN_FA, SAMPLE_RTL_MARKDOWN_EN } from '@/constants/sampleMarkdown';

describe('Studio Integration Suite', () => {
  it('processes complex Persian sample markdown completely with correct statistics', () => {
    const doc = processDocument(SAMPLE_RTL_MARKDOWN_FA);

    expect(doc.hasContent).toBe(true);
    expect(doc.title).toBe('به استودیو راست‌چین‌ساز مارک‌داون خوش آمدید 👋');
    expect(doc.stats.wordCount).toBeGreaterThan(50);
    expect(doc.stats.persianCharCount).toBeGreaterThan(50);
    expect(doc.stats.estimatedReadTimeMinutes).toBeGreaterThanOrEqual(1);

    // RTL tables must have right aligned headers/dividers
    expect(doc.rtlMarkdown).toContain('---:');

    // Code blocks must be preserved
    expect(doc.rtlMarkdown).toContain('```typescript');
  });

  it('processes complex English sample markdown with zero errors', () => {
    const doc = processDocument(SAMPLE_RTL_MARKDOWN_EN);

    expect(doc.hasContent).toBe(true);
    expect(doc.title).toBe('Welcome to RTL Markdown Studio 👋');
    expect(doc.stats.wordCount).toBeGreaterThan(50);
  });

  it('guarantees complete translation dictionary parity between fa and en', () => {
    const faKeys = Object.keys(TRANSLATIONS.fa).sort();
    const enKeys = Object.keys(TRANSLATIONS.en).sort();

    expect(faKeys).toEqual(enKeys);

    // Verify sub-keys for header, editor, preview, dock, focusMode
    expect(Object.keys(TRANSLATIONS.fa.header).sort()).toEqual(Object.keys(TRANSLATIONS.en.header).sort());
    expect(Object.keys(TRANSLATIONS.fa.editor).sort()).toEqual(Object.keys(TRANSLATIONS.en.editor).sort());
    expect(Object.keys(TRANSLATIONS.fa.preview).sort()).toEqual(Object.keys(TRANSLATIONS.en.preview).sort());
    expect(Object.keys(TRANSLATIONS.fa.dock).sort()).toEqual(Object.keys(TRANSLATIONS.en.dock).sort());
    expect(Object.keys(TRANSLATIONS.fa.focusMode).sort()).toEqual(Object.keys(TRANSLATIONS.en.focusMode).sort());
  });

  it('prepares an export bundle with valid sanitized filename and MIME type', () => {
    const bundle = prepareExportBundle('# یادداشت‌های استودیو\n\nمتن سند.', 'یادداشت‌های استودیو');

    expect(bundle.filename).toBe('یادداشت-های-استودیو.md');
    expect(bundle.mimeType).toBe('text/markdown;charset=utf-8');
    expect(bundle.content).toContain('# یادداشت‌های استودیو');
  });
});
