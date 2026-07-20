# Location Protection Card

## System

Any SSL system using `schemas/location-protection.schema.json`; introduced for Omoluabi.

## Purpose

Governs whether a location's exact coordinates are exposed publicly, generalized, or withheld, for protected, sacred, ecological, or witness-sensitive locations — while the exact internal coordinates remain available to the review process that needs them.

## Who is affected

Anyone at ecological or personal risk if a location's exact coordinates were published (e.g. a sensitive ecological site, a witness's home, a sacred site).

## Consent required

Yes — `consent_status` records whether the location's subject/community has consented to any level of public exposure; distinct from, and does not replace, the observation's general consent record (SSL-003).

## Evidence required

`location_protection_id`, `location_evidence_id`, `public_location_precision`, `recorded_at`. `reason_for_restriction` is required whenever `exact_location_access` is `restricted`.

## Accessibility required

Not directly; the generalized public description of a protected location should still meet the same plain-language standard as any other place description (`cards/landscape-memory.card.md`).

## Risk level

This card overlaps with `cards/risk.card.md`: `ecological_risk` and `witness_risk` are location-specific risk facets that should inform, but do not replace, the linked observation's general risk assessment.

## What AI may do

Flag a location as a likely candidate for protection (e.g. proximity to a known sensitive category), for human review (SSL-005).

## What AI may not do

Decide `exact_location_access` or `public_location_precision` on its own, or reduce an already-set protection level (SSL-005, SSL-008 — risk before reach).

## Human decision required

Yes — a human sets and can only a human loosens `exact_location_access` or `public_location_precision` once set.

## Archive status

The exact coordinates are preserved for internal review regardless of what is generalized or withheld publicly.

## Publication status

Constrains, but is not itself, the linked observation's `schemas/publication.schema.json` status — a `withheld` `public_location_precision` should block any publication status that would expose it.

## Federation status

A `restricted` `exact_location_access` should block federation/API exposure of exact coordinates; exact mechanism not yet scoped, mirroring `cards/risk.card.md`'s same caveat for high/severe risk.

## Version

Schema: `schemas/location-protection.schema.json`. MVP Rule: `public_location_precision` defaults to requiring an explicit human decision — there is no default value in the schema itself.

## Source

Authored per Workstream 3 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.
