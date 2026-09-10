'use client';

/**
 * @file components/ui/code-block.tsx
 * @description LTR isolated code block with syntax highlighting and copy functionality.
 */

import React, { useCallback, useMemo, useContext } from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { highlightCode, normalizeLanguage } from '@/utils/syntaxHighlighter';
import { hasPersianText } from '@/utils/persianizer';
import { CodeBlockHeader } from '@/components/ui/code-block-header';
import { useClipboard } from '@/hooks/useClipboard';
import { CLIPBOARD_RESET_DURATION_MS } from '@/constants/domain';
import { renderHybridChildren } from '@/utils/typographySegmenter';

/** Context to communicate between parent <pre> and child <code> */
export const PreContext = React.createContext<boolean>(false);

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/** Hybrid code font stack guaranteeing JetBrains Mono for Latin & Vazirmatn for Persian characters */
const HYBRID_CODE_FONT =
  "'JetBrains Mono', 'Vazirmatn', var(--font-vazir-local), monospace";

/**
 * Code Block Component with full syntax highlighting support for markdown previews.
 *
 * @param {CodeBlockProps} props - Code component properties.
 * @returns {React.JSX.Element} Rendered syntax-highlighted code block or inline code pill.
 */
export const CodeBlock = React.memo(function CodeBlock({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps): React.JSX.Element {
  const { theme, language, showToast } = useMarkdownContext();
  const isDark = theme === 'dark';
  const { copied, copyToClipboard } = useClipboard(CLIPBOARD_RESET_DURATION_MS);
  const isInsidePre = useContext(PreContext);

  const match = /language-([a-zA-Z0-9_+#.-]+)/.exec(className || '');
  const specifiedLang = match ? match[1] : '';
  const normalizedLang = normalizeLanguage(specifiedLang);
  const isPlainText = !specifiedLang || normalizedLang === 'text';

  const rawCode = useMemo(() => {
    return String(children ?? '').replace(/\n$/, '');
  }, [children]);

  const containsPersian = useMemo(() => {
    return hasPersianText(rawCode);
  }, [rawCode]);

  const isMultiLine = rawCode.includes('\n');
  const isInlineCode = inline ?? (!isInsidePre && !match && !isMultiLine);

  const highlighted = useMemo(() => {
    if (isInlineCode || !rawCode) {
      return { html: '', language: specifiedLang || 'text' };
    }
    return highlightCode(rawCode, specifiedLang);
  }, [rawCode, specifiedLang, isInlineCode]);

  const handleCopy = useCallback(() => {
    if (!rawCode) return;
    copyToClipboard(rawCode);
    showToast(language === 'fa' ? 'کد در کلیپ‌بورد کپی شد' : 'Code copied to clipboard', 'success');
  }, [rawCode, copyToClipboard, showToast, language]);

  const blockDir = containsPersian && isPlainText ? 'rtl' : 'ltr';

  if (isInlineCode) {
    const inlineClass = `text-[0.875em] px-1.5 py-0.5 rounded-md border font-normal transition-colors inline align-baseline ${
      isDark
        ? 'bg-zinc-800/90 text-emerald-400 border-zinc-700/70'
        : 'bg-zinc-100 text-emerald-700 border-zinc-300'
    } ${className || ''}`.trim();

    return (
      <code
        className={inlineClass}
        dir="auto"
        style={{
          fontFamily: HYBRID_CODE_FONT,
          unicodeBidi: 'isolate',
          ...props.style,
        }}
        {...props}
      >
        {renderHybridChildren(children, containsPersian ? 'persian' : 'latin')}
      </code>
    );
  }

  return (
    <div
      className={`my-4 rounded-xl border overflow-hidden transition-colors shadow-lg ${
        isDark
          ? 'bg-zinc-950/95 border-zinc-800/90 shadow-black/40'
          : 'bg-white border-zinc-200/90 shadow-zinc-200/50'
      }`}
      dir="ltr"
    >
      <CodeBlockHeader
        languageName={highlighted.language || specifiedLang || 'text'}
        isDark={isDark}
        isPersian={language === 'fa'}
        copied={copied}
        onCopy={handleCopy}
      />

      {/* Highlighted Code Container */}
      <pre
        className={`p-4 overflow-x-auto text-[13px] leading-relaxed !rounded-none !border-0 !m-0 !shadow-none ${
          blockDir === 'rtl' ? 'text-right' : 'text-left'
        } ${
          isDark
            ? '!bg-[#0b0c0e] !text-zinc-100'
            : '!bg-[#f8fafc] !text-zinc-900'
        }`}
        dir={blockDir}
        style={{ fontFamily: HYBRID_CODE_FONT }}
      >
        <code
          className={`hljs !bg-transparent !border-none !p-0 block select-text ${
            isDark ? '!text-zinc-100' : '!text-zinc-900'
          }`}
          style={{ fontFamily: HYBRID_CODE_FONT }}
          dangerouslySetInnerHTML={{ __html: highlighted.html }}
        />
      </pre>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';
