/**
 * @file utils/rtlConverter.ts
 * @description Core RTL Markdown processor. Transforms standard Markdown into RTL-optimized Markdown.
 */

/**
 * Transforms standard Markdown text into an RTL-aligned Markdown structure.
 * 
 * @param markdown - Raw Markdown string input.
 * @returns Transformed RTL Markdown string.
 */
export function convertToRtlMarkdown(markdown: string): string {
  if (!markdown) return '';

  // Ensure table columns are right-aligned if they lack explicit alignment
  return alignMarkdownTablesRtl(markdown);
}

/**
 * Ensures Markdown tables align text to the right by modifying header separator rows.
 * Fenced code blocks are preserved intact without modifying their inner content.
 * 
 * @param {string} md - Raw markdown text.
 * @returns {string} Processed markdown text with RTL-aligned tables.
 */
function alignMarkdownTablesRtl(md: string): string {
  // Quick character guard: skip line splitting and regex iterations if text contains no table delimiters
  if (!md.includes('|')) {
    return md;
  }

  const lines = md.split('\n');
  let inCodeBlock = false;

  const processedLines = lines.map((line) => {
    // Check if toggling fenced code blocks (``` or ~~~)
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock;
      return line;
    }

    // Never modify lines inside code blocks
    if (inCodeBlock) {
      return line;
    }

    // Check if line is a table header divider (e.g., |---|---| or | --- | --- |)
    if (/^\s*\|?(\s*:?-+:?\s*\|)+\s*$/.test(line)) {
      return line.replace(/:?-+:?/g, '---:'); // Force right-alignment for all columns
    }
    return line;
  });

  return processedLines.join('\n');
}
