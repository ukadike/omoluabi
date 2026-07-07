# Contradiction Card

## System

investigation-engine (any domain).

## Purpose

A recorded conflict between two or more Claims or Evidence Objects, so that
disagreement is preserved and tracked rather than silently resolved in favor of
whichever claim was drafted last.

## Who is affected

Authors of both conflicting claims/evidence, and any reader who needs to know a
conclusion is disputed.

## Consent required

None beyond what the conflicting Claims/Evidence Objects already require.

## Evidence required

`subject_ids` (minimum two), `description`, `resolution_status`, `identified_at`.

## Reasoning transparency

Identifying a contradiction is itself a reasoning-layer output (Contradiction
Detection) and should be linked from a `schemas/reasoning-step.schema.json` record.

## Accessibility required

`description` and `resolution_notes` should be written in plain language, since
contradiction reports (`docs/output-formats.md`) are read by non-expert reviewers.

## Risk level

Escalate to `governance/human-governance.md` review when `severity` is
`unresolved_critical`.

## What AI may do

Flag a contradiction and describe it (SSL-005).

## What AI may not do

Set `resolution_status` to `resolved` or `resolved_by_retraction` unilaterally
(IE-005).

## Human decision required

Yes — resolving a contradiction is a human decision, recorded in `resolution_notes`.

## Reversibility

Yes — `resolution_status` can move back to `unresolved` if the resolution is later
challenged.

## Publication status

Surfaces through the Contradiction report output format; unresolved contradictions
should not be omitted from a published Claim's supporting materials.

## Version

Schema: `schemas/contradiction.schema.json`.
