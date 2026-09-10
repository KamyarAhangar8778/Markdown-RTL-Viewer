'use client';

/**
 * @file components/views/editor-active-line.tsx
 * @description Background highlight overlay indicating the cursor's active line in the markdown editor.
 */

import React from 'react';

export interface EditorActiveLineProps {
  isVisible: boolean;
  isDark: boolean;
  top: number;
  height: number;
}

/**
 * Render an active line indicator positioned behind the textarea content.
 *
 * @param {EditorActiveLineProps} props - Component properties.
 * @returns {React.JSX.Element | null} Highlight element or null when hidden.
 */
export const EditorActiveLine: React.FC<EditorActiveLineProps> = React.memo(({
  isVisible,
  isDark,
  top,
  height,
}) => {
  if (!isVisible) return null;

  return (
    <div
      id="editor-active-line-highlight"
      aria-hidden="true"
      className={`absolute top-0 left-0 right-0 pointer-events-none will-change-transform transform-gpu transition-transform duration-75 ease-out rounded-sm z-0 ${
        isDark
          ? 'bg-zinc-800/35 border-y border-zinc-700/20 shadow-[inset_2px_0_0_0_#38bdf8]'
          : 'bg-zinc-200/40 border-y border-zinc-300/40 shadow-[inset_2px_0_0_0_#0284c7]'
      }`}
      style={{
        transform: `translate3d(0, ${top}px, 0)`,
        height: `${height}px`,
      }}
    />
  );
});

EditorActiveLine.displayName = 'EditorActiveLine';
