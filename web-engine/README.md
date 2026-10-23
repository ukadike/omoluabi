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

## Status: prototype and production backend scaffold

- `app/` is the running browser prototype: ten review screens, local IndexedDB, and no server sync. See `app/README.md`.
- `backend/` is the first production-oriented application scaffold: Next.js, Supabase Auth/Postgres/RLS, persistent investigations, source and claim evidence, expiring intake, and human publication gates enforced in PostgreSQL. It is open for review, but needs an owner-configured Supabase and Vercel project before it can run as a hosted service. See `backend/README.md`.
- GitHub hosts source; Vercel is the intended app host; Supabase is the intended managed database and identity provider. This does not replace the local prototype or connect it to shared storage yet.
- The publication status inside the backend is an editorial state. The first release does not render public articles or provide public article distribution.
- AI assistance, private file uploads, team/workspace separation, and conflict-safe offline sync remain future work. No model makes claims or publication decisions.

## Directory Index

- `architecture.md` — chosen MVP architecture and governed workflow
- `screens.md` — first screens list, implemented by the prototype
- `local-first-plan.md` — local-first prototype decisions; production sync design remains open
- `p5-ml5-prototype-plan.md` — p5.js/ml5.js prototyping boundaries
- `app/` — browser prototype and local IndexedDB store
- `backend/` — deployable Next.js app scaffold, Supabase migration, and setup instructions

## Source

Synthesizes `09_web_engine/WEB_ENGINE_MVP.md` and the Web Engine Principle from `01_directives/CLAUDE_CODE_MASTER_DIRECTIVE.md`.
