# Repository Audit

Audit performed as part of the Small Systems Lab ecosystem-wide restoration pass (Omoluabi, priority #4 of ~8). This document is descriptive, not prescriptive: it records what was found, what was changed in this pass, and what is left for Kemi to decide. It does not delete or rewrite existing content beyond the additive fixes listed under "Completed changes."

## Purpose

Omoluabi is an open research initiative developing trustworthy infrastructure for observation, documentation, accessibility, provenance, consent, and civic knowledge, and the lead project of Small Systems Lab. Its first live-implementation concept, Omoluabi-News, is an accessible portable newsroom system. The repository is a public scaffold: documentation, JSON Schemas, governance rules, architecture plans, and two working demonstrations (`ufo-connection/`, `world-layer-sandbox/`), with device firmware, web engine, and API still at the plan/draft stage (`ROADMAP.md`).

## Current Structure

17 top-level content directories, all scaffolded per `ROADMAP.md`: `accessibility/`, `api/`, `architecture/`, `cards/`, `device/`, `diagrams/`, `docs/`, `earth-sensors-lab-bridge/`, `examples/`, `funding/`, `governance/`, `research/`, `schemas/`, `ufo-connection/`, `umada-sandbox/`, `web-engine/`, `world-layer-sandbox/`. Plus root meta files (`000_START_HERE.md`, `README.md`, `ROADMAP.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`, `LICENSE-DOCS.md`, `SSL-METHOD.md`, `OPERATIONS-RULES-ANCIENT-GEOMETRY.md`) and a static site (`index.html`, `site.css`, `variables.css`).

Directory-level READMEs exist for: `cards/`, `device/`, `diagrams/`, `schemas/`, `ufo-connection/`, `earth-sensors-lab-bridge/`, `umada-sandbox/`, `web-engine/`, `world-layer-sandbox/`, `docs/vision/`. Six directories have **no** `README.md` of their own: `api/`, `architecture/`, `docs/`, `funding/`, `governance/`, `research/`. This is consistent across the repo (not an isolated gap) and is covered instead by `000_START_HERE.md`'s Repository Map plus dense cross-linking between individual files — functional, but means someone browsing GitHub's file tree directly into `api/` (for example) lands on a file listing with no orienting text. Noted as a minor, optional improvement, not a defect requiring immediate action.

## Homepage / Entry Point

`README.md` is the GitHub-rendered entry point and is well-formed: it states the project in one line, links to `000_START_HERE.md`, `ROADMAP.md`, and `SSL-METHOD.md`, links both demos, and clearly states the two-license split. `000_START_HERE.md` is the deeper orientation doc, with an explicit numbered "Read First" order and a full Repository Map. `index.html` is the public GitHub Pages landing page and duplicates some README framing intentionally (as a rendered page rather than markdown) — this is expected, not accidental duplication.

## Important Pages

`000_START_HERE.md`, `README.md`, `ROADMAP.md`, `docs/vision.md`, `docs/mvp-plan.md`, `governance/principles.md`, `governance/rule-library.md`, `schemas/README.md`, `cards/README.md`, `index.html`, `ufo-connection/README.md` + `ufo-connection/index.html`, `world-layer-sandbox/README.md`.

## Orphan Pages

None found. Every markdown file and every non-vendor asset is reachable by following links from `README.md` / `000_START_HERE.md` outward, or is a sibling file referenced by its directory's README/index (e.g. each `cards/*.card.md` and `schemas/*.schema.json` is listed in its directory's README). `world-layer-sandbox/p5-coastal-relay/vendor/p5.min.js` is third-party vendored code, not orphaned content, and is disclosed as such in `README.md`'s license section.

## Broken Links

None found. A repository-wide scan of every relative markdown link (`[text](path)`, excluding `http(s)://`, `#anchor`, and `mailto:` links) across all `.md` files resolved with zero broken targets. `index.html` and `ufo-connection/index.html` relative links were spot-checked and resolve correctly (`ufo-connection/`, `ufo-connection/README.md`, `world-layer-sandbox/p5-coastal-relay/`, `world-layer-sandbox/README.md`, `SSL-METHOD.md`).

## Missing Navigation (found and fixed this pass)

