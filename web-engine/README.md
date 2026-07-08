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

## Status: prototype running — in the Omoluabi-News repository

The running implementation of this directory's plans lives in the
[Omoluabi-News repository](https://github.com/ukadike/omoluabi-news) at
`engine/`, per Kemi's direction (2026-07-08) that Omoluabi-News is where the
web engine lives. It was first built here as `web-engine/app/` and moved there
intact: a browser-only human review interface over the ten screens in
`screens.md`, gated in the exact order of `architecture/governance-pipeline.md`,
plus a manual "New observation" form (`source.origin_type: "web-form"`, required
headline) and a news preview of records with a human `public` decision.

It is not the production web engine: no framework decision has been made, there
is no sync/backend, and AI assist is a labeled stub (no model wired in). This
directory remains the planning documentation and source of truth the engine
implements.

## Directory Index

- `architecture.md` — stack and MVP user flow
- `screens.md` — first screens list (implemented — see the Omoluabi-News repo's `engine/`)
- `local-first-plan.md` — local-first storage; prototype decision recorded, production still research
- `p5-ml5-prototype-plan.md` — role of p5.js/ml5.js prototyping, and what it must not be used for

## Source

Synthesizes `09_web_engine/WEB_ENGINE_MVP.md` and the Web Engine Principle from `01_directives/CLAUDE_CODE_MASTER_DIRECTIVE.md`.