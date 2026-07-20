# Hardware MVP Instrumentation Revision — v0.02

Revises `device/parts-list.md` and `device/circuit-notes.md` by formalizing what those documents already implied (a camera-capable module, an "optional GPS module") and adding the new requirements the Photographic and Cartographic Witness Layers need. This document does not replace `device/parts-list.md` or `device/circuit-notes.md`; it is the instrumentation-specific companion referenced from both. `diagrams/device-architecture.mmd` is updated alongside this document to show the new GNSS receiver, magnetometer, and pressure sensor as inputs to the Arduino UNO Q, and the observation package now branching into Photographic Witness and Cartographic Witness records.

**No wired circuit schematic accompanies this revision.** `device/circuit-notes.md` already discloses that no MVP component — old or new — has a pin-level schematic yet; adding one only for the new sensors would overstate their readiness relative to the rest of the device plan. The new sensors are added to `circuit-notes.md`'s existing text-only circuit-direction list (I2C, consistent with the Display line) and to the Mermaid architecture diagram below, at the same level of detail as everything else in that file.

**Nothing in this document is built or tested hardware.** Per `ROADMAP.md`, device firmware remains a plan, not running code. Accuracy figures below are illustrative of what each component class can support under good conditions, not a specification the current MVP parts list has been validated against.

## Already represented or plausibly supported

