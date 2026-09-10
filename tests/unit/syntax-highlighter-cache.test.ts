import { describe, it, expect, beforeEach } from 'bun:test';
import {
  highlightCode,
  clearHighlightCache,
  getHighlightCacheStats,
} from '@/utils/syntaxHighlighter';

describe('Syntax Highlighter LRU Cache', () => {
  beforeEach(() => {
    clearHighlightCache();
  });

  it('records cache misses and increments size on first evaluation', () => {
    const code = 'const greeting = "سلام دنیا";';
    const result1 = highlightCode(code, 'javascript');

    expect(result1.html).toContain('greeting');
    expect(result1.language).toBe('javascript');

    const stats = getHighlightCacheStats();
    expect(stats.size).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.hits).toBe(0);
  });

  it('records cache hits and reuses cached html on repeated calls', () => {
    const code = 'def compute_total(a, b):\n    return a + b';
    const result1 = highlightCode(code, 'python');
    const result2 = highlightCode(code, 'python');

    expect(result1.html).toBe(result2.html);
    expect(result1.language).toBe('python');

    const stats = getHighlightCacheStats();
    expect(stats.size).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.hits).toBe(1);
  });

  it('resets all cache records and metrics when clearHighlightCache is called', () => {
    highlightCode('echo "test"', 'bash');
    highlightCode('SELECT * FROM users;', 'sql');

    let stats = getHighlightCacheStats();
    expect(stats.size).toBe(2);

    clearHighlightCache();
    stats = getHighlightCacheStats();
    expect(stats.size).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
  });
});
