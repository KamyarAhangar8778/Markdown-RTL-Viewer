/**
 * @file utils/syntaxHighlighter.ts
 * @description Safe syntax highlighting utility using highlight.js with language normalization.
 */

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import ruby from 'highlight.js/lib/languages/ruby';
import java from 'highlight.js/lib/languages/java';
import php from 'highlight.js/lib/languages/php';
import c from 'highlight.js/lib/languages/c';
import diff from 'highlight.js/lib/languages/diff';
import ini from 'highlight.js/lib/languages/ini';
import scss from 'highlight.js/lib/languages/scss';
import graphql from 'highlight.js/lib/languages/graphql';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import kotlin from 'highlight.js/lib/languages/kotlin';
import swift from 'highlight.js/lib/languages/swift';
import dart from 'highlight.js/lib/languages/dart';
import powershell from 'highlight.js/lib/languages/powershell';
import makefile from 'highlight.js/lib/languages/makefile';
import { segmentHtmlByLanguage } from '@/utils/typographySegmenter';

// Register core and popular languages on startup
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('java', java);
hljs.registerLanguage('php', php);
hljs.registerLanguage('c', c);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('graphql', graphql);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('dart', dart);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('makefile', makefile);

/**
 * Normalizes common language aliases to highlight.js supported identifiers.
 *
 * @param {string} [lang] - Raw language name or extension.
 * @returns {string} Normalized language identifier supported by highlight.js.
 */
export function normalizeLanguage(lang?: string): string {
  if (!lang) return '';
  const clean = lang.trim().toLowerCase();
  
  const aliasMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    jsx: 'javascript',
    py: 'python',
    python3: 'python',
    py3: 'python',
    sh: 'bash',
    shell: 'bash',
    zsh: 'bash',
    bash: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
    md: 'markdown',
    markdown: 'markdown',
    rb: 'ruby',
    ruby: 'ruby',
    cs: 'csharp',
    csharp: 'csharp',
    'c#': 'csharp',
    'c++': 'cpp',
    cpp: 'cpp',
    c: 'c',
    golang: 'go',
    go: 'go',
    rs: 'rust',
    rust: 'rust',
    htm: 'xml',
    html: 'xml',
    xhtml: 'xml',
    svg: 'xml',
    xml: 'xml',
    json: 'json',
    css: 'css',
    scss: 'scss',
    sass: 'scss',
    diff: 'diff',
    docker: 'dockerfile',
    dockerfile: 'dockerfile',
    ini: 'ini',
    graphql: 'graphql',
    gql: 'graphql',
    kt: 'kotlin',
    kotlin: 'kotlin',
    swift: 'swift',
    dart: 'dart',
    sql: 'sql',
    ps1: 'powershell',
    pwsh: 'powershell',
    powershell: 'powershell',
    make: 'makefile',
    makefile: 'makefile',
    txt: 'text',
    plain: 'text',
    plaintext: 'text',
    none: 'text',
    raw: 'text',
    text: 'text',
    auto: 'auto',
  };

  return aliasMap[clean] || clean;
}

/** Maximum number of highlighted code snippets retained in memory */
const HIGHLIGHT_CACHE_LIMIT = 200;

interface HighlightResult {
  readonly html: string;
  readonly language: string;
}

/** Internal bounded LRU cache for syntax highlight computations */
const highlightCache = new Map<string, HighlightResult>();
let cacheHits = 0;
let cacheMisses = 0;

/**
 * Resets the syntax highlighter LRU cache and tracking metrics.
 */
export function clearHighlightCache(): void {
  highlightCache.clear();
  cacheHits = 0;
  cacheMisses = 0;
}

/**
 * Retrieves performance metrics for the syntax highlighter LRU cache.
 *
 * @returns {{ size: number; hits: number; misses: number }} Cache performance snapshot.
 */
export function getHighlightCacheStats(): { size: number; hits: number; misses: number } {
  return {
    size: highlightCache.size,
    hits: cacheHits,
    misses: cacheMisses,
  };
}

/**
 * Highlights a string of source code using highlight.js with LRU caching.
 *
 * @param {string} code - The raw source code string to highlight.
 * @param {string} [language] - Target programming language.
 * @returns {HighlightResult} Highlighted HTML markup and resolved language.
 */
export function highlightCode(code: string, language?: string): HighlightResult {
  const normLang = normalizeLanguage(language);
  const cacheKey = `${normLang}::${code}`;

  // Check LRU cache
  if (highlightCache.has(cacheKey)) {
    cacheHits++;
    const cached = highlightCache.get(cacheKey)!;
    // Re-insert to refresh recency in LRU
    highlightCache.delete(cacheKey);
    highlightCache.set(cacheKey, cached);
    return cached;
  }

  cacheMisses++;
  let result: HighlightResult | null = null;

  // Plain text or unlabelled blocks: guarantee zero false-positive syntax guessing
  if (!normLang || normLang === 'text') {
    result = {
      html: escapeHtml(code),
      language: 'text',
    };
  } else if (hljs.getLanguage(normLang)) {
    try {
      const hlResult = hljs.highlight(code, {
        language: normLang,
        ignoreIllegals: true,
      });
      result = { html: hlResult.value, language: normLang };
    } catch {
      // Fallback to plain text on highlight error
      result = { html: escapeHtml(code), language: normLang };
    }
  } else if (normLang === 'auto') {
    // Only attempt auto-detection when explicitly requested via "auto"
    try {
      const autoResult = hljs.highlightAuto(code);
      if (autoResult.language && (autoResult.relevance ?? 0) >= 4 && autoResult.value) {
        result = { html: autoResult.value, language: autoResult.language };
      }
    } catch {
      // Fallback on auto-detection error
    }
  }

  // Safe fallback for unknown languages or low-confidence auto-detection
  if (!result) {
    result = {
      html: escapeHtml(code),
      language: normLang || 'text',
    };
  }

  // Apply character-level font segmentation to HTML tokens
  const segmentedResult: HighlightResult = {
    html: segmentHtmlByLanguage(result.html),
    language: result.language,
  };

  // Enforce bounded cache size
  if (highlightCache.size >= HIGHLIGHT_CACHE_LIMIT) {
    const oldestKey = highlightCache.keys().next().value;
    if (oldestKey !== undefined) {
      highlightCache.delete(oldestKey);
    }
  }

  highlightCache.set(cacheKey, segmentedResult);
  return segmentedResult;
}

/**
 * Escapes special HTML characters to prevent XSS.
 *
 * @param {string} text - Raw string.
 * @returns {string} HTML-escaped string.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
