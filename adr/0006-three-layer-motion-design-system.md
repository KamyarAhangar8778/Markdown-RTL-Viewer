# ADR 0006: Three-Layer Motion Design System & Physics Spring Tokens

## Status
Accepted

## Date
2026-09-04

## Context
Ad-hoc CSS transitions and arbitrary animation durations across various UI components lead to visual dissonance, jarring state changes, and accessibility violations for users sensitive to motion. A professional studio tool requires cohesive kinetic personality, predictable tactile feedback, and strict compliance with `prefers-reduced-motion`.

## Decision
We engineered a unified three-tier motion architecture using `motion/react` and shared physics tokens (`lib/ease.ts`, `components/motion/motion-variants.ts`):
1. **Motion Hierarchy & Three Distinct Layers:**
   - **Primary Layer (Structural transitions):** Handles view layout changes (`viewModeVariants`), modal dialogs (`modalContentVariants`, scale $0.94 \rightarrow 1.0$), and toast entries.
   - **Secondary Layer (Micro-interactions & tactile feedback):** Direct button press scaling (`scale: 0.97`), success checkmark pops (`SUCCESS_POP_VARIANTS`), and decisive multi-oscillation error shakes (`ERROR_SHAKE_X: [0, -10, 10, -6, 6, -2, 2, 0]`).
   - **Ambient Layer (Continuous atmospheric life):** Subtle sinusoidal breathing loops (`ambientPulseVariants`) for active status indicators and idle preview placeholders.
2. **Standardized Physics Spring Presets (`lib/ease.ts`):**
   - `SPRING_PRESS`: `{ stiffness: 480, damping: 28, mass: 0.5 }` (Instant tactile response)
   - `SPRING_PANEL`: `{ stiffness: 360, damping: 32, mass: 0.6 }` (Natural modal deceleration)
   - `SPRING_DOCK`: `{ stiffness: 280, damping: 18, mass: 0.1 }` (Fluid macOS-style magnification)
   - `SPRING_BOUNCE`: `{ stiffness: 320, damping: 16, mass: 0.5 }` (Playful success overshoot)
3. **Accessibility First (Reduced Motion):**
   - Integrated `components/providers/motion-provider.tsx` and `useReducedMotion()`. When motion reduction is active, transform/scale animations are disabled, falling back to instantaneous opacity transitions.

## Consequences
- **Positive:** Consistent, premium motion feel matching professional creative desktop software.
- **Positive:** Centralized tokens in `lib/ease.ts` prevent duplication and arbitrary duration magic numbers.
- **Positive:** Fully accessible and compliant with WCAG motion accessibility standards.