- No root `INDEX.md` sitemap existed. **Fixed**: added `INDEX.md` linking every major doc and directory in one place, organized by section, including explicit links out to Accessible by Design and Earth Sensors Lab.
- No root `SCHEMA_CARD.md` existed. **Fixed**: added a one-page project/data card per the ecosystem template (purpose, audience, core concepts, data structures, interfaces, inputs/outputs, dependencies, related repos, accessibility, future notes).
- `accessibility/baseline.md` had no explicit link to **Accessible by Design** (`github.com/ukadike/accessible-by-design-prototyping`), the sibling SSL repo that develops the WCAG 2.2+ auditing methodology this baseline draws on — even though `schemas/observation.schema.json`'s `system` enum already lists `accessible-by-design` as a peer SSL system. **Fixed**: added a "Related Work" section with the link and an accurate one-line description of that repo (verified by reading its README directly, not fabricated).
- `earth-sensors-lab-bridge/README.md` described the bridge relationship but never linked to the actual Earth Sensors Lab repository. **Fixed**: added a "Related Repository" section linking `github.com/ukadike/Earth-Sensors-Lab`.

## Missing Documentation

- `device/README.md` is a single short note ("Resolved: Consent vs. Publication Status") and does not index its own sibling files (`parts-list.md`, `circuit-notes.md`, `enclosure-notes.md`, `firmware-plan.md`, `accessibility-hardware.md`) the way `cards/README.md`, `schemas/README.md`, `diagrams/README.md`, and `web-engine/README.md` do with an explicit file list. Not fixed in this pass — device content itself is complete; only the local index list is missing. **Recommended**: add a short "Directory Index" section to `device/README.md` mirroring the pattern used in `web-engine/README.md`.
- `api/`, `architecture/`, `docs/`, `funding/`, `governance/`, `research/` have no directory README (see Current Structure above). **Recommended, not urgent**: low-cost fix would be a one-line index file per directory, but `000_START_HERE.md` already serves this purpose adequately.
- `accessibility/keyboard-workflow.md` explicitly flags open questions (keybindings, tab order, focus-trap handling) — correctly logged as open, not fabricated.

## Duplicated / Outdated Files

- `CHANGELOG.md` was significantly stale: its only "Unreleased" entry described the original documentation scaffold (`docs/`, `governance/`, `architecture/`, `research/`, `CONTRIBUTING.md`) and listed "remaining build stages" (`schemas/`, `cards/`, `device/`, `web-engine/`, `api/`, `accessibility/`, `diagrams/`, `examples/`, `funding/`, `umada-sandbox/`, `earth-sensors-lab-bridge/`) as still open, even though `ROADMAP.md` and the git history show all of them were completed, along with the dual-license adoption, ADR-0004, the `ufo-connection/` demo, and the `world-layer-sandbox/` sketch. **Fixed**: added an "Added (later scaffolding stages)" section summarizing what actually shipped (derived from `ROADMAP.md` and commit history, not invented), and narrowed "Open" to the one item `ROADMAP.md` itself still lists as open (first running implementation of any layer).
- `README.md`'s "What this is" framing (device + web engine, portable newsroom) and `000_START_HERE.md`'s "What This Is / What This Is Not" framing are complementary rather than duplicative — no action needed.

## Accessibility Issues

Checked `index.html` and `ufo-connection/index.html` against semantic HTML / keyboard nav / alt text / no-color-only-meaning:

- `index.html`: has a skip link (`<a class="skip-link" href="#main">`), a proper heading hierarchy, `aria-labelledby` on every `<section>`, one meaningful image with full descriptive alt text, and no color-only status indicators (states are listed as text, e.g. "Consent unclear," "Unsafe to publish"). No issues found.
- `ufo-connection/index.html`: has `lang="en"`, a skip link, a real `<h1>` and `<h2>`s with matching `aria-labelledby` heading IDs on every section, and contains no `<img>` tags (data-driven, no images), so the "0 alt attributes" finding from an initial automated pass is not a gap — there is nothing needing alt text on this page. No issues found in the static markup; dynamic content is rendered through `js/app.js` using `textContent` only, per the demo's own documented hard rule against `innerHTML` for external data.
- `world-layer-sandbox/p5-coastal-relay/index.html`: verified the README's accessibility claims are accurate in the actual code — the canvas is `aria-hidden="true"` (set in `sketch.js`), a `<figcaption>` provides a text alternative, `prefers-reduced-motion` is respected, and the motion toggle button uses `aria-pressed` and `:focus-visible` styling. No issues found.
- `ufo-connection/offline.html` is minimal (plain `<h1>`/`<p>` fallback) — appropriate for its purpose as an offline/error fallback page, not a full page requiring the same structure.

