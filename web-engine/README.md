# Web Engine

## Web Engine Principle

The web engine is not a CMS. It is public-interest editorial intelligence infrastructure.

## Why does this exist?

To give the governance loop (Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive → API-ready record) a usable interface for humans who review, correct, and publish observations.

## Who benefits?

Journalists, community archivists, researchers, educators, accessibility practitioners, and the human reviewers required by `governance/governance-pipeline.md`.

## What problem does it solve?

Observation packages arrive from the device or from manual entry as structured JSON. Someone has to be able to read, review, correct, and decide on publication status for those records without writing code.

## What is governed here?

The web engine never bypasses the governance pipeline. It surfaces consent, source, risk, and accessibility fields for human review; it does not decide publication status on its own.

## What is still unknown?

Sync design, conflict resolution across devices, and the production framework choice are not yet scoped. See `local-first-plan.md`. The storage layer question is answered for the prototype only (browser IndexedDB) — that is a prototype decision, not a production ruling.

## Status: prototype RETIRED (2026-08-16) — new plan designated, AWAITING FRAGMENT

The browser-only prototype that implemented this directory's plans is retired,
per Kemi's direction (2026-08-16) that a new web engine plan supersedes it. It
is preserved intact — and still runs — in the
[Omoluabi-News repository](https://github.com/ukadike/omoluabi-news) at
`archive/engine-browser-prototype/` (see its `ARCHIVED.md` for full
provenance: built here as `web-engine/app/`, moved there as `engine/` per
Kemi's 2026-07-08 direction, then archived).

The new plan is documented in Omoluabi-News's `engine/`: Kemi's planning
conversation is preserved at `engine/sources/planning-conversation-2026-08.md`,
with draft spec documents reconstructed from it (per-section provenance
markers) in `engine/docs/` and `engine/tasks/`. The two original files Kemi
uploaded to that conversation remain `AWAITING FRAGMENT` — see that repo's
`engine/README.md` for the index and open questions. The web engine's home
remains Omoluabi-News.

This directory keeps the prototype-era planning documentation as provenance.
What carries over to any future engine regardless of stack is the governance,
not the prototype: the pipeline order, human-only publication decisions,
advisory-only AI assist, and accessibility as infrastructure.

## Directory Index

- `architecture.md` — stack and MVP user flow
- `screens.md` — first screens list (implemented by the retired prototype — see the Omoluabi-News repo's `archive/engine-browser-prototype/`)
- `local-first-plan.md` — local-first storage; prototype decision recorded, production still research
- `p5-ml5-prototype-plan.md` — role of p5.js/ml5.js prototyping, and what it must not be used for

## Source

Synthesizes `09_web_engine/WEB_ENGINE_MVP.md` and the Web Engine Principle from `01_directives/CLAUDE_CODE_MASTER_DIRECTIVE.md`.