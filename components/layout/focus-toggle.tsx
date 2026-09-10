'use client';

/**
 * @file components/layout/focus-toggle.tsx
 * @description Glassmorphism focus mode button in header for toggling distraction-free writing state.
 */

import React from 'react';
import { m, useReducedMotion } from 'motion/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { SPRING_PRESS } from '@/lib/ease';

/**
 * Renders the Focus Mode toggle button in the application header.
 *
 * @returns {React.JSX.Element} The rendered FocusToggle component.
 */
export function FocusToggle(): React.JSX.Element {
  const { isFocusMode, toggleFocusMode, t, theme } = useMarkdownContext();
  const isDark = theme === 'dark';
  const reduceMotion = useReducedMotion();

  return (
    <div id="header-focus-container" className="flex items-center">
      <m.button
        id="header-focus-toggle"
        type="button"
        onClick={toggleFocusMode}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={SPRING_PRESS}
        title={isFocusMode ? t.dock.exitFocusMode : t.dock.focusMode}
        aria-label={isFocusMode ? t.dock.exitFocusMode : t.dock.focusMode}
        aria-pressed={isFocusMode}
        className={`group relative flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-0 px-2.5 sm:px-3 rounded-full border text-xs font-medium tracking-wide transition-colors duration-150 cursor-pointer select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
          isDark
            ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white focus-visible:ring-offset-zinc-950'
            : 'bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 focus-visible:ring-offset-white'
        }`}
      >
        {isFocusMode ? (
          <Minimize2
            className={`w-3.5 h-3.5 transition-colors shrink-0 ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}
          />
        ) : (
          <Maximize2
            className={`w-3.5 h-3.5 transition-colors shrink-0 ${
              isDark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-700'
            }`}
          />
        )}

        <span className="hidden sm:inline leading-none font-medium">
          {isFocusMode ? t.dock.exitFocusMode : t.dock.focusMode}
        </span>
      </m.button>
    </div>
  );
}
