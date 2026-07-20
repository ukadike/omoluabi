# Photographic Witness Card

## System

Any SSL system using `schemas/photographic-witness.schema.json`; introduced for Omoluabi.

## Purpose

Preserves capture-level evidentiary facts for a single photograph, video frame, or burst — camera, position, orientation, capture conditions — separately from media provenance (`cards/media-provenance.card.md`) and observer perception (`cards/observer-perception.card.md`). Answers the Photographic Witness Layer's five-way distinction: what the sensor recorded, what the observer reports seeing, what the device inferred, what software enhanced, and what remains unresolved.

## Who is affected

The observer, anyone depicted or identifiable in the capture, and anyone who later relies on the record as evidence.

## Consent required

Yes, at two levels: the observation-level consent state (`cards/consent.card.md`, SSL-003) governs whether the observation may be used at all; `rights_and_risk.consent_status` on this schema is a narrower, media-specific facet (may this specific image be published) and does not replace the observation-level consent record.

## Evidence required

`capture_id`, `observation_id`, `timestamp`, and `timestamp_source`. Camera, position, and orientation fields are recorded when the hardware provides them; absent fields must not be inferred.

## Accessibility required

Yes — an accessibility record (`cards/accessibility.card.md`, SSL-004) is still required before publication; this card does not substitute for it. `observer_perception_id` links to accessibility notes specific to what the observer could and could not perceive.

## Risk level

Set per-capture via the linked observation's risk record (`cards/risk.card.md`); `rights_and_risk.sensitive_subjects` flags subjects for risk review, it does not itself finalize risk.

## What AI may do

Suggest a `capture_mode` classification, flag low-light or obstruction conditions, or draft a calibration-status guess for human confirmation (SSL-005).

## What AI may not do

Reclassify `capture_mode` from `computational_reconstruction` to `optical` (or the reverse) without human confirmation, publish, erase, override consent, finalize risk, or decide publication status (SSL-005).

## Human decision required

Yes — a human must confirm `capture_mode`, `calibration_status`, and `rights_and_risk` before publication (SSL-006).

## Archive status

Preserved with full version history regardless of publication status, alongside its linked observation.

## Publication status

Not applicable directly; governed by the linked observation's `schemas/publication.schema.json` record.

## Federation status

Not yet scoped; see `architecture/sync-and-federation.md`.

## Version

Schema: `schemas/photographic-witness.schema.json`. MVP Rule: no photographic capture enters SSL without a Photographic Witness record, and the original file it points to via `media_provenance_id` is never silently replaced by an enhanced derivative.

## Source

Authored per Workstream 2 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/01-photographic-witness-case-study.md`.
