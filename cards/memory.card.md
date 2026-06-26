# Memory Card

## System

Any SSL system using `schemas/memory.schema.json`; named explicitly as a shared card in `ESL_BRIDGE.md`.

## Purpose

Status: draft. Models a community or oral-memory contribution that may reference one or more observations. The packet names a Memory Card without specifying its shape; this is a first draft pending review.

## Who is affected

Contributors of the memory, and anyone the memory concerns.

## Consent required

Yes — linked via `consent_id`, same as an observation (SSL-003).

## Evidence required

A `recorded_at` timestamp at minimum; ideally a title, description, and linked observations.

## Accessibility required

Yes, in principle — not yet broken out into its own field set; likely should reuse `cards/accessibility.card.md`.

## Risk level

Not yet scoped; a community memory could carry risk similar to an observation.

## What AI may do

Not yet scoped; likely the same assistive-only bounds as `governance/ai-permissions.md`.

## What AI may not do

Not yet scoped; likely the same bounds as `governance/ai-permissions.md`.

## Human decision required

Yes, for publication status, by analogy with observations (SSL-006).

## Archive status

Not yet scoped.

## Publication status

Reuses the same five-state model as observations: private, internal_review, public, embargoed, withdrawn.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/memory.schema.json`.

## Source

Authored to pair with `schemas/memory.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task and the Memory Card reference in `STABLE_SCHEMA_CARDS.md` and `ESL_BRIDGE.md`, in the packet delivered by Kemi on 2026-06-26.
