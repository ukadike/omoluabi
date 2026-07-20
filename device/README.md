## Resolved: Consent vs. Publication Status

The device's planned consent switch (`private` / `consented` / `review-public`) sets consent state only — it does not set `publication_status`. Publication status is a separate, later, human-governed decision (SSL-006). See `governance/consent-model.md` for the constraint table and ADR-0004 (`research/design-decisions/ADR-0004-consent-and-publication-status-are-distinct.md`) for the full reasoning.

## Directory Index

- `parts-list.md` — MVP parts list
- `circuit-notes.md` — controls and circuit direction (not a finished schematic)
- `enclosure-notes.md` — research-stage, open questions only
- `firmware-plan.md` — device workflow and research still needed
- `accessibility-hardware.md` — nonvisual status and control requirements
- `field-companion-workflow.md` — Rapid Capture and Deep Documentation modes, and how a composite observation assembles the Photographic and Cartographic Witness Layer schemas

## Instrumentation Revision

`docs/mvp/hardware/instrumentation-revision-v0.02.md` formalizes new hardware requirements (multi-constellation GNSS, magnetometer, pressure sensor, clock-confidence reporting) discovered through the Omoluabi MVP Instrumentation and Research-Evidence Directive; see `docs/research/speculative-instrumentation/` for the research behind it.
