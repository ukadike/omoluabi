# Current-State Audit — Photographic and Cartographic Instrumentation

Audit performed to satisfy Workstream 1 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02). This document is descriptive, not prescriptive: it records what exists, what is partial, what is missing, and which files this directive's later workstreams must revise. It does not itself change any schema, card, or plan.

## Method

Repository-wide search (`grep -ril`, case-insensitive, all tracked `.md`, `.json`, `.yaml`, `.html`, `.js` files, vendor code excluded) for every keyword listed in the directive's Workstream 1. Results below are grouped by what they reveal, not by keyword, since most keywords cluster around the same two gaps.

## 1. What already exists

**Governance and schema scaffolding that photography and cartography can extend without modification:**

- The ten core schemas (`schemas/*.schema.json`) and their companion cards (`cards/*.card.md`) already define observation, consent, source, risk, accessibility, publication, correction, ai-permission, federation, and memory. `SCHEMA_CARD.md` and `schemas/README.md` document the governance loop (Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive → API-ready record) that any new schema must plug into rather than duplicate.
- `schemas/observation.schema.json` already has a `location` object (`lat`, `lng`, `precision: exact|approximate|withheld|unknown`) and a `media` object (`audio`, `image`, `video`, `transcript` as file-path strings). This is the attachment point for the new photographic and cartographic schemas — they extend, they do not replace, this shape.
- `research/design-decisions/ADR-0003-device-as-observation-instrument.md` already establishes the load-bearing rule this directive depends on: **the device is an observation instrument, not an independent authority.** Every photographic and cartographic capability added by this directive inherits that rule automatically — no new ADR is needed to say a photo or a coordinate bypasses governance; ADR-0003 already forbids that.
- `governance/consent-model.md` and ADR-0004 already separate consent (device-level, at capture) from publication status (human-editorial, later). The new `rights_and_risk` / `protection` blocks in the directive's proposed schemas map onto this existing distinction rather than requiring a new one.
- `device/parts-list.md`, `device/circuit-notes.md` already list a camera-capable module (Arduino Nicla Vision), an "optional GPS module," and an "optional RTC module" — the hardware seed this directive's Workstream 4 formalizes and extends.
- `device/accessibility-hardware.md` and `accessibility/tactile-and-haptic.md` already require nonvisual status confirmation (light + sound + vibration) — the accessibility baseline the new Photographic and Cartographic Witness Layers must meet, not a new requirement to invent.
- `docs/vision/omoluabi-origin-storyboard.md` is the one place the "Field Companion" name and a capability list (Audio, Video, Images, Notes, Context, GPS, Time, Consent, Accessibility metadata, Translation confidence, Provenance, Offline operation, Long battery life, Repairable hardware) already appear — but as vision-document prose, not a workflow spec. No file currently defines Rapid Capture vs. Deep Documentation modes.

## 2. What is partial or implicit

- **Camera**: mentioned twice — `docs/mvp-plan.md` ("First MVP Output" media folder holds `image.jpg`) and `web-engine/p5-ml5-prototype-plan.md` ("testing camera/audio input prototypes," explicitly for prototyping only, never governance). Neither location specifies capture metadata beyond a bare file path.
- **Location**: 21 files reference "location" in the general sense (mostly `location.precision` reuse and unrelated prose like "protected locations" appearing nowhere yet). Only `schemas/observation.schema.json` and `examples/omoluabi-field-observation.json` define it structurally, and that structure is two numbers, a precision enum, and nothing else — no datum, no accuracy figure, no elevation, no source of the fix.
- **Provenance**: 29 files use the word, but always about *observation* provenance (`source.schema.json`, SSL-002) — general chain-of-custody for a record, not the media-specific provenance (original vs. derivative, hash, alteration history) this directive requires, and not geospatial provenance (survey method, correction source, datum) either.
- **Consent**: 75 files use the word, but always the existing observation-level consent model. Nothing today distinguishes *media publication consent* (may this specific image run publicly) or *location-protection consent* (may this specific coordinate be shown at full precision) from the general observation consent state. The directive's `rights_and_risk.consent_status` and `protection.consent_status` fields are new, narrower instances of the same general concept, not a competing model.
- **Nicla Vision**: 7 files, all listing it as a parts-list/architecture component (`SCHEMA_CARD.md`, `research/standards.md`, `research/references.md`, `ROADMAP.md`, `device/circuit-notes.md`, `device/parts-list.md`, `docs/mvp-plan.md`, `diagrams/device-architecture.mmd`). None document what the Nicla Vision's camera actually preserves (sensor, lens, exposure, calibration) — only that it exists as "compact camera/audio/sensor companion."
- **Arduino UNO Q**: 5 files, same pattern — listed as the device's primary compute/hybrid brain, never described in terms of what it does with GNSS, orientation, or clock data.
- **Orientation**: 7 hits, all unrelated to device heading/pitch/roll — they are about document reading order ("Read First" orientation) or portrait/landscape image orientation in unrelated contexts. Device orientation sensing (compass, gyroscope) has zero references anywhere in the repository.
- **Schema card**: 6 files reference the *concept* of a schema card (the per-schema companion doc pattern) — this is the pattern the directive's `## Required photographic schemas` / `## Required cartographic schemas` sections must follow, per Acceptance Criterion 18.

## 3. What is missing entirely (zero hits)

Confirmed zero repository hits for: EXIF, "image capture" as a named subsystem, "evidence capture," "media ingestion," latitude, longitude, geospatial, gyroscope, compass, elevation, "source confidence," "protected location(s)," "hardware MVP" as a doc title, mapping-as-a-subsystem (the 5 "mapping" hits are all incidental, e.g. "mapping" used as a verb in unrelated governance prose), coordinates/landscape/movement as structured data (the only repository hits for these three words are inside vendored `p5.min.js`, not project content).

