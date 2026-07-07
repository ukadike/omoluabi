# Cards — Investigation Engine

Human-readable companion documents to the JSON Schemas in `../schemas/`. Adapted from
the root Shared Card Template (`cards/README.md` at the repository root) for reasoning
record types rather than field-capture record types — "Consent required" and
"Publication status" still apply (a Claim still flows through the root governance
loop), but two fields are added that the root template doesn't need: "Reasoning
transparency" and "Reversibility."

## Shared Card Template (Investigation Engine variant)

```md
# [Name] Card

## System

## Purpose

## Who is affected

## Consent required

## Evidence required

## Reasoning transparency

## Accessibility required

## Risk level

## What AI may do

## What AI may not do

## Human decision required

## Reversibility

## Publication status

## Version
```

## Cards

1. `evidence-object.card.md`
2. `claim.card.md`
3. `reasoning-step.card.md`
4. `contradiction.card.md`
5. `confidence-score.card.md`
6. `knowledge-graph-entity.card.md`
7. `investigation-case.card.md`

## Status

All seven were authored to pair with the schemas in `../schemas/` and carry the same
first-draft status noted there.
