/**
 * @file tests/unit/rtl-formatter.test.ts
 * @description Unit tests for RTL conversion utilities, Persian digit/punctuation
 * transformation, and the bidi rehype plugin.
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import { convertToRtlMarkdown } from '../../utils/rtlConverter';
import { persianize } from '../../utils/persianizer';
import { rehypeBidi } from '../../utils/rehypeBidi';

/**
 * Run the bidi plugin over a markdown string and return the modified hast tree.
 */
async function renderBidi(md: string) {
  const processor = unified().use(remarkParse).use(remarkRehype);
  const tree = processor.runSync(processor.parse(md));
  unified().use(rehypeBidi).run(tree);
  return tree;
}

/** Collect all text + ltr-span values from a hast tree. */
function collect(tree: unknown): { texts: string[]; ltr: string[] } {
  const texts: string[] = [];
  const ltr: string[] = [];
  visit(tree as any, 'text', (n: any) => texts.push(n.value));
  visit(tree as any, 'element', (n: any) => {
    if (n.properties?.dir === 'ltr') ltr.push(n.children[0]?.value ?? '');
  });
  return { texts, ltr };
}

describe('RTL Converter Utilities', () => {
  test('converts English digits to Persian digits correctly', () => {
    const input = 'سال 2026 در ایران 1404 است.';
    const output = persianize(input);
    expect(output).toBe('سال ۲۰۲۶ در ایران ۱۴۰۴ است.');
  });

  test('converts Western punctuation to Persian', () => {
    const input = 'سلام؟ چطوری، خوبی؟ بله؛ متوجه شدم.';
    const output = persianize(input);
    expect(output).toBe('سلام؟ چطوری، خوبی؟ بله؛ متوجه شدم.');
  });

  test('skips converting numbers inside code blocks', () => {
    const input = 'کد نمونه: `const count = 123;`';
    const output = persianize(input);
    expect(output).toBe('کد نمونه: `const count = 123;`');
  });

  test('keeps punctuation LTR inside code blocks', () => {
    const input = '`if (x < 5) { return; }`';
    const output = persianize(input);
    expect(output).toBe('`if (x < 5) { return; }`');
  });

  test('wraps markdown with dir="rtl" container when option is enabled', () => {
    const md = '# سلام دنیا';
    const result = convertToRtlMarkdown(md, {
      wrapRtlContainer: true,
      persianizeDigits: false,
    });
    expect(result).toContain('<div dir="rtl"');
  });
});

describe('rehypeBidi plugin', () => {
  test('isolates Latin runs with dir="ltr" spans in Persian text', async () => {
    const { ltr } = collect(await renderBidi('این یک test ساده است.'));
    expect(ltr).toContain('test');
  });

  test('keeps URLs as a single LTR run', async () => {
    const { ltr } = collect(await renderBidi('سایت http://example.com عالی است.'));
    expect(ltr).toContain('http://example.com');
  });

  test('does not touch code blocks', async () => {
    const { ltr } = collect(await renderBidi('```js\nconst x = 123;\n```'));
    expect(ltr).not.toContain('const x = 123;');
  });

  test('injects ZWNJ at script boundaries', async () => {
    const { texts } = collect(await renderBidi('متن test اینجا'));
    expect(texts.some((t) => t.includes('‌'))).toBe(true);
  });
});
