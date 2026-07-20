# Location Evidence Card

## System

Any SSL system using `schemas/location-evidence.schema.json`; introduced for Omoluabi.

## Purpose

Stores canonical geographic measurement — coordinates, datum, accuracy, fix type, measurement method — independently of any later map projection or rendering. Central rule: coordinates are measured evidence; a map projection is an interpretation of that evidence.

## Who is affected

The observer, anyone whose location is being recorded, and anyone who later relies on the coordinates as evidence.

## Consent required

Governed by the linked observation's consent record; a location's public exposure is separately governed by `cards/location-protection.card.md`, which this record links to via `location_evidence_id`.

## Evidence required

`location_evidence_id`, `observation_id`, `latitude`, `longitude`, `recorded_at`. `coordinate_reference_system` is required whenever coordinates are present so no consumer assumes a default CRS.

## Accessibility required

Not directly; plain-language place descriptions live in `cards/landscape-memory.card.md`.

## Risk level

Not assessed here; see `cards/risk.card.md`. A high `horizontal_accuracy_m` (imprecise fix) is a data-quality flag, not a risk flag.

## What AI may do

Suggest a likely `measurement_method` or flag an implausible coordinate for human review (SSL-005).

## What AI may not do

Estimate or fabricate coordinates where none were measured, or upgrade `fix_type`/accuracy figures beyond what the receiver reported (SSL-005).

## Human decision required

Required only if an AI-suggested field needs confirmation.

## Archive status

Preserved indefinitely alongside the observation.

## Publication status

Not applicable directly; public exposure of the exact coordinates is governed by `cards/location-protection.card.md`.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/location-evidence.schema.json`. MVP Rule: this schema never claims centimeter accuracy as a default — accuracy fields reflect what the receiver and conditions actually delivered.

## Source

Authored per Workstream 3 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.