No accessibility defects found in the pages audited. This is not a substitute for a full automated + human WCAG 2.2 audit; see the new cross-reference to Accessible by Design in `accessibility/baseline.md` for where that tooling lives.

## Code Quality Issues

- No `TODO`/`FIXME`/`XXX` markers found in any tracked markdown, JS, HTML, or YAML file.
- `ufo-connection/package.json` has zero runtime dependencies by design (documented rationale: avoids CORS/War.gov fetch issues and keeps the cache job dependency-free) — intentional, not an omission.
- `api/openapi-draft.yaml` correctly marks every response `"Draft — not yet implemented"` and the file's own description warns "No endpoint should be called by production code" — consistent with `ROADMAP.md`'s scaffolded-not-implemented status.
- No broken schema `$ref`s: `api/openapi-draft.yaml` references `../schemas/*.schema.json` for `observation`, `consent`, `risk`, `accessibility`, `publication` — all five files exist.

## Recommended Changes (not made in this pass — need Kemi's review or are low priority)

1. Add a short "Directory Index" list to `device/README.md` for consistency with other directory READMEs.
2. Consider one-line README files for `api/`, `architecture/`, `docs/`, `funding/`, `governance/`, `research/` if browsing-without-context becomes a real pain point; currently mitigated by `000_START_HERE.md`.
3. Nine of ten schemas (all except `observation.schema.json`) are still first drafts awaiting Kemi's review, per `schemas/README.md` — no change recommended here, just flagging that this review is still outstanding.
4. `diagrams/federation.mmd` remains a stub pending scoping of federation (`architecture/sync-and-federation.md`) — no action needed until that scoping happens.

## Canon Cross-Check (Umada)

Per the ecosystem brief, `examples/umada-archive-fragment.json` and `umada-sandbox/` content were checked against `/home/user/Umada/00_governance/CANON_STATUS.md` (read-only). The fragment's `created_at` ("2226-03-19T00:00:00Z") and its reference to "Cape Wipeout" match the Umada canon ledger's locked entry ("Cape Wipeout — March 19, 2226, near Cape Agulhas") exactly. `location.precision` is `"withheld"`, consistent with the fragment's own framing as an obscured future-reporter record. **No factual mismatch found** — nothing flagged as "Needs Kemi review" on canon grounds. `umada-sandbox/README.md` already correctly disclaims that it shares a name with, but is not canon for, the `ukadike/Umada` narrative project.

## Completed Changes (this pass)

- Added `INDEX.md` (root sitemap).
- Added `SCHEMA_CARD.md` (root project/data card).
- Added this file, `docs/REPO_AUDIT.md`.
- Added a "Related Work" cross-reference from `accessibility/baseline.md` to Accessible by Design (`github.com/ukadike/accessible-by-design-prototyping`).
- Added a "Related Repository" cross-reference from `earth-sensors-lab-bridge/README.md` to Earth Sensors Lab (`github.com/ukadike/Earth-Sensors-Lab`).
- Brought `CHANGELOG.md` up to date with a summary of completed scaffolding stages, sourced from `ROADMAP.md` and commit history, replacing the stale "still open" list.

## What Remains / Needs Kemi's Review

- Schema review: nine of ten schemas in `schemas/` are unreviewed first drafts.
- Optional `device/README.md` directory index (cosmetic, low priority).
- Optional per-directory README files for `api/`, `architecture/`, `docs/`, `funding/`, `governance/`, `research/` (cosmetic, low priority).
- No canon conflicts were found in this pass, so nothing from `examples/umada-archive-fragment.json` or `umada-sandbox/` requires Kemi's sign-off at this time.
