'use client';

/**
 * @file app/page.tsx
 * @description Root application view presenting full dark cinematic glass UI for RTL Markdown Studio.
 */

import React from 'react';
import { MarkdownProvider, useMarkdownContext } from '@/store/MarkdownContext';
import { Header } from '@/components/layout/header';
import { StudioDock } from '@/components/layout/studio-dock';
import { EditorView } from '@/components/views/editor-view';
import { PreviewView } from '@/components/views/preview-view';
import { UploadModal } from '@/components/views/upload-modal';
import { PasteModal } from '@/components/views/paste-modal';
import { ToastContainer } from '@/components/ui/toast';

function MainAppContent() {
  const { viewMode, toasts, removeToast, language, theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col bg-noise relative overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-black text-zinc-100 dark' : 'bg-slate-100/70 text-zinc-900 light'
      } ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <Header />

      {/* Main Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-24 sm:pb-28 flex flex-col gap-6 z-10">
        <div className="flex-1 w-full flex flex-col gap-5 items-start">
          {/* Main Workspace Views */}
          <div className="w-full flex flex-col gap-5">
            {viewMode === 'split' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
                <EditorView />
                <PreviewView />
              </div>
            )}

            {viewMode === 'editor' && (
              <div className="w-full h-full">
                <EditorView />
              </div>
            )}

            {viewMode === 'preview' && (
              <div className="w-full h-full">
                <PreviewView />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Interactive macOS-style Magnification Dock */}
      <StudioDock />

      {/* Modals and Notifications */}
      <UploadModal />
      <PasteModal />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default function Home() {
  return (
    <MarkdownProvider>
      <MainAppContent />
    </MarkdownProvider>
  );
}

