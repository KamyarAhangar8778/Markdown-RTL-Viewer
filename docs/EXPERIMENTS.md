# Experiments

## Experiment Cards

### EXP-001 — RTL Sample Template in Empty State
- **Hypothesis**: We believe adding a "Load RTL Sample" button in empty editor/preview states will increase user engagement and immediate comprehension of RTL formatting capabilities by 40%.
- **Type**: In-app UI test
- **Primary metric & threshold**: % of new visitors who click "Load RTL Sample" or type >10 characters (Threshold: >65%)
- **Guardrail metric**: Zero impact on initial page load time (<0.1s overhead)
- **Decision rule**: Persevere if sample load conversion >50%
- **Result & verdict**: Shipped directly; users immediately experience live RTL preview capabilities.

### EXP-002 — Toast Notification System
- **Hypothesis**: Providing immediate floating toast notifications (<100ms) for copy, upload, and clear actions will decrease user confusion and duplicate button clicks.
- **Type**: Interaction feedback experiment
- **Primary metric & threshold**: Action completion feedback confidence (100% action confirmation)
- **Guardrail metric**: Toast disappear time set to 3000ms to avoid screen obstruction
- **Decision rule**: Persevere if user feedback shows high clarity
- **Result & verdict**: Shipped; users receive clear visual confirmation on all clipboard and file operations.

### EXP-003 — Undo Toast Action for Document Clear
- **Hypothesis**: We believe providing an immediate "Undo" button inside the Toast notification when clearing the editor will prevent accidental data loss and increase user confidence when editing large documents.
- **Type**: UX Error Recovery Experiment
- **Primary metric & threshold**: Zero accidental document loss complaints; 100% successful restoration on Undo click
- **Guardrail metric**: Toast display time extended to 4500ms to give ample time for Undo click
- **Decision rule**: Persevere if user satisfaction remains high
- **Result & verdict**: Shipped; users can restore cleared document content with one click.

### EXP-004 — Client-Side Privacy & LTR Code Guarantee Badges
- **Hypothesis**: Displaying explicit "100% Client-Side & Private" and "Isolated LTR Code & Tables" badges in Editor and Preview headers will increase trust and address primary user objections before conversion.
- **Type**: Trust & Conversion Badge Experiment
- **Primary metric & threshold**: User conversion rate (Copy / Export) increase by 25%
- **Guardrail metric**: Zero visual clutter on mobile viewports (hidden cleanly on small screens)
- **Decision rule**: Persevere if user bounce rate decreases
- **Result & verdict**: Shipped; badges provide immediate assurance on data privacy and code block alignment.

## Experiment Backlog
| Idea | ICE (impact/confidence/ease) | Status |
|---|---|---|
| Quick Sample RTL Markdown Loader | 9 / 9 / 9 | Shipped |
| Toast Notification Feedback Engine | 8 / 9 / 9 | Shipped |
| Undo Toast Action for Clear Action | 9 / 9 / 9 | Shipped |
| Client-Side Privacy & LTR Code Badges | 8 / 9 / 9 | Shipped |
| Live Word / Char Counter Pills | 8 / 9 / 8 | Shipped |
| Focus Mode Distraction-Free Toggle | 9 / 8 / 9 | Shipped |
