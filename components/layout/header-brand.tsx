'use client';

/**
 * @file components/layout/header-brand.tsx
 * @description Studio brand identity component featuring an illuminated emblem and animated title.
 */

import React from 'react';
import { ThinkingOrb } from 'thinking-orbs';
import { useDecodeText } from '@/hooks/useDecodeText';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Renders the header brand emblem and decoded typography.
 *
 * @returns {React.JSX.Element} The rendered brand component.
 */
export function HeaderBrand(): React.JSX.Element {
  const { t, theme } = useMarkdownContext();
  const animatedTitle = useDecodeText(t.header.brandTitle);
  const isDark = theme === 'dark';

  return (
    <div id="header-brand-container" className="flex items-center gap-2.5 sm:gap-3 select-none">
      {/* Illuminated Thinking Orb */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0" aria-hidden="true">
        <div className="scale-[0.50] sm:scale-[0.56] origin-center flex items-center justify-center">
          <ThinkingOrb state="solving" size={64} speed={0.50} />
        </div>
      </div>

      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <h1
              id="header-brand-title"
              className={`font-bold text-xs sm:text-sm tracking-tight leading-none transition-colors ${
                isDark ? 'text-zinc-100' : 'text-zinc-900'
              }`}
            >
              {animatedTitle}
            </h1>
          </div>
          <p className={`hidden md:block text-[10px] font-medium mt-0.5 transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.header.brandSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