This confirms the directive's core premise: **photography today means "a file path in `media.image`," and geolocation today means "two numbers and a precision enum."** Neither has an evidentiary subsystem. This audit does not find hidden or duplicate work to reconcile — there is a clean gap to fill, not a conflict to resolve.

## 4. What is duplicated

None found. Because the photographic and cartographic subsystems do not exist yet, there is nothing to deduplicate. The one risk of *future* duplication: `location.precision` (`exact|approximate|withheld|unknown`) on `observation.schema.json` and the new `protection.public_location_precision` field this directive requires cover related but distinct concerns (general observation-sharing precision vs. specifically-protected-coordinate generalization) and must be kept documented as distinct in the new `location-evidence.schema.json` card, or a future editor will reasonably assume they are the same field and delete one.

## 5. What conflicts with the new research findings

None found at the schema or governance level. The one place a public claim needs qualification rather than correction: `docs/vision/omoluabi-origin-storyboard.md` lists "GPS" as a bare Field Companion capability. That is vision-document shorthand, not a technical claim, and this audit does not recommend editing the storyboard (it is origin-narrative material, not a spec) — but every *new* technical document this directive produces must not inherit that shorthand. Nowhere in the current repository is centimeter-level or survey-grade accuracy claimed, so there is no existing overstatement to walk back — only a new standard (Workstream 4's explicit accuracy caveat) to hold to going forward.

## 6. Files this directive must revise (beyond the new files it creates)

| File | Why |
|---|---|
| `schemas/README.md` | Add the six new schemas to the Core Schemas list; note they extend, not replace, `observation.schema.json`'s `location`/`media` objects. |
| `cards/README.md` | Add the six new cards to the numbered list. |
| `SCHEMA_CARD.md` | Update the Data Structures table (10 → 16 schemas) and Future Implementation Notes. |
| `INDEX.md` | Add links to the new schemas/cards, the new `docs/mvp/`, `docs/research/instrumentation/`, `docs/research/speculative-instrumentation/`, `docs/portfolio/`, and `research/speculative-instrumentation/` (public page). |
| `device/parts-list.md`, `device/circuit-notes.md` | Cross-reference (not duplicate) the new hardware requirements in `docs/mvp/hardware/instrumentation-revision-v0.02.md`; the existing "optional GPS module" line becomes qualified by the new document rather than rewritten in place. |
| `ROADMAP.md` | Note the new Photographic and Cartographic Witness Layers as [Planned] documentation-stage subsystems, consistent with the existing "scaffolded, not implemented" framing. |
| `CHANGELOG.md` | New `[Unreleased]` entries for this pass. |
| `docs/vision/omoluabi-origin-storyboard.md` | Not revised (see §5) — origin-narrative document, out of scope for a technical instrumentation pass. |

## 7. Assumptions that must be preserved

- **Schema-first, governance-before-AI** (ADR-0001, ADR-0002): every new schema is documentation and validation shape, not running code; nothing in this directive stands up a working camera pipeline or GNSS receiver integration.
- **Device as observation instrument, not authority** (ADR-0003): photographic and cartographic capture still produces observation records subject to the full governance pipeline. A "sensor recorded" field is not a publication decision.
- **Consent and publication status are distinct, sequential fields** (ADR-0004): the new `rights_and_risk.consent_status` and `protection.consent_status` fields are additional, narrower consent facets — they do not collapse into or replace `schemas/consent.schema.json`.
- **Local-first, offline-first** (SSL-009): every new capability must degrade gracefully offline; this rules out any design that requires a live network call to produce a valid record.
- **AI is assistive only** (SSL-005): "what the device inferred" and "what software enhanced" are exactly the categories SSL-005 already anticipates — AI may draft an enhancement or a caption; it may never decide the record's evidentiary status.
- **Nothing here is running code** (ROADMAP.md): the new schemas, cards, and hardware documents are additions to the plan/draft layer, consistent with the rest of the repository's current maturity. This audit explicitly does not recommend claiming otherwise.

## 8. Claims that need qualification because the MVP is not yet survey-grade or forensic-grade

- No sensor named in `device/parts-list.md` (Nicla Vision's camera, an "optional GPS module") has a documented accuracy figure anywhere in this repository. Any new hardware document must state accuracy as *dependent on component choice, antenna placement, environment, and correction source* — never as a fixed number — per the directive's own instruction not to claim centimeter accuracy as a default.
- "Chain of custody," "forensic," and "evidentiary" are directive-supplied vocabulary for what the new subsystems *organize toward*; the MVP itself does not yet implement hashing, signing, or third-party attestation. New documents should say the schema *carries fields for* a hash and a custody chain, not that the device *guarantees* forensic integrity.
- RTK / post-processed positioning is listed by the directive as an optional, post-MVP workflow. No existing or planned MVP hardware in `device/parts-list.md` supports it out of the box; this must stay marked post-MVP in Workstream 4's document, not folded into the MVP component table.

## Summary

The repository has strong governance, schema, and accessibility scaffolding and a correctly-scoped hardware seed (camera-capable module, optional GPS), but photography and cartography today are represented only as bare file paths and a two-number coordinate pair with no evidentiary structure. There is no conflicting or duplicated content to remove — this is new-subsystem work layered onto stable foundations, not a correction to existing material. The seven files in §6 need additive cross-reference updates; no existing file needs to be rewritten or retracted.
