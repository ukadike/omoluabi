# Landscape Memory Card

## System

Any SSL system using `schemas/landscape-memory.schema.json`; introduced for Omoluabi.

## Purpose

Lets local, historical, administrative, and disputed place names coexist for the same location, along with natural, built, and erased features, instead of one naming authority silently overwriting another.

## Who is affected

Communities who hold local or historical names for a place, anyone whose testimony documents an erased feature, and anyone reading the record later.

## Consent required

Yes for `witness_descriptions` — a witness account should not be attached without the same consent standard applied to any other observation testimony (SSL-003).

## Evidence required

`landscape_memory_id`, `location_evidence_id`, `recorded_at`. Every named-arrays entry should be attributable (informally, in the array text itself, pending a future structured-attribution revision).

## Accessibility required

Yes — plain-language descriptions of features are part of this record's purpose (SSL-004); avoid jargon-only feature names without a description.

## Risk level

Disputed names and erased-feature reports can be sensitive; route through `cards/risk.card.md` before public exposure.

## What AI may do

Suggest a `natural_features` or `built_features` entry from available imagery or text, for human review (SSL-005).

## What AI may not do

Resolve a naming dispute, decide which name is "correct," or remove a name from `disputed_names` (SSL-005) — this schema is designed specifically to avoid a single authoritative name.

## Human decision required

Yes — a human confirms any AI-suggested feature or name entry before publication.

## Archive status

All name arrays are preserved together; a later addition does not remove an earlier name.

## Publication status

Not applicable directly; governed by the linked observation's `schemas/publication.schema.json` record.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/landscape-memory.schema.json`. MVP Rule: no array in this schema is truncated to a single "preferred" entry.

## Source

Authored per Workstream 3 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.
