/**
 * @file types/ui.ts
 * @description Type definitions for UI layout states, view modes, and toast notifications.
 */

export type ViewMode = 'split' | 'editor' | 'preview';
export type Theme = 'dark' | 'light';

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface DecodeEffectOptions {
  text: string;
  speed?: number;
  chars?: string;
  enabled?: boolean;
}
