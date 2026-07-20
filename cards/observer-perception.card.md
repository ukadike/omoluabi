# Observer Perception Card

## System

Any SSL system using `schemas/observer-perception.schema.json`; introduced for Omoluabi.

## Purpose

Preserves what the human observer reports seeing, and any perceived difference between that account and what the media actually shows, so a technically limited capture (low light, obstruction, motion blur) is not mistaken for — or dismissed as contradicting — the observer's testimony.

## Who is affected

The observer whose account is recorded, and anyone weighing the capture's evidentiary weight against the observer's testimony.

## Consent required

Governed by the linked observation's consent record (`cards/consent.card.md`); this schema does not introduce a separate consent state.

## Evidence required

`observer_perception_id`, `capture_id`, and a `description` in the observer's own words. `confidence` is self-reported, not a system-computed score, and must be labeled as such wherever it is displayed (see the Evidence Confidence panel in `docs/mvp/interface/photographic-witness-interface.md`).

## Accessibility required

Yes — `accessibility_notes` records what the observer could and could not perceive (e.g. low vision, non-visual observation via audio/tactile means), feeding the record's overall accessibility description (SSL-004).

## Risk level

Not assessed here; see `cards/risk.card.md`.

## What AI may do

Suggest a plain-language summary of the observer's account, or flag apparent inconsistency between the account and the capture for human review (SSL-005).

## What AI may not do

Alter the observer's own words in `description`, assign or adjust `confidence` on the observer's behalf, or resolve a flagged inconsistency (SSL-005).

## Human decision required

Yes — the observer's account is entered or confirmed by a human; any AI-drafted summary requires human verification before it stands alongside the original account.

## Archive status

Preserved verbatim alongside the capture it describes, with full version history.

## Publication status

Not applicable directly; governed by the linked observation's `schemas/publication.schema.json` record.

## Federation status

Not yet scoped; see `architecture/sync-and-federation.md`.

## Version

Schema: `schemas/observer-perception.schema.json`. MVP Rule: the observer's own account is never overwritten by a machine-generated description.

## Source

Authored per Workstream 2 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/01-photographic-witness-case-study.md`.
