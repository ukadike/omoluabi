# Publication Card

## System

Any SSL system using `schemas/publication.schema.json`.

## Purpose

Records the human decision that sets an observation's publication status (SSL-006). See `governance/publication-status.md`.

## Who is affected

Anyone who would see, or stop seeing, the observation as a result of the decision.

## Consent required

The decision must respect the linked consent record's state; see the open reconciliation question in `governance/consent-model.md`.

## Evidence required

A `status` value, who decided, and when.

## Accessibility required

Indirectly — `public` status requires an accessibility record to already exist (SSL-004).

## Risk level

The decision should reflect the linked risk record's assessment (SSL-008).

## What AI may do

Nothing — AI may not decide public status (SSL-005).

## What AI may not do

Set or change `status` (SSL-005, SSL-006).

## Human decision required

Yes, always (SSL-006).

## Archive status

Every publication decision is preserved; a later decision is a new record, not an overwrite.

## Publication status

This card's subject.

## Federation status

Only `public` records are candidates for federation/API exposure (Constitutional Principle #13).

## Version

Schema: `schemas/publication.schema.json`.

## Source

Authored to pair with `schemas/publication.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
