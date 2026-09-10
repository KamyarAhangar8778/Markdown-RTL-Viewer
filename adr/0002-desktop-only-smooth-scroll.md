# ADR 0002: Desktop-Only Smooth Scroll Architecture

## Status
Accepted

## Date
2026-09-02

## Context
Adding smooth scrolling improves the reading and editing experience in desktop workspaces by introducing fluid, momentum-based viewport motion. However, forcing custom smooth scrolling on touch devices (smartphones and tablets) causes notable drawbacks:
- It interferes with native kinetic touch deceleration and momentum gestures.
- It introduces touch latency and jank during fast swipe-to-scroll actions.
- It forces mobile devices to load and execute unnecessary animation bundles (`lenis`).

## Decision
We implemented a conditional, capability-gated smooth scrolling architecture:
1. **Device & Capability Guard (`utils/deviceDetector.ts`):** Checks three strict environment conditions:
   - Viewport width $\ge 1024\text{px}$ (`lg` breakpoint).
   - Fine pointer input (`window.matchMedia('(pointer: fine) and (hover: hover)')`).
   - User accessibility preferences (`!window.matchMedia('(prefers-reduced-motion: reduce)')`).
2. **Lazy Dynamic Bundle Loading (`hooks/useDesktopSmoothScroll.ts`):** Evaluates and imports the `lenis` smooth scroll engine dynamically only after qualification passes on the client side, keeping mobile bundle weight minimal.
3. **Robust Lifecycle Management:** Automatically attaches/detaches the RequestAnimationFrame (RAF) loop and calls `lenis.destroy()` whenever the browser window is resized below the desktop breakpoint or when components unmount.

## Consequences
- **Positive:** Preserves 100% native, lag-free kinetic touch scrolling on mobile and tablet screens.
- **Positive:** Delivers fluid inertia-based smooth scrolling for desktop mousewheel and precision trackpads.
- **Positive:** Respects accessibility guidelines by automatically disabling for users who enable `prefers-reduced-motion`.
- **Trade-off:** Requires a dynamic import step on the client side during initial desktop mounting.