| Component | Where already listed | What it measures today |
|---|---|---|
| Camera | `device/parts-list.md` (Arduino Nicla Vision) | Image/video frames; no documented sensor, lens, or exposure metadata capture yet |
| Microphone | `device/parts-list.md` (Nicla Vision), `device/circuit-notes.md` | Audio capture |
| Six-axis movement sensing | Implied by Nicla Vision's onboard IMU (not separately listed as a part) | Not yet documented as a distinct capability — see "New or newly formalized requirements" below for the heading/orientation gap |
| Timestamped media capture | `device/firmware-plan.md` ("Attach Timestamp + Device ID") | Timestamp only; no `timestamp_source` or `timestamp_confidence` distinction yet |
| Offline storage | `device/firmware-plan.md` ("Write Local JSON," SSL-009) | Local-first by design |
| Local metadata creation | `device/firmware-plan.md` | Structured JSON consistent with `schemas/observation.schema.json` |
| Accessibility-first text outputs | `device/accessibility-hardware.md`, `accessibility/tactile-and-haptic.md` | Status redundancy (light + sound + vibration) |
| Provenance records | `schemas/source.schema.json` | General observation provenance; not yet media- or location-specific |
| Basic geolocation | `device/parts-list.md` ("optional GPS module") | Two numbers and a precision enum (`schemas/observation.schema.json`'s `location`) — no accuracy, datum, or fix-type data |

## New or newly formalized requirements

| Component | Purpose | MVP status |
|---|---|---|
| Multi-constellation, multi-band GNSS receiver | Improves fix reliability and accuracy over a single-constellation module; feeds `schemas/location-evidence.schema.json`'s `fix_type`, `satellite_count`, `signal_quality` | Proposed for MVP — replaces the "optional GPS module" line in `device/parts-list.md` with a named component class |
| External GNSS antenna | Improves signal quality in enclosed or obstructed field conditions | Proposed for MVP, optional attachment |
| Heading instrument / magnetometer | Populates `orientation.heading_deg` on `schemas/photographic-witness.schema.json` and `schemas/location-evidence.schema.json`-linked records | Proposed for MVP — no repository reference prior to this document |
| Pressure sensor for elevation corroboration | Cross-checks GNSS-derived elevation, which is typically the least accurate GNSS output | Proposed for MVP |
| Raw GNSS observation storage | Populates `location-evidence.raw_observation_file` where the receiver and storage support it | Post-MVP — depends on receiver support and available storage; most MVP hardware will leave this field empty |
| Optional RTK or post-processed positioning workflow | Improves accuracy beyond standard GNSS, at the cost of additional hardware/subscription or post-processing time | Post-MVP, explicitly excluded from the MVP component table below |
| Clock synchronization and clock-confidence reporting | Populates `timestamp_source` / `timestamp_confidence` on `schemas/photographic-witness.schema.json` | Proposed for MVP — RTC module already listed in `device/parts-list.md` as optional; this document proposes making clock-confidence reporting a firmware requirement regardless of which clock source is present |
| Camera calibration workflow | Populates `camera.calibration_status` on `schemas/photographic-witness.schema.json` | Post-MVP — requires a documented calibration procedure not yet written |
| Orientation-linked image capture | Attaches heading/pitch/roll to each capture at the moment of exposure | Proposed for MVP, contingent on the magnetometer above |
| Removable local storage | Field-serviceable storage for offline-first operation at scale | Proposed for MVP |
| Encrypted storage for protected coordinates | Protects `schemas/location-protection.schema.json`'s exact coordinates at rest | Post-MVP — `device/firmware-plan.md` already lists "storage encryption" as Research Still Needed; this document narrows that to specifically cover protected-location records |
| Offline map packages | Lets the Cartographic Witness Layer's map views render without connectivity | Post-MVP — no offline map format has been chosen |
| GeoPackage or equivalent portable geospatial storage | Portable, offline-capable geospatial storage format for `location-evidence`, `landscape-memory`, and `movement-trace` records | Post-MVP |
| Track recording | Continuous logging feeding `schemas/movement-trace.schema.json` | Proposed for MVP, contingent on GNSS receiver above |
| Location generalization for publication | Firmware- or web-engine-side application of `location-protection.public_location_precision` | Post-MVP — this is primarily a web-engine/schema-enforcement concern, not firmware, but is listed here because it constrains what the device may transmit or display |
| Visible distinction between measured and inferred spatial data | Device display (where present) must not render an inferred or interpolated point identically to a measured one | Proposed for MVP, applies to any on-device display |

## Updated component table (MVP)

| Component | Measures | Evidence risk | Known accuracy limits | Offline behavior | Power implications | Accessibility implications |
|---|---|---|---|---|---|---|
| Arduino UNO Q 2GB | Primary compute; timestamps, fuses sensor streams | Single point of failure for record assembly | Not applicable (compute, not a sensor) | Required for any local record | Baseline power draw for the device | Drives status LED/buzzer/vibration outputs required by `device/accessibility-hardware.md` |
| Arduino Nicla Vision (camera + audio + onboard IMU) | Image/video, audio, coarse motion | Uncalibrated by default; `calibration_status: uncalibrated` until a calibration workflow exists | No documented resolution/lens spec yet | Fully offline-capable | Camera/audio capture is the largest incremental power draw in the parts list | Camera-based capture must not become the only way to record an observation — device retains audio/tactile-first flows |
| Multi-constellation, multi-band GNSS receiver (new) | Latitude, longitude, elevation, fix type, satellite count | Accuracy varies with sky visibility, multipath, receiver quality; must not be presented as fixed | Typical multi-band consumer-grade fixes: single-digit-meter horizontal accuracy under open sky, materially worse under canopy/urban canyon — no number should be hardcoded into firmware or schema defaults | Fix quality degrades or fails entirely without sky visibility; device must record `fix_type: no_fix` rather than a stale coordinate | GNSS acquisition is a known power cost; duty-cycling is a research question, not yet answered | Fix-quality status must be surfaced nonvisually alongside consent-switch state |
| External GNSS antenna (new, optional) | N/A directly; improves the receiver's fix | N/A | Improves, does not guarantee, signal quality | N/A | Passive, negligible additional draw | N/A |
| Heading instrument / magnetometer (new) | `orientation.heading_deg` | Susceptible to magnetic interference near metal/electronics; must support `motion_state: unknown` rather than a false reading | Consumer magnetometer heading error is commonly several degrees and worse near interference | Fully offline-capable | Low incremental power draw | N/A directly |
| Pressure sensor (new) | Elevation corroboration | Barometric elevation drifts with weather; must be documented as corroborating, not replacing, GNSS elevation | Meter-to-several-meter drift possible over hours without recalibration | Fully offline-capable | Low incremental power draw | N/A directly |
| RTC module (already optional in parts list) | Clock source when GNSS time is unavailable | Clock drift if uncorrected for long offline periods | Not quantified; flagged as a firmware research question in `device/firmware-plan.md` | Functions fully offline by design | Negligible | N/A directly |
| Removable local storage (new) | N/A (storage, not a sensor) | Field-serviceable but a lost/removed card is a data-loss and chain-of-custody risk | N/A | Required for offline-first operation | Negligible | Physical card slot must be operable per `device/accessibility-hardware.md`'s one-handed-operation research |

## What is MVP now

Camera capture, audio capture, local JSON metadata, basic (single-constellation-equivalent) geolocation, and status redundancy are already effectively MVP per the existing parts list. This document proposes formalizing the GNSS receiver as multi-constellation/multi-band, adding a magnetometer and pressure sensor, and making clock-confidence reporting and orientation-linked capture firmware requirements.

## What is post-MVP

RTK/post-processed positioning, raw GNSS observation storage, camera calibration workflow, offline map packages, GeoPackage-equivalent storage, encrypted at-rest storage for protected coordinates, and device-side location generalization. These require either hardware not yet selected, a calibration procedure not yet written, or a storage/format decision not yet made.

## What requires field validation

- Actual GNSS fix accuracy and reliability under the device's real-world operating conditions (outdoor, indoor, enclosure-obstructed).
- Magnetometer heading accuracy with the final enclosure and component layout (interference from nearby components is layout-dependent and cannot be assessed from a parts list).
- Power budget impact of continuous GNSS + camera + magnetometer + pressure sensing together, especially for `movement-trace` continuous track recording.
- Whether a single-handed operator can access removable storage and the GNSS antenna connector, per `device/accessibility-hardware.md`'s open one-handed-operation research question.

## Source

Authored per Workstream 4 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02), extending `device/parts-list.md` and `device/circuit-notes.md`. Does not claim centimeter accuracy as a default, per the directive's explicit instruction.
