# Map Missingness Card

## System

Any SSL system using `schemas/map-missingness.schema.json`; introduced for Omoluabi.

## Purpose

Records gaps, low resolution, redaction, or disputed coverage in a map dataset itself — distinct from `cards/landscape-memory.card.md`'s `erased_features`, which records physical landscape features reported as destroyed or removed. A map can be missing data about a place that still exists; a place can be erased while its map data remains accurate. This card and Landscape Memory track those two failure modes separately.

## Who is affected

Anyone relying on a map view who would otherwise assume silence means "nothing there" rather than "not measured here."

## Consent required

Not applicable directly.

## Evidence required

`map_missingness_id`, `area_description`, `recorded_at`.

## Accessibility required

Yes — missingness must be disclosed as visible, readable text on any map view, not only as a visual gap or blank tile (SSL-004; see the Map Missingness overlay in `docs/mvp/interface/cartographic-witness-interface.md`).

## Risk level

Not applicable directly, unless the missingness itself is sensitive (e.g. `redacted` for a witness-protection reason) — route through `cards/risk.card.md` in that case.

## What AI may do

Suggest a `missingness_type` from dataset metadata (e.g. detecting a no-data tile), for human review (SSL-005).

## What AI may not do

Infer or fill in missing map content and present it as measured (SSL-005) — this is the same rule as `movement-trace.card.md`'s interpolation constraint, applied to map coverage instead of a track.

## Human decision required

A human confirms `missingness_type` before it is shown on a public map view.

## Archive status

Preserved alongside the map view or location it describes.

## Publication status

Not applicable directly.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/map-missingness.schema.json`. MVP Rule: a gap in the data is disclosed, never silently rendered as empty space with no explanation.

## Source

Authored per Workstream 3 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.
