'use client';

/**
 * @file components/views/preview-view.tsx
 * @description Rendered RTL Markdown preview component utilizing react-markdown and remark-gfm.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeBidi } from '@/utils/rehypeBidi';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { Eye } from 'lucide-react';

export const PreviewView: React.FC = () => {
  const { rtlMarkdown, t, language, theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <div
      id="preview-view-container"
      className={`flex flex-col h-full glass-panel rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-200 ${
        isDark ? 'border-zinc-800 bg-black/90' : 'border-zinc-200/90 bg-white/95 shadow-zinc-200/60'
      }`}
    >
      {/* Preview Header */}
      <div
        id="preview-toolbar-header"
        className={`flex items-center justify-between px-4 py-3 border-b text-xs transition-colors ${
          isDark ? 'bg-zinc-950/90 border-zinc-800 text-zinc-200' : 'bg-zinc-100/90 border-zinc-200 text-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          <div className={`p-1.5 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700 shadow-xs'}`}>
            <Eye className="w-4 h-4" />
          </div>
          <span>{t.preview.title}</span>
        </div>
      </div>

      {/* Preview Content Area */}
      <div className={`flex-1 p-6 overflow-y-auto h-[480px] sm:h-[540px] transition-colors ${isDark ? 'bg-black' : 'bg-white/80'}`} dir="rtl">
        {rtlMarkdown.trim() ? (
          <div className="markdown-rtl-content text-right" dir="rtl">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeBidi]}>
              {rtlMarkdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div className={`h-full flex flex-col items-center justify-center text-center p-8 select-none ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <div className={`p-3 rounded-2xl border mb-3 ${isDark ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-zinc-100 border-zinc-200'}`}>
              <Eye className={`w-8 h-8 opacity-60 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            </div>
            <p className={`text-sm font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-700'} ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}>
              {t.preview.emptyTitle}
            </p>
            <p className={`text-xs mt-1 max-w-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {t.preview.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
