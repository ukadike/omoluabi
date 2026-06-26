# Consent Card

## System

Any SSL system using `schemas/consent.schema.json`.

## Purpose

Records how an observation's subject(s) permit it to be used and shared, and preserves that permission's history.

## Who is affected

The observation's subject(s), the observer, and anyone relying on the record downstream.

## Consent required

This card *is* the consent record (SSL-003).

## Evidence required

A declared `state` (`private` / `consented` / `review-public`), who recorded it, and when.

## Accessibility required

Not directly — but the consent-collection process itself should be accessible (see `accessibility/`, planned).

## Risk level

Not assessed here; see `cards/risk.card.md`.

## What AI may do

Nothing — consent state is set by a human or device control, never inferred or set by AI (SSL-005).

## What AI may not do

Override, infer, or change a consent state (SSL-005).

## Human decision required

Yes, unless captured directly via a device control at the point of observation.

## Archive status

Every `consent_version` is preserved; consent is versioned, not overwritten (Constitutional Principle #3).

## Publication status

Not applicable directly — consent gates publication status but is tracked separately. See `governance/consent-model.md` for the open question of how the two relate.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/consent.schema.json`.

## Source

Authored to pair with `schemas/consent.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
