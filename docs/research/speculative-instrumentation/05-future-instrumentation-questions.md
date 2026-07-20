# Future Instrumentation Questions

A research backlog of additional layers UMADA scenarios may expose. These are research questions, not completed MVP commitments — none of the items below have a schema, hardware change, or interface document yet. Listed in the order given by the directive that initiated this research track, not in priority order.

- **Acoustics and sound evidence** — what would a trustworthy audio witness record preserve beyond a waveform (ambient noise floor, directionality, occlusion)? Related to the existing `media.audio` field on `schemas/observation.schema.json`, which has the same bare-file-path gap photography had before this pass.
- **Atmospheric sensing** — temperature, pressure, humidity, air quality at capture time; would corroborate `environmental_conditions` on `schemas/photographic-witness.schema.json`.
- **Biological contamination sensing** — directly relevant to a Cape Wipeout-analogous outbreak scenario; no present-day Omoluabi hardware or schema addresses this.
- **Time synchronization** — this pass added `timestamp_source`/`timestamp_confidence` per capture; a deeper question is cross-device clock reconciliation when multiple observers document the same event.
- **Material and chemical analysis** — evidentiary metadata for a physical sample, not just a photograph of one.
- **Electromagnetic sensing** — relevant to the "technological fragments" language in the Hurricane Cindy scenario trigger (`02-cartographic-witness-case-study.md` §2).
- **Witness perception and cognitive difference** — `schemas/observer-perception.schema.json` records one observer's account; it does not yet address how differing perceptual or cognitive profiles across multiple witnesses should be reconciled or kept distinct.
- **Translation and sign-language capture** — `docs/vision/omoluabi-origin-storyboard.md` already lists "Translation confidence" as a Field Companion capability; no schema exists yet for translation provenance specifically.
- **Tactile and haptic records** — `accessibility/tactile-and-haptic.md` covers device output; no schema yet captures a tactile observation as a first-class evidentiary record type.
- **Power and energy provenance** — whether a device's power source or charge state at capture time is itself evidentiary metadata (e.g. for chain-of-custody questions about when a device could have produced a record).
- **Network absence and communication failure** — SSL-009 (Local First) already assumes offline operation; not yet documented is how a record's own "network was unavailable" state becomes part of its evidentiary metadata rather than being invisible.
- **Archival durability** — bit-rot, format obsolescence, and long-term custody of the original files `schemas/media-provenance.schema.json` now hashes.
- **Authenticity under synthetic-media conditions** — how a Photographic Witness Layer record should behave if a capture device itself is compromised or spoofed; distinct from (and harder than) the enhancement/reconstruction distinction this pass already implemented.
- **Environmental and community consent** — beyond individual subject consent, whether a community or ecological steward should have a distinct consent facet for landscape-level or ecologically sensitive records; related to but not resolved by `schemas/location-protection.schema.json`'s `ecological_risk` field.
- **Accessibility during disaster conditions** — the Rapid Capture mode in `device/field-companion-workflow.md` assumes a functioning device and observer; not yet addressed is degraded operation for a physically injured or otherwise impaired observer under acute crisis conditions (a plausible extension of the Hurricane Cindy scenario).

## How to use this list

Each item becomes a candidate future case study using the method in `00-method-overview.md`: find or construct a UMADA scenario detail that exposes the gap, read it as a present-day analogue question, and only then propose a schema, hardware, or interface change. No item on this list should be implemented by skipping that translation step.

## Source

Authored per Workstream 6 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
