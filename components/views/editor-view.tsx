'use client';

/**
 * @file components/views/editor-view.tsx
 * @description Raw Markdown input editor component with integrated live metrics and non-blocking line highlight.
 */

import React, { useState, useCallback, useRef } from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { useActiveLinePosition } from '@/hooks/useActiveLinePosition';
import { FileText, Link2, Unlink } from 'lucide-react';
import { EditorStatsBadges } from './editor-stats-badges';
import { EditorActiveLine } from './editor-active-line';

/**
 * Raw Markdown Editor View containing integrated metric pills and interactive text area.
 * Memoized with React.memo to eliminate redundant render passes during global state updates.
 *
 * @returns {React.JSX.Element} The rendered EditorView component.
 */
export const EditorView = React.memo(function EditorView(): React.JSX.Element {
  const {
    rawMarkdown,
    setRawMarkdown,
    stats,
    language,
    t,
    theme,
    isFocusMode,
    viewMode,
    isSyncScroll,
    toggleSyncScroll,
    setEditorElement,
  } = useMarkdownContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { activeLine, recalculateLine } = useActiveLinePosition(textareaRef);

  const isDark = theme === 'dark';
  const locale = language === 'fa' ? 'fa-IR' : 'en-US';

  const handleCursorUpdate = useCallback(() => {
    recalculateLine();
  }, [recalculateLine]);

  const handleTextareaRef = useCallback(
    (el: HTMLTextAreaElement | null) => {
      textareaRef.current = el;
      setEditorElement(el);
    },
    [setEditorElement]
  );

  return (
    <div
      id="editor-view-container"
      className={`flex flex-col h-full glass-panel rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-200 ${
        isDark ? 'border-zinc-800 bg-black/90' : 'border-zinc-200/90 bg-white/95 shadow-zinc-200/60'
      }`}
    >
      {/* Editor Header with Integrated Stats & SyncScroll Toggle */}
      <div
        id="editor-toolbar-header"
        className={`flex flex-wrap items-center justify-between px-4 py-2.5 min-h-[45px] border-b text-xs gap-2 transition-colors ${
          isDark ? 'bg-zinc-950/90 border-zinc-800' : 'bg-zinc-100/90 border-zinc-200 text-zinc-800'
        }`}
      >
        <div className={`flex items-center gap-2 font-semibold flex-wrap ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
          <div className={`p-1.5 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700 shadow-xs'}`}>
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-semibold">{t.editor.title}</h2>

          <EditorStatsBadges stats={stats} isDark={isDark} locale={locale} t={t} />
        </div>

        {/* SyncScroll Switcher in Split View */}
        {viewMode === 'split' && (
          <button
            id="sync-scroll-toggle-btn"
            type="button"
            onClick={toggleSyncScroll}
            title={isSyncScroll ? t.editor.syncScrollEnabled : t.editor.syncScrollDisabled}
            aria-label={t.editor.syncScroll}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
              isSyncScroll
                ? isDark
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/60 shadow-xs'
                  : 'bg-emerald-50 border-emerald-300/80 text-emerald-700 hover:bg-emerald-100 shadow-xs'
                : isDark
                ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                : 'bg-zinc-100 border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
            }`}
          >
            {isSyncScroll ? (
              <Link2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <Unlink className="w-3.5 h-3.5 opacity-60 shrink-0" />
            )}
            <span>{t.editor.syncScroll}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSyncScroll ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'
              }`}
            />
          </button>
        )}
      </div>

      {/* Editor Textarea Container */}
      <div className={`relative flex-1 p-2 pb-2.5 transition-colors ${isDark ? 'bg-black' : 'bg-zinc-50/50'}`}>
        <div
          data-lenis-prevent="true"
          className={`relative w-full rounded-xl overflow-hidden transition-all duration-300 ${
            isFocusMode
              ? 'h-[calc(100vh-110px)] min-h-[480px]'
              : 'h-[calc(100vh-195px)] min-h-[480px] max-h-[820px]'
          }`}
        >
          <EditorActiveLine
            isVisible={isFocused && activeLine.isVisible}
            isDark={isDark}
            top={activeLine.top}
            height={activeLine.height}
          />

          <textarea
            id="editor-markdown-textarea"
            ref={handleTextareaRef}
            value={rawMarkdown}
            aria-label={t.editor.title}
            aria-multiline="true"
            data-lenis-prevent="true"
            onChange={(e) => {
              setRawMarkdown(e.target.value);
              handleCursorUpdate();
            }}
            onSelect={handleCursorUpdate}
            onKeyUp={handleCursorUpdate}
            onClick={handleCursorUpdate}
            onScroll={handleCursorUpdate}
            onWheel={(e) => {
              // Ensure mouse wheel scrolling smoothly advances textarea content without bubbling
              e.stopPropagation();
            }}
            onFocus={() => {
              setIsFocused(true);
              handleCursorUpdate();
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={t.editor.placeholder}
            dir={language === 'fa' ? 'rtl' : 'ltr'}
            className={`relative z-10 w-full h-full p-3.5 sm:p-4 pb-12 sm:pb-16 text-sm leading-relaxed overflow-y-auto overscroll-contain editor-scrollbar focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 resize-none glass-input rounded-xl border shadow-inner transition-all bg-transparent ${
              isDark
                ? 'text-zinc-100 border-zinc-800 placeholder:text-zinc-600 focus-visible:ring-offset-zinc-950'
                : 'text-zinc-900 border-zinc-300 placeholder:text-zinc-500 focus-visible:ring-offset-white'
            } ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}
          />
        </div>
      </div>
    </div>
  );
});

EditorView.displayName = 'EditorView';
