# WCAG 2.1 AA Accessibility Audit

Date: 2026-07-20
Scope: all HTML, CSS, and JS in this repository (6 HTML pages, `variables.css`
(shared/locked), `site.css`, `ufo-connection/css/ufo-connection.css`,
`web-engine/app/css/app.css`, and all JS under `ufo-connection/js/`,
`web-engine/app/js/`, `world-layer-sandbox/p5-coastal-relay/`).

## Summary

| Severity | Found | Fixed | Left open |
|---|---|---|---|
| Serious | 2 | 2 | 0 |
| Moderate | 2 | 2 | 0 |
| Minor / informational | 1 | 0 | 1 (documented, not a defect) |
| **Total** | **5** | **4** | **1** |

Overall finding: this repository was already built with unusually strong
accessibility discipline (skip links, landmarks, `aria-labelledby` on every
section, `aria-live` regions, `prefers-reduced-motion` handling,
`forced-colors` support, non-color-coded status badges, real alt text, video
`<track>`/transcript scaffolding). The issues below are the concrete gaps
found after a full pass; no other criteria in the requested scope (1.1.1,
1.3.1, 1.4.1, 2.1.1/2.4.7, 2.4.1, 2.4.2, 2.4.4, 3.1.1, motion, inline SVG)
turned up defects.

## Issues

### 1. Text contrast fails 4.5:1 on the shared `--color-muted` token — FIXED
- **Files/lines:** `index.html` (`.text-meta` used at lines 16, 108, 135, 175,
  209), `research/speculative-instrumentation/index.html` (lines 16, 49, 144),
  `web-engine/app/css/app.css` (`.help-text`, `.stepper span.locked`)
- **WCAG:** 1.4.3 Contrast (Minimum) — Serious
- **Detail:** `variables.css` defines `--color-muted: #6f6f6f` against
  `--color-paper: #efece2`, which computes to **4.25:1**, below the 4.5:1 AA
  minimum for normal-size text. `.text-meta`/`.text-muted` (from the shared,
  locked `variables.css`) and `.help-text`/`.stepper span.locked` (local to
  `web-engine/app/css/app.css`) all render this color directly on the paper
  background.
- **Fix:** Since `variables.css` is a locked shared token file (used by
  Small-Systems-Lab/Echo/Umada too), the value was **not** changed there.
  Instead, `site.css` and `web-engine/app/css/app.css` each add a
  point-of-use override (`color: #5c5c5c`) for the affected selectors,
  loaded after `variables.css` so it wins on specificity/order. New ratio is
  ~5.7:1 on paper and stays comfortably above 4.5:1 on the lighter
  card/soft backgrounds these classes also appear on.
- **Systemic flag:** `--color-muted` is below AA on `--color-paper`
  system-wide. Any other project consuming `variables.css` and placing
  `.text-meta`/`.text-muted` (or raw `var(--color-muted)`) text directly on
  `--color-paper` will have the same 4.25:1 failure. Worth raising with
  whoever owns `variables.css` as a token-level fix (e.g. darkening
  `--color-muted` by a similar amount) rather than patching every consumer.

### 2. Form-field borders fail 3:1 non-text contrast — FIXED
- **File/lines:** `web-engine/app/css/app.css`, `form.review-form input,
  textarea, select` (review/consent/risk/publication forms rendered by
  `web-engine/app/js/views.js`)
- **WCAG:** 1.4.11 Non-text Contrast — Moderate
- **Detail:** These fields use `border: var(--border-thin)` (1px solid
  `--color-line` `#d0cdc6`) on `--color-soft` (`#f9f9f7`), which computes to
  **~1.5:1** — well under the 3:1 minimum for UI component boundaries, so the
  field edge is effectively invisible.
- **Fix:** Added a point-of-use override darkening `border-color` to
  `#5c5c5c` on these three selectors only (reaches well above 3:1 on both
  soft and paper backgrounds). `--color-line` itself is untouched.
- **Systemic flag:** same shared-token root cause as issue 1 — `--color-line`
  is too light against `--color-paper`/`--color-soft` for anything relying on
  it as a functional (non-decorative) boundary.

### 3. Invalid ARIA usage on the "blind editor mode" toggle — FIXED
- **File/line:** `web-engine/app/index.html:40`
- **WCAG:** 4.1.2 Name, Role, Value — Serious
- **Detail:** `<a data-blind-editor-toggle href="#" aria-pressed="false">` —
  `aria-pressed` is only a valid state for the `button` role (and a few
  widget roles); it is not supported on the default `link` role, so
  assistive tech may not expose the pressed/unpressed state at all.
