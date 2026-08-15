/**
 * @file types/dock.ts
 * @description Type definitions for the interactive Magnification Dock component.
 */

import React from 'react';
import type { SpringOptions } from 'motion/react';

/**
 * Interface representing an individual action item within the Magnification Dock.
 */
export interface DockItemData {
  /** Optional unique identifier for testing and keys */
  id?: string;
  /** Visual icon rendered inside the dock item */
  icon: React.ReactNode;
  /** Tooltip or accessible label displayed on hover */
  label: React.ReactNode;
  /** Click event handler callback */
  onClick: () => void;
  /** Optional custom CSS classes for the item */
  className?: string;
  /** Whether the item is currently in an active state */
  isActive?: boolean;
  /** Optional badge or status indicator */
  badge?: React.ReactNode;
}

/**
 * Properties configuration for the MagnificationDock component.
 */
export interface DockProps {
  /** Array of interactive items rendered within the dock */
  items: DockItemData[];
  /** Optional additional CSS classes for the container */
  className?: string;
  /** Maximum distance in pixels from cursor where magnification effect activates */
  distance?: number;
  /** Base rest height of the dock panel in pixels */
  panelHeight?: number;
  /** Default width/height size of each unmagnified item */
  baseItemSize?: number;
  /** Maximum container height during active hover states */
  dockHeight?: number;
  /** Maximum magnified size of an item when cursor is directly over it */
  magnification?: number;
  /** Custom spring physics configuration */
  spring?: SpringOptions;
}
