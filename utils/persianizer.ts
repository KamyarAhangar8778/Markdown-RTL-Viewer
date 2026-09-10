/**
 * @file utils/persianizer.ts
 * @description Helper functions for Persian character detection.
 */

/**
 * Checks if a character is a Persian/Arabic character.
 * @param char - Single character to test.
 * @returns Boolean indicating whether the character belongs to the Persian/Arabic Unicode blocks.
 */
export function isPersianChar(char: string): boolean {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (
    (code >= 0x0600 && code <= 0x06ff) ||
    (code >= 0x0750 && code <= 0x077f) ||
    (code >= 0x08a0 && code <= 0x08ff) ||
    (code >= 0xfb50 && code <= 0xfdff) ||
    (code >= 0xfe70 && code <= 0xfeff) ||
    code === 0x200c ||
    code === 0x200d
  );
}

/**
 * Checks if a string contains any Persian/Arabic characters.
 * @param text - Input string to check.
 * @returns True if text contains any Persian/Arabic glyphs.
 */
export function hasPersianText(text: string): boolean {
  if (!text) return false;
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C\u200D]/.test(text);
}

