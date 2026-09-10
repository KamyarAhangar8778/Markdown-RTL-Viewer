/**
 * @file components/custom-cursor/index.tsx
 * @description Main custom kinematic cursor integration component.
 * Hides default browser cursor on fine-pointer devices and renders the responsive 3D cursor.
 */

'use client';

import React, { useSyncExternalStore } from 'react';
import { useCursorState } from './hooks/use-cursor-state';
import { CursorSvg } from './components/cursor-svg';

const emptySubscribe = () => () => {};

/**
 * Custom kinematic cursor that provides responsive physical interactions on fine pointer devices.
 * Automatically deactivates on touch / coarse pointer interfaces.
 *
 * @returns {React.JSX.Element | null} The cursor component or null when unmounted / on touch devices.
 */
export function CustomCursor() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const state = useCursorState();

  if (!mounted) {
    return null;
  }

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return <CursorSvg {...state} />;
}

