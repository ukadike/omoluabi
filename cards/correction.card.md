# Correction Card

## System

Any SSL system using `schemas/correction.schema.json`.

## Purpose

Preserves what changed, when, why, and by whom when a prior record is corrected (SSL-007). See `governance/correction-model.md`.

## Who is affected

Anyone who read or relied on the prior (incorrect) value, and the record's subject.

## Consent required

Not directly.

## Evidence required

The field or claim corrected, the prior value, the new value, who, when, and why — all six are required (SSL-007).

## Accessibility required

Not directly, though the correction's reason should be in plain language where possible.

## Risk level

Not assessed here directly.

## What AI may do

Draft a proposed correction for human review.

## What AI may not do

Apply a correction without human review, or delete the prior value (SSL-005, SSL-007).

## Human decision required

Yes — a human confirms the correction.

## Archive status

A correction is an additive record; the prior value is preserved, never deleted (Constitutional Principle #8).

## Publication status

Corrections to a public record remain visible alongside it.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/correction.schema.json`.

## Source

Authored to pair with `schemas/correction.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
