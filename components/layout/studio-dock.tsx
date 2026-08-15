'use client';

/**
 * @file components/layout/studio-dock.tsx
 * @description Floating studio quick-action dock providing fluid access to tools, paste, download, and view modes.
 */

import React from 'react';
import { MagnificationDock } from '@/components/ui/magnification-dock';
import { useStudioDockActions } from '@/hooks/useStudioDockActions';

/**
 * Floating studio dock offering quick access to RTL Markdown tools, paste, download, and view modes.
 */
export const StudioDock: React.FC = () => {
  const dockItems = useStudioDockActions();

  return (
    <div
      id="studio-floating-dock-container"
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
    </div>
  );
};

export default StudioDock;

