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

## Status: prototype running

`app/` is the first running implementation of this directory's plans — a browser-only human review interface over the ten screens in `screens.md`, gated in the exact order of `architecture/governance-pipeline.md`, plus a manual "New observation" form so an observation can be created without a field device (`source.origin_type: "web-form"`). It is not the production web engine: no framework decision has been made, there is no sync/backend, and AI assist is a labeled stub (no model wired in). See `app/README.md` for how to run it and what it deliberately does not do yet.

## Directory Index

- `architecture.md` — stack and MVP user flow
- `screens.md` — first screens list (now implemented — see `app/`)
- `local-first-plan.md` — local-first storage; prototype decision recorded, production still research
- `p5-ml5-prototype-plan.md` — role of p5.js/ml5.js prototyping, and what it must not be used for
- `app/` — running prototype: review screens, governance gate, local IndexedDB store

## Source

Synthesizes `09_web_engine/WEB_ENGINE_MVP.md` and the Web Engine Principle from `01_directives/CLAUDE_CODE_MASTER_DIRECTIVE.md`.