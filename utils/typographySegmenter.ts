/**
 * @file utils/typographySegmenter.ts
 * @description Intelligent character-by-character and token-level script segmenter for Persian (Vazirmatn) and Latin (JetBrains Mono).
 */

import React from 'react';
import { isPersianChar } from '@/utils/persianizer';

/** CSS font-family string for Persian Vazirmatn */
export const FONT_VAZIR_STYLE = "'Vazirmatn', var(--font-vazir-local), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/** CSS font-family string for Latin JetBrains Mono */
export const FONT_MONO_STYLE = "'JetBrains Mono', monospace";

/** Script category classification */
export type ScriptType = 'persian' | 'latin';

/** Segmented text chunk with resolved script */
export interface ScriptSegment {
  readonly text: string;
  readonly script: ScriptType;
}

/**
 * Checks if a character is a Latin alphabet character (A-Z, a-z).
 *
 * @param {string} char - Single character.
 * @returns {boolean} True if the character is an English/Latin letter.
 */
export function isLatinLetter(char: string): boolean {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= 0x0041 && code <= 0x005a) || (code >= 0x0061 && code <= 0x007a);
}

/**
 * Scans ahead in text to identify the script of the first upcoming letter.
 * Returns null if no letter characters are found.
 *
 * @param {string} text - Raw string.
 * @param {number} startIndex - Starting search index.
 * @returns {ScriptType | null} Detected upcoming script or null.
 */
function findFirstScriptInText(text: string, startIndex: number): ScriptType | null {
  for (let i = startIndex; i < text.length; i++) {
    const char = text[i];
    if (isPersianChar(char)) return 'persian';
    if (isLatinLetter(char)) return 'latin';
  }
  return null;
}

/**
 * Segments an input string into consecutive runs of Persian vs Latin text chunks.
 *
 * @param {string} text - Raw string to analyze.
 * @param {ScriptType} [defaultScript='persian'] - Fallback script when context has no letters.
 * @returns {ScriptSegment[]} Array of classified script segments.
 */
export function segmentTextByScript(text: string, defaultScript: ScriptType = 'persian'): ScriptSegment[] {
  if (!text) return [];

  const segments: ScriptSegment[] = [];
  let currentScript: ScriptType | null = null;
  let currentBuffer = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (isPersianChar(char)) {
      if (currentScript === 'persian') {
        currentBuffer += char;
      } else {
        if (currentBuffer) {
          segments.push({ text: currentBuffer, script: currentScript ?? 'latin' });
        }
        currentScript = 'persian';
        currentBuffer = char;
      }
    } else if (isLatinLetter(char)) {
      if (currentScript === 'latin') {
        currentBuffer += char;
      } else {
        if (currentBuffer) {
          segments.push({ text: currentBuffer, script: currentScript ?? 'persian' });
        }
        currentScript = 'latin';
        currentBuffer = char;
      }
    } else {
      // Neutral characters (whitespace, numbers, punctuation, symbols)
      if (currentScript === null) {
        currentScript = findFirstScriptInText(text, i) ?? defaultScript;
      }
      currentBuffer += char;
    }
  }

  if (currentBuffer && currentScript) {
    segments.push({ text: currentBuffer, script: currentScript });
  }

  return segments;
}

/**
 * Transforms an HTML string (such as highlight.js output) by wrapping text runs in font-specific spans.
 * Preserves all HTML tags, attributes, and entities.
 *
 * @param {string} html - Raw HTML markup to segment.
 * @returns {string} HTML markup with character-analyzed font spans.
 */
export function segmentHtmlByLanguage(html: string): string {
  if (!html) return '';

  // Match HTML tags, HTML entities, and plain text sequences
  const tokenRegex = /(<[^>]+>|&(?:[a-zA-Z0-9]+|#\d+|#x[0-9a-fA-F]+);|[^<>&]+)/g;
  let output = '';
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(html)) !== null) {
    const token = match[0];

    // Preserve HTML tags as-is
    if (token.startsWith('<') && token.endsWith('>')) {
      output += token;
      continue;
    }

    // Treat entities (e.g. &quot;, &#39;, &lt;) as Latin/syntax tokens
    if (token.startsWith('&') && token.endsWith(';')) {
      output += `<span class="font-mono font-latin-token" style="font-family: ${FONT_MONO_STYLE};">${token}</span>`;
      continue;
    }

    // Analyze plain text node character-by-character
    const segments = segmentTextByScript(token, 'latin');
    for (const segment of segments) {
      if (segment.script === 'persian') {
        output += `<span class="font-vazir font-persian-token" style="font-family: ${FONT_VAZIR_STYLE};">${segment.text}</span>`;
      } else {
        output += `<span class="font-mono font-latin-token" style="font-family: ${FONT_MONO_STYLE};">${segment.text}</span>`;
      }
    }
  }

  return output;
}

/**
 * Converts a mixed Persian/Latin string into an array of React spans with dedicated fonts.
 *
 * @param {string} text - Plain text to segment.
 * @param {string} [keyPrefix='seg'] - Unique prefix for React element keys.
 * @param {ScriptType} [defaultScript='persian'] - Fallback script for neutral text.
 * @returns {React.ReactNode} Array of React span elements or plain string.
 */
export function segmentMixedTextToReact(
  text: string,
  keyPrefix = 'seg',
  defaultScript: ScriptType = 'persian'
): React.ReactNode {
  if (!text) return text;

  const segments = segmentTextByScript(text, defaultScript);
  if (segments.length === 0) return text;
  if (segments.length === 1 && segments[0].script === 'persian') {
    return React.createElement(
      'span',
      { key: `${keyPrefix}-0`, className: 'font-vazir font-persian-token', style: { fontFamily: FONT_VAZIR_STYLE } },
      text
    );
  }
  if (segments.length === 1 && segments[0].script === 'latin') {
    return React.createElement(
      'span',
      { key: `${keyPrefix}-0`, className: 'font-mono font-latin-token', style: { fontFamily: FONT_MONO_STYLE } },
      text
    );
  }

  return segments.map((seg, idx) =>
    React.createElement(
      'span',
      {
        key: `${keyPrefix}-${idx}`,
        className: seg.script === 'persian' ? 'font-vazir font-persian-token' : 'font-mono font-latin-token',
        style: {
          fontFamily: seg.script === 'persian' ? FONT_VAZIR_STYLE : FONT_MONO_STYLE,
        },
      },
      seg.text
    )
  );
}

/**
 * Recursively analyzes React children and applies character-level font segmentation to text nodes.
 *
 * @param {React.ReactNode} children - React children to process.
 * @param {ScriptType} [defaultScript='persian'] - Fallback script for neutral text.
 * @returns {React.ReactNode} Processed React children with granular font segmentation.
 */
export function renderHybridChildren(
  children: React.ReactNode,
  defaultScript: ScriptType = 'persian'
): React.ReactNode {
  if (children === null || children === undefined || typeof children === 'boolean') {
    return children;
  }

  if (typeof children === 'string') {
    return segmentMixedTextToReact(children, 'seg', defaultScript);
  }

  if (typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return React.Children.map(children, (child, idx) =>
      React.createElement(React.Fragment, { key: `hybrid-${idx}` }, renderHybridChildren(child, defaultScript))
    );
  }

  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{ children?: React.ReactNode }>;
    if (element.props && element.props.children !== undefined) {
      return React.cloneElement(element, {
        ...element.props,
        children: renderHybridChildren(element.props.children, defaultScript),
      });
    }
  }

  return children;
}
