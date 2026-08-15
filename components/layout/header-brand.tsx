'use client';

/**
 * @file components/layout/header-brand.tsx
 * @description Studio brand identity component featuring an illuminated emblem, animated title, and status pill.
 */

import React from 'react';
import { Terminal } from 'lucide-react';
import { ThinkingOrb } from 'thinking-orbs';
import { useDecodeText } from '@/hooks/useDecodeText';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Renders the header brand emblem, decoded typography, and engine status badge.
 *
 * @returns {React.JSX.Element} The rendered brand component.
 */
export const HeaderBrand: React.FC = () => {
  const { t, theme } = useMarkdownContext();
  const animatedTitle = useDecodeText(t.header.brandTitle);
  const isDark = theme === 'dark';

  return (
    <div id="header-brand-container" className="flex items-center gap-3 select-none">
      {/* Illuminated Thinking Orb */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-default shrink-0">
        <div className="scale-[0.58] sm:scale-[0.62] origin-center flex items-center justify-center">
          <ThinkingOrb state="shaping" size={64} speed={0.75} />
        </div>
      </div>

      {/* Brand Title & Engine Status */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h1
            id="header-brand-title"
            className={`font-bold text-sm sm:text-base tracking-tight leading-none transition-colors ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            {animatedTitle}
          </h1>
          <span
            id="header-engine-pill"
            className={`hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
              isDark
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300/80'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t.header.engineStatus}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[11px] font-medium transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.header.brandSubtitle}
          </span>
          <span className={`hidden sm:inline-block text-[10px] ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>•</span>
          <span
            className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-mono ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}
            dir="ltr"
          >
            <Terminal className={`w-3 h-3 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`} />
            {t.header.gfmNative}
          </span>
        </div>
      </div>
    </div>
  );
};

