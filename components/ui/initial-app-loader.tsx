'use client';

/**
 * @file components/ui/initial-app-loader.tsx
 * @description Pure, minimal full-screen preloader featuring the raw ASCII Line spinner (| / - \).
 */

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { AsciiLineLoader } from '@/components/motion/loader';
import { EASE_OUT } from '@/lib/ease';

/**
 * Clean initial application loader using only the raw ASCII Line animation.
 * Disappears once the page and all assets are fully loaded.
 *
 * @returns {React.JSX.Element} Minimal full-screen loader.
 */
export function InitialAppLoader(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clean up pre-hydration interval and remove fallback element
    if (typeof window !== 'undefined' && (window as unknown as { __asciiPreInterval?: number }).__asciiPreInterval) {
      clearInterval((window as unknown as { __asciiPreInterval?: number }).__asciiPreInterval);
    }
    const preFallback = document.getElementById('pre-hydration-loader');
    if (preFallback) {
      preFallback.remove();
    }

    let timerId: ReturnType<typeof setTimeout> | null = null;

    const finishLoading = () => {
      // Hold loader for 2.5 seconds (between 2 and 3 seconds) after content has loaded
      timerId = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener('load', finishLoading);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          id="app-initial-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-zinc-200 select-none pointer-events-auto"
        >
          <AsciiLineLoader size={32} />
        </m.div>
      )}
    </AnimatePresence>
  );
}
