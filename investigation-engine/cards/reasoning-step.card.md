# Reasoning Step Card

## System

investigation-engine (any domain).

## Purpose

A record of one application of a named reasoning layer
(`architecture/reasoning-layers.md`) to a Claim or Evidence Object — what layer ran,
on what input, what it concluded, and whether it's actually implemented, still needs
evidence, or is a recorded placeholder. Exists so every reasoning step remains
inspectable (IE-004).

## Who is affected

Whoever the subject Claim or Evidence Object concerns; any reviewer relying on the
reasoning trail.

## Consent required

None beyond what the subject Claim/Evidence Object already requires.

## Evidence required

`layer`, `subject_type`, `subject_id`, `status`, `performed_by`, `performed_at`. A
`status: implemented` step should also carry `method` and `output_summary`.

## Reasoning transparency

This record is itself the unit of reasoning transparency. It cannot reference another
reasoning step as its own justification without also citing the underlying
evidence/claim IDs in `input_ids`.

## Accessibility required

Output summaries should be written in plain language where the step feeds a Public
Briefing or Educational Mode output.

## Risk level

None independently; inherits the subject's risk profile.

## What AI may do

Perform `status: implemented` or `status: requires_further_evidence` reasoning steps
and record them (SSL-005). Most layers currently ship as `status: placeholder` per
`architecture/reasoning-layers.md`'s `[Planned]`/`[Research]` markers.

## What AI may not do

Mark a `[Research]`-status layer (e.g. Bias Detection, Image Analysis) as
`status: implemented` without a documented method — doing so would fabricate rigor
that doesn't exist.

## Human decision required

Required before any reasoning step's `confidence_delta` can affect a Claim's
published `research_state`.

## Reversibility

Yes — a reasoning step is an append-only record; a mistaken step is corrected by
adding a new step referencing it, not by editing history.

## Publication status

Reasoning steps are internal working records; they surface to readers only through
`docs/output-formats.md`'s Contradiction report and Research report formats.

## Version

Schema: `schemas/reasoning-step.schema.json`.
