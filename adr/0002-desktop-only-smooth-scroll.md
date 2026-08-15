# ADR 0002: Desktop-Only Smooth Scroll Architecture

## Status
Accepted

## Context
Adding smooth scrolling improves the desktop reading and editing flow in RTL Markdown Studio. However, forced smooth scrolling on touch devices (smartphones and tablets) degrades native kinetic gestures, creates input lag, and adds unnecessary bundle evaluation.

## Decision
We implemented a conditional, performance-optimized smooth scrolling strategy:
1. **Device & Capability Guard (`utils/deviceDetector.ts`):** Verifies viewport width (`>= 1024px`), fine pointer input (`pointer: fine` and `hover: hover`), and user accessibility preferences (`!prefers-reduced-motion`).
2. **Lazy Dynamic Loading (`hooks/useDesktopSmoothScroll.ts`):** Loads the `lenis` library dynamically only after desktop qualification passes, avoiding bundle bloat on mobile.
3. **Clean Lifecycle & Resize Sync:** Automatically attaches/detaches the RAF loop and destroys Lenis instances when viewport constraints change.

## Consequences
- Native, frictionless touch scrolling is preserved on mobile devices.
- Inertia-based smooth scrolling activates seamlessly for desktop and laptop mouse/trackpad users.
- Accessible by default for users requesting reduced motion.
