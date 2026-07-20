# Omoluabi — Schema Card

A one-page project/data card summarizing what Omoluabi is, who it's for, and how its data is shaped. See `cards/README.md` for the per-record-type companion cards this card summarizes, and `000_START_HERE.md` / `INDEX.md` for full navigation.

## Project Name

Omoluabi

## Purpose

An open research initiative developing trustworthy infrastructure for observation, documentation, accessibility, provenance, consent, and civic knowledge. Omoluabi-News, an accessible portable newsroom system, is its first live implementation concept: self-hostable, deployable on low-cost hardware, built to help independent publishers reclaim control over how they create, publish, and sustain their work, without central platform control.

Core sentence: **AI assists. Rules govern. Humans publish.**

## Audience

Journalists, community archivists, researchers, educators, accessibility practitioners, environmental observers, civic institutions, museums, public-interest technologists (per `funding/one-page-brief.md`). The web engine specifically serves the human reviewers required by `governance/governance-pipeline.md`.

## Core Concepts

- **Observation** — the smallest unit of governed knowledge; every record begins as an observation, not a conclusion (SSL-001).
- **Consent** — a versioned declaration of how a subject permits an observation to be used and shared (SSL-003); distinct from, and prior to, publication status (see ADR-0004).
- **Source** — provenance metadata: origin, device, collector, or import method (SSL-002).
- **Risk** — an assessment constraining distribution before exposure (SSL-008).
- **Accessibility metadata** — alt text, transcripts, tactile/haptic equivalents, etc., required before publication (SSL-004).
- **Publication status** — private, internal_review, public, embargoed, or withdrawn (SSL-006); a separate, later, human-governed decision from consent state.
- **Correction** — preserves what changed, when, why, and by whom (SSL-007).
- **AI Permission / AI Assist** — what an AI assist action did and whether a human verified it; AI may suggest, never govern (SSL-005).
- **Federation** — which fields of a record have been exposed to another node or the public API (status: draft placeholder; federation trust model unscoped — see `architecture/sync-and-federation.md`).
- **Memory** — status: draft; shape not yet fully specified.

The governance loop: **Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive → API-ready record.**

## Data Structures

Ten JSON Schemas (draft 2020-12) in `schemas/`, each with a human-readable companion card in `cards/` following the Shared Card Template (System, Purpose, Who is affected, Consent required, Evidence required, Accessibility required, Risk level, What AI may/may not do, Human decision required, Archive/Publication/Federation status, Version):

| Schema | Required fields | Notes |
|---|---|---|
| `observation.schema.json` | `observation_id`, `created_at`, `system`, `publication_status` | Verbatim from the source packet. `system` enum: `omoluabi`, `earth-sensors-lab`, `echo`, `ounje`, `accessible-by-design`, `umada` |
| `consent.schema.json` | `consent_id`, `state`, `consent_version`, `recorded_at` | |
| `source.schema.json` | `source_id`, `origin_type`, `recorded_at` | |
| `risk.schema.json` | `risk_id`, `risk_level`, `assessed_at` | Risk-level scale is a first-draft judgment call, flagged in the schema's own `description` |
| `accessibility.schema.json` | `accessibility_id`, `recorded_at` | alt_text, transcript, captions_available, plain_language_summary, tactile_or_haptic_equivalent, screen_reader_label, reduced_motion_safe |
| `publication.schema.json` | `publication_id`, `status`, `decided_at` | Separate from consent state (ADR-0004) |
| `correction.schema.json` | `correction_id`, `observation_id`, `field_or_claim`, `prior_value`, `new_value`, `corrected_by`, `corrected_at`, `reason` | |
| `ai-permission.schema.json` | `ai_permission_id`, `task`, `human_verified` | |
| `federation.schema.json` | `federation_id`, `observation_id`, `exposed_fields` | Draft placeholder |
| `memory.schema.json` | `memory_id`, `recorded_at` | Draft; shape is a judgment call, flagged in the schema's own `description` |

Except `observation.schema.json` (verbatim from the source packet), all schemas are first drafts, internally consistent with `governance/` but not yet reviewed by Kemi (per `schemas/README.md`).

### Example records (`examples/`)

- `omoluabi-field-observation.json` — a full observation with media, consent/source/risk/accessibility IDs, and an `ai_assist` block (transcript draft, confidence 0.72, `human_verified: false`)
- `esl-sensor-reading.json` — an Earth Sensors Lab soil-moisture/temperature/humidity reading using the same observation shape (`system: "earth-sensors-lab"`)
- `umada-archive-fragment.json` — a UMADA sandbox stress-test record (`system: "umada"`), dated 2226-03-19 at "Cape Wipeout," consistent with the Umada canon ledger's locked Cape Wipeout date and location (checked against `/home/user/Umada/00_governance/CANON_STATUS.md`; no contradiction found — see `docs/REPO_AUDIT.md`)

