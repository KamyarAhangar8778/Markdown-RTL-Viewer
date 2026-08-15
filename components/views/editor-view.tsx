'use client';

/**
 * @file components/views/editor-view.tsx
 * @description Raw Markdown input editor component with integrated live metrics.
 */

import React from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { FileText, WrapText, WholeWord, CaseSensitive } from 'lucide-react';

/**
 * Raw Markdown Editor View containing integrated metric pills and text area.
 *
 * @returns {React.JSX.Element} The rendered EditorView component.
 */
export const EditorView: React.FC = () => {
  const { rawMarkdown, setRawMarkdown, stats, language, t, theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  const locale = language === 'fa' ? 'fa-IR' : 'en-US';

  return (
    <div
      id="editor-view-container"
      className={`flex flex-col h-full glass-panel rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-200 ${
        isDark ? 'border-zinc-800 bg-black/90' : 'border-zinc-200/90 bg-white/95 shadow-zinc-200/60'
      }`}
    >
      {/* Editor Header with Integrated Stats */}
      <div
        id="editor-toolbar-header"
        className={`flex flex-wrap items-center justify-between px-4 py-2.5 border-b text-xs gap-2 transition-colors ${
          isDark ? 'bg-zinc-950/90 border-zinc-800' : 'bg-zinc-100/90 border-zinc-200 text-zinc-800'
        }`}
      >
        <div className={`flex items-center gap-2 font-semibold flex-wrap ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
          <div className={`p-1.5 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700 shadow-xs'}`}>
            <FileText className="w-4 h-4" />
          </div>
          <span>{t.editor.title}</span>

          {/* Integrated Document Metrics */}
          <div className="flex items-center gap-1.5 mr-1.5 flex-wrap">
            <span
              id="editor-stat-lines"
              className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                isDark ? 'bg-zinc-900 text-zinc-300 border-zinc-800/80' : 'bg-white text-zinc-700 border-zinc-300 shadow-xs'
              }`}
              title={t.editor.lines}
            >
              <WrapText className={`w-3 h-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
              <span className={`font-normal ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.editor.lines}</span>
              <strong className={`font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{stats.lineCount.toLocaleString(locale)}</strong>
            </span>

            <span
              id="editor-stat-words"
              className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                isDark ? 'bg-zinc-900 text-zinc-300 border-zinc-800/80' : 'bg-white text-zinc-700 border-zinc-300 shadow-xs'
              }`}
              title={t.editor.words}
            >
              <WholeWord className={`w-3 h-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
              <span className={`font-normal ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.editor.words}</span>
              <strong className={`font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{stats.wordCount.toLocaleString(locale)}</strong>
            </span>

            <span
              id="editor-stat-chars"
              className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                isDark ? 'bg-zinc-900 text-zinc-300 border-zinc-800/80' : 'bg-white text-zinc-700 border-zinc-300 shadow-xs'
              }`}
              title={t.editor.chars}
            >
              <CaseSensitive className={`w-3 h-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
              <span className={`font-normal ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.editor.chars}</span>
              <strong className={`font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{stats.characterCount.toLocaleString(locale)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className={`relative flex-1 p-3 transition-colors ${isDark ? 'bg-black' : 'bg-zinc-50/50'}`}>
        <textarea
          id="editor-markdown-textarea"
          value={rawMarkdown}
          onChange={(e) => setRawMarkdown(e.target.value)}
          placeholder={t.editor.placeholder}
          dir={language === 'fa' ? 'rtl' : 'ltr'}
          className={`w-full h-[480px] sm:h-[540px] p-4 text-sm leading-relaxed focus:outline-none resize-none glass-input rounded-xl border shadow-inner transition-colors ${
            isDark
              ? 'bg-zinc-950/80 text-zinc-100 border-zinc-800 placeholder:text-zinc-600'
              : 'bg-white text-zinc-900 border-zinc-300 placeholder:text-zinc-400'
          } ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}
        />
      </div>
    </div>
  );
};
