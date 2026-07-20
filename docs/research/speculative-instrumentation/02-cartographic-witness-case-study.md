# Case Study Two: Cartographic Witness Instrumentation

## 1. Cape Wipeout and spatial erasure

Cape Wipeout is locked UMADA canon: March 19, 2226, near Cape Agulhas, a Chimeran Flu outbreak with named survivors (`/home/user/Umada/00_governance/CANON_STATUS.md`; consistent with `examples/umada-archive-fragment.json`, which the existing `docs/REPO_AUDIT.md` Canon Cross-Check confirmed matches the locked ledger entry with no contradiction). The directive that initiated this workstream frames the surrounding narrative failure mode: "an entire laboratory, garden, settlement, road, market route, coastline, and social landscape can be destroyed, renamed, concealed, or removed from the historical record." The full episode content for "Cape Wipeout, Pt. 1" is not yet written (`/home/user/Umada/11_episodes/README.md` lists it as a scaffolded, unwritten planned release) — this case study relies only on the locked canon facts above and the directive's own framing, not on invented episode content.

## 2. Hurricane Cindy and spatial movement

Also locked: "Super Hurricane Cindy carried the breach through water, air, and storm," occurring after Cape Wipeout in the locked civilizational arc (`/home/user/Umada/00_governance/CANON_STATUS.md`; the precise relationship between Cindy and a separate "Cape Operation" is an open canon question there — this case study does not resolve it). The directive frames the instrumentation-relevant failure mode: "Hurricane Cindy's winds, debris, infection, technological fragments, ocean conditions, and the time traveler move through a measurable geographic field." As with Cape Wipeout, no full episode script exists yet ("Super Hurricane Cindy / The Breach" is listed as scaffolded, unwritten in `11_episodes/README.md`) — this case study reasons from the locked fact and the directive's framing only.

## 3. Coordinates versus projections

Reading both scenarios as instrumentation problems produces one governing distinction: a coordinate is a measurement; a map is a rendering choice made from that measurement. Before this workstream, `schemas/observation.schema.json`'s `location` object held two numbers and a precision enum — nothing distinguished the measurement from any way it might later be displayed (`docs/research/instrumentation/current-state-audit.md` §3). `schemas/location-evidence.schema.json` now separates the two explicitly, and `schemas/projection-accountability.schema.json` makes every rendering disclose its own distortions.

## 4. Natural landscape versus political representation

A settlement's erasure ("renamed, concealed, or removed") is a political/administrative act on the *representation* layer, not necessarily on the physical landscape. `schemas/landscape-memory.schema.json`'s `erased_features` and `schemas/map-missingness.schema.json` are deliberately two different schemas (see each schema's own `description` field) because a place can be physically erased while its map data stays accurate, or a place can persist physically while its map data goes missing, redacted, or outdated — Cape Wipeout plausibly produces both failure modes at once, and one schema could not honestly represent both.

## 5. Place-name erasure and colonial mapping

`schemas/landscape-memory.schema.json` stores `local_names`, `historical_names`, `administrative_names`, and `disputed_names` as parallel arrays rather than a single authoritative name field, specifically so that no later editorial pass can silently resolve a naming dispute by picking one. This is a general instrumentation requirement independent of UMADA — colonial and administrative renaming is a recurring real-world failure mode this schema is built to resist, not one invented for the scenario.

## 6. Exact measurement versus inferred landscape

Hurricane Cindy's described movement through "water, air, and storm" is exactly the kind of continuous, partially-observed movement `schemas/movement-trace.schema.json` is built for: an `interpolation_status` field that must be set honestly whenever any segment of a track was not directly measured, so an inferred path is never displayed identically to a measured one.

## 7. Technical requirements discovered

- Canonical, projection-independent coordinate storage with datum, epoch, accuracy, and fix-type disclosure (`location-evidence.schema.json`).
- Coexisting place names rather than one authoritative name (`landscape-memory.schema.json`).
- Time-indexed movement tracks with honest interpolation disclosure (`movement-trace.schema.json`).
- Explicit projection/distortion disclosure attached to every rendered map (`projection-accountability.schema.json`).
- A distinct schema for map-dataset gaps, separate from physically erased features (`map-missingness.schema.json`).
- Generalized/withheld public coordinates for protected, sacred, ecological, or witness-sensitive locations, with the exact coordinate preserved for internal review (`location-protection.schema.json`).

## 8. Governance requirements discovered

- `location-protection.consent_status` is documented as a narrower facet subordinate to `schemas/consent.schema.json`, mirroring the same pattern established in the photographic case study (`cards/location-protection.card.md`, "Consent required").
- `location-protection.ecological_risk` / `witness_risk` overlap with, but do not replace, `cards/risk.card.md`'s general risk assessment.
- No schema in this set allows AI to resolve a naming dispute, fill in missing map data as if measured, or loosen a location's protection level once set (each card's "What AI may not do").

## 9. MVP changes

- Six new schemas and six new cards (`location-evidence`, `landscape-memory`, `movement-trace`, `projection-accountability`, `map-missingness`, `location-protection`).
- New interface design documentation: `docs/mvp/interface/cartographic-witness-interface.md`, including the governing rule that no map view may appear without a visible source, projection, date, scale, and uncertainty state.
- `docs/mvp/hardware/instrumentation-revision-v0.02.md` formalizes the multi-constellation GNSS receiver, magnetometer, and pressure sensor as MVP-relevant hardware requirements, explicitly not claiming centimeter accuracy as a default.
- `device/field-companion-workflow.md` incorporates coordinate capture, place-name recording, and route tracing into both Rapid Capture and Deep Documentation modes.

## 10. Unresolved research questions

- Whether overlays in the cartographic interface (erased-place, uncertainty, naming) compose or are mutually exclusive is undecided.
- No offline map tile/basemap source has been chosen; whatever is chosen still requires its own `projection-accountability` record.
- The precise mechanism for blocking federation/API exposure of a `restricted` `exact_location_access` record is not yet scoped (mirrors the same open mechanism question already logged for `risk.schema.json`'s high/severe risk level).
- The Cindy/Cape Wipeout chronological relationship remains an open canon question in Umada (Open Question #32, per `CANON_STATUS.md`) and is not resolved by this case study.

## 11. Evidence artifacts and commit references

- `schemas/location-evidence.schema.json`, `landscape-memory.schema.json`, `movement-trace.schema.json`, `projection-accountability.schema.json`, `map-missingness.schema.json`, `location-protection.schema.json`
- Six matching cards in `cards/`
- `docs/mvp/interface/cartographic-witness-interface.md`
- `docs/research/instrumentation/current-state-audit.md` §3 (the audit finding that motivated this case study)
- Decision record: `04-design-decisions-log.md`, decision `DR-0002`
- Commit list: see `docs/portfolio/omoluabi-proof-of-method.md` and the branch history on `claude/new-session-twd6l5`.

## Source

Authored per Workstream 6 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02). Umada canon facts checked directly against `/home/user/Umada/00_governance/CANON_STATUS.md` and `/home/user/Umada/11_episodes/README.md`, read-only, per Umada's own no-fabrication rule.
