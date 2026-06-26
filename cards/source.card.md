# Source Card

## System

Any SSL system using `schemas/source.schema.json`.

## Purpose

Identifies where an observation came from: origin type, device, collector, or import method (SSL-002).

## Who is affected

The observer/collector, and anyone assessing the record's credibility.

## Consent required

Not directly — but the source record should not itself leak consent-restricted identity beyond what the consent record permits.

## Evidence required

`origin_type` (web-form / field-device / import / sensor), and at least one of collector, device, or import method.

## Accessibility required

Not directly.

## Risk level

Not assessed here; see `cards/risk.card.md`.

## What AI may do

Suggest a likely origin type or device match from available metadata.

## What AI may not do

Fabricate a source where none is known, or erase provenance (SSL-005).

## Human decision required

Required only if an AI-suggested source needs confirmation.

## Archive status

Preserved alongside the observation indefinitely.

## Publication status

Not applicable directly.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/source.schema.json`.

## Source

Authored to pair with `schemas/source.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
