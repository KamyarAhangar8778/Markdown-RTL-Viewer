# ADR 0007: Fluid Magnification Studio Dock Architecture

## Status
Accepted

## Date
2026-09-04

## Context
Fixed-size bottom toolbars in editing environments either suffer from small touch/click target areas or consume excessive vertical space on laptops. Standard CSS `:hover` scaling causes abrupt layout shifts on neighboring elements and provides no progressive proximity feedback.

## Decision
We implemented a macOS-inspired fluid magnification dock (`components/ui/magnification-dock.tsx`, `components/layout/studio-dock.tsx`):
1. **Continuous Mouse Proximity Tracking:**
   - Uses `useMotionValue(Infinity)` and Framer/Motion's `useTransform` with a continuous distance curve ($d = 150\text{px}$) to compute per-item scale without triggering React component re-renders.
   - Interpolates item dimensions between base size ($42\text{px}$) and maximum magnification ($62\text{px}$) smoothly based on cursor proximity.
2. **Spring-Damped Physics:**
   - Employs `SPRING_DOCK` (`{ stiffness: 280, damping: 18, mass: 0.1 }`) to ensure responsive scaling that snaps back naturally when the cursor exits.
3. **Decoupled Action Dispatching (`hooks/useStudioDockActions.tsx`):**
   - Segregates dock presentation geometry (`MagnificationDock`, `DockItem`, `DockIcon`, `DockLabel`) from business actions (exporting, copying, pasting, uploading, sample loading, view toggling, and clear actions).
4. **Adaptive Mobile Layout:**
   - Gracefully scales on smaller viewports into a compact horizontal action bar with overflow scroll protection.

## Consequences
- **Positive:** Smooth, tactile interaction that delights users while maintaining high target accuracy.
- **Positive:** Zero DOM layout thrashing or parent container resize reflows because transforms operate via GPU-accelerated motion values.
- **Positive:** High architectural decoupling between toolbar UI primitives and application action handlers.
