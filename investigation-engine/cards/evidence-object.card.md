# Evidence Object Card

## System

investigation-engine (any domain; see `docs/research-domains.md`).

## Purpose

The traceable material a Claim is built from: a document, image, audio, video,
dataset, testimony, sensor reading, or physical object, with full provenance,
authenticity status, and explicit unknowns. Nothing exists without provenance.

## Who is affected

Whoever the evidence concerns or names, whoever collected or holds it, and anyone who
later relies on a Claim built from it.

## Consent required

Where the evidence includes personal testimony or identifiable subjects, yes — reuses
`governance/consent-model.md` from the repository root. Externally sourced documents
and public datasets still require a `source_id`, but not a consent record.

## Evidence required

`original_source`, `acquired_at`, `domain`, `authenticity_status`, `research_state`.
`unknowns` and `open_questions` are required fields, not optional — see
`docs/transparency-rules.md`.

## Reasoning transparency

Every reasoning layer applied to this evidence (`architecture/reasoning-layers.md`)
produces its own `schemas/reasoning-step.schema.json` record, linked by
`evidence_id`.

## Accessibility required

Yes — `accessibility_id` links to `schemas/accessibility.schema.json`. Audio/video
evidence needs captions/transcripts before it can support a Claim above `unverified`.

## Risk level

Set via the linked `schemas/risk.schema.json` record where personal data or sensitive
subject matter is involved (Privacy Review reasoning layer).

## What AI may do

Draft a transcript, translation, authenticity assessment, or confidence score
proposal; flag a contradiction (SSL-005).

## What AI may not do

Assert `authenticity_status: verified` or set `research_state` unilaterally; delete or
hide `unknowns` to make evidence look more settled than it is (IE-005).

## Human decision required

Yes, before any Claim built from this evidence can move past `human_review`
(`governance/human-governance.md`).

## Reversibility

Yes — `authenticity_status` and `research_state` can change as new information
arrives; prior values remain visible through `schemas/correction.schema.json`
(IE-002).

## Publication status

One of: private, internal_review, public, embargoed, withdrawn.

## Version

Schema: `schemas/evidence-object.schema.json`.
