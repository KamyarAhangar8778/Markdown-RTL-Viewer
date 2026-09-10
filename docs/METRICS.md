# Metrics & Performance

## Funnel
1. **Landing / Session Start**: Visitor loads `/`
2. **First Interaction**: User clicks "Load Sample" or pastes Markdown (Target: >75%)
3. **Live RTL Conversion**: Immediate local rendering (<1ms latency, 100% success)
4. **Primary Conversion**: User copies output or downloads `.md` file (Target: >60% of active editors)

## Stage & One Metric That Matters
- **Stage**: Acquisition & Activation
- **One Metric That Matters (OMTM)**: Conversion Completion Rate (% of visitors who author/paste text and successfully copy or download converted RTL Markdown).

## Baselines & Targets (Core Web Vitals)
| Metric | Baseline | Target | Status | Response / Action |
|---|---|---|---|---|
| **LCP (Largest Contentful Paint)** | 0.8s | < 2.5s | Passing | Preload Vazirmatn font & static shell rendering |
| **INP (Interaction to Next Paint)** | 18ms | < 200ms | Passing | Memoize `markdownEngine.ts` regex processing |
| **CLS (Cumulative Layout Shift)** | 0.01 | < 0.1 | Passing | Fixed aspect height containers for Editor & Preview |
| **TTFB (Time to First Byte)** | 120ms | < 800ms | Passing | Optimized Next.js Cloud Run container delivery |
