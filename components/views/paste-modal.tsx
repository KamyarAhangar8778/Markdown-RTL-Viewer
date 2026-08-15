'use client';

/**
 * @file components/views/paste-modal.tsx
 * @description Paste fallback dialog allowing seamless pasting when browser permissions block direct clipboard read.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { ClipboardPaste, Trash2 } from 'lucide-react';

/**
 * Paste Modal Component providing fallback paste area with auto-focus.
 *
 * @returns {React.JSX.Element} The rendered PasteModal component.
 */
export const PasteModal: React.FC = () => {
  const { isPasteOpen, setIsPasteOpen, setRawMarkdown, addToast, t, language } = useMarkdownContext();
  const [pastedText, setPastedText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      addToast(t.toasts.noTextToApply, 'info');
      return;
    }
    setRawMarkdown(pastedText);
    addToast(t.toasts.textApplied, 'success');
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
          ref={textareaRef}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder={t.pasteModal.placeholder}
          dir={language === 'fa' ? 'rtl' : 'ltr'}
          className={`w-full h-44 p-3.5 bg-zinc-950/90 text-zinc-100 text-sm leading-relaxed focus:outline-none resize-none glass-input rounded-xl border border-zinc-800 placeholder:text-zinc-600 shadow-inner ${
            language === 'fa' ? 'font-vazir' : 'font-sans'
          }`}
        />

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/80">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPastedText('')}
            disabled={!pastedText}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <Trash2 className="w-4 h-4 ml-1.5" />
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
              <ClipboardPaste className="w-4 h-4 ml-1.5" />
              {t.pasteModal.applyButton}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
