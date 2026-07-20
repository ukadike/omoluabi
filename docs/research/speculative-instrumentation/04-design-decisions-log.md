# Design Decisions Log

Each decision record below documents one design decision made during this workstream. `commit` fields reference the branch this work was developed on; exact commit hashes are visible in `git log claude/new-session-twd6l5` and are not restated here to avoid recording a hash before it exists.

## DR-0001

```yaml
decision_id: DR-0001
date: 2026-07-20
scenario_trigger: >
  UMADA time traveler returns from a historically significant event with images that
  must not be dismissible as low-quality, decontextualized, manipulated, or technically
  inadequate.
problem_observed: >
  schemas/observation.schema.json's media.image field was a bare file-path string with
  no capture metadata, no original/derivative distinction, and no observer account
  separate from the sensor output.
options_considered:
  - Add capture metadata fields directly onto observation.schema.json.
  - Create one combined "photo" schema holding capture, provenance, and observer fields.
  - Create three separate, linked schemas splitting capture, provenance, and observer
    perception.
decision: >
  Create three separate, linked schemas: photographic-witness.schema.json (capture-level
  facts), media-provenance.schema.json (original/derivative/hash/custody), and
  observer-perception.schema.json (human account, separate from sensor output).
rationale: >
  The five-way distinction the directive requires (sensor recorded / observer reports /
  device inferred / software enhanced / unresolved) does not fit cleanly into one object
  without conflating provenance concerns (which persist across edits) with capture
  concerns (fixed at the moment of exposure) and testimony concerns (which belong to the
  observer, not the device). Splitting also matches the existing repository pattern of
  one schema per governed concern (schemas/consent.schema.json, source, risk, etc. are
  already separate rather than merged into observation.schema.json).
risks: >
  Three linked schemas require careful ID cross-referencing (capture_id,
  media_provenance_id, observer_perception_id) and could drift out of sync if a future
  editor edits one without the others.
accessibility_effect: >
  Enables the Observer Saw / Sensor Recorded panel and a separately labeled Evidence
  Confidence panel (docs/mvp/interface/photographic-witness-interface.md), both text-first.
provenance_effect: >
  media-provenance.schema.json formalizes original-file hashing and an append-only
  alteration history that did not exist anywhere in the repository before this pass.
files_changed:
  - schemas/photographic-witness.schema.json
  - schemas/media-provenance.schema.json
  - schemas/observer-perception.schema.json
  - cards/photographic-witness.card.md
  - cards/media-provenance.card.md
  - cards/observer-perception.card.md
  - docs/mvp/interface/photographic-witness-interface.md
commit: 3cfd257 (claude/new-session-twd6l5) — "Add Photographic Witness Layer schemas, cards, and interface docs (DR-0001)"
validation_needed: >
  Kemi's review of all three schemas and cards (consistent with the existing "nine of ten
  schemas awaiting review" status noted in SCHEMA_CARD.md); field validation of whether
  capture_mode classification can be automated at all.
```

## DR-0002

```yaml
decision_id: DR-0002
date: 2026-07-20
scenario_trigger: >
  Cape Wipeout (settlement/laboratory/garden/route destroyed, renamed, or concealed) and
  Super Hurricane Cindy (winds, debris, infection, technological fragments, ocean
  conditions, and the time traveler moving through a measurable geographic field).
problem_observed: >
  schemas/observation.schema.json's location object held only latitude, longitude, and a
  precision enum. Nothing distinguished a measured coordinate from a map's rendering of
  it; nothing recorded place-name plurality, movement over time, or map-dataset gaps.
options_considered:
  - Extend observation.schema.json's location object in place with more fields.
  - Create one large "geospatial" schema covering measurement, naming, movement, and
    projection together.
  - Create six separate, linked schemas, one per distinct concern named in the directive.
decision: >
  Create six separate, linked schemas: location-evidence, landscape-memory,
  movement-trace, projection-accountability, map-missingness, location-protection.
rationale: >
  Two pairs of concerns look similar but are not the same failure mode: (1)
  landscape-memory.erased_features (a physical feature reported destroyed) is distinct
  from map-missingness (a gap in the map dataset itself, which can exist even where the
  physical feature is intact); (2) location-evidence (a measurement) is distinct from
  projection-accountability (a rendering of that measurement). Collapsing either pair
  would make the schema unable to represent a case where only one half of the pair is
  true, which Cape Wipeout plausibly is (a place can be both physically erased and
  under-mapped, for different reasons).
risks: >
  Six new schemas increase the total schema count from 10 to 16, raising the review
  burden already noted in SCHEMA_CARD.md's "Future Implementation Notes."
accessibility_effect: >
  Requires a Coordinate table view as the non-visual equivalent to every map-bearing
  interface component, and text-based (not color-only) uncertainty/missingness/naming
  disclosure throughout docs/mvp/interface/cartographic-witness-interface.md.
provenance_effect: >
  location-evidence.schema.json separates measurement provenance (fix_type,
  correction_source, measurement_method) from source.schema.json's general observation
  provenance, without replacing it.
files_changed:
  - schemas/location-evidence.schema.json
  - schemas/landscape-memory.schema.json
  - schemas/movement-trace.schema.json
  - schemas/projection-accountability.schema.json
  - schemas/map-missingness.schema.json
  - schemas/location-protection.schema.json
  - six matching cards in cards/
  - docs/mvp/interface/cartographic-witness-interface.md
commit: 14fab67 (claude/new-session-twd6l5) — "Add Cartographic Witness Layer schemas, cards, and interface docs (DR-0002)"
validation_needed: >
  Kemi's review of all six schemas and cards; field validation of GNSS/magnetometer
  accuracy under real enclosure conditions (docs/mvp/hardware/instrumentation-revision-v0.02.md);
  resolution of Umada Open Question #32 (Cindy/Cape Wipeout chronology) is out of scope
  for this decision and not required to proceed.
```

## Source

Authored per Workstream 6 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
