'use client';

/**
 * @file hooks/useDesktopSmoothScroll.ts
 * @description Custom React hook to dynamically load and manage Lenis smooth scrolling exclusively on desktop and laptop devices.
 */

import { useEffect, useRef } from 'react';
import { isDesktopOrLaptop } from '@/utils/deviceDetector';
import type Lenis from 'lenis';

/**
 * Activates inertia-based smooth scrolling on desktop and laptop viewports via dynamic Lenis loading.
 * Automatically cleans up animations and instances on unmount or when transitioning to mobile screens.
 */
export function useDesktopSmoothScroll(): void {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let isCancelled = false;

    /**
     * Initializes Lenis smooth scroll if environment is verified as desktop/laptop.
     */
    async function initSmoothScroll() {
      if (!isDesktopOrLaptop()) {
        destroyLenis();
        return;
      }

      if (lenisRef.current) return;

      try {
        const { default: LenisClass } = await import('lenis');
        if (isCancelled) return;

        const lenis = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);
      } catch (err) {
        console.error('Failed to initialize Lenis smooth scroll:', err);
      }
    }

    /**
     * Tears down active Lenis instance and animation loop.
     */
    function destroyLenis() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    }

    initSmoothScroll();

    let resizeTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isDesktopOrLaptop()) {
          destroyLenis();
        } else if (!lenisRef.current) {
          initSmoothScroll();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isCancelled = true;
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      destroyLenis();
    };
  }, []);
}
