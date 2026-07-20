# Media Provenance Card

## System

Any SSL system using `schemas/media-provenance.schema.json`; introduced for Omoluabi.

## Purpose

Separates original media from derivatives, and records file hashes, processing operations, and alteration history, so an enhanced or AI-assisted image is never silently substituted for the original.

## Who is affected

The observer, anyone depicted in the media, and any later reviewer or editor who needs to know whether they are looking at an original or a derivative.

## Consent required

Not directly — but derivative processing must not be used to circumvent a consent or risk restriction already attached to the original (e.g. cropping out a face does not remove the need for the subject's consent record).

## Evidence required

`media_provenance_id`, `original_file`, `original_hash`, and `recorded_at`. Every derivative listed in `derivative_files` must itself carry a `derivation` note.

## Accessibility required

Not directly; see `cards/accessibility.card.md` for the record's alt text and other accessibility metadata.

## Risk level

Not assessed here; see `cards/risk.card.md`. An enhancement or reconstruction that changes what a viewer would conclude from the image should be flagged for risk re-review, not treated as cosmetic.

## What AI may do

Suggest `enhancement_status` or `reconstruction_status` values, draft a description of a processing operation, or propose a derivative for human review (SSL-005).

## What AI may not do

Delete, overwrite, or reorder `alteration_history`; mark its own output `human_verified`; or cause a derivative to replace `original_file` in any interface (SSL-005; interface rule from Workstream 2's "Original vs. Derived" requirement).

## Human decision required

Yes — a human must confirm any `ai_enhanced` or reconstructed derivative before it may be shown alongside the original.

## Archive status

The original file and its hash are preserved indefinitely, regardless of publication status. Derivatives may be regenerated; the original is never deleted to make room for a derivative.

## Publication status

Not applicable directly; governed by the linked observation's `schemas/publication.schema.json` record. A derivative's own `publication_scope` (via the linked `photographic-witness` record's `rights_and_risk`) constrains which version may be shown publicly.

## Federation status

Not yet scoped; see `architecture/sync-and-federation.md`.

## Version

Schema: `schemas/media-provenance.schema.json`. MVP Rule: `original_hash` is written once, at capture, and is never recomputed to match a later edit.

## Source

Authored per Workstream 2 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/01-photographic-witness-case-study.md`.
