'use client';

/**
 * @file components/views/paste-modal.tsx
 * @description Paste fallback dialog allowing seamless pasting when browser permissions block direct clipboard read.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Clipboard, Trash } from 'lucide-react';

/**
 * Paste Modal Component providing fallback paste area with auto-focus.
 *
 * @returns {React.JSX.Element} The rendered PasteModal component.
 */
export function PasteModal(): React.JSX.Element {
  const { isPasteOpen, setIsPasteOpen, setRawMarkdown, showToast, t, language, theme } = useMarkdownContext();
  const [pastedText, setPastedText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDark = theme === 'dark';

  // Auto focus textarea whenever modal opens
  useEffect(() => {
    if (isPasteOpen) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isPasteOpen]);

  const handleClose = () => {
    setIsPasteOpen(false);
    setPastedText('');
  };

  const handleApply = () => {
    if (!pastedText.trim()) {
      showToast(t.toasts.noTextToApply, 'error');
      return;
    }
    setRawMarkdown(pastedText);
    showToast(t.toasts.textApplied, 'success');
    handleClose();
  };

  return (
    <Modal
      isOpen={isPasteOpen}
      onClose={handleClose}
      title={t.pasteModal.title}
      description={t.pasteModal.description}
    >
      <div className="flex flex-col gap-4">
        <textarea
          id="paste-modal-textarea"
          ref={textareaRef}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder={t.pasteModal.placeholder}
          aria-label={t.pasteModal.title}
          dir={language === 'fa' ? 'rtl' : 'ltr'}
          className={`w-full h-44 p-3.5 text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 resize-none rounded-xl border shadow-inner transition-colors ${
            isDark
              ? 'bg-zinc-950/90 text-zinc-100 border-zinc-800 placeholder:text-zinc-600 focus-visible:ring-offset-zinc-950'
              : 'bg-zinc-50 text-zinc-900 border-zinc-300 placeholder:text-zinc-500 focus-visible:ring-offset-white'
          } ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}
        />

        <div className={`flex items-center justify-between gap-2 pt-2 border-t ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPastedText('')}
            disabled={!pastedText}
            className={isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'}
          >
            <Trash className="w-4 h-4 ml-1.5" />
            {t.pasteModal.clearButton}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
            >
              {t.pasteModal.cancelButton}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              disabled={!pastedText.trim()}
            >
              <Clipboard className="w-4 h-4 ml-1.5" />
              {t.pasteModal.applyButton}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
