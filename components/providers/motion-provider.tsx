'use client';

import React from 'react';
import { LazyMotion, domAnimation } from 'motion/react';

interface MotionProviderProps {
  children: React.ReactNode;
}

/**
 * Global LazyMotion provider to enable optimized lightweight motion primitives (m.*)
 * across the application while drastically reducing bundle size.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      {children}
    </LazyMotion>
  );
}
