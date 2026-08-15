'use client';

/**
 * @file hooks/useDecodeText.ts
 * @description Hook providing a refined, stutter-free cinematic decode reveal effect optimized for Persian typography.
 */

import { useState, useEffect } from 'react';

const DECODE_GLYPHS = ['ـ', '•', '▫', '▪', 'آ', 'ا', 'س', 'ت', 'و', 'د', 'ی', 'و'];

/**
 * Custom hook to simulate a refined, non-jittery text decoding effect.
 * Instead of scrambling all unrevealed characters and breaking cursive rendering,
 * it progressively reveals characters with a subtle leading-edge transition.
 *
 * @param {string} targetText - The target text to reveal.
 * @param {number} [speed=22] - Step interval in milliseconds.
 * @returns {string} The animated decoded string.
 */
export function useDecodeText(targetText: string, speed = 22): string {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!targetText) {
      return;
    }

    let currentIndex = 0;
    let subTick = 0;
    const ticksPerChar = 2;

    const interval = setInterval(() => {
      if (currentIndex >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
        return;
      }

      const revealedPart = targetText.slice(0, currentIndex);
      const currentChar = targetText[currentIndex];

      if (currentChar === ' ' || currentChar === '\n' || currentChar === '\t') {
        currentIndex += 1;
        subTick = 0;
        setDisplayText(targetText.slice(0, currentIndex));
        return;
      }

      if (subTick < ticksPerChar - 1) {
        const randomGlyph = DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)];
        setDisplayText(`${revealedPart}${randomGlyph}`);
        subTick += 1;
      } else {
        currentIndex += 1;
        subTick = 0;
        setDisplayText(targetText.slice(0, currentIndex));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return displayText || targetText;
}
