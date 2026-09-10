'use client';

/**
 * @file app/page.tsx
 * @description Root application view presenting full dark cinematic glass UI for RTL Markdown Studio.
 */

import React from 'react';
import { m, AnimatePresence } from 'motion/react';
import { MarkdownProvider, useMarkdownContext } from '@/store/MarkdownContext';
import { Header } from '@/components/layout/header';
import { StudioDock } from '@/components/layout/studio-dock';
import { FocusModeBar } from '@/components/layout/focus-mode-bar';
import { EditorView } from '@/components/views/editor-view';
import { PreviewView } from '@/components/views/preview-view';
import { UploadModal } from '@/components/views/upload-modal';
import { PasteModal } from '@/components/views/paste-modal';
import { ToastNotification } from '@/components/ui/toast-notification';
import { useSyncScroll } from '@/hooks/useSyncScroll';
import { viewModeVariants } from '@/components/motion/motion-variants';
import { DURATION, EASE_OUT } from '@/lib/ease';

function MainAppContent() {
  const {
    viewMode,
    language,
    theme,
    isFocusMode,
    toast,
    closeToast,
    editorElement,
    previewElement,
    isSyncScroll,
  } = useMarkdownContext();
  const isDark = theme === 'dark';

  // Synchronize scrolling between editor and preview in Split View mode
  useSyncScroll({
    editorEl: editorElement,
    previewEl: previewElement,
    enabled: isSyncScroll && viewMode === 'split',
  });

  const isPageScrollable = viewMode === 'preview';

  return (
    <div
      className={`${
        isPageScrollable ? 'min-h-screen overflow-x-clip' : 'h-screen max-h-screen overflow-hidden'
      } flex flex-col bg-noise relative transition-colors duration-300 ${
        isDark ? 'bg-black text-zinc-100 dark' : 'bg-slate-100/70 text-zinc-900 light'
      } ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* Animated Header (Smoothly transitions in/out in Focus Mode without layout thrashing) */}
      <AnimatePresence initial={false}>
        {!isFocusMode && (
          <m.div
            key="main-header-wrapper"
            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
            transition={{ duration: DURATION.slow, ease: EASE_OUT }}
            className="w-full shrink-0 origin-top overflow-hidden"
          >
            <Header />
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Exit Widget for Focus Mode */}
      <AnimatePresence>
        {isFocusMode && <FocusModeBar key="focus-exit-widget" />}
      </AnimatePresence>

      {/* Main Workspace Grid (Extends to top in Focus Mode with layout animation) */}
      <m.main
        layout
        transition={{ duration: DURATION.slow, ease: EASE_OUT }}
        className={`flex-1 max-w-[1580px] w-full mx-auto flex flex-col gap-2.5 sm:gap-3 z-10 ${
          isPageScrollable ? '' : 'min-h-0 overflow-hidden'
        } ${
          isFocusMode ? 'p-1.5 sm:p-2 pt-1.5 sm:pt-2 pb-2' : 'p-2 sm:p-3 md:p-3.5 pb-16 sm:pb-20'
        }`}
      >
        <div className="flex-1 w-full flex flex-col gap-2.5 sm:gap-3 items-start">
          {/* Main Workspace Views with smooth cross-fade */}
          <div className="w-full flex flex-col gap-2.5 sm:gap-3">
            <AnimatePresence mode="wait">
              {viewMode === 'split' && (
                <m.div
                  key="view-split"
                  variants={viewModeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 h-full w-full"
                >
                  <EditorView />
                  <PreviewView />
                </m.div>
              )}

              {viewMode === 'editor' && (
                <m.div
                  key="view-editor"
                  variants={viewModeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full"
                >
                  <EditorView />
                </m.div>
              )}

              {viewMode === 'preview' && (
                <m.div
                  key="view-preview"
                  variants={viewModeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-auto min-h-full flex justify-center"
                >
                  <div className="w-full max-w-[1120px] mx-auto">
                    <PreviewView />
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.main>

      {/* Interactive macOS-style Magnification Dock (Exits with motion in Focus Mode) */}
      <AnimatePresence>
        {!isFocusMode && <StudioDock key="studio-dock" />}
      </AnimatePresence>

      {/* Toast Notification Banner */}
      <ToastNotification
        toast={toast}
        onClose={closeToast}
        isDark={isDark}
        isFa={language === 'fa'}
      />

      {/* Modals */}
      <UploadModal />
      <PasteModal />
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

