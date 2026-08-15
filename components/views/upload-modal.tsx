'use client';

/**
 * @file components/views/upload-modal.tsx
 * @description Upload modal with drag-and-drop zone for .md files.
 */

import React, { useState } from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { readTextFile } from '@/utils/fileHelpers';

export const UploadModal: React.FC = () => {
  const { isUploadOpen, setIsUploadOpen, setRawMarkdown, addToast, t } = useMarkdownContext();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
      addToast(t.toasts.invalidFileType, 'error');
      return;
    }

    try {
      const content = await readTextFile(file);
      setRawMarkdown(content);
      addToast(t.toasts.uploadSuccess(file.name), 'success');
      setIsUploadOpen(false);
    } catch {
      addToast(t.toasts.fileReadError, 'error');
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <Modal
      isOpen={isUploadOpen}
      onClose={() => setIsUploadOpen(false)}
      title={t.uploadModal.title}
      description={t.uploadModal.description}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all ${
          isDragging
            ? 'border-zinc-300 bg-zinc-900 scale-[1.02]'
            : 'border-zinc-800 bg-black/80 hover:border-zinc-700'
        }`}
      >
        <UploadCloud className="w-12 h-12 text-zinc-300 mb-3" />
        <p className="text-sm font-medium text-zinc-200 mb-1">
          {t.uploadModal.dragDropText}
        </p>
        <p className="text-xs text-zinc-400 mb-4">{t.uploadModal.maxSizeText}</p>

        <label className="cursor-pointer">
          <Button variant="primary" size="sm" asChild>
            <span>
              <FileText className="w-4 h-4 ml-1.5" />
              {t.uploadModal.selectButton}
            </span>
          </Button>
          <input
            type="file"
            accept=".md,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
    </Modal>
  );
};
