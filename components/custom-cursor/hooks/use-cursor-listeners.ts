/**
 * @file components/custom-cursor/hooks/use-cursor-listeners.ts
 * @description Attaches high-performance passive window and document event listeners to track mouse movement,
 * scroll states, mouse clicks, and element hover dynamics with zero OS cursor leakage and rAF batching.
 */

import { useEffect, useRef } from 'react';
import { MotionValue } from 'motion/react';
import {
  isTouchDevice,
  checkClickable,
  checkHoveringText,
} from './utils/cursor-detection';

interface CursorListenersProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  setIsVisible: (visible: boolean) => void;
  setIsMouseDown: (down: boolean) => void;
  setIsClickable: (clickable: boolean) => void;
  setIsHoveringText: (hovering: boolean) => void;
}

/**
 * Hook to attach optimized global DOM listeners for kinematic cursor coordinates and interaction state.
 * Uses requestAnimationFrame batching and state memoization to avoid superfluous React re-renders.
 *
 * @param {CursorListenersProps} props - Target motion coordinates and state dispatchers.
 */
export function useCursorListeners({
  mouseX,
  mouseY,
  setIsVisible,
  setIsMouseDown,
  setIsClickable,
  setIsHoveringText,
}: CursorListenersProps) {
  const isVisibleRef = useRef(false);
  const isScrollingRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const isClickableRef = useRef(false);
  const isHoveringTextRef = useRef(false);
  const lastTargetRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setIsMouseDown(false);
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const onMouseDownEvent = () => {
      if (!isMouseDownRef.current) {
        isMouseDownRef.current = true;
        setIsMouseDown(true);
      }
    };

    const onMouseUpEvent = () => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setIsMouseDown(false);
      }
    };

    const onBlurEvent = () => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setIsMouseDown(false);
      }
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    window.addEventListener('mousedown', onMouseDownEvent, { passive: true });
    window.addEventListener('mouseup', onMouseUpEvent, { passive: true });
    window.addEventListener('pointerdown', onMouseDownEvent, { passive: true });
    window.addEventListener('pointerup', onMouseUpEvent, { passive: true });
    window.addEventListener('dragend', onMouseUpEvent, { passive: true });
    window.addEventListener('blur', onBlurEvent, { passive: true });

    let hoverRafId: number | null = null;
    let pendingHoverTarget: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      if (isScrollingRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target || target === lastTargetRef.current) return;
      pendingHoverTarget = target;

      if (hoverRafId !== null) return;
      hoverRafId = requestAnimationFrame(() => {
        hoverRafId = null;
        const currentTarget = pendingHoverTarget;
        if (!currentTarget || currentTarget === lastTargetRef.current || isScrollingRef.current) return;
        lastTargetRef.current = currentTarget;

        const clickable = checkClickable(currentTarget);
        if (isClickableRef.current !== clickable) {
          isClickableRef.current = clickable;
          setIsClickable(clickable);
        }

        const hoveringText = checkHoveringText(currentTarget, clickable);
        if (isHoveringTextRef.current !== hoveringText) {
          isHoveringTextRef.current = hoveringText;
          setIsHoveringText(hoveringText);
        }
      });
    };

    const onScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        if (isClickableRef.current) {
          isClickableRef.current = false;
          setIsClickable(false);
        }
        if (isHoveringTextRef.current) {
          isHoveringTextRef.current = false;
          setIsHoveringText(false);
        }
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        lastTargetRef.current = null;
      }, 100);
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    if (typeof document !== 'undefined') {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDownEvent);
      window.removeEventListener('mouseup', onMouseUpEvent);
      window.removeEventListener('pointerdown', onMouseDownEvent);
      window.removeEventListener('pointerup', onMouseUpEvent);
      window.removeEventListener('dragend', onMouseUpEvent);
      window.removeEventListener('blur', onBlurEvent);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', onScroll);

      if (hoverRafId !== null) cancelAnimationFrame(hoverRafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (typeof document !== 'undefined') {
        document.documentElement.style.cursor = '';
        document.body.style.cursor = '';
      }
    };
  }, [mouseX, mouseY, setIsVisible, setIsMouseDown, setIsClickable, setIsHoveringText]);
}

