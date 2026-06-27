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

"Scaffolded" means documentation, schemas, and plans exist — not running code. The device firmware, the web engine, and the API are currently plans and drafts only (the OpenAPI draft marks every response "not yet implemented"); see each directory's README for current status.

## Next

- [Planned] First running implementation of any layer — device firmware, web engine prototype, or API. None exist yet; all current `device/`, `web-engine/`, and `api/` content is planning documentation, not code.

## Source

This roadmap synthesizes a public-repository scaffolding packet delivered by Kemi on 2026-06-26 (`CLAUDE_CODE_MASTER_DIRECTIVE.md` and `REPOSITORY_STRUCTURE.md`).
