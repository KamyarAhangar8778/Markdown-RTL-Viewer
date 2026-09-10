'use client';

/**
 * @file components/views/editor-stats-badges.tsx
 * @description Statistical metric badges component rendered inside the editor toolbar header.
 */

import React from 'react';
import { WrapText, CaseSensitive, Type } from 'lucide-react';

export interface EditorStatsBadgesProps {
  stats: { lineCount: number; wordCount: number; characterCount: number };
  isDark: boolean;
  locale: string;
  t: { editor: { lines: string; words: string; chars: string } };
}

/**
 * Statistical metric badges showing line count, word count, and character count in the editor.
 *
 * @param {EditorStatsBadgesProps} props - Component properties.
 * @returns {React.JSX.Element} Rendered stat badges.
 */
export const EditorStatsBadges: React.FC<EditorStatsBadgesProps> = React.memo(({
  stats,
  isDark,
  locale,
  t,
}) => {
  const badgeClass = `text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${
    isDark
      ? 'bg-zinc-900 text-zinc-300 border-zinc-800/80'
      : 'bg-white text-zinc-700 border-zinc-300 shadow-xs'
  }`;
  const iconClass = `w-3 h-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`;
  const labelClass = `font-normal ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`;
  const valueClass = `font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`;

  return (
    <div className="flex items-center gap-1.5 mr-1.5 flex-wrap">
      <span id="editor-stat-lines" className={badgeClass} title={t.editor.lines}>
        <WrapText className={iconClass} />
        <span className={labelClass}>{t.editor.lines}</span>
        <strong className={valueClass}>{stats.lineCount.toLocaleString(locale)}</strong>
      </span>

      <span id="editor-stat-words" className={badgeClass} title={t.editor.words}>
        <CaseSensitive className={iconClass} />
        <span className={labelClass}>{t.editor.words}</span>
        <strong className={valueClass}>{stats.wordCount.toLocaleString(locale)}</strong>
      </span>

      <span id="editor-stat-chars" className={badgeClass} title={t.editor.chars}>
        <Type className={iconClass} />
        <span className={labelClass}>{t.editor.chars}</span>
        <strong className={valueClass}>{stats.characterCount.toLocaleString(locale)}</strong>
      </span>
    </div>
  );
});

EditorStatsBadges.displayName = 'EditorStatsBadges';
