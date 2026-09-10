# Technical API Documentation

## Utility Functions API

### `convertToRtlMarkdown(markdown: string): string`
- **Location:** `utils/rtlConverter.ts`
- **Description:** Transforms standard Markdown into RTL-optimized Markdown (aligns tables for RTL).
- **Parameters:**
  - `markdown`: Raw markdown string.
- **Returns:** String formatted for RTL rendering.

### `isPersianChar(char: string): boolean`
- **Location:** `utils/persianizer.ts`
- **Description:** Checks if a given character is within the Persian/Arabic Unicode blocks.

### `calculateDocumentStats(text: string): DocumentStats`
- **Location:** `utils/statsCalculator.ts`
- **Description:** Computes word count, character count, line count, Persian char count, and reading time.

