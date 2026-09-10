/**
 * @file services/markdownEngine.ts
 * @description Deep domain module for Markdown processing, RTL conversion, document analytics, and export preparation.
 * Designed according to codebase-design principles: deep implementation behind a compact, high-leverage interface.
 */

import { DocumentStats } from '@/types/markdown';
import { DEFAULT_READING_SPEED_WPM } from '@/constants/domain';
import { convertToRtlMarkdown } from '@/utils/rtlConverter';
import { calculateDocumentStats } from '@/utils/statsCalculator';

/**
 * Configuration options for document processing across the engine seam.
 */
export interface ProcessDocumentOptions {
  /** Force right alignment on table column dividers */
  readonly alignTablesRtl?: boolean;
  /** Custom reading speed in words per minute (defaults to 180 wpm) */
  readonly wordsPerMinute?: number;
}

/**
 * Result of comprehensive document processing across the Markdown engine seam.
 */
export interface ProcessedDocument {
  /** Original un-mutated raw markdown input */
  readonly raw: string;
  /** Transformed markdown with right-aligned table columns and preserved code fences */
  readonly rtlMarkdown: string;
  /** Comprehensive metrics including line count, words, and Persian ratio */
  readonly stats: DocumentStats;
  /** Whether the document contains meaningful non-whitespace content */
  readonly hasContent: boolean;
  /** Document title extracted from the first heading (# Title), if available */
  readonly title: string;
}

/**
 * Document export bundle containing content, target filename, and MIME type.
 */
export interface ExportBundle {
  readonly content: string;
  readonly filename: string;
  readonly mimeType: string;
}

/** Maximum number of processed document states cached in memory */
const DOCUMENT_CACHE_LIMIT = 64;

/** Internal bounded LRU cache for markdown processing output */
const documentCache = new Map<string, ProcessedDocument>();
let documentCacheHits = 0;
let documentCacheMisses = 0;

/**
 * Clears the markdown document processing LRU cache.
 */
export function clearDocumentCache(): void {
  documentCache.clear();
  documentCacheHits = 0;
  documentCacheMisses = 0;
}

/**
 * Returns performance metrics for the markdown document processing LRU cache.
 *
 * @returns {{ size: number; hits: number; misses: number }} Cache performance snapshot.
 */
export function getDocumentCacheStats(): { size: number; hits: number; misses: number } {
  return {
    size: documentCache.size,
    hits: documentCacheHits,
    misses: documentCacheMisses,
  };
}

/**
 * Deep module interface for processing a markdown document.
 * Encapsulates table alignment, code fence isolation, word tokenization,
 * Persian character detection, title extraction, and reading time calculation.
 * Results are cached in a bounded LRU cache to eliminate redundant computation.
 *
 * @param {string} rawText - Raw markdown text input.
 * @param {ProcessDocumentOptions} [options] - Optional processing configuration.
 * @returns {ProcessedDocument} Immutable processed document result.
 */
export function processDocument(
  rawText: string,
  options?: ProcessDocumentOptions
): ProcessedDocument {
  const safeText = rawText ?? '';
  const alignTables = options?.alignTablesRtl ?? true;
  const wpm =
    options?.wordsPerMinute && options.wordsPerMinute > 0
      ? options.wordsPerMinute
      : DEFAULT_READING_SPEED_WPM;

  const cacheKey = `${alignTables}::${wpm}::${safeText}`;

  // Check LRU cache
  if (documentCache.has(cacheKey)) {
    documentCacheHits++;
    const cached = documentCache.get(cacheKey)!;
    documentCache.delete(cacheKey);
    documentCache.set(cacheKey, cached);
    return cached;
  }

  documentCacheMisses++;

  const trimmed = safeText.trim();
  const hasContent = trimmed.length > 0;

  // 1. Transform syntax (RTL table alignment while preserving code blocks)
  const rtlMarkdown = alignTables ? convertToRtlMarkdown(safeText) : safeText;

  // 2. Compute document analytics and reading estimates
  const baseStats = calculateDocumentStats(safeText);
  const estimatedReadTimeMinutes =
    baseStats.wordCount === 0 ? 0 : Math.max(1, Math.ceil(baseStats.wordCount / wpm));

  const stats: DocumentStats = {
    ...baseStats,
    estimatedReadTimeMinutes,
  };

  // 3. Extract primary document title if present
  const title = extractDocumentTitle(safeText);

  const result: ProcessedDocument = {
    raw: safeText,
    rtlMarkdown,
    stats,
    hasContent,
    title,
  };

  // Enforce bounded cache size
  if (documentCache.size >= DOCUMENT_CACHE_LIMIT) {
    const oldestKey = documentCache.keys().next().value;
    if (oldestKey !== undefined) {
      documentCache.delete(oldestKey);
    }
  }

  documentCache.set(cacheKey, result);
  return result;
}

/**
 * Prepares an export bundle for downloading or sharing a processed markdown document.
 * Pure in-process computation without browser DOM side-effects.
 *
 * @param {string} markdown - The markdown content to export.
 * @param {string} [customTitle] - Optional custom title to use in the filename.
 * @returns {ExportBundle} Immutable export package with content, sanitized filename, and MIME type.
 */
export function prepareExportBundle(
  markdown: string,
  customTitle?: string
): ExportBundle {
  const safeTitle = (customTitle || extractDocumentTitle(markdown) || 'rtl-document')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\u0600-\u06FF_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'rtl-document';

  return {
    content: markdown ?? '',
    filename: `${safeTitle}.md`,
    mimeType: 'text/markdown;charset=utf-8',
  };
}

/**
 * Extracts the primary heading from markdown source text, ignoring code blocks.
 *
 * @param {string} text - Raw markdown text.
 * @returns {string} Extracted heading title or empty string.
 */
function extractDocumentTitle(text: string): string {
  if (!text) return '';
  const lines = text.split('\n');
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (!inCode) {
      // ATX Level 1 heading: # Title
      const atxMatch = line.match(/^#\s+(.+)$/);
      if (atxMatch) {
        return atxMatch[1].trim();
      }

      // Setext Level 1 heading: Title on line i, ===... on line i+1
      if (i < lines.length - 1) {
        const nextLine = lines[i + 1];
        if (/^\s*={3,}\s*$/.test(nextLine) && line.trim().length > 0 && !/^\s*(```|~~~)/.test(line)) {
          return line.trim();
        }
      }
    }
  }

  return '';
}
