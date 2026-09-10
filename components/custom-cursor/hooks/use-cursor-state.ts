/**
 * @file components/custom-cursor/hooks/use-cursor-state.ts
 * @description Coordinates global state and high-frequency motion values for the custom kinematic cursor.
 */

import { useState } from 'react';
import { useMotionValue } from 'motion/react';
import { useCursorListeners } from './use-cursor-listeners';

/**
 * Hook to manage the active state, hover interaction tags, and dynamic coordinates of the cursor.
 *
 * @returns {object} Cursor visibility, interaction flags, and coordinates.
 */
export function useCursorState() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useCursorListeners({
    mouseX,
    mouseY,
    setIsVisible,
    setIsMouseDown,
    setIsClickable,
    setIsHoveringText,
  });

  return {
    isVisible,
    isClickable,
    isHoveringText,
    isMouseDown,
    mouseX,
    mouseY,
  };
}
