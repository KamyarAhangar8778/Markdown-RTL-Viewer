'use client';

/**
 * @file components/layout/studio-dock.tsx
 * @description Floating studio quick-action dock providing fluid access to tools, paste, download, and view modes.
 */

import React from 'react';
import { m } from 'motion/react';
import { MagnificationDock } from '@/components/ui/magnification-dock';
import { useStudioDockActions } from '@/hooks/useStudioDockActions';

/**
 * Floating studio dock offering quick access to RTL Markdown tools, paste, download, and view modes.
 */
export function StudioDock(): React.JSX.Element {
  const dockItems = useStudioDockActions();

  return (
    <m.div
      id="studio-floating-dock-container"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 inset-x-0 mx-auto z-40 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto">
        <MagnificationDock
          items={dockItems}
          panelHeight={58}
          baseItemSize={42}
          magnification={60}
          distance={140}
        />
      </div>
    </m.div>
  );
}

