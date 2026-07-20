# Schemas — Investigation Engine

JSON Schemas (draft 2020-12) for the Investigation Engine's record types. These
cross-reference, rather than duplicate, the root `schemas/` directory: evidence
provenance reuses `schemas/source.schema.json`, accessibility metadata reuses
`schemas/accessibility.schema.json`, and corrections reuse
`schemas/correction.schema.json`.

## Schemas

- `evidence-object.schema.json` — the master evidence model (`architecture/evidence-model.md`)
- `claim.schema.json` — a statement derived from evidence, with a research state and full transparency record
- `reasoning-step.schema.json` — one application of a reasoning layer (`architecture/reasoning-layers.md`) to a claim or evidence object
- `contradiction.schema.json` — a recorded conflict between claims or evidence
- `confidence-score.schema.json` — a scored confidence value with required rationale
- `knowledge-graph-entity.schema.json` — a node in the investigation knowledge graph (`architecture/knowledge-graph.md`)
- `investigation-case.schema.json` — the top-level container: domain, intelligence mode, workflow stage, linked records, and the human-governance gate

## Schema Philosophy

Same as root `schemas/README.md`: human-readable, machine-validatable, API-ready,
versioned, accessibility-aware, governance-linked.

## Status

All seven are first drafts — internally consistent with `governance/` in this
directory and cross-referenced with the root `schemas/`, but not yet reviewed by Kemi.
Where a schema makes a judgment call the master specification didn't fix (for example,
`reasoning-step.schema.json`'s `status` enum, or leaving `relationship_type` on
`knowledge-graph-entity.schema.json` as free text rather than a closed enum), its
`description` field says so.

Companion human-readable documents live in `cards/`, one per schema, following the
adapted Shared Card Template in `cards/README.md`.

## Source

Synthesizes the Master Evidence Model, Master Reasoning Layers, Research States,
Knowledge Graph, and Human Governance sections of the "Omoluabi Investigation Engine
— Complete Claude Code Package (Master Specification)" delivered by Kemi on 2026-07-07.
