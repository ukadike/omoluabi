# Investigation Engine

A domain-agnostic reasoning architecture for Omoluabi: a way of turning raw evidence
into inspectable, reversible, human-governed conclusions, in any research domain.

## Status

Scaffolded, not implemented. Everything in this directory is documentation, JSON
Schemas, and plans — following the same convention as `device/`, `web-engine/`, and
`api/` elsewhere in this repository (see root `ROADMAP.md`). No reasoning code runs
yet. Where the master specification called for a capability that cannot be
schema-defined today (bias detection, image analysis, sensor correlation, and other
reasoning layers), the corresponding entry in `architecture/reasoning-layers.md` is
marked `[Planned]` or `[Research]` rather than described as if it exists.

## Core Principle

> Omoluabi never begins from a conclusion. Omoluabi begins from evidence.

This is the same principle as SSL-001 (Observation First) in `governance/rule-library.md`,
generalized from "observation" to "evidence" for reasoning that spans documents,
testimony, sensor data, and images rather than only field observations.

## Constitutional Rules

See `governance/constitutional-rules.md` for the full set. In summary:

1. Every conclusion must be reversible.
2. Every source must remain traceable.
3. Every reasoning step must remain inspectable.
4. Human judgment is always the final authority.

## Why This Lives in Omoluabi, Not a New Repository

The Investigation Engine reuses Omoluabi's existing governed-record model rather than
inventing a parallel one:

- Evidence provenance reuses `schemas/source.schema.json`.
- Evidence accessibility reuses `schemas/accessibility.schema.json`.
- Publication of a conclusion follows the same governance loop as any other Omoluabi
  record: Observation → Consent → Source → Risk → Accessibility → Human Review →
  Publication Status → Archive → API-ready record.
- AI's role is bounded by the same rule: SSL-005 (AI Is Assistive) — AI may suggest,
  summarize, classify, or draft a reasoning step; AI may not govern, publish, or
  finalize a conclusion.

See `research/design-decisions/ADR-0005-investigation-engine-reuses-governed-record-model.md`
in the root `research/` directory for the decision record.

## What This Is

- a universal evidence model (`architecture/evidence-model.md`, `schemas/evidence-object.schema.json`)
- a library of reasoning layers that can be applied to evidence and claims
  (`architecture/reasoning-layers.md`)
- a research-state vocabulary for claims (`architecture/research-states.md`)
- an investigation workflow (`architecture/workflow.md`)
- a knowledge graph model connecting entities, claims, and evidence
  (`architecture/knowledge-graph.md`)
- a set of intelligence modes and output formats for different audiences
  (`architecture/intelligence-modes.md`, `docs/output-formats.md`)
- a transparency contract every output must satisfy (`docs/transparency-rules.md`)
- an accessibility contract for every artifact this engine produces (`docs/accessibility.md`)

## What This Is Not

- not a fact-generation system — it has no authority to assert truth, only to
  organize evidence and show its reasoning
- not domain-specific — no research domain (journalism, science, UAP investigation,
  history, and so on) receives special-cased logic; all use the same schemas and layers
- not autonomous — every conclusion requires human review before publication (SSL-006)
- not a replacement for `schemas/observation.schema.json` — an Evidence Object may be
  built from one or more Observations, but is a distinct record type for reasoning
  over already-captured material, not for field capture itself

## Repository Map

- `architecture/` — system overview, evidence model, reasoning layers, research
  states, workflow, knowledge graph, intelligence modes
- `governance/` — constitutional rules and human-governance model specific to
  reasoning and conclusions (distinct from, and layered on top of, root `governance/`)
- `schemas/`, `cards/` — machine-readable schemas and human-readable companion cards
  for evidence, claims, reasoning steps, contradictions, confidence scores, knowledge
  graph entities, and investigation cases
- `docs/` — universal research domains, output formats, transparency rules,
  accessibility requirements
- `examples/` — example governed records

## Source

Synthesizes the "Omoluabi Investigation Engine — Complete Claude Code Package
(Master Specification)" delivered by Kemi on 2026-07-07. The master specification is
the canonical scope reference; this scaffold is the first pass at converting it into
Omoluabi's existing schema-first, governance-first structure. Nothing in the master
specification has been reduced — components that cannot yet be implemented are marked
`[Planned]` or `[Research]` in `architecture/reasoning-layers.md`, not removed.
