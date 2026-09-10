import { describe, it, expect, beforeEach } from 'bun:test';
import {
  processDocument,
  clearDocumentCache,
  getDocumentCacheStats,
} from '@/services/markdownEngine';

describe('Markdown Engine LRU Memoization Cache', () => {
  beforeEach(() => {
    clearDocumentCache();
  });

  it('records cache miss on first document processing', () => {
    const md = '# مستند آزمایشی\n\nاین یک متن تستی برای بررسی کش است.';
    const doc1 = processDocument(md);

    expect(doc1.hasContent).toBe(true);
    expect(doc1.title).toBe('مستند آزمایشی');

    const stats = getDocumentCacheStats();
    expect(stats.size).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.hits).toBe(0);
  });

  it('reuses memoized result and increments hits on identical document and options', () => {
    const md = '## عنوان دو\n\n| نام | نمره |\n|---|---|\n| علی | ۲۰ |';
    const doc1 = processDocument(md);
    const doc2 = processDocument(md);

    expect(doc1).toBe(doc2);

    const stats = getDocumentCacheStats();
    expect(stats.size).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.hits).toBe(1);
  });

  it('clears cache and resets performance metrics', () => {
    processDocument('# سند اول');
    processDocument('# سند دوم');

    let stats = getDocumentCacheStats();
    expect(stats.size).toBe(2);

    clearDocumentCache();
    stats = getDocumentCacheStats();
    expect(stats.size).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
  });
});
