# Confidence Score Card

## System

investigation-engine (any domain).

## Purpose

A numeric confidence value (0-1) for a Claim, Evidence Object, or Reasoning Step, with
a required, itemized rationale — satisfying the transparency rule that confidence
scores must show why they received their score, not just what the score is.

## Who is affected

Anyone relying on the confidence figure to decide how much weight to give a claim.

## Consent required

None.

## Evidence required

`score`, and a non-empty `factors` array. A score with no factors is treated as an
incomplete record, not a valid one.

## Reasoning transparency

`known`, `assumed`, `inferred`, `unknown`, and `missing_evidence` arrays make the
basis of the score directly inspectable, mirroring `docs/transparency-rules.md`.

## Accessibility required

`factors[].note` should be written so a plain-language summary can be generated
directly from it.

## Risk level

None independently.

## What AI may do

Propose a score and its factors (SSL-005). No closed, versioned scoring rubric exists
yet — see `method`'s description in the schema and `architecture/reasoning-layers.md`'s
`[Research]` note on Confidence Scoring's underlying method.

## What AI may not do

Present a score as final without `human_verified: true` when the score will support a
`public` Claim.

## Human decision required

Yes, before the score can support moving a Claim's `publication_status` to `public`.

## Reversibility

Yes — scores are recomputed and versioned as evidence changes; prior scores are not
deleted, only superseded.

## Publication status

Confidence scores are typically internal but may surface in an Academic summary or
Research report output.

## Version

Schema: `schemas/confidence-score.schema.json`.
