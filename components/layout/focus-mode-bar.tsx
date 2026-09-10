'use client';

/**
 * @file components/layout/focus-mode-bar.tsx
 * @description Unobtrusive corner floating controller for exiting Focus Mode.
 */

import React, { useEffect } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { Minimize2 } from 'lucide-react';
import { DURATION, EASE_OUT, SPRING_PRESS } from '@/lib/ease';

/**
 * Unobtrusive corner pill presented during Focus Mode with keyboard Esc listener and exit button.
 *
 * @returns {React.JSX.Element} The rendered FocusModeBar component.
 */
export function FocusModeBar(): React.JSX.Element {
  const { toggleFocusMode, t, theme } = useMarkdownContext();
  const isDark = theme === 'dark';
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleFocusMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFocusMode]);

  return (
    <m.div
      id="focus-mode-floating-chip"
      initial={{ opacity: 0, scale: 0.85, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -8 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT }}
      className="fixed top-4 ltr:right-4 ltr:sm:right-6 rtl:left-4 rtl:sm:left-6 z-50 pointer-events-auto"
    >
      <m.button
        type="button"
        id="focus-mode-exit-btn"
        onClick={toggleFocusMode}
        whileTap={reduceMotion ? undefined : { scale: 0.92 }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        transition={SPRING_PRESS}
        title={`${t.focusMode.exitButton} (${t.focusMode.escHint})`}
        aria-label={t.focusMode.exitButton}
        className={`group relative flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-full backdrop-blur-xl border shadow-xl transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
          isDark
            ? 'bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-700 shadow-black/80 focus-visible:ring-offset-zinc-950'
            : 'bg-white/90 hover:bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-300 shadow-zinc-300/60 focus-visible:ring-offset-white'
        }`}
      >
        <Minimize2 className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
      </m.button>
    </m.div>
  );
}
