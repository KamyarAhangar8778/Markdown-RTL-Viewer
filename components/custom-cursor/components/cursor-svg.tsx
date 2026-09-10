/**
 * @file components/custom-cursor/components/cursor-svg.tsx
 * @description 3D kinematic vector cursor component with responsive tilt, specular gradients,
 * and adaptive light/dark theme optics.
 */

import React from 'react';
import { motion, MotionValue } from 'motion/react';

interface CursorSvgProps {
  isVisible: boolean;
  isClickable: boolean;
  isHoveringText: boolean;
  isMouseDown: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/**
 * Render component for the custom SVG cursor.
 * Features 3D angular pitch/yaw on click, roll on text hover, spring scaling,
 * and adaptive theme optics.
 *
 * @param {CursorSvgProps} props - Kinematic state flags and motion position values.
 * @returns {React.JSX.Element} The animated cursor element.
 */
export const CursorSvg = React.memo(function CursorSvg({
  isVisible,
  isClickable,
  isHoveringText,
  isMouseDown,
  mouseX,
  mouseY,
}: CursorSvgProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform select-none transform-gpu"
      style={{
        x: mouseX,
        y: mouseY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="transform-gpu will-change-transform"
        animate={{
          rotateX: isMouseDown ? 20 : 0,
          rotateY: isMouseDown ? -20 : 0,
          rotateZ: isHoveringText ? 10 : isClickable ? -5 : 0,
          scale: isMouseDown ? 0.94 : isClickable ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.35 }}
        style={{
          originX: '4.5px',
          originY: '1.1px',
          marginLeft: '-4.5px',
          marginTop: '-1.1px',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
        >
          {/* Light Theme: Deep obsidian with metallic sheen and crisp white highlight stroke */}
          <path
            className="dark:hidden"
            d="M4.093 2.502a1.08 1.08 0 0 1 1.405-1.405l20.407 8.163a1.08 1.08 0 0 1 .032 1.996l-8.547 4.274-4.274 8.547a1.08 1.08 0 0 1-1.996-.032L4.093 2.502Z"
            fill="url(#cursor-gradient-light)"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {/* Dark Theme: Luminous silver-platinum with ambient specular stroke */}
          <path
            className="hidden dark:block"
            d="M4.093 2.502a1.08 1.08 0 0 1 1.405-1.405l20.407 8.163a1.08 1.08 0 0 1 .032 1.996l-8.547 4.274-4.274 8.547a1.08 1.08 0 0 1-1.996-.032L4.093 2.502Z"
            fill="url(#cursor-gradient-dark)"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cursor-gradient-light" x1="2" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#09090b" />
              <stop offset="0.6" stopColor="#18181b" />
              <stop offset="1" stopColor="#27272a" />
            </linearGradient>
            <linearGradient id="cursor-gradient-dark" x1="2" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,1)" />
              <stop offset="0.7" stopColor="rgba(235,235,245,0.9)" />
              <stop offset="1" stopColor="rgba(200,200,215,0.75)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
});

CursorSvg.displayName = 'CursorSvg';

