'use client';

/**
 * @file components/ui/modal.tsx
 * @description Glassmorphic Dialog Modal built with Radix UI and physics-driven motion.
 */

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { m, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { modalBackdropVariants, modalContentVariants } from '@/components/motion/motion-variants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps): React.JSX.Element {
  const { theme, language } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Primary & Ambient Layer: Frosted backdrop */}
            <DialogPrimitive.Overlay asChild>
              <m.div
                variants={modalBackdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
              />
            </DialogPrimitive.Overlay>

            {/* Modal Dialog Positioner */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <DialogPrimitive.Content asChild>
                <m.div
                  variants={modalContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`pointer-events-auto relative w-full max-w-lg rounded-2xl p-6 shadow-2xl focus:outline-none transition-colors ${
                    isDark
                      ? 'glass-panel border border-zinc-800 bg-black/95 text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)]'
                      : 'border border-zinc-200 bg-white text-zinc-900 shadow-2xl shadow-zinc-300/60'
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
                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                        isDark
                          ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 focus-visible:ring-offset-zinc-950'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 focus-visible:ring-offset-white'
                      }`}
                      aria-label={language === 'fa' ? 'بستن پنجره' : 'Close dialog'}
                    >
                      <X className="w-4 h-4" />
                    </DialogPrimitive.Close>
                  </div>
                  {description && (
                    <DialogPrimitive.Description
                      className={`text-xs mb-4 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
                    >
                      {description}
                    </DialogPrimitive.Description>
                  )}
                  {children}
                </m.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