- **Fix:** Added `role="button"` to the anchor so `aria-pressed` is valid,
  and (see issue 4) added Space-key support in `web-engine/app/js/main.js` so
  the element also behaves like a real button for keyboard users, not just
  visually/semantically.

### 4. Toggle only fired on Enter, not Space (via issue 3's role="button") — FIXED
- **File:** `web-engine/app/js/main.js`, `initBlindEditorMode()`
- **WCAG:** 2.1.1 Keyboard, 4.1.2 Name/Role/Value — Moderate
- **Detail:** Native `<a>` elements fire a `click` event on Enter but not on
  Space. Once the element carries `role="button"` (issue 3), the ARIA
  Authoring Practices button pattern expects both keys to activate it.
- **Fix:** Refactored the click handler into a shared `activate()` function
  and added a `keydown` listener that also activates on Space
  (`event.code === "Space"`), with `preventDefault()` to stop the page from
  scrolling.

### 5. `offline.html` uses literal backticks instead of `<code>` — LEFT OPEN (informational, not a WCAG defect)
- **File/line:** `ufo-connection/offline.html:7`
- **Detail:** `` Please check `ufo-connection/data/disclosure.json`. `` uses
  visual backticks rather than a `<code>` element. This is a semantic/markup
  nicety, not a WCAG 2.1 AA failure (no criterion requires code-formatting
  markup for a bare filename), so it was left as-is per the "don't refactor
  beyond what accessibility fixes require" ground rule. Flagging only for
  completeness.

## Areas checked with no findings

- **1.1.1 Non-text content:** the one static `<img>` (`index.html`'s
  `omoluabi-sketch.png`) has a full descriptive alt. Dynamically rendered
  images in `ufo-connection/js/ssl-media-field.js` pull `alt` from data and
  default to `alt=""` (correctly treated as decorative) when absent — no
  images needed a `TODO alt text` placeholder.
- **1.3.1 Info & relationships:** every page has exactly one `<h1>` and no
  skipped heading levels (verified across all 6 HTML files); `header`/`nav`/
  `main`/`footer` landmarks present; lists are real `<ul>/<ol>/<dl>`; every
  form input has an associated `<label>`.
- **1.4.1 Use of color:** status badges (`mode-*`, `verification-*`,
  `rule-*`, `publication-*`) all pair color with a text label; decorative
  chart bars are `aria-hidden` and paired with a visible text count.
- **2.1.1/2.4.7 Keyboard & focus:** all pages define visible
  `:focus`/`:focus-visible` styles; no `outline: none` without a keyboard
  focus indicator, except the intentional, standard SPA pattern in
  `web-engine/app/css/app.css` (`main#app:focus { outline: none; }`) where
  `main#app` has `tabindex="-1"` and only receives *programmatic* focus on
  route change (for screen-reader announcement), never appearing in the
  normal Tab order — accepted, not a violation.
- **2.4.1 Bypass blocks:** skip links present and correctly targeted on
  every page with repeated header/nav content.
- **2.4.2 Page titled:** all 6 pages have descriptive, distinct `<title>`s.
- **2.4.4 Link purpose:** no "click here"/"read more" link text found
  anywhere in the repo.
- **3.1.1 Language of page:** `<html lang="en">` set on all 6 pages.
- **4.1.2 Name/Role/Value (other widgets):** media-selector buttons
  (`aria-pressed`), slideshow controls, motion-toggle button in the
  world-layer sandbox, and all `<details>/<summary>` disclosure widgets use
  correct native semantics or valid ARIA.
- **Motion:** `prefers-reduced-motion` is honored in
  `ufo-connection/css/ufo-connection.css`, `web-engine/app/css/app.css`, and
  the p5 sketch in `world-layer-sandbox/p5-coastal-relay/` (freezes to a
  single still frame and disables the canvas via `aria-hidden`, with a
  written text alternative in the `<figcaption>`).
- **Inline SVGs/diagrams:** none found in the repository.

## Files changed

- `site.css` — contrast override for `.text-meta`/`.text-muted`.
- `web-engine/app/css/app.css` — contrast override for `.help-text`/
  `.stepper span.locked`; border-contrast fix for review-form fields.
- `web-engine/app/index.html` — `role="button"` on the blind-editor toggle.
- `web-engine/app/js/main.js` — Space-key activation for the toggle.
