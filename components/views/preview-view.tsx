'use client';

/**
 * @file components/views/preview-view.tsx
 * @description Rendered RTL Markdown preview component utilizing react-markdown and remark-gfm.
 */

import React from 'react';
import { m, useReducedMotion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { CodeBlock, PreContext } from '@/components/ui/code-block';
import {
  MarkdownTable,
  MarkdownTableHead,
  MarkdownTableBody,
  MarkdownTableRow,
  MarkdownTableHeaderCell,
  MarkdownTableCell,
} from '@/components/ui/markdown-table';
import { Eye, FileCode } from 'lucide-react';
import { SPRING_PRESS } from '@/lib/ease';
import { AsciiLineLoader } from '@/components/motion/loader';

interface PreviewEmptyStateProps {
  isDark: boolean;
  isFa: boolean;
  t: { preview: { emptyTitle: string; emptyDescription: string } };
  loadSample: () => void;
  reduceMotion: boolean | null;
}

function PreviewEmptyState({
  isDark,
  isFa,
  t,
  loadSample,
  reduceMotion,
}: PreviewEmptyStateProps): React.JSX.Element {
  const buttonClass = `mt-4 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
    isDark
      ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700/80 shadow-md hover:border-zinc-600 focus-visible:ring-offset-zinc-950'
      : 'bg-white hover:bg-zinc-50 text-zinc-900 border-zinc-300 shadow-xs hover:border-zinc-400 focus-visible:ring-offset-white'
  } ${isFa ? 'font-vazir' : 'font-sans'}`;

  return (
    <div className={`h-full flex flex-col items-center justify-center text-center p-8 select-none ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
      <m.div
        animate={reduceMotion ? undefined : { y: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`p-3.5 rounded-2xl border mb-3 ${isDark ? 'bg-zinc-900/60 border-zinc-800/80 shadow-lg shadow-black/40' : 'bg-zinc-100 border-zinc-200 shadow-sm'}`}
      >
        <Eye className={`w-8 h-8 opacity-70 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`} />
      </m.div>
      <p className={`text-sm font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-800'} ${isFa ? 'font-vazir' : 'font-sans'}`}>
        {t.preview.emptyTitle}
      </p>
      <p className={`text-xs mt-1 max-w-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {t.preview.emptyDescription}
      </p>
      <m.button
        id="preview-load-sample-btn"
        onClick={loadSample}
        type="button"
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={SPRING_PRESS}
        aria-label={isFa ? 'بارگذاری نمونه مارک‌داون' : 'Load Sample Markdown'}
        className={buttonClass}
      >
        <FileCode className="w-4 h-4 text-emerald-500" />
        <span>{isFa ? 'بارگذاری نمونه مارک‌داون' : 'Load Sample Markdown'}</span>
      </m.button>
    </div>
  );
}

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeRaw];

const markdownComponents = {
  code: CodeBlock,
  pre: ({ children }: { children?: React.ReactNode }) => (
    <PreContext.Provider value={true}>
      {children}
    </PreContext.Provider>
  ),
  p: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
  h1: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3>{children}</h3>,
  h4: ({ children }: { children?: React.ReactNode }) => <h4>{children}</h4>,
  h5: ({ children }: { children?: React.ReactNode }) => <h5>{children}</h5>,
  h6: ({ children }: { children?: React.ReactNode }) => <h6>{children}</h6>,
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote>{children}</blockquote>,
  kbd: ({ children }: { children?: React.ReactNode }) => (
    <kbd className="px-1.5 py-0.5 text-xs font-mono rounded-md border inline-block align-middle mx-1 font-semibold transition-colors shadow-xs">
      {children}
    </kbd>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props} className="text-emerald-400 underline hover:text-emerald-300 transition-colors">
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
  em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
  del: ({ children }: { children?: React.ReactNode }) => <del className="line-through opacity-70">{children}</del>,
  hr: () => <hr className="my-6 border-t border-zinc-700/60 dark:border-zinc-800" />,
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      {...props}
      className="rounded-xl border border-zinc-700/40 my-4 max-w-full h-auto shadow-md"
      loading="lazy"
    />
  ),
  input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="cursor-pointer align-middle" />
  ),
  table: MarkdownTable,
  thead: MarkdownTableHead,
  tbody: MarkdownTableBody,
  tr: MarkdownTableRow,
  th: MarkdownTableHeaderCell,
  td: MarkdownTableCell,
};

const MemoizedMarkdown = React.memo(function MemoizedMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={className} dir="rtl">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
MemoizedMarkdown.displayName = 'MemoizedMarkdown';

export const PreviewView = React.memo(function PreviewView(): React.JSX.Element {
  const {
    rtlMarkdown,
    t,
    language,
    theme,
    loadSample,
    isProcessing,
    isFocusMode,
    viewMode,
    setPreviewElement,
  } = useMarkdownContext();
  const isDark = theme === 'dark';
  const reduceMotion = useReducedMotion();

  const isPreviewOnly = viewMode === 'preview';

  return (
    <div
      id="preview-view-container"
      className={`flex flex-col ${
        isPreviewOnly ? 'h-auto min-h-[600px] max-w-[1120px] mx-auto w-full' : 'h-full w-full'
      } glass-panel rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-200 ${
        isDark ? 'border-zinc-800 bg-black/90' : 'border-zinc-200/90 bg-white/95 shadow-zinc-200/60'
      }`}
    >
      {/* Preview Header */}
      <div
        id="preview-toolbar-header"
        className={`flex items-center justify-between px-4 py-2.5 min-h-[45px] border-b text-xs transition-colors ${
          isDark ? 'bg-zinc-950/90 border-zinc-800 text-zinc-200' : 'bg-zinc-100/90 border-zinc-200 text-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          <div className={`p-1.5 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700 shadow-xs'}`}>
            <Eye className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-semibold">{t.preview.title}</h2>
        </div>

        {isProcessing && (
          <div
            id="preview-ascii-line-loader"
            className="text-xs font-mono select-none opacity-60"
          >
            <AsciiLineLoader size={14} />
          </div>
        )}
      </div>

      {/* Preview Content Container */}
      <div className={`relative flex-1 p-2 pb-2.5 transition-colors ${isDark ? 'bg-black' : 'bg-zinc-50/50'}`}>
        <div
          id="preview-markdown-content"
          ref={setPreviewElement}
          data-lenis-prevent={isPreviewOnly ? undefined : 'true'}
          className={`relative w-full rounded-xl ${
            isPreviewOnly
              ? 'px-4 sm:px-8 md:px-10 pt-4 sm:pt-6 pb-12 sm:pb-16'
              : 'px-3 sm:px-4 md:px-4.5 pt-2 sm:pt-2.5 pb-12 sm:pb-16'
          } transition-all duration-300 glass-input border shadow-inner ${
            isDark
              ? 'text-zinc-100 border-zinc-800 bg-black/40'
              : 'text-zinc-900 border-zinc-300 bg-white/80'
          } ${
            isPreviewOnly
              ? 'h-auto min-h-[580px] overflow-visible'
              : isFocusMode
              ? 'h-[calc(100vh-110px)] min-h-[480px] overflow-y-auto overscroll-contain editor-scrollbar'
              : 'h-[calc(100vh-195px)] min-h-[480px] max-h-[820px] overflow-y-auto overscroll-contain editor-scrollbar'
          }`}
          dir="rtl"
        >
          {rtlMarkdown.trim() ? (
            <MemoizedMarkdown
              content={rtlMarkdown}
              className={`markdown-rtl-content text-right ${isPreviewOnly ? 'max-w-[960px] mx-auto' : ''}`}
            />
          ) : (
            <PreviewEmptyState
              isDark={isDark}
              isFa={language === 'fa'}
              t={t}
              loadSample={loadSample}
              reduceMotion={reduceMotion}
            />
          )}
        </div>
      </div>
    </div>
  );
});

PreviewView.displayName = 'PreviewView';
