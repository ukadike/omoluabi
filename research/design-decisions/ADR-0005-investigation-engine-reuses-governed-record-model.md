# ADR-0005: The Investigation Engine Reuses Omoluabi's Governed-Record Model

**Status:** accepted

## Context

Kemi delivered a master specification, "Omoluabi Investigation Engine — Complete
Claude Code Package," on 2026-07-07, describing a domain-agnostic reasoning
architecture: an evidence model, 34 reasoning layers, 10 research states, a 13-stage
investigation workflow, a knowledge graph, 12 intelligence modes, 13 output formats,
and a human-governance model. The specification does not say whether this should be a
new repository, a new governance model, or an extension of Omoluabi's existing schema
and governance structure.

## Decision

The Investigation Engine is scaffolded as a new top-level directory,
`investigation-engine/`, inside the existing `omoluabi` repository, following the same
schema-first, cards-plus-schemas, governance-before-AI pattern established by
ADR-0001 and ADR-0002. It reuses existing root schemas rather than duplicating them:

- Evidence provenance uses `schemas/source.schema.json` (via `source_id`), not a new
  provenance model.
- Accessibility metadata uses `schemas/accessibility.schema.json` (via
  `accessibility_id`).
- Corrections and retractions use `schemas/correction.schema.json`.
- Publication follows the same governance loop and `publication_status` enum as every
  other Omoluabi record (Observation → Consent → Source → Risk → Accessibility →
  Human Review → Publication Status → Archive).
- AI's bounds follow SSL-005 (AI Is Assistive) and SSL-006 (Human Publication),
  extended by four new rules specific to reasoning and conclusions
  (`investigation-engine/governance/constitutional-rules.md`, IE-001 through IE-005).

## Why

Building a second, parallel provenance/accessibility/governance model inside the same
repository would create two sources of truth for the same concepts (who touched this
record, is it accessible, who approved its release) with no principled reason for the
split — the master specification's own evidence model (source, accessibility status,
chain of custody) is a superset of, not a departure from, what `schemas/` already
governs. Reuse also keeps the constitutional promise consistent across the whole
repository: "AI assists. Rules govern. Humans publish." applies identically whether
the record is a field Observation or an investigative Claim.

## Consequences

- New schemas were added only for record types that do not already exist elsewhere:
  `evidence-object`, `claim`, `reasoning-step`, `contradiction`, `confidence-score`,
  `knowledge-graph-entity`, `investigation-case`
  (`investigation-engine/schemas/README.md`).
- The 34 reasoning layers are documented with an explicit status
  (`investigation-engine/architecture/reasoning-layers.md`): Scaffolded,
  `[Planned]`, or `[Research]`. None were dropped, merged away, or silently
  descoped to make the surface area appear smaller than the specification.
- No running code exists for any reasoning layer, output-format generator, or
  knowledge-graph renderer — this matches the existing status of `device/`,
  `web-engine/`, and `api/` elsewhere in the repository (documentation and schemas
  only; see root `ROADMAP.md`).
- The master specification is the canonical scope; this ADR and the
  `investigation-engine/` scaffold are the first implementation pass, not a reduction
  of scope. Any future simplification requires explicit human approval, per the
  master specification's own closing instruction.

## Source

Resolves the repository-placement and reuse-vs-duplicate question raised by the
"Omoluabi Investigation Engine — Complete Claude Code Package (Master Specification)"
delivered by Kemi on 2026-07-07.
