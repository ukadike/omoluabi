# Consent Model

**Status: draft — needs reconciliation.**

## What Is Locked

- SSL-003 — Consent State Required: every observation must declare consent state before sharing.
- Consent is versioned (Constitutional Principle #3): a consent record's history must be preserved, not overwritten.
- AI cannot override consent (SSL-005, `governance/ai-permissions.md`).

## Open Question

The packet describes two consent-adjacent models that have not been reconciled:

1. A planned **device-level consent switch** with three physical states: `private`, `consented`, `review-public` (source: `DEVICE_MVP_PLAN.md`, Controls).
2. A **schema-level publication status** with five states: `private`, `internal_review`, `public`, `embargoed`, `withdrawn` (see `governance/publication-status.md`).

These are related — both gate what happens to an observation after capture — but they are not the same model, and the source material never states how a three-position physical switch maps onto a five-state publication enum. Possible directions, none yet decided:

- The device switch could set an initial/default consent state that is distinct from, and prior to, publication status (consent answers "may this be used at all," publication status answers "where does it currently live").
- The device switch could be a simplified field-facing subset that maps onto a fixed pair/triple of the five publication states (e.g., `private`→`private`, `consented`→`internal_review`, `review-public`→`public`), with `embargoed` and `withdrawn` only reachable later, during human review.
- The device could expose more than three physical states (if the hardware allows), removing the need to compress five states into three.

This needs a decision from Kemi before `schemas/consent.schema.json` is finalized.

## Source

Synthesizes `DEVICE_MVP_PLAN.md` consent-switch language and `MVP_ARCHITECTURE.md` publication states, from the packet delivered by Kemi on 2026-06-26.
