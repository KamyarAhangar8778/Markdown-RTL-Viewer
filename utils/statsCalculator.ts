/**
 * @file utils/statsCalculator.ts
 * @description Utility to compute word count, character count, Persian character ratio, and read time.
 */

import { DocumentStats } from '@/types/markdown';
import { isPersianChar } from './persianizer';

/**
 * Calculates comprehensive document statistics for a given text.
 * @param text - The raw text input.
 * @returns DocumentStats object.
 */
export function calculateDocumentStats(text: string): DocumentStats {
  if (!text) {
    return {
      characterCount: 0,
      wordCount: 0,
      persianCharCount: 0,
      lineCount: 0,
      estimatedReadTimeMinutes: 0,
    };
  }

  const lines = text.split('\n');
  const lineCount = lines.length;
  const characterCount = text.length;

  let persianCharCount = 0;
  for (let i = 0; i < text.length; i++) {
    if (isPersianChar(text[i])) {
      persianCharCount++;
    }
  }

  // Count words separated by whitespace
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/) : [];
  const wordCount = words.length;

  // Average reading speed: 180 words per minute for Persian/Arabic text
  const estimatedReadTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  return {
    characterCount,
    wordCount,
    persianCharCount,
    lineCount,
    estimatedReadTimeMinutes,
  };
}
