# Observation Card

## System

omoluabi, earth-sensors-lab, echo, ounje, accessible-by-design, umada (any SSL system; see `schemas/observation.schema.json`'s `system` enum).

## Purpose

Defines the smallest unit of governed knowledge in Omoluabi. What was seen, heard, measured, recorded, or reported — before interpretation.

## Who is affected

The observer, the observation's subject(s) if any, and anyone who later relies on the record.

## Consent required

Yes — every observation must declare a consent state before sharing (SSL-003). See `cards/consent.card.md`.

## Evidence required

Title/description of what was observed, system, observer, date/time, location or location status, and any attached media.

## Accessibility required

Yes — accessibility metadata is required before publication (SSL-004). See `cards/accessibility.card.md`.

## Risk level

Set per-observation via the linked risk record; see `cards/risk.card.md`.

## What AI may do

Suggest a transcript, translation, alt text, entities, risk flags, or a summary (SSL-005).

## What AI may not do

Publish, erase, override consent, finalize risk, or decide publication status (SSL-005).

## Human decision required

Yes — a human must review and approve publication status (SSL-006).

## Archive status

Preserved with full version history regardless of publication status.

## Publication status

One of: private, internal_review, public, embargoed, withdrawn. See `governance/publication-status.md`.

## Federation status

Not yet scoped; see `architecture/sync-and-federation.md`.

## Version

Schema: `schemas/observation.schema.json`. MVP Rule: no object enters SSL without an Observation Card.

## Source

Synthesizes `OBSERVATION_CARD.md` and the Shared Card Template from `STABLE_SCHEMA_CARDS.md`, in the packet delivered by Kemi on 2026-06-26.
