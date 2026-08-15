'use client';

/**
 * @file components/layout/smooth-scroll-provider.tsx
 * @description Client-side provider component that mounts desktop-only smooth scrolling logic.
 */

import React from 'react';
import { useDesktopSmoothScroll } from '@/hooks/useDesktopSmoothScroll';

interface SmoothScrollProviderProps {
  children?: React.ReactNode;
}

/**
 * Wraps or mounts smooth scrolling for desktop and laptop environments.
 *
 * @param {SmoothScrollProviderProps} props - Component properties.
 * @returns {React.JSX.Element} Rendered children.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps): React.JSX.Element {
  useDesktopSmoothScroll();
  return <>{children}</>;
}
