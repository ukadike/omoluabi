# Cartographic Witness Layer — Interface Components

Design documentation only. Nothing described here is implemented; the web engine's running prototype (`web-engine/app/`) does not yet include map views. See `web-engine/screens.md` for the currently implemented review screens.

## Governing rule

No map view may appear without a visible source, projection, date, scale, and uncertainty state (`schemas/projection-accountability.schema.json`). This rule applies to every component below that renders a map, not only to a dedicated "map screen."

## Cards

### Location Evidence Card

Summary view for one `schemas/location-evidence.schema.json` record: coordinates, accuracy, fix type, measurement method, and a status chip distinguishing measured (`gnss_receiver`, `paired_device`) from `manual_entry` or `map_estimate`. Never displays a bare coordinate pair without its accuracy and CRS.

### Landscape Memory Card

Lists `local_names`, `historical_names`, `administrative_names`, and `disputed_names` as parallel, equally weighted lists — not a single "name" field with alternates in a footnote — plus `natural_features`, `built_features`, and `erased_features`.

### Movement Trace Card

Summary of a `schemas/movement-trace.schema.json` record: point count, time span, and an `interpolation_status` badge. Opens into the trajectory and time scrubber (below).

### Projection Accountability Card

Shows `projection`, `projection_purpose`, `properties_preserved`, `known_distortions`, and `source_dataset`/`source_resolution`. This card is the disclosure the governing rule requires on every map view; a map view without a linked Projection Accountability Card is a defect, not an acceptable minimal state.

### Map Missingness Card

Shows `missingness_type`, `area_description`, and any `community_testimony_reference`, rendered as visible text overlaid on or adjacent to the relevant map region — not only as an empty tile.

### Coordinate Protection Card

Shows `exact_location_access` and `public_location_precision` from `schemas/location-protection.schema.json`. Where `public_location_precision` is `generalized_region` or `withheld`, this card is the only place the location appears at all — no other component may leak the exact coordinate.

## Views

### Before / After landscape viewer

Paired rendering of two `schemas/landscape-memory.schema.json` states (or a `movement-trace.before_after_state` pair) for the same `location_evidence_id`, dated and sourced per the governing rule. Mirrors the Photographic Witness Layer's Original vs. Derived comparison view in `docs/mvp/interface/photographic-witness-interface.md` — neither state is visually favored.

### Trajectory and time scrubber

Renders `schemas/movement-trace.schema.json` `points` along a timeline, with `interpolation_status` shown as a persistent, non-dismissible badge whenever any segment is interpolated. Must offer a tabular, non-visual equivalent per SSL-004.

### Globe view / Africa-centered view / equal-area view / local high-accuracy view

Four alternative projections of the same underlying `location-evidence` data, each carrying its own `projection-accountability` record. Switching views must not silently change which properties (area, shape, distance, direction) are preserved without updating the visible disclosure.

### Coordinate table view

A plain data table of `location-evidence` records (coordinates, accuracy, datum, fix type) with no map rendering at all — the accessible, screen-reader-first alternative to every map view above, per SSL-004's no-visual-only-meaning rule.

### Uncertainty overlay

Renders `horizontal_accuracy_m` / `vertical_accuracy_m` as a visible radius or band around a point, never a precise pin implying exactness the measurement does not support.

### Erased-place overlay

Renders `landscape-memory.erased_features` on the map or table view, sourced from witness testimony, with the testimony's own risk/consent status respected (see `cards/risk.card.md`, `cards/location-protection.card.md`).

### Indigenous/community naming overlay & Administrative naming overlay

Two separate, independently toggleable overlays over the same `landscape-memory` names data — never merged into one label per location, since the schema itself is designed to hold multiple simultaneous names.

## Accessibility notes (apply to all components above)

- No status (measured vs. estimated, protected vs. public, interpolated vs. measured) is conveyed by color alone.
- Every map-bearing view has a Coordinate table view equivalent reachable without using the map.
- Uncertainty and missingness are always disclosed as text, never only as visual absence.

## Open questions

- Whether overlays compose (e.g. Erased-place + Uncertainty simultaneously) or are mutually exclusive is undecided.
- Exact tile/basemap source for any rendered map is not yet chosen; whatever is chosen must itself have a `projection-accountability` record.

## Source

Authored per Workstream 3 ("Required cartographic interface components") of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
