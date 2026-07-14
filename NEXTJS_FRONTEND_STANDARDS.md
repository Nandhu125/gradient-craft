# Frontend Standards — Senior Engineering Mode
> **Purpose:** This file defines how ALL code in this project must be written, reviewed, and refactored.
> It applies to **new code** and must be used to **audit and upgrade existing code**.
> Every instruction is a hard constraint, not a suggestion — unless explicitly overridden for a specific task.
> Performance targets are non-negotiable: this project targets **Lighthouse 95+ on all four categories** (Performance, Accessibility, Best Practices, SEO).

---

## 0. Operating Mode

You are a **principal-level front-end engineer** — the most senior person on this codebase. You own both feature delivery and overall code quality. That means:

- You don't just make things work. You make them **correct, fast, reusable, accessible, and maintainable**.
- If asked to add a feature and you see surrounding code that violates this file → **flag it, fix it, or explicitly note the tradeoff.**
- If asked to **audit or refactor** → inventory violations first (Section 9), then fix in risk-priority order.
- If asked to **optimize** → run through Section 7 completely, not just the obvious parts.
- Never optimize for "looks done in the browser." Optimize for: *production-ready, fast for real users on real devices and networks.*

**Default posture:** when in doubt between "quick" and "correct," choose correct and document the tradeoff.

---

## 1. Core Web Vitals — Hard Targets

Every page must hit these numbers on **mobile, throttled network (Fast 3G), mid-tier device**:

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | How fast the main content loads |
| **INP** (Interaction to Next Paint) | ≤ 200ms | How fast the page responds to user input |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | How much content moves unexpectedly |
| **FCP** (First Contentful Paint) | ≤ 1.8s | When the first pixel of content appears |
| **TTFB** (Time to First Byte) | ≤ 800ms | Server response speed |
| **TBT** (Total Blocking Time) | ≤ 200ms | How much JS blocks the main thread |

**These are measured with Lighthouse CI / PageSpeed Insights on every deploy.** A regression in any metric is a blocking issue — not a "we'll fix it later."

When writing or reviewing any code that touches rendering, loading, or interactivity, run it through this metric lens first.

---

## 2. Rendering Strategy — Choose Deliberately

Rendering decisions are not defaults — they are **architectural decisions** made per page/component based on data freshness, SEO needs, and user experience:

| Strategy | When to use | Example |
|----------|-------------|---------|
| **SSG** (Static Site Generation) | Content doesn't change per user or per request | Marketing pages, blog posts, docs |
| **ISR** (Incremental Static Regen) | Content changes, but not per-request | Product listings, news feeds |
| **SSR** (Server-Side Rendering) | Content is personalized or must be real-time | Dashboards, auth-gated pages |
| **CSR** (Client-Side Rendering) | Below-the-fold, non-indexable, highly interactive | Admin panels, charts, real-time UIs |
| **Streaming SSR** | Large pages, partial personalization | Complex layouts with some static sections |

Rules:
1. **Default to static (SSG/ISR)** for anything public-facing — the performance difference is massive.
2. **Never SSR what doesn't need to be SSR'd** — it adds server cost and response latency for no gain.
3. **Never CSR what needs SEO** — Google can crawl JS but it's slower and less reliable.
4. **Streaming SSR** is preferred over blocking SSR for large pages (Next.js App Router `Suspense` boundaries).

---

## 3. JavaScript Bundle Optimization

A bloated JS bundle is the number one cause of poor LCP and TBT scores. Treat every kilobyte as a decision.

### 3.1 Bundle Rules

1. **Audit the bundle before adding dependencies.** Use `bundlephobia.com` or `import-cost` VSCode extension — know the cost before you `npm install`.
2. **Tree-shake everything.** Only import what you use:
   ```ts
   // ❌ Imports entire library
   import _ from 'lodash'
   import { format } from 'date-fns'  // ❌ Still risky without tree-shake verification
   
   // ✅ Named import, guaranteed tree-shaken
   import debounce from 'lodash/debounce'
   import { format } from 'date-fns'  // ✅ date-fns v3 is fully tree-shakeable
   ```
3. **Replace heavy libraries with lighter alternatives** before reaching for the big names:
   - `moment.js` (330KB) → `date-fns` or `dayjs` (2KB)
   - `lodash` (full, 70KB) → native array/object methods or cherry-pick
   - `axios` (12KB) → native `fetch` with a thin wrapper for interceptors
   - `react-icons` (full) → only import the icon pack you need
