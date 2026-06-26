# Sync and Federation

**Status: research — not yet scoped.**

## What Is Locked

- Federation exposes governed records, not raw extraction (Constitutional Principle #13, `governance/principles.md`).
- Only approved fields and public-safe records become API-exposable (`architecture/data-lifecycle.md`, step 8).
- Stable schemas should be designed as future public API objects (SSL-010).

## Open Questions

- What does a federation manifest schema look like, and what trust model does it assume between nodes?
- Push vs. pull: does a node publish to subscribers, or do subscribers query a node on demand?
- Should a placeholder `schemas/federation.schema.json` and `cards/federation.card.md` be drafted now as a structural placeholder, or deferred until the single-node web engine and API are working?
- How does sync behave for a field device that is offline for extended periods (SSL-009, Local First)?

None of these are answered in the source material. This file exists so the open questions are tracked rather than silently resolved.

## Source

Synthesizes SSL-009, SSL-010, and Constitutional Principle #13 from `GOVERNANCE_CORE.md`, and step 8 of `DATA_LIFECYCLE.md`, in the packet delivered by Kemi on 2026-06-26.
