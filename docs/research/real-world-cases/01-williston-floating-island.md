# Real-World Evidence Case 01 — Williston Reservoir Floating Island

**Case ID:** RW-001  
**Status:** OPEN — object and relocation verified; origin, exact movement path, and release mechanism remain unresolved  
**Assessment date:** 2026-09-03  
**Purpose:** Stress-test Omoluabi's existing evidence and cartographic witness requirements against a public real-world event.

## Why this case belongs in the proof of method

The Williston Reservoir case tests a core Omoluabi distinction: **absence from an observation is not evidence of disappearance**. A large vegetated floating mass was documented near Finlay Bay, later could not be located at the same place, and was subsequently found along the Ospika Arm. The event can be handled without treating either the initial unusual report or the later disappearance narrative as self-validating.

This case is not presented as evidence that Omoluabi predicted the event. It is a real-world stress test showing that the existing `location-evidence`, `movement-trace`, `map-missingness`, `media-provenance`, `photographic-witness`, and source-ladder concepts are appropriate to an event in which location, observation timing, provenance, and uncertainty are inseparable.

## Omoluabi determination

**Verified:** A large vegetated floating mass existed on Williston Reservoir and was observed in more than one location. BC Hydro says it was located through a combination of satellite imagery, small-aircraft observations, and boater reports.

**Verified:** BC Hydro estimates the mass at approximately 140 m × 70 m (about 9,800 m²) and says it came to rest along the shoreline of the Ospika Arm, approximately 30 km northwest of its first documented area near Finlay Bay.

**Probable, not proven:** BC Hydro's leading explanation is that logs and woody debris accumulated over years in a sheltered area, gradually decomposed, supported established vegetation, and later became mobile.

**Unknown:** Exact formation site, age, release mechanism, exact trajectory between documented observations, and whether the mass will remain intact.

## Source ladder

| Level | Evidence | Source | Omoluabi treatment |
|---|---|---|---|
| 1 | Local boater reports, photos, and video | Reported by BC Hydro | Treat as initial witness evidence; preserve provenance and acquisition date separately from event date. |
| 2 | Satellite confirmation | BC Hydro, including imagery dated 2026-07-21 and 2026-08-15 | Strong independent observation of presence at two different periods/areas. |
| 3 | Cross-modal confirmation | BC Hydro reports satellite, small-aircraft, and boater observations | Raises confidence in existence and relocation without proving the intervening path. |
| 4 | Official geographic reference points | BC Geographical Names Office | Useful for map anchors only; these are feature centres/mouths, **not island coordinates**. |
| 5 | Historical institutional context | BC Hydro Williston Reservoir Wetland Habitat Monitoring | Historical monitoring explicitly includes a `Floating Island (FI)` habitat class, relevant context for narrative probability. |

## Timeline

- **2026-07-21** — Earliest known satellite imagery cited by BC Hydro captures the island west of Finlay Bay.
- **2026-08-13** — BC Hydro says it receives reports, photographs, and video from local boaters.
- **Mid-August** — The object is no longer publicly located at the first documented area; public descriptions shift toward “missing” or “disappeared.”
- **2026-08-15** — Satellite imagery later reviewed by BC Hydro shows the mass near the Ospika Arm.
- **2026-08-31** — BC Hydro confirms its location along the Ospika Arm after reviewing satellite imagery and other observations.
- **2026-09-02** — BC Hydro publishes the location update.

## Timeline integrity flag

`TIMELINE_INCOMPLETE`

BC Hydro's release says the island travelled approximately 30 km “over 15 days,” while the public timeline lists satellite observations on July 21 and August 15. Those dates span more than 15 days. This is **not evidence that the release is false**; it means the public record does not identify the exact 15-day interval being referenced. Omoluabi should preserve that discrepancy instead of silently harmonizing it.

## Map-missingness test

The central cartographic lesson is:

> **Not present at the previously observed location ≠ proven absent from the reservoir.**

The correct state after the first-location observation gap is `LOCATION_UNKNOWN_WITHIN_SEARCH_AREA`, not `OBJECT_DISAPPEARED`.

This maps directly to `schemas/map-missingness.schema.json`: the absence of a feature from a later image or map tile must be represented as an observation state with date, coverage, resolution, and uncertainty rather than as a claim about physical nonexistence.

## Movement-trace test

The public evidence supports at least two documented areas, but not the exact route between them. Therefore:

- do **not** draw a continuous trajectory as if it were measured;
- do **not** interpolate a path without an explicit `interpolation_status`;
- preserve the July 21 and August 15 observations as separate time-stamped evidence states;
- distinguish official feature-centre coordinates from the island's unknown exact coordinates;
- if a visual connector is used for orientation, label it **“relationship only — not observed track.”**

## Map reference anchors

These coordinates are public reference anchors from the BC Geographical Names Office. They are provided to orient the research map and must not be represented as exact island positions.

