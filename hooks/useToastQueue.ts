'use client';

/**
 * @file hooks/useToastQueue.ts
 * @description Custom hook for managing toast notification queue state and actions.
 */

import { useState, useCallback } from 'react';
import { ToastMessage } from '@/types/ui';

export interface UseToastQueueReturn {
  toasts: ToastMessage[];
  addToast: (title: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

/**
 * Custom hook to manage toast notification list and operations.
 *
 * @returns Object containing current toasts array, addToast function, and removeToast function.
 */
export function useToastQueue(): UseToastQueueReturn {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (title: string, type: ToastMessage['type'] = 'info') => {
      setToasts((prev) => {
        const id = `toast-${Date.now()}-${prev.length + 1}`;
        return [...prev, { id, title, type }];
      });
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