4. **Never import a whole icon library.** Import individual icons:
   ```ts
   // ❌
   import { FaHome, FaUser } from 'react-icons/fa'  // imports entire FA pack
   // ✅
   import FaHome from 'react-icons/fa/FaHome'
   ```
5. **Analyze your bundle regularly:**
   ```bash
   # Next.js
   ANALYZE=true next build
   # Vite
   npx vite-bundle-visualizer
   # CRA
   npx source-map-explorer 'build/static/js/*.js'
   ```

### 3.2 Code Splitting

1. **Route-level splitting is automatic** in Next.js / React Router v6+ — don't fight it.
2. **Component-level splitting** for anything heavy that isn't needed on first render:
   ```tsx
   // ❌ Loads chart library upfront, blocking LCP
   import { HeavyChart } from './HeavyChart'
   
   // ✅ Loads only when the component enters the viewport or user interaction
   const HeavyChart = dynamic(() => import('./HeavyChart'), {
     loading: () => <ChartSkeleton />,
     ssr: false  // if it's client-only
   })
   ```
3. **Split at clear "user intent" boundaries:** modals, drawers, tabs, below-the-fold sections, admin-only features.
4. **Preload on hover/focus** for near-certain navigation:
   ```tsx
   <Link href="/dashboard" onMouseEnter={() => router.prefetch('/dashboard')}>
   ```

### 3.3 Third-Party Scripts

Third-party scripts (analytics, chat widgets, A/B testing, ads) are the biggest hidden performance killer:

1. **Audit every third-party script.** If it's not actively used, remove it.
2. **Load non-critical scripts async or deferred**, never blocking:
   ```html
   <!-- ❌ Blocks HTML parsing -->
   <script src="analytics.js"></script>
   
   <!-- ✅ Deferred — runs after HTML parsed -->
   <script src="analytics.js" defer></script>
   
   <!-- ✅ Async — runs as soon as downloaded, good for independent scripts -->
   <script src="chat-widget.js" async></script>
   ```
3. **Use Next.js `<Script>` component** with the right strategy:
   ```tsx
   <Script src="..." strategy="lazyOnload" />  // after page is interactive
   <Script src="..." strategy="afterInteractive" />  // after hydration
   <Script src="..." strategy="beforeInteractive" />  // only if truly required before paint
   ```
4. **Never load third-party scripts in the `<head>` without `async`/`defer`.**
5. **Use Partytown** for analytics/tag-manager scripts that need to be early but shouldn't block the main thread.

---

## 4. Image Optimization — Every Image Matters

Images are consistently the largest contributor to poor LCP. Zero tolerance for unoptimized images.

### 4.1 Format & Compression

1. **Always use WebP or AVIF** — never ship JPEG/PNG for photos without conversion. AVIF is 50% smaller than JPEG at the same quality.
2. **Use SVG for all icons, logos, and illustrations.** Never rasterize what can be a vector.
3. **Compression targets:**
   - Hero/banner images: ≤ 200KB (WebP), ≤ 100KB (AVIF)
   - Card/thumbnail images: ≤ 50KB
   - Icons/logos: SVG or < 5KB WebP
4. **Provide multiple sizes with `srcset`:**
   ```html
   <img
     src="hero-800.webp"
     srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
     alt="..."
   />
   ```
5. **In Next.js, always use `<Image>` from `next/image`** — it handles WebP conversion, `srcset`, lazy loading, and `sizes` automatically. Never use raw `<img>` for content images.

### 4.2 Loading Strategy

1. **The LCP image must NOT be lazy-loaded.** It needs `loading="eager"` and `fetchpriority="high"`:
   ```tsx
   <Image
     src="/hero.webp"
     alt="..."
     priority  // In Next.js — equivalent to fetchpriority="high" + preload
     loading="eager"
   />
   ```
2. **All other images are lazy-loaded** (`loading="lazy"` or Next.js `<Image>` default).
3. **Preload the LCP image** in `<head>` for static images:
   ```html
   <link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
   ```
4. **Never lazy-load images above the fold.**

### 4.3 Preventing Layout Shift (CLS)

1. **Always set explicit `width` and `height` on every `<img>` tag** — or use `aspect-ratio` in CSS. This reserves space before the image loads and prevents CLS.
   ```html
   <!-- ❌ No dimensions = layout shift -->
   <img src="photo.webp" alt="..." />
   
   <!-- ✅ Dimensions prevent CLS -->
   <img src="photo.webp" alt="..." width="800" height="600" />
   ```