| Reference feature | WGS84 coordinate | Role in case | Precision warning |
|---|---:|---|---|
| Finlay Bay | 55.991111, -123.787778 | Anchor for the first documented area described as west of Finlay Bay | Official approximate feature centre, not island coordinate |
| Ospika River mouth | 56.319444, -123.956944 | Anchor for the Ospika Arm area where the mass was later located | Official approximate river mouth, not island coordinate |
| W.A.C. Bennett Dam | 56.017500, -122.203889 | Infrastructure context; BC Hydro says the island moved farther away from the dam | Official approximate feature centre |

Machine-readable map anchors are in `research/williston-floating-island/data/location-anchors.geojson`.

## Historical-context finding

BC Hydro's 2021 Williston Reservoir Wetland Habitat Monitoring report uses a `Floating Island (FI)` habitat class and describes floating islands as large persistent floating masses of organic matter, coarse woody debris, and mineral soil on which vegetation can become established. That does **not** establish that the 2026 mass formed by exactly the same process, but it materially changes the prior probability of the general phenomenon and should be surfaced before treating the event as unprecedented.

## Hypotheses

| Hypothesis | Current confidence | Reason |
|---|---|---|
| Long-established woody/organic mat became mobile under reservoir conditions | Moderate–high | Consistent with BC Hydro's current explanation and historical floating-island/debris context. |
| Mass detached recently from a shoreline accumulation | Moderate | Plausible but source shoreline has not been publicly established. |
| Mass formed suddenly in July 2026 | Low / unsupported | July 21 establishes observation, not formation. |
| AI-generated hoax | Ruled out as explanation for the physical object | Multiple observation modes and satellite confirmation establish a real object. |
| Extraordinary/artificial mechanism | Unsupported | No available evidence requires such an explanation. |

## What evidence would materially advance the case

1. Exact satellite acquisition footprints and timestamps for all reviewed scenes.
2. Exact georeferenced island polygons for each confirmed observation.
3. Reservoir elevation, wind, and current data aligned to those timestamps.
4. Historical imagery backtracking candidate source locations.
5. Drone photogrammetry of the exposed structure.
6. Remote sonar/ROV observation of the submerged structure rather than unsafe landing.
7. Vegetation/species and substrate sampling only if it can be performed safely and with appropriate authority.

## Safety / field rule

BC Hydro says the mass is made of logs and decaying woody debris and warns people not to climb onto it. For an Omoluabi field workflow, this means **remote sensing first**: camera/drone, GNSS, environmental readings, and remote underwater observation before any direct-contact investigation.

## POC requirement demonstrated

This case provides real-world evidence for the following Omoluabi requirements:

- source ladder rather than single-source acceptance;
- event time separated from media acquisition/review time;
- map-missingness as an explicit state;
- movement traces that preserve observation gaps;
- visible coordinate provenance and uncertainty;
- multiple map/reference layers rather than a falsely precise pin;
- historical institutional records included in narrative-probability assessment;
- unresolved contradictions preserved as flags;
- `WHAT WE KNOW → NEXT ACTION → WHY → EVIDENCE → MAP / INVESTIGATE` progressive disclosure.

## Sources

Primary / official:

- BC Hydro, “Missing island mystery solved: Floating island located on Williston Reservoir,” 2026-09-02: https://www.bchydro.com/news/press_centre/news_releases/2026/mystery-island-solved.html
- BC Geographical Names Office, Finlay Bay: https://apps.gov.bc.ca/pub/bcgnws/names/12007.html
- BC Geographical Names Office, Ospika River: https://apps.gov.bc.ca/pub/bcgnws/names/18793.html
- BC Geographical Names Office, W.A.C. Bennett Dam: https://apps.gov.bc.ca/pub/bcgnws/names/15843.html
- BC Hydro, Williston Reservoir Management Plan / monitoring archive: https://www.bchydro.com/toolbar/about/sustainability/environmental_responsibility/water-use-plans/northern-interior/peace-river/williston-reservoir.html
- BC Hydro, GMSMON-15 Williston Reservoir Wetland Habitat Monitoring, Year 10, 2021: https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/corporate/environment-sustainability/water-use-planning/northern-interior/gmsmon-15-yr-10-2021-08-04.pdf

Independent corroboration / reporting:

- ScienceAlert, independent review of public Sentinel-2 imagery: https://www.sciencealert.com/a-mysterious-island-has-emerged-in-a-canadian-lake

## Related Omoluabi artifacts

- `docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`
- `docs/mvp/interface/cartographic-witness-interface.md`
- `schemas/location-evidence.schema.json`
- `schemas/movement-trace.schema.json`
- `schemas/map-missingness.schema.json`
- `schemas/projection-accountability.schema.json`
- `schemas/media-provenance.schema.json`
- `schemas/photographic-witness.schema.json`
