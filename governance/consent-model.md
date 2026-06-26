# Consent Model

**Status: resolved.** See ADR-0004.

## What Is Locked

- SSL-003 — Consent State Required: every observation must declare consent state before sharing.
- Consent is versioned (Constitutional Principle #3): a consent record's history must be preserved, not overwritten.
- AI cannot override consent (SSL-005, `governance/ai-permissions.md`).

## Resolution

The packet described two consent-adjacent models that looked like they needed reconciling into one:

1. A planned **device-level consent switch** with three physical states: `private`, `consented`, `review-public` (source: `DEVICE_MVP_PLAN.md`, Controls).
2. A **schema-level publication status** with five states: `private`, `internal_review`, `public`, `embargoed`, `withdrawn` (see `governance/publication-status.md`).

These are not one model — they are two distinct, sequential fields:

- **Consent** answers whether an observation may be used at all, on terms the subject agreed to. It is set at or near capture time, typically via the device switch.
- **Publication status** answers where an observation currently lives. It is a later, separate, human-governed editorial decision (SSL-006).

A three-position physical switch was never required to express five publication states directly, because it isn't setting that field. What the device switch does set is the consent state, which then constrains which publication statuses are reachable later.

## Consent → Publication Status Constraint Table

| Device consent state | Reachable publication statuses | Notes |
|---|---|---|
| `private` | `private` only | The subject did not consent to sharing; no editorial path forward until consent changes. |
| `consented` | any of the five states | Sharing is permitted; a human still decides the specific status via review (SSL-006). |
| `review-public` | any of the five states | Signals the observer's belief that public release may be appropriate, but does not skip human review — it is a recommendation, not an approval. |

This table governs `schemas/consent.schema.json` and `schemas/publication.schema.json` together. See ADR-0004 for the full reasoning.

## Source

Synthesizes `DEVICE_MVP_PLAN.md` consent-switch language and `MVP_ARCHITECTURE.md` publication states, from the packet delivered by Kemi on 2026-06-26. Resolved per ADR-0004, 2026-06-26.
