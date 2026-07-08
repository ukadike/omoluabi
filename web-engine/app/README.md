# Web Engine — Running Prototype

First running implementation of the plans in `web-engine/`. A browser-only
human review interface over the ten screens in `../screens.md`, gated in
the order of `../../architecture/governance-pipeline.md` — plus a manual
"New observation" authoring form, so the pipeline can be used end to end
without a field device.

## Run it

Serve this repository's root over HTTP (ES modules and `fetch` both need
`http://`, not `file://`):

```bash
cd omoluabi
python3 -m http.server 8000
```

Then open `http://localhost:8000/web-engine/app/index.html`.

On first load it seeds one observation from this repo's own worked
examples (`../../examples/omoluabi-field-observation.json` and the
`examples` arrays in `../../schemas/*.schema.json`) so the pipeline has a
real record to review.

## What it does

- A "New observation" form (`#/new`) that creates an observation plus its
  linked consent, source, risk, and accessibility records by hand — no
  device required. Recorded with `source.origin_type: "web-form"`, an enum
  value the schema already defined for exactly this path. The new record
  enters the same gated pipeline as any other; authoring it does not
  mark any stage reviewed.
- Inbox of observations, each showing how many governance stages are reviewed.
- Observation detail with a pipeline stepper (Source → Consent → Risk →
  Accessibility → AI assist → Human review → Publication status).
- One review screen per stage, rendering the actual fields from that
  record's schema and requiring a named reviewer before it can be marked
  reviewed.
- An AI assist screen that shows a labeled stub suggestion (no model is
  wired in) and requires an explicit human Accept/Reject — nothing is
  auto-verified.
- A human review sign-off screen and a publication status decision screen,
  each locked until every earlier stage is reviewed.
- An Archive/search screen with JSON export, disabled for records whose
  publication decision is still `private` or undecided.
- A News feed (`#/news`) — the public reader view. Shows only records with
  an explicit human publication decision of `public` (the decision record
  is the canonical gate per ADR-0004, not the observation's own
  `publication_status` field). Embargoed, withdrawn, internal-review,
  private, and undecided records never appear. Each story carries its
  provenance and a link back to the full governed record — "public does
  not mean context-free" (Constitutional Principle 12).

## What it deliberately does not do

- No network calls, no backend, no sync. Everything lives in this
  browser's IndexedDB — see `../local-first-plan.md`.
- No production framework decision. Plain HTML/CSS/ES modules, chosen for
  the same reason `p5-ml5-prototype-plan.md` sanctions p5.js/ml5.js for
  prototyping: to test the screens before committing to a stack. (p5.js
  itself was not used here — its canvas-first rendering model conflicts
  with the accessibility-first requirement in
  `../../accessibility/baseline.md`; this review UI needs semantic HTML,
  not a canvas.)
- No real AI model. The AI assist screen is a labeled stub so the human-
  in-the-loop controls (Accept / Reject / human_verified) can be exercised
  honestly without pretending a model exists.
- No encryption-at-rest, no conflict resolution, no multi-device sync —
  all open per `../local-first-plan.md`.

## Files

- `index.html` — shell: skip link, header, `<main id="app">`, footer.
- `css/app.css` — extends the shared `variables.css` tokens; no new colors.
- `js/store.js` — IndexedDB wrapper, one object store per schema type.
- `js/seed-data.js` — the repo's own example records, copied verbatim.
- `js/gate.js` — governance-pipeline stage order and lock/current/complete logic.
- `js/ai-assist.js` — labeled stub suggestion generator, advisory only.
- `js/views.js` — render functions for all ten screens plus the New Observation authoring form and the News feed reader view.
- `js/router.js` — hash router; moves focus to `<main>` on every navigation.
- `js/main.js` — seeds the store on first run, then starts the router.
