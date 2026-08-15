'use client';

/**
 * @file components/ui/persian-digits-icon.tsx
 * @description Highly legible vector icon representing Persian numeral conversion (۱۲۳).
 */

import React from 'react';

interface PersianDigitsIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Vector SVG icon displaying crisp Persian digits (۱۲۳) inside a balanced typography badge.
 *
 * @param {PersianDigitsIconProps} props - SVG element attributes and styling classes.
 * @returns {React.JSX.Element} The rendered SVG icon.
 */
export const PersianDigitsIcon: React.FC<PersianDigitsIconProps> = ({
  className = 'w-5 h-5',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Badge Frame */}
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      />

      {/* Persian Digits (۱۲۳) */}
      <text
        x="12"
        y="15.2"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        fontWeight="800"
        fontFamily="Vazirmatn, Shabnam, Tahoma, system-ui, sans-serif"
        letterSpacing="0.5px"
        className="select-none pointer-events-none"
      >
        ۱۲۳
      </text>
    </svg>
  );
};

export default PersianDigitsIcon;
