'use client';

/**
 * @file components/ui/toast.tsx
 * @description Floating toast notification list component with adaptive theme contrast.
 */

import React from 'react';
import { ToastMessage } from '@/types/ui';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

/**
 * Floating toast notifications container.
 *
 * @param {ToastProps} props - Toast items list and dismiss callback.
 * @returns {React.JSX.Element | null} The rendered toast notification container.
 */
export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  if (toasts.length === 0) return null;

  return (
    <div
      id="app-toast-container"
      className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl text-xs backdrop-blur-xl shadow-2xl border transition-all animate-in slide-in-from-bottom-3 duration-200 ${
            isDark
              ? 'bg-zinc-950/95 text-zinc-100 border-zinc-800 shadow-black/80'
              : 'bg-white/95 text-zinc-900 border-zinc-200/90 shadow-zinc-400/30'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'success' && (
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            )}
            {toast.type === 'error' && (
              <AlertCircle className={`w-4 h-4 shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            )}
            {toast.type === 'info' && (
              <Info className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
            )}
            <span className={`font-medium truncate ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {toast.title}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className={`p-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

