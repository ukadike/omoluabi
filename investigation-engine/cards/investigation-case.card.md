# Investigation Case Card

## System

investigation-engine (any domain).

## Purpose

The top-level container for an investigation: its domain, intelligence mode, current
workflow stage, every linked Evidence Object/Claim/Reasoning Step/Contradiction/graph
entity, which output formats it has produced, and the human-governance approval gate.

## Who is affected

Everyone named or implicated across the case's evidence and claims; the case's
authors and reviewers; readers of any published output.

## Consent required

Inherited from every linked Evidence Object; a case adds no independent consent
requirement.

## Evidence required

`title`, `domain`, `intelligence_mode`, `workflow_stage`, a populated
`human_governance` block.

## Reasoning transparency

`reasoning_step_ids` and `contradiction_ids` must reflect every reasoning layer
actually applied across the case's claims and evidence — a case cannot reach
`approved` status with reasoning steps missing for claims above `unverified`.

## Accessibility required

`accessibility_id` required before any output format is produced; see
`docs/accessibility.md`.

## Risk level

The most restrictive risk level among all linked evidence governs the case's
`publication_status` ceiling, per root `governance/publication-status.md`.

## What AI may do

Propose the case shell, draft claims and reasoning steps within it, draft any output
format (SSL-005).

## What AI may not do

Set `human_governance.approval_status` to `approved`; set `publication_status` to
`public` (SSL-006, IE-005).

## Human decision required

Yes — `human_governance.approval_status` must reach `approved`, with
`approved_by` and `decided_at` recorded, before any output leaves `internal_review`.

## Reversibility

Yes — an `approved` case can be reopened at the `Repeat` workflow stage
(`architecture/workflow.md`) if new evidence or a new contradiction is filed against
it.

## Publication status

One of: private, internal_review, public, embargoed, withdrawn.

## Version

Schema: `schemas/investigation-case.schema.json`.