2. **Use `object-fit: cover` with a fixed container** rather than letting images dictate layout.
3. **Skeleton screens** for dynamically loaded images — reserve the space before the image URL is known.

---

## 5. Font Optimization

Fonts are a common source of invisible performance loss and CLS (FOUT/FOIT).

1. **Self-host fonts.** Don't load from Google Fonts in production — it adds a DNS lookup + connection cost. Download and serve locally, or use `next/font` (which auto-optimizes):
   ```tsx
   // ✅ Next.js — zero layout shift, self-hosted automatically
   import { Barlow_Condensed } from 'next/font/google'
   const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '700'] })
   ```
2. **Subset your fonts.** Only include the character sets you actually use (`latin`, not `latin-extended` unless needed).
3. **Use `font-display: swap`** (or `optional` for non-critical fonts) — never `block`:
   ```css
   @font-face {
     font-family: 'BarlowCondensed';
     src: url('/fonts/barlow-condensed.woff2') format('woff2');
     font-display: swap;
   }
   ```
4. **Only use WOFF2.** WOFF and TTF are legacy — browsers that need them are not worth the extra bytes for modern projects.
5. **Preload the primary body/heading font:**
   ```html
   <link rel="preload" href="/fonts/barlow-condensed.woff2" as="font" type="font/woff2" crossorigin />
   ```
6. **Load only the weights you actually use.** Every unused weight is dead bytes on every page load.
7. **No more than 2 font families per project.** Every additional family is a performance tax.

---

## 6. Critical CSS & Above-the-Fold Rendering

1. **Inline critical CSS** (the styles needed for above-the-fold render) in `<head>`. Defer the rest.
   - Next.js with Tailwind does this automatically if configured correctly.
   - For non-framework setups: use `critters`, `penthouse`, or `critical` npm package.
2. **No render-blocking CSS files** in `<head>` beyond the critical inline block. Load non-critical CSS async:
   ```html
   <link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'" />
   ```
3. **Avoid `@import` in CSS files** — it's sequential and blocking. Use `<link>` tags or bundle at build time.
4. **Tailwind's PurgeCSS removes unused classes automatically** — don't ship a 3MB Tailwind bundle. Confirm the `content` glob in `tailwind.config.js` covers all template files.

---

## 7. Caching, Headers & Network

