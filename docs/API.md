# Technical API Documentation

## Utility Functions API

### `convertToRtlMarkdown(markdown: string, options: RtlConversionOptions): string`
- **Location:** `utils/rtlConverter.ts`
- **Description:** Transforms standard Markdown into RTL-optimized Markdown.
- **Parameters:**
  - `markdown`: Raw markdown string.
  - `options`: Object specifying `wrapRtlContainer`, `persianizeDigits`, `preserveLtrCode`.
- **Returns:** String formatted for RTL rendering.

### `toPersianDigits(input: string): string`
- **Location:** `utils/persianizer.ts`
- **Description:** Replaces Western digits (`0-9`) with Persian digits (`۰-۹`) while skipping code blocks.

### `calculateDocumentStats(text: string): DocumentStats`
- **Location:** `utils/statsCalculator.ts`
- **Description:** Computes word count, character count, line count, Persian char count, and reading time.
