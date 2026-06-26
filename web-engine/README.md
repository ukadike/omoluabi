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

Local-first storage and sync design, conflict resolution, and the production framework choice are not yet scoped. See `local-first-plan.md`.

## Directory Index

- `architecture.md` — stack and MVP user flow
- `screens.md` — first screens list
- `local-first-plan.md` — local-first storage, status: research
- `p5-ml5-prototype-plan.md` — role of p5.js/ml5.js prototyping, and what it must not be used for

## Source

Synthesizes `09_web_engine/WEB_ENGINE_MVP.md` and the Web Engine Principle from `01_directives/CLAUDE_CODE_MASTER_DIRECTIVE.md`.