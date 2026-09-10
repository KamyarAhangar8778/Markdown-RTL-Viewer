'use client';

/**
 * @file components/ui/toast-notification.tsx
 * @description Floating animated toast notification banner with error shake and success pop feedback.
 */

import React from 'react';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, Info, X } from 'lucide-react';
import {
  toastNotificationVariants,
  ERROR_SHAKE_X,
  ERROR_SHAKE_TRANSITION,
  SUCCESS_POP_VARIANTS,
} from '@/components/motion/motion-variants';
import { SPRING_PRESS } from '@/lib/ease';

export interface ToastState {
  message: string;
  type?: 'success' | 'info' | 'error';
  id: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastNotificationProps {
  toast: ToastState | null;
  onClose: () => void;
  isDark: boolean;
  isFa: boolean;
}

const getToastContainerClass = (isDark: boolean, isError: boolean): string => {
  if (isDark) {
    return isError
      ? 'bg-zinc-950/95 border-rose-500/40 text-rose-100 shadow-[0_10px_30px_rgba(244,63,94,0.15)]'
      : 'bg-zinc-950/95 border-zinc-800 text-zinc-100 shadow-black/80';
  }
  return isError
    ? 'bg-white/95 border-rose-300 text-rose-950 shadow-rose-200/50'
    : 'bg-white/95 border-zinc-300 text-zinc-900 shadow-zinc-300/60';
};

const getToastActionClass = (isDark: boolean): string =>
  isDark
    ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-700/60 focus-visible:ring-offset-zinc-950'
    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 focus-visible:ring-offset-white';

const getCloseButtonClass = (isDark: boolean): string =>
  isDark
    ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 focus-visible:ring-offset-zinc-950'
    : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 focus-visible:ring-offset-white';

interface ToastIconProps {
  type?: 'success' | 'info' | 'error';
  reduceMotion: boolean | null;
}

function ToastIcon({ type, reduceMotion }: ToastIconProps): React.JSX.Element {
  if (type === 'error') {
    return (
      <div className="shrink-0 text-rose-500">
        <X className="w-4 h-4 stroke-[2.5]" />
      </div>
    );
  }

  if (type === 'info') {
    return (
      <div className="shrink-0 text-sky-500">
        <Info className="w-4 h-4" />
      </div>
    );
  }

  return (
    <div className="shrink-0">
      <m.div
        variants={reduceMotion ? undefined : SUCCESS_POP_VARIANTS}
        initial="initial"
        animate="animate"
        className="text-emerald-500"
      >
        <Check className="w-4 h-4 stroke-[2.5]" />
      </m.div>
    </div>
  );
}

interface ToastActionProps {
  action: { label: string; onClick: () => void };
  onClose: () => void;
  isDark: boolean;
  isFa: boolean;
  reduceMotion: boolean | null;
}

function ToastAction({
  action,
  onClose,
  isDark,
  isFa,
  reduceMotion,
}: ToastActionProps): React.JSX.Element {
  return (
    <m.button
      type="button"
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      transition={SPRING_PRESS}
      onClick={() => {
        action.onClick();
        onClose();
      }}
      className={`px-3 py-1.5 min-h-[36px] rounded-lg text-[11px] font-bold border transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${getToastActionClass(isDark)} ${
        isFa ? 'font-vazir' : 'font-sans'
      }`}
    >
      {action.label}
    </m.button>
  );
}

/**
 * Render a floating animated toast banner for immediate action feedback.
 *
 * @param props - Component properties containing toast state and close handler.
 * @returns Toast notification element.
 */
export function ToastNotification({
  toast,
  onClose,
  isDark,
  isFa,
}: ToastNotificationProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const isError = toast?.type === 'error';

  return (
    <AnimatePresence>
      {toast && (
        <m.div
          key={toast.id}
          variants={toastNotificationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-auto px-4 pointer-events-auto"
          dir={isFa ? 'rtl' : 'ltr'}
        >
          {/* Error Shake Layer (only shakes on error) */}
          <m.div
            animate={
              isError && !reduceMotion
                ? { x: ERROR_SHAKE_X, transition: ERROR_SHAKE_TRANSITION }
                : { x: 0 }
            }
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-2xl backdrop-blur-xl text-xs font-medium transition-colors ${getToastContainerClass(isDark, isError)}`}
          >
            <ToastIcon type={toast.type} reduceMotion={reduceMotion} />

            <span className={`leading-normal ${isFa ? 'font-vazir' : 'font-sans'}`}>
              {toast.message}
            </span>

            {toast.action && (
              <ToastAction
                action={toast.action}
                onClose={onClose}
                isDark={isDark}
                isFa={isFa}
                reduceMotion={reduceMotion}
              />
            )}

            <m.button
              onClick={onClose}
              type="button"
              whileTap={reduceMotion ? undefined : { scale: 0.9 }}
              transition={SPRING_PRESS}
              className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${getCloseButtonClass(isDark)}`}
              aria-label={isFa ? 'بستن پیام' : 'Close notification'}
            >
              <X className="w-3.5 h-3.5" />
            </m.button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
