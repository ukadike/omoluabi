# Changelog

All notable changes to this repository are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

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

### Open

- First running implementation of any layer (device firmware, web engine, or API) — see `ROADMAP.md`