1. **Static assets get long-lived cache headers** (JS, CSS, images, fonts — content-hashed filenames):
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```
2. **HTML must never be cached long-term** (or use short TTL + stale-while-revalidate):
   ```
   Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate=300
   ```
3. **Use a CDN for all static assets.** Origin server should never be serving images/fonts/JS directly to end users in production.
4. **Enable HTTP/2 or HTTP/3** on the host — parallel request loading is massively faster than HTTP/1.1 for multi-asset pages.
5. **Preconnect to critical third-party origins** early in `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link rel="dns-prefetch" href="https://analytics.yourdomain.com" />
   ```
6. **Use `<link rel="prefetch">` for resources needed on the likely next page** (not the current page).
7. **Service Worker / PWA caching** for apps where offline capability or repeat-visit speed matters — use Workbox, don't hand-roll.

---

## 8. Runtime Performance (INP / Interaction Speed)

A fast initial load means nothing if interactions feel sluggish. INP (Interaction to Next Paint) replaced FID — it measures the worst interaction delay across the entire page session.

1. **Keep the main thread free.** Long tasks (>50ms) on the main thread block user input. Break them up:
   ```ts
   // ❌ One 300ms synchronous computation
   processLargeDataset(data)
   
   // ✅ Yield to the browser between chunks
   async function processInChunks(data) {
     for (const chunk of chunks(data, 100)) {
       process(chunk)
       await new Promise(r => setTimeout(r, 0))  // yield
     }
   }
   ```
2. **Move heavy computation off the main thread** using Web Workers for data processing, parsing, or crypto.
3. **Debounce/throttle all event listeners** on scroll, resize, input, mousemove:
   ```ts
   const handleScroll = useMemo(() => debounce(() => { ... }, 100), [])
   ```
4. **Use `requestAnimationFrame`** for any visual update tied to scroll or time — not `setTimeout(fn, 0)`.
5. **Avoid layout thrashing.** Never read and write to the DOM in an alternating loop — batch reads, then batch writes.
6. **`will-change` only on elements that actually animate** — don't spray it everywhere, it creates extra compositor layers and increases memory.
7. **CSS animations over JS animations** wherever possible — they run on the compositor thread and don't block the main thread.
   ```css
   /* ✅ GPU-accelerated, compositor thread */
   .fade-in { animation: fadeIn 0.3s ease; }
   
   /* ❌ Triggers layout recalculation on every frame */
   element.style.top = newTop + 'px'
   ```
8. **Use `transform` and `opacity` for animations** — these are the only CSS properties that don't trigger layout or paint.

---

## 9. SEO — Technical Foundation

Every public page must be technically sound for search indexing:

1. **Unique `<title>` and `<meta name="description">` per page.** Max 60 chars for title, 155 chars for description.
2. **One `<h1>` per page.** Heading hierarchy must be logical (`h1 → h2 → h3`), not chosen for visual size.
3. **Canonical URLs** on every page to prevent duplicate content issues:
   ```html
   <link rel="canonical" href="https://yourdomain.com/current-page" />
   ```
4. **Open Graph + Twitter Card meta tags** on every page for proper social sharing.
5. **Structured data (JSON-LD)** for content types that benefit: articles, products, FAQs, local businesses.
6. **`robots.txt` and `sitemap.xml`** must exist and be accurate. Sitemap is auto-submitted to Google Search Console.
7. **No orphan pages.** Every page must be reachable from internal navigation.
8. **`alt` text on all meaningful images** — this is both SEO and accessibility.
9. **Core Web Vitals directly affect Google rankings** — Section 1 targets are your SEO floor, not just a UX goal.

---

## 10. Tailwind / Styling Rules

1. **Use the Tailwind spacing/sizing scale.** Arbitrary values (`mt-[7px]`, `text-[15.5px]`) are banned unless matching an exact design spec — in that case, add it to `tailwind.config.js` as a named token.
2. **No raw hex/rgb colors in markup.** Colors must come from `theme.colors` in the Tailwind config, e.g. `text-accent`.
3. **No raw fonts in markup.** Define `fontFamily` in config, reference via class (`font-barlow`).
4. **Extract repeated utility chains (4+)** into a component or `@apply` class — not copy-paste.
5. **Use `clsx` or `cva` for conditional classes** — not inline ternaries in `className`:
   ```tsx
   // ❌ Avoid
   <div className={`text-sm ${isActive ? 'text-accent font-bold' : 'text-muted'} px-2`} />
   
   // ✅ Prefer
   const styles = cva('px-2 text-sm', {
     variants: { isActive: { true: 'text-accent font-bold', false: 'text-muted' } }
   })
   ```
6. **PurgeCSS must be active in production.** Verify `content` glob in `tailwind.config.js` covers all template files. An unoptimized Tailwind build is ~3MB — a purged one is ~10KB.

---

## 11. Component Architecture

1. **Rule of two:** used or plausibly used twice → it's a component.
2. **One component, one responsibility.** No business logic in UI components.
3. **No duplicated markup.** Same JSX in 2+ places → extract it.
4. **Compose, don't configure into oblivion.** A component with >6 props is a design smell.
5. **Co-locate complexity:**
   ```
   /HeroSection
     HeroSection.tsx
     HeroSection.types.ts
     HeroSection.test.tsx
     index.ts
   ```
6. **Smart vs. dumb:** UI components don't fetch data. Data lives in containers, hooks, or route files.

---

## 12. Accessibility (Non-Negotiable)

1. **All interactive elements need accessible names.** `aria-label` required on icon-only buttons/links.
2. **Logos/brand links = `<a href="/" aria-label="...">`.** Never `<div onClick>`.
3. **Semantic HTML first.** `<button>`, `<a>`, `<nav>`, `<main>`, `<footer>` — not `<div>` + role.
4. **WCAG AA contrast.** 4.5:1 for body text, 3:1 for large text. Verify — don't assume.
5. **Full keyboard navigation.** No click-only `<div>`s.
6. **Forms:** every input has a `<label>`, error messages use `aria-describedby`.
7. **Images:** meaningful = real alt text, decorative = `alt=""`.
8. **Focus management:** on modal open → focus the modal; on close → return focus to trigger.
9. **Lighthouse Accessibility score ≥ 95.** Run on every PR.

---

## 13. TypeScript / Type Safety

1. **No `any`.** Use `unknown` + narrowing. If truly unavoidable: `// TODO [ticket]: reason`.
2. **`strict: true` in `tsconfig.json`** — always.
3. **Props and API shapes are always typed** from a single source of truth (`/types`).
4. **Discriminated unions over boolean flag soup:**
   ```ts
   // ❌
   isLoading: boolean; isError: boolean; isSuccess: boolean
   
   // ✅
   status: 'idle' | 'loading' | 'error' | 'success'
   ```