## Interfaces

- `api/api-principles.md` — every schema is designed as if it may eventually become a public endpoint; no record is exposed unless its publication status, consent, and provenance fields say it may be
- `api/endpoints-draft.md` / `api/openapi-draft.yaml` — draft OpenAPI 3.1.0 surface at `/api/v0`: `GET /schemas`, `GET /rules`, `POST /observations`, `GET /observations/{id}`, `POST /consent`, `GET /sources/{id}`, `POST /risk`, `POST /accessibility`, `POST /publication-decisions`, `GET /public-archive`, `GET /federation/manifest`. Every response is explicitly marked "Draft — not yet implemented"; no endpoint should be called by production code.
- `api/versioning.md` — `/api/v0/` (draft, unstable) then `/api/v1/` (first stable surface, not yet released); no deprecation policy specified yet

## Inputs / Outputs

- **Inputs**: field observations captured by the planned device (audio, image, video, transcript, location) or entered manually into the planned web engine; sensor readings from Earth Sensors Lab; speculative stress-test records from `umada-sandbox/`.
- **Outputs**: governed, versioned records (observation + consent + source + risk + accessibility + publication + correction + ai-permission [+ federation, memory]) moving through private → internal_review → public/embargoed/withdrawn states; eventually API-ready and federatable records (not yet implemented).

## Dependencies

- JSON Schema draft 2020-12 (schemas)
- OpenAPI 3.1.0 (API draft)
- Mermaid (diagrams)
- Planned stack (not yet built): TypeScript web engine, Astro or Next.js, SQLite → Postgres, p5.js/ml5.js prototyping (see `docs/mvp-plan.md`)
- Planned hardware (not yet built): Arduino UNO Q 2GB, Arduino Nicla Vision, Arduino Nano 33 BLE Sense Rev2 (see `device/parts-list.md`)
- `ufo-connection/` demo: no runtime dependencies (`package.json` has no `dependencies`); uses Node's built-in `fetch` and a hand-written CSV parser

## Related Repos (Small Systems Lab ecosystem)

- **Accessible by Design** (`github.com/ukadike/accessible-by-design-prototyping`) — WCAG 2.2+ auditing toolkit; source of the accessibility auditing principles referenced in `accessibility/baseline.md`. Also listed as an SSL `system` in `schemas/observation.schema.json`.
- **Earth Sensors Lab** (`github.com/ukadike/Earth-Sensors-Lab`) — uses Omoluabi's observation/source/accessibility/publication/memory cards for sensor readings and STEAM education; bridged in `earth-sensors-lab-bridge/`.
- **Umada** (`github.com/ukadike/Umada`) — narrative/worldbuilding project where Omoluabi appears as a fictional device carried by a future reporter. `umada-sandbox/` is a related but distinct engineering stress-test tool, not narrative canon.
- **Small Systems Lab** (`ukadike.github.io/Small-Systems-Lab`) — the umbrella public-interest studio Omoluabi belongs to.

## Accessibility Considerations

Accessibility is treated as required infrastructure, not polish (`accessibility/baseline.md`): no public object is complete without accessibility metadata (SSL-004). Requirements span repository docs (alt text, plain-language summaries), the web engine (keyboard-first workflow, screen reader support, high contrast, captions/transcripts, visible focus states, skip links, reduced motion), and the device (tactile controls, haptic/audio feedback, status redundancy across light + sound + vibration). See `accessibility/blind-editor-workflow.md` for the specific tasks a blind editor must be able to complete end to end, and the Related Work note in `accessibility/baseline.md` for the cross-reference to Accessible by Design's auditing methodology.

## Future Implementation Notes

- Nothing here is running code yet: device firmware, web engine, and API are plans and drafts only (`ROADMAP.md`).
- Nine of ten schemas need Kemi's review before being treated as stable.
- Federation trust model is unscoped (`architecture/sync-and-federation.md`); `diagrams/federation.mmd` is a stub.
- Keyboard workflow spec (keybindings, tab order, focus-trap handling) is an open question in `accessibility/keyboard-workflow.md`.
- `memory.schema.json`'s shape and `risk.schema.json`'s risk-level scale are first-draft judgment calls, each flagged in the schema's own `description` field.

## SSL Universal Extension

This Omoluabi project card extends `ssl-universal-schema@1.0.0`, uses `ssl-media-schema@1.0.0`, and evaluates governed records against `ssl-rules@1.0.0`. See [`SCHEMA_CARD-ADDENDUM.md`](SCHEMA_CARD-ADDENDUM.md) for the implementation-specific declaration.

