# ADR-0004: Consent and Publication Status Are Distinct, Sequential Fields

**Status:** accepted

## Context

ADR-0003 flagged an open question: the device's planned consent switch has three physical states (`private` / `consented` / `review-public`), while the schema-level `publication_status` field has five states (`private` / `internal_review` / `public` / `embargoed` / `withdrawn`). The source packet never stated how a three-position switch should map onto a five-state enum.

## Decision

Consent and publication status are not the same model and are not meant to collapse into one. They are two distinct, sequential fields:

- **Consent** (`schemas/consent.schema.json`) is set at or near capture time, typically via the device's physical switch. It answers whether an observation may be used at all, on terms the subject agreed to.
- **Publication status** (`schemas/publication.schema.json`) is a later, separate, human-governed editorial decision (SSL-006). It answers where an observation currently lives.

Consent constrains which publication statuses are reachable (a `private` consent state limits publication status to `private`), but a three-state physical switch was never required to express five publication states directly, because it isn't setting that field.

## Why

Treating these as one model to reconcile assumed a problem that didn't exist: it conflated what is captured in the field with what is decided later in editorial review. Keeping them separate also matches the existing governance loop (`docs/mvp-plan.md`): Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive. Consent and publication status are already distinct stages in that loop; this ADR formalizes that they should also be distinct schema fields with a documented constraint relationship, not a single shared enum.

## Consequences

- `governance/consent-model.md` and `governance/publication-status.md` document the constraint table (which consent states permit which publication statuses).
- The eight public-facing "evidence states" used on the live site (Human observed, Machine suggested, Context missing, Consent unclear, Protected uncertainty, Unsafe to publish, Ready for review, Withheld) are documented as derived presentation labels computed from consent, source, risk, accessibility, and publication_status — not a ninth field to maintain by hand. See `governance/publication-status.md`.
- `schemas/consent.schema.json` and `schemas/publication.schema.json` descriptions are updated to point to this ADR instead of flagging an open question.
- The exact derivation logic for evidence-state labels is not yet implemented; this ADR documents intended behavior, not running code.

## Source

Resolves the open question raised in ADR-0003, per Kemi's confirmation on 2026-06-26 to proceed with this reconciliation approach.
