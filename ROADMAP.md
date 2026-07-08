# Roadmap

Status legend: **Done** · **In Progress** · **Planned** · **Research**

## Scaffolding Status

All directories from the original packet have been scaffolded with documentation, schemas, or plans:

- [Done] Repository scaffold: root documentation, `docs/`, `governance/`, `architecture/`, `research/`
- [Done] `schemas/` and `cards/` — machine-readable JSON Schemas and their human-readable companions
- [Done] `device/` — physical field-observation device plan (Arduino UNO Q 2GB + Nicla Vision + Nano 33 BLE Sense Rev2)
- [Done] `web-engine/` — public-interest editorial intelligence infrastructure plan
- [Done] `api/` — API roadmap and OpenAPI draft
- [Done] `accessibility/` — accessibility workflow documentation
- [Done] `diagrams/` — Mermaid diagram library
- [Done] `examples/` — example governed records
- [Done] `funding/` — SSRC and fellowship application materials
- [Done] `umada-sandbox/` — speculative stress-testing of Omoluabi's schemas
- [Done] `earth-sensors-lab-bridge/` — Earth Sensors Lab integration notes
- [Done] LICENSE adopted: Apache-2.0 for code/schemas, CC-BY-4.0 for documentation — see `LICENSE` and `LICENSE-DOCS.md`
- [Done] Consent/publication-status reconciliation — see `research/design-decisions/ADR-0004-consent-and-publication-status-are-distinct.md`
- [Done] `investigation-engine/` — domain-agnostic evidence, reasoning, and knowledge-graph architecture: seven JSON Schemas and cards, architecture docs for all 34 reasoning layers, 10 research states, the 13-stage investigation workflow, knowledge graph, and 12 intelligence modes, plus a constitutional-rules and human-governance model. See `research/design-decisions/ADR-0005-investigation-engine-reuses-governed-record-model.md`.

"Scaffolded" means documentation, schemas, and plans exist — not running code. The device firmware and the API are currently plans and drafts only (the OpenAPI draft marks every response "not yet implemented"); the web engine now has a running prototype (see below). See each directory's README for current status.

## Next

- [In Progress] Web engine prototype — `web-engine/app/` is the first running implementation of any layer: a browser-only human review interface over the governance pipeline, gated in the order of `architecture/governance-pipeline.md`, plus a manual "New observation" form (`#/new`, `source.origin_type: "web-form"`) so the full Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive loop can run end to end without a field device. Verified by walking a manually created observation through to `public` and confirming it appears as exportable in the Archive screen. Local-only (IndexedDB), no backend, no production framework decision, AI assist is a labeled stub. See `web-engine/app/README.md` for exact scope and `web-engine/local-first-plan.md` for what remains open (sync, production storage, encryption-at-rest).
- [Planned] Device firmware and API implementation. Neither exists yet; `device/` and `api/` content remains planning documentation, not code.
- [Planned] Photographic Witness Layer and Cartographic Witness Layer — nine new schemas/cards, two interface design documents, a hardware revision, and a Field Companion workflow document exist (`schemas/photographic-witness.schema.json` onward, `docs/mvp/`, `device/field-companion-workflow.md`), documented and cross-referenced but not implemented. See `docs/research/speculative-instrumentation/` for the research method behind this addition.
- [Planned] / [Research] First running implementation of any Investigation Engine reasoning layer, output-format generator, or knowledge-graph renderer. See `investigation-engine/architecture/reasoning-layers.md` for which of the 34 layers are schema-ready (`Scaffolded`) versus need a defined method (`[Planned]`) versus are open methodological problems (`[Research]`).

## Source

This roadmap synthesizes a public-repository scaffolding packet delivered by Kemi on 2026-06-26 (`CLAUDE_CODE_MASTER_DIRECTIVE.md` and `REPOSITORY_STRUCTURE.md`), plus the "Omoluabi Investigation Engine — Complete Claude Code Package (Master Specification)" delivered by Kemi on 2026-07-07.
