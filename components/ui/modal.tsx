'use client';

/**
 * @file components/ui/modal.tsx
 * @description Glassmorphic Dialog Modal built on Radix UI.
 */

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const { theme, language } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />
        <DialogPrimitive.Content
          className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 focus:outline-none transition-colors ${
            isDark
              ? 'glass-panel border border-zinc-800 bg-black/95 text-zinc-100'
              : 'border border-zinc-200 bg-white text-zinc-900 shadow-zinc-300/50'
          }`}
          dir={language === 'fa' ? 'rtl' : 'ltr'}
        >
          <div
            className={`flex items-center justify-between pb-3 mb-4 border-b ${
              isDark ? 'border-zinc-800' : 'border-zinc-200'
            }`}
          >
            <DialogPrimitive.Title
              className={`text-base font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
            >
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              onClick={onClose}
              className={`rounded-lg p-1 transition-colors cursor-pointer ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>
          {description && (
            <DialogPrimitive.Description
              className={`text-xs mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
            >
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