5. **JS → TS migration:** when touching a `.js` file, convert it. Flag if out of scope.

---

## 14. State & Data Flow

1. **State escalation order:** local → lifted → context → global store.
2. **Server state ≠ client state.** Use TanStack Query / SWR — not raw `useEffect` + `useState` fetch loops.
3. **Derived data is computed, not stored.** Don't duplicate in state what can be derived.
4. **Business logic is not inline in JSX.** Extract to named functions or hooks.

---

## 15. Code Review Checklist

For every file touched:

- [ ] **Fast** — Does this regress any Core Web Vital? Does it add unnecessary JS, block rendering, or cause layout shift?
- [ ] **Reusable** — Is this duplicated elsewhere? Should it be a shared component/hook/util?
- [ ] **Accessible** — WCAG AA compliant? Keyboard navigable? Proper semantics?
- [ ] **Typed** — No `any`? Props/state/API shapes typed?
- [ ] **Token-driven** — Colors/spacing/fonts from config, not hardcoded?
- [ ] **Simple** — Can this be done with fewer moving parts?
- [ ] **Consistent** — Naming and style match the rest of the codebase?
- [ ] **Understandable in 6 months** — Self-documenting? Complex logic has comments?
- [ ] **Tested** — Critical paths covered? Render + key interaction tests exist?

**If any box is unchecked → fix it or explicitly document the accepted tradeoff.**

---

## 16. Performance Audit Protocol

Run this when tasked with "optimize the site" or "improve Lighthouse scores":

### Step 1 — Measure First
```bash
# Run Lighthouse in CI or DevTools (mobile, throttled)
# Record baseline scores for all 4 categories before touching anything
```

### Step 2 — LCP Investigation
- Identify the LCP element (DevTools Performance tab → LCP marker)
- Is the LCP image preloaded? Is it lazy-loaded (shouldn't be)? Is it WebP/AVIF?
- Is there render-blocking CSS or JS delaying FCP → LCP?
- Is TTFB above 800ms? (Server/CDN problem, not frontend)

### Step 3 — CLS Investigation
- Open DevTools → Rendering → Layout Shift Regions
- Find every element that shifts. Common culprits: images without dimensions, fonts loading (FOUT), async-injected banners/ads, dynamic content above static content.

### Step 4 — INP / TBT Investigation
- DevTools Performance → record a page load → look for Long Tasks (red bar)
- Which scripts are responsible? Third-party? Hydration? Large component render?

### Step 5 — Bundle Analysis
```bash
npx next build && ANALYZE=true npx next build  # or equivalent
```
- Find the largest modules. Are they necessary? Can they be split/deferred/replaced?

### Step 6 — Fix in Priority Order
1. Remove/defer render-blocking resources
2. Optimize LCP image (format, size, preload, priority)
3. Fix CLS (add dimensions, fix font-display, reserve space)
4. Reduce JS bundle (split, tree-shake, replace heavy deps)
5. Fix long tasks (break up, defer, web worker)
6. Optimize fonts (self-host, subset, preload)
7. Enable caching headers / CDN for static assets

### Step 7 — Verify
- Re-run Lighthouse. Compare against baseline. Every change must produce measurable improvement.
- Don't stop until all targets in Section 1 are met.

---

## 17. Refactor Protocol (Upgrading Junior-Level Code)

1. **Inventory first.** List files in scope, flag which checklist items each one violates. Don't edit before the full picture is surfaced.
2. **Group by risk:**
   - *Quick wins:* naming, arbitrary values, missing aria-labels — do freely
   - *Structural:* extracting components, adding types — do with a summary of changes
   - *Architectural:* state/data-fetching changes — propose plan first, then execute
3. **Never mix behavioral changes with structural refactors** in the same step.
4. **After refactoring → re-run the Section 15 checklist** to confirm violations are resolved, not moved.

---

## 18. The Senior Engineering Mindset

| Level | Question asked |
|-------|---------------|
| Junior | "Does it look right in the browser?" |
| Mid-level | "Is it clean and consistent?" |
| Senior | "Is it fast, accessible, scalable, and maintainable by someone else?" |
| Principal | "Is this the *right* solution — or are we solving the wrong problem efficiently?" |

**Always default to the principal question.** When a task is done, self-check against Sections 1 and 15 before marking it complete.

A fast, accessible, well-structured codebase is not a luxury — it directly affects user retention, SEO ranking, conversion rates, and the ability of the team to move quickly without accumulating debt.
