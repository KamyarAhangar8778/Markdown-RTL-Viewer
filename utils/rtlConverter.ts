/**
 * @file utils/rtlConverter.ts
 * @description Core RTL Markdown processor. Transforms standard Markdown into RTL-optimized Markdown.
 */

import { RtlConversionOptions } from '@/types/markdown';
import { toPersianDigits } from './persianizer';

/**
 * Transforms standard Markdown text into an RTL-aligned Markdown structure.
 * 
 * @param markdown - Raw Markdown string input.
 * @param options - Transformation options (digit conversion, wrapping, alignment).
 * @returns Transformed RTL Markdown string.
 */
export function convertToRtlMarkdown(
  markdown: string,
  options: RtlConversionOptions
): string {
  if (!markdown) return '';

  let result = markdown;

  // Step 1: Persianize digits if enabled
  if (options.persianizeDigits) {
    result = toPersianDigits(result);
  }

  // Step 2: Ensure table columns are right-aligned if they lack explicit alignment
  result = alignMarkdownTablesRtl(result);

  // Step 3: Wrap with HTML container ONLY if explicitly requested in options
  if (options.wrapRtlContainer) {
    const isAlreadyWrapped = result.trim().startsWith('<div dir="rtl"');
    if (!isAlreadyWrapped) {
      result = `<div dir="rtl">\n\n${result}\n\n</div>`;
    }
  }

  return result;
}

/**
 * Ensures Markdown tables align text to the right by modifying header separator rows.
 * @param md - Raw markdown text
 */
function alignMarkdownTablesRtl(md: string): string {
  const lines = md.split('\n');
  const processedLines = lines.map((line) => {
    // Check if line is a table header divider (e.g., |---|---| or | --- | --- |)
    if (/^\s*\|?(\s*:?-+:?\s*\|)+\s*$/.test(line)) {
      return line.replace(/:?-+:?/g, '---:'); // Force right-alignment for all columns
    }
    return line;
  });
  return processedLines.join('\n');
}
