# Changelog

All notable changes to this repository are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added — v0.02: Photographic and Cartographic Witness Layers

Formalizes photography and cartography as first-class evidentiary subsystems, per the Omoluabi MVP Instrumentation and Research-Evidence Directive. No existing schema, card, governance rule, or accessibility commitment was weakened or replaced; all additions extend `schemas/observation.schema.json`'s existing `media`/`location` objects.

- `docs/research/instrumentation/current-state-audit.md` — pre-work audit
- Nine new schemas + cards: `photographic-witness`, `media-provenance`, `observer-perception`, `location-evidence`, `landscape-memory`, `movement-trace`, `projection-accountability`, `map-missingness`, `location-protection`
- `docs/mvp/interface/photographic-witness-interface.md`, `docs/mvp/interface/cartographic-witness-interface.md` — interface design documentation
- `docs/mvp/hardware/instrumentation-revision-v0.02.md` — hardware revision (multi-constellation GNSS, magnetometer, pressure sensor, clock-confidence reporting); explicitly does not claim centimeter accuracy as a default
- `device/field-companion-workflow.md` — Rapid Capture and Deep Documentation modes
- `docs/research/speculative-instrumentation/` — method overview, two case studies (`DR-0001` photography, `DR-0002` cartography), traceability matrix, design decisions log, future-questions backlog
- `docs/portfolio/omoluabi-proof-of-method.md` — external-evaluator-facing proof of method
- `research/speculative-instrumentation/index.html` — public proof-of-method page, linked from `index.html`
- Updated `schemas/README.md`, `cards/README.md`, `SCHEMA_CARD.md` (10 → 16 schemas), `INDEX.md`, `ROADMAP.md`, `device/README.md`, `device/parts-list.md`, `device/circuit-notes.md` for cross-references

### Added

- `000_START_HERE.md` orientation document
- `ROADMAP.md`
- `docs/vision.md`, `docs/mvp-plan.md`, `docs/glossary.md`, `docs/public-benefit.md`, `docs/funding-brief.md`
- `governance/principles.md`, `governance/rule-library.md`, `governance/ai-permissions.md`, `governance/publication-status.md`, `governance/consent-model.md`, `governance/correction-model.md`
- `architecture/system-overview.md`, `architecture/observation-pipeline.md`, `architecture/governance-pipeline.md`, `architecture/data-lifecycle.md`, `architecture/sync-and-federation.md`
- `research/research-questions.md`, `research/literature-review.md`, `research/standards.md`, `research/references.md`, and three Architecture Decision Records
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE` (placeholder)

Source: this scaffold synthesizes a public-repository packet delivered by Kemi on 2026-06-26.

### Added (later scaffolding stages)

The build stages left open below were subsequently completed; see `ROADMAP.md` for the authoritative done/planned status:

- `schemas/` and `cards/` — all ten record-type schemas and their companion cards (observation, consent, source, risk, accessibility, publication, correction, ai-permission, federation, memory)
- `device/`, `web-engine/`, `api/`, `accessibility/`, `diagrams/`, `examples/`
- `funding/`, `umada-sandbox/`, `earth-sensors-lab-bridge/`
- Dual license adopted: Apache-2.0 for code/schemas (`LICENSE`), CC BY 4.0 for documentation (`LICENSE-DOCS.md`)
- ADR-0004, reconciling consent state and publication status as distinct fields
- `ufo-connection/` — the UFO Connection demo (self-contained GitHub Pages sub-app reading official PURSUE UAP/UFO disclosure records through the evidence-reading layer)
- `world-layer-sandbox/` — the Coastal Relay p5.js sketch (non-canon, diegetic world-layer visual, reduced-motion aware)
- `docs/vision/omoluabi-origin-storyboard.md` — origin storyboard and vision documentation
- This restoration pass: `docs/REPO_AUDIT.md`, `SCHEMA_CARD.md`, `INDEX.md`, and cross-references from `accessibility/baseline.md` to Accessible by Design and from `earth-sensors-lab-bridge/README.md` to Earth Sensors Lab

### Added (Investigation Engine scaffold)

- `investigation-engine/` — domain-agnostic evidence, reasoning, and knowledge-graph architecture: `README.md`; `architecture/` (system overview, evidence model, 34 reasoning layers, 10 research states, 13-stage workflow, knowledge graph, 12 intelligence modes); `governance/` (constitutional rules IE-001..IE-005, human-governance model); `schemas/` and `cards/` (evidence object, claim, reasoning step, contradiction, confidence score, knowledge graph entity, investigation case); `docs/` (research domains, output formats, transparency rules, accessibility); `examples/` (one linked example case across all seven schemas)
- `research/design-decisions/ADR-0005-investigation-engine-reuses-governed-record-model.md`
- Cross-references from root `README.md`, `INDEX.md`, `ROADMAP.md`, and `SCHEMA_CARD.md` to the new subsystem

Source: synthesizes the "Omoluabi Investigation Engine — Complete Claude Code Package (Master Specification)" delivered by Kemi on 2026-07-07.

### Added (manual observation entry)

- `web-engine/app/`: a "New observation" form (`#/new`) that creates an observation plus its linked consent, source, risk, and accessibility records by hand — no field device required, recorded with `source.origin_type: "web-form"` (an enum value the schema already defined). The new record enters the same gated pipeline as any other; authoring it does not mark any stage reviewed.
- Verified end to end in a browser: created an observation manually, reviewed source/consent/risk/accessibility, recorded human review, set publication status to `public`, and confirmed it appears as exportable in the Archive screen — the full MVP governance loop now runs without a device.
- Updated `web-engine/README.md`, `web-engine/app/README.md`, `web-engine/screens.md`, and `web-engine/app/index.html`'s header copy (previously "Not a CMS," reflecting a review-only scope that predated this form) to describe the new authoring path.

### Added (news feed)

- `web-engine/app/`: a News feed (`#/news`) — the public reader view completing the loop from authoring to reading. Only records with an explicit human publication decision of `public` appear (canonical gate is the publication decision record, per ADR-0004); embargoed, withdrawn, and undecided records are excluded. Verified in a browser: a published story appears with headline, provenance, and a link to its full governed record; an embargoed record and the undecided seed record never surface.

### Open

- First running implementation of device firmware or the API — see `ROADMAP.md`
- Web engine still has no backend, sync, or production storage — the "New observation" form is local-only like the rest of the prototype
- First running implementation of any Investigation Engine reasoning layer, output-format generator, or knowledge-graph renderer — see `investigation-engine/architecture/reasoning-layers.md`
