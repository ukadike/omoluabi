# Projection Accountability Card

## System

Any SSL system using `schemas/projection-accountability.schema.json`; introduced for Omoluabi.

## Purpose

Discloses the projection, purpose, preserved properties, and known distortions behind any rendered map view, so a map is never shown without a visible source, projection, date, scale, and uncertainty state.

## Who is affected

Anyone reading a rendered map view and forming a conclusion about size, shape, distance, or direction from it.

## Consent required

Not applicable directly.

## Evidence required

`projection_accountability_id`, `projection`, `recorded_at`. `known_distortions` should be populated whenever the projection is known to distort a property relevant to the map's stated purpose.

## Accessibility required

Yes — the projection disclosure itself must be readable by screen reader, not conveyed only through a legend graphic (SSL-004).

## Risk level

Not applicable directly.

## What AI may do

Suggest known distortions for a named projection from reference material, for human confirmation (SSL-005).

## What AI may not do

Select a projection to make a place appear larger, smaller, or differently located than the underlying `schemas/location-evidence.schema.json` supports (SSL-005).

## Human decision required

A human confirms the projection disclosure before a map view using it may be published.

## Archive status

Preserved alongside each distinct map view it accounts for.

## Publication status

Not applicable directly.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/projection-accountability.schema.json`. MVP Rule: no map view renders without an associated Projection Accountability record.

## Source

Authored per Workstream 3 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02); see `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`.
