# Schemas

JSON Schemas (draft 2020-12) for Omoluabi's governed record types.

## Core Schemas

- `observation.schema.json` — the smallest unit of governed knowledge (verbatim from the packet delivered by Kemi on 2026-06-26)
- `consent.schema.json`
- `source.schema.json`
- `risk.schema.json`
- `accessibility.schema.json`
- `publication.schema.json`
- `correction.schema.json`
- `ai-permission.schema.json`
- `federation.schema.json`
- `memory.schema.json`

## Photographic Witness Layer

Extend, and do not replace, `observation.schema.json`'s `media` object. See `cards/photographic-witness.card.md` and `docs/research/speculative-instrumentation/01-photographic-witness-case-study.md`.

- `photographic-witness.schema.json` — capture-level facts: camera, position, orientation, capture conditions
- `media-provenance.schema.json` — original vs. derivative files, hashes, alteration history, chain of custody
- `observer-perception.schema.json` — the human observer's own account, separate from sensor output

## Cartographic Witness Layer

Extend, and do not replace, `observation.schema.json`'s `location` object. See `cards/location-evidence.card.md` and `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.

- `location-evidence.schema.json` — canonical measured coordinates, datum, accuracy, fix type
- `landscape-memory.schema.json` — coexisting local, historical, administrative, and disputed place names, plus features
- `movement-trace.schema.json` — time-indexed movement tracks with disclosed interpolation status
- `projection-accountability.schema.json` — projection, purpose, and distortion disclosure for any rendered map view
- `map-missingness.schema.json` — gaps in the map dataset itself, distinct from a physically erased feature
- `location-protection.schema.json` — exact vs. generalized vs. withheld coordinate precision for sensitive locations

## Schema Philosophy

Each schema is intended to be:

- human-readable
- machine-validatable
- API-ready
- versioned
- accessibility-aware
- governance-linked

## Status

`observation.schema.json` is verbatim from the source packet. The remaining fifteen were authored to satisfy `SCHEMA_INDEX.md`'s "Core Schemas to Implement" list and the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02), and are first drafts — minimal, internally consistent with `governance/` and cross-referenced to it, but not yet reviewed by Kemi. Where a schema makes a judgment call beyond what the packet specified (e.g., `risk.schema.json`'s risk-level scale, `memory.schema.json`'s shape, or any of the nine Photographic/Cartographic Witness Layer schemas' enums), its `description` field says so.

Companion human-readable documents live in `cards/`, one per schema, following the Shared Card Template from `STABLE_SCHEMA_CARDS.md`.

## Source

Synthesizes `SCHEMA_INDEX.md` from the packet delivered by Kemi on 2026-06-26.
