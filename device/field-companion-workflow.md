# Field Companion Workflow

The Omoluabi Field Companion is the device role described in `docs/vision/omoluabi-origin-storyboard.md`: "allows people to capture stories before they disappear." This document turns that vision-level capability list into a concrete capture workflow, incorporating the Photographic and Cartographic Witness Layers. It revises no existing file; it is the workflow specification the storyboard's Field Companion section did not yet have.

**Status: plan, not implemented.** Like the rest of `device/`, this is firmware and workflow planning, not running code (`ROADMAP.md`).

## Composite observation

A single field observation composes the schemas below into one governed record, all ultimately anchored to one `schemas/observation.schema.json` `observation_id`:

```text
Observation
├── human account                  → observer-perception.schema.json
├── original photograph or video   → photographic-witness.schema.json
├── photographic metadata          → media-provenance.schema.json
├── exact or protected coordinates → location-evidence.schema.json, location-protection.schema.json
├── location uncertainty           → location-evidence.schema.json (horizontal_accuracy_m, vertical_accuracy_m)
├── device orientation             → photographic-witness.schema.json (orientation), location-evidence.schema.json
├── local place names              → landscape-memory.schema.json
├── natural landscape description  → landscape-memory.schema.json
├── built landscape description    → landscape-memory.schema.json
├── movement trace                 → movement-trace.schema.json
├── external map layers            → projection-accountability.schema.json
├── projection disclosure          → projection-accountability.schema.json
├── source provenance               → source.schema.json (existing)
├── consent and risk controls      → consent.schema.json, risk.schema.json (existing) + rights_and_risk / protection facets
├── accessibility outputs          → accessibility.schema.json (existing) + accessibility_notes facets
└── unresolved questions           → free-text notes fields already present on each new schema (e.g. observer-perception.perceived_difference_from_capture)
```

No new schema in this tree replaces an existing one (`observation`, `consent`, `source`, `risk`, `accessibility`, `publication`, `correction`, `ai-permission`). Each new schema is a narrower, evidentiary extension linked by ID, per `docs/research/instrumentation/current-state-audit.md` §1.

## Rapid Capture

For immediate evidence preservation under field pressure — the mode the device must support even when a full Deep Documentation pass is impossible.

1. One-button capture: writes `photographic-witness.capture_id`, `observation_id`, and `timestamp` immediately.
2. Timestamp with `timestamp_source` and `timestamp_confidence` recorded automatically from whatever clock is available (RTC, GNSS time, or device clock — see `docs/mvp/hardware/instrumentation-revision-v0.02.md`).
3. Image/audio captured and written to `media-provenance.original_file` with `original_hash` computed at write time.
4. Coordinates captured into `location-evidence` with whatever `fix_type` and accuracy the receiver has at that instant — a `no_fix` or low-accuracy fix is recorded as such, never withheld or upgraded.
5. Orientation captured into `photographic-witness.orientation` if a magnetometer reading is available.
6. Hash computed and stored (`media-provenance.original_hash`) as the first custody event.
7. Provisional consent/risk flag: the existing device consent switch (`private` / `consented` / `review-public`, per `governance/consent-model.md`) sets the observation's consent state; `rights_and_risk.consent_status` on the photographic-witness record inherits a provisional value pending Deep Documentation or human review.
8. Later-completion queue: any field left empty by Rapid Capture (observer account, place names, projection disclosure, full risk assessment) is queued for completion during Deep Documentation or web-engine review — Rapid Capture never blocks on a field it cannot fill in the moment.

Rapid Capture deliberately does not attempt `landscape-memory`, `movement-trace`, or `projection-accountability` population — those require deliberate fieldwork or later review, per Deep Documentation below.

## Deep Documentation

For deliberate fieldwork, once time and safety allow:

- Repeated coordinate samples: multiple `location-evidence` records (or repeated fixes averaged, disclosed via `measurement_method`) to characterize accuracy under the current conditions.
- Multiple photographs: additional `photographic-witness` captures linked to the same `observation_id`, each with its own `media-provenance` and `observer-perception`.
- Panoramic sequence: `frame_sequence` (`burst_id`, `frame_index`, `frame_count`) populated across a related set of captures.
- Witness accounts: additional `observer-perception` records, one per distinct witness, never merged into a single composite account.
- Place-name variants: `landscape-memory.local_names` / `historical_names` / `administrative_names` / `disputed_names` populated from direct conversation with people present, not inferred.
- Route trace: `movement-trace` recording, with `interpolation_status` set honestly if any segment was not directly measured.
- Landscape inventory: `landscape-memory.natural_features` / `built_features` populated.
- Missing-place notes: `map-missingness` populated where the observer notices the map disagrees with what they can see.
- Projection and source review: `projection-accountability` completed for any external map layer consulted in the field.
- Publication controls: full `rights_and_risk` / `protection` fields completed and reviewed, superseding Rapid Capture's provisional flags.

## Accessibility (applies to both modes)

Per `device/accessibility-hardware.md` and `accessibility/tactile-and-haptic.md`, both modes must remain operable without a screen: status redundancy (light + sound + vibration) confirms capture start, fix acquired/not acquired, and consent-switch state. Deep Documentation's additional steps must not introduce a control that lacks a nonvisual equivalent — a repeated-coordinate-sample workflow, for example, needs the same nonvisual "sample recorded" confirmation as the original Rapid Capture button press.

## Cross-references

- `docs/mvp/hardware/instrumentation-revision-v0.02.md` — hardware this workflow depends on.
- `docs/mvp/interface/photographic-witness-interface.md`, `docs/mvp/interface/cartographic-witness-interface.md` — how the web engine later reviews what this workflow captures.
- `governance/consent-model.md`, ADR-0003, ADR-0004 — why the consent switch sets consent state, not publication status, for every capture this workflow produces.

## Source

Authored per Workstream 5 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02), extending the Field Companion capability list in `docs/vision/omoluabi-origin-storyboard.md`.
