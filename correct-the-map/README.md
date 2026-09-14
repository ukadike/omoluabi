# Correct the Map — Omoluabi Map-Data Case Study

## Purpose

This published proof of concept investigates the 2026 United Nations General Assembly resolution *Correct the Map* and uses a documented projection comparison to show how the Mercator and Equal Earth projections produce different public understandings of relative land area.

It does **not** claim that a new map changes Africa's area, that the UN prohibited every use of Mercator, or that any flat map is fully accurate. It makes the projection choice inspectable.

## Editorial rule

**Maps are evidence objects.** A published map must name:

- its purpose;
- projection and coordinate reference system;
- data and boundary source;
- place-name and language choices;
- date and provenance;
- accessibility description;
- known distortion and uncertainty;
- whether it is being used for navigation, comparative area, distance, thematic data, or another task.

## Current publication set

- `index.html` — public case study.
- `assets/projection-comparison.svg` — static Mercator / Equal Earth comparison, made from the same Natural Earth dataset.
- `map-data.yml` — reusable Map-Data card for the visualization.
- `SOURCE_NOTES.md` — source ledger and limits.
- `data/claims.json` — machine-readable claim register.

## Publication gate

Do not call a projection “accurate” without naming the property at stake. An equal-area projection is accurate for relative area; it is not simultaneously accurate for distance, direction, and shape everywhere.

Do not use a generalized world map to settle a territorial, border, naming, or sovereignty dispute. Publish the data source and a clear limitation instead.
