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

## Schema Philosophy

Each schema is intended to be:

- human-readable
- machine-validatable
- API-ready
- versioned
- accessibility-aware
- governance-linked

## Status

`observation.schema.json` is verbatim from the source packet. The remaining nine were authored to satisfy `SCHEMA_INDEX.md`'s "Core Schemas to Implement" list and are first drafts — minimal, internally consistent with `governance/` and cross-referenced to it, but not yet reviewed by Kemi. Where a schema makes a judgment call beyond what the packet specified (e.g., `risk.schema.json`'s risk-level scale, `memory.schema.json`'s shape), its `description` field says so.

Companion human-readable documents live in `cards/`, one per schema, following the Shared Card Template from `STABLE_SCHEMA_CARDS.md`.

## Source

Synthesizes `SCHEMA_INDEX.md` from the packet delivered by Kemi on 2026-06-26.
