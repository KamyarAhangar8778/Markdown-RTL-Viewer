'use client';

/**
 * @file components/views/upload-modal.tsx
 * @description Upload modal with drag-and-drop zone for .md files.
 */

import React, { useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { CloudUpload, FileText } from 'lucide-react';
import { readTextFile } from '@/utils/fileHelpers';
import { SPRING_PRESS } from '@/lib/ease';
import { MAX_UPLOAD_FILE_SIZE_BYTES } from '@/constants/domain';

const getDropzoneClass = (isDragging: boolean, isDark: boolean): string => {
  if (isDragging) {
    return isDark
      ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-950/30'
      : 'border-emerald-600 bg-emerald-50/80 shadow-lg shadow-emerald-200/50';
  }
  return isDark
    ? 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700'
    : 'border-zinc-300 bg-zinc-50/80 hover:border-zinc-400';
};

const getCloudUploadIconClass = (isDragging: boolean, isDark: boolean): string => {
  if (isDragging) return 'text-emerald-500';
  return isDark ? 'text-zinc-400' : 'text-zinc-600';
};

export function UploadModal(): React.JSX.Element {
  const { isUploadOpen, setIsUploadOpen, setRawMarkdown, showToast, t, theme } = useMarkdownContext();
  const [isDragging, setIsDragging] = useState(false);
  const reduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const handleFileSelect = async (file: File) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
      showToast(t.toasts.invalidFileType, 'error');
      return;
    }

    if (file.size > MAX_UPLOAD_FILE_SIZE_BYTES) {
      showToast(t.uploadModal.maxSizeText, 'error');
      return;
    }

    try {
      const content = await readTextFile(file);
      setRawMarkdown(content);
      showToast(t.toasts.uploadSuccess(file.name), 'success');
      setIsUploadOpen(false);
    } catch {
      showToast(t.toasts.fileReadError, 'error');
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
      <m.div
        role="region"
        aria-label={t.uploadModal.title}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        animate={reduceMotion ? undefined : { scale: isDragging ? 1.02 : 1 }}
        transition={SPRING_PRESS}
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-colors duration-200 ${getDropzoneClass(isDragging, isDark)}`}
      >
        <m.div
          animate={isDragging && !reduceMotion ? { y: [-2, -6, -2] } : { y: 0 }}
          transition={{ duration: 0.6, repeat: isDragging ? Infinity : 0 }}
        >
          <CloudUpload className={`w-12 h-12 mb-3 transition-colors ${getCloudUploadIconClass(isDragging, isDark)}`} />
        </m.div>
        <p className={`text-sm font-medium mb-1 ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
          {t.uploadModal.dragDropText}
        </p>
        <p className={`text-xs mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.uploadModal.maxSizeText}</p>

        <label htmlFor="upload-modal-file-input" className="cursor-pointer">
          <Button variant="primary" size="sm" asChild>
            <span>
              <FileText className="w-4 h-4 ml-1.5" />
              {t.uploadModal.selectButton}
            </span>
          </Button>
          <input
            id="upload-modal-file-input"
            aria-label={t.uploadModal.selectButton}
            type="file"
            accept=".md,.txt"
            className="sr-only"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
        </label>
      </m.div>
    </Modal>
  );
}
