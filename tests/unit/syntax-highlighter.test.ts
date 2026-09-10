/**
 * @file tests/unit/syntax-highlighter.test.ts
 * @description Unit tests for syntax highlighting utility functions.
 */

import { describe, test, expect } from 'bun:test';
import { highlightCode, normalizeLanguage } from '../../utils/syntaxHighlighter';

describe('Syntax Highlighter Utilities', () => {
  test('normalizes language aliases properly', () => {
    expect(normalizeLanguage('js')).toBe('javascript');
    expect(normalizeLanguage('ts')).toBe('typescript');
    expect(normalizeLanguage('py')).toBe('python');
    expect(normalizeLanguage('sh')).toBe('bash');
    expect(normalizeLanguage('rs')).toBe('rust');
    expect(normalizeLanguage('c++')).toBe('cpp');
    expect(normalizeLanguage('c#')).toBe('csharp');
    expect(normalizeLanguage('plain')).toBe('text');
    expect(normalizeLanguage('txt')).toBe('text');
    expect(normalizeLanguage('')).toBe('');
  });

  test('treats unlabelled or plain text blocks strictly as text without false positive syntax detection', () => {
    // Fenced block with "این" and no language tag
    const result1 = highlightCode('این', '');
    expect(result1.language).toBe('text');
    expect(result1.html).not.toContain('hljs-');
    expect(result1.html).toContain('این');

    // Fenced block with explicit "text" or "plain"
    const result2 = highlightCode('color: red;\nbody { margin: 0; }', 'text');
    expect(result2.language).toBe('text');
    expect(result2.html).not.toContain('hljs-');

    // Fenced block with "undefined" language
    const result3 = highlightCode('# این یک کامنت پایتون نیست', undefined);
    expect(result3.language).toBe('text');
    expect(result3.html).not.toContain('hljs-');
  });

  test('highlights JavaScript code into HTML token spans', () => {
    const code = 'const greeting = "سلام";\nfunction test() { return 42; }';
    const result = highlightCode(code, 'javascript');
    expect(result.html).toContain('hljs-keyword');
    expect(result.html).toContain('hljs-string');
    expect(result.language).toBe('javascript');
  });

  test('highlights Python code properly', () => {
    const code = 'def hello_world():\n    print("Hello")';
    const result = highlightCode(code, 'python');
    expect(result.html).toContain('hljs-keyword');
    expect(result.language).toBe('python');
  });

  test('handles fallback safely on unknown languages', () => {
    const code = 'some random text 123';
    const result = highlightCode(code, 'unknownlang123');
    expect(result.html).toBeDefined();
    expect(result.language).toBe('unknownlang123');
  });
});
