# Movement Trace Card

## System

Any SSL system using `schemas/movement-trace.schema.json`; introduced for Omoluabi.

## Purpose

Records a time-indexed track of positions for measurable movement through a geographic field — an observer's route, or a described movement such as weather, debris, or a technological fragment.

## Who is affected

The observer whose route is being traced, and anyone who relies on the trace to understand movement over time.

## Consent required

Governed by the linked observation's consent record; a route trace that would reveal a protected location should route through `cards/location-protection.card.md` before publication.

## Evidence required

`movement_trace_id`, `recorded_at`, and at least one point in `points`. `interpolation_status` is required so a trace with gaps is never displayed as if fully measured.

## Accessibility required

Yes — the interface rendering this trace (see the trajectory/time scrubber in `docs/mvp/interface/cartographic-witness-interface.md`) must offer a non-visual, tabular equivalent (SSL-004).

## Risk level

Not assessed here directly; see `cards/risk.card.md`. A trace through a sensitive area should trigger risk review before publication.

## What AI may do

Suggest interpolated points between sparse measurements, clearly flagged via `interpolation_status`, for human review (SSL-005).

## What AI may not do

Present interpolated points as measured, or silently smooth a track without disclosing it in `interpolation_status` (SSL-005).

## Human decision required

Yes — a human confirms any interpolation before the trace is treated as complete.

## Archive status

Preserved with full point history; corrections use `schemas/correction.schema.json`.

## Publication status

Not applicable directly; governed by the linked observation's `schemas/publication.schema.json` record.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/movement-trace.schema.json`. MVP Rule: `interpolation_status` must be set whenever any point was not directly measured.

## Source

Authored per Workstream 3 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.
