# Index

A sitemap of this repository. Start with `000_START_HERE.md` if you haven't already; this page exists for quick lookup once you know roughly what you're after.

## Orientation

- [`README.md`](README.md) — project overview, core principle, governance loop, license split
- [`000_START_HERE.md`](000_START_HERE.md) — reading order and repository map
- [`ROADMAP.md`](ROADMAP.md) — what's built, in progress, and planned
- [`SSL-METHOD.md`](SSL-METHOD.md) — the Small Systems Lab method this project applies
- [`OPERATIONS-RULES-ANCIENT-GEOMETRY.md`](OPERATIONS-RULES-ANCIENT-GEOMETRY.md) — geometry as interface logic
- [`CHANGELOG.md`](CHANGELOG.md) — notable changes
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to contribute
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)
- [`LICENSE`](LICENSE) (code/schemas, Apache-2.0) · [`LICENSE-DOCS.md`](LICENSE-DOCS.md) (documentation, CC BY 4.0)
- [`SCHEMA_CARD.md`](SCHEMA_CARD.md) — one-page project/data card
- [`docs/REPO_AUDIT.md`](docs/REPO_AUDIT.md) — this restoration pass's repository audit

## Docs

- [`docs/vision.md`](docs/vision.md) — vision, non-negotiables
- [`docs/vision/README.md`](docs/vision/README.md) and [`docs/vision/omoluabi-origin-storyboard.md`](docs/vision/omoluabi-origin-storyboard.md) — origin storyboard
- [`docs/mvp-plan.md`](docs/mvp-plan.md) — MVP governance loop, system layers, stack
- [`docs/glossary.md`](docs/glossary.md)
- [`docs/public-benefit.md`](docs/public-benefit.md)
- [`docs/funding-brief.md`](docs/funding-brief.md)
- [`docs/mvp/hardware/instrumentation-revision-v0.02.md`](docs/mvp/hardware/instrumentation-revision-v0.02.md) — Photographic/Cartographic Witness Layer hardware revision
- [`docs/mvp/interface/photographic-witness-interface.md`](docs/mvp/interface/photographic-witness-interface.md) · [`docs/mvp/interface/cartographic-witness-interface.md`](docs/mvp/interface/cartographic-witness-interface.md) — interface design documentation
- [`docs/research/instrumentation/current-state-audit.md`](docs/research/instrumentation/current-state-audit.md) — pre-work audit for the instrumentation directive
- [`docs/research/speculative-instrumentation/`](docs/research/speculative-instrumentation/README.md) — the speculative-to-technical research method, method overview, two case studies, traceability matrix, decision log, and future-questions backlog
- [`docs/portfolio/omoluabi-proof-of-method.md`](docs/portfolio/omoluabi-proof-of-method.md) — external-evaluator-facing proof of method

## Governance

- [`governance/principles.md`](governance/principles.md) — constitutional principles
- [`governance/rule-library.md`](governance/rule-library.md) — SSL-001..SSL-010
- [`governance/ai-permissions.md`](governance/ai-permissions.md)
- [`governance/consent-model.md`](governance/consent-model.md)
- [`governance/correction-model.md`](governance/correction-model.md)
- [`governance/publication-status.md`](governance/publication-status.md)

## Architecture

- [`architecture/system-overview.md`](architecture/system-overview.md)
- [`architecture/observation-pipeline.md`](architecture/observation-pipeline.md)
- [`architecture/governance-pipeline.md`](architecture/governance-pipeline.md)
- [`architecture/data-lifecycle.md`](architecture/data-lifecycle.md)
- [`architecture/sync-and-federation.md`](architecture/sync-and-federation.md)

## Research

- [`research/research-questions.md`](research/research-questions.md)
- [`research/literature-review.md`](research/literature-review.md)
- [`research/standards.md`](research/standards.md)
- [`research/references.md`](research/references.md)
- ADRs: [`ADR-0001`](research/design-decisions/ADR-0001-schema-first.md) (schema-first) · [`ADR-0002`](research/design-decisions/ADR-0002-governance-before-ai.md) (governance before AI) · [`ADR-0003`](research/design-decisions/ADR-0003-device-as-observation-instrument.md) (device as observation instrument) · [`ADR-0004`](research/design-decisions/ADR-0004-consent-and-publication-status-are-distinct.md) (consent vs. publication status) · [`ADR-0005`](research/design-decisions/ADR-0005-investigation-engine-reuses-governed-record-model.md) (investigation engine reuses governed-record model)

## Schemas & Cards

- [`schemas/README.md`](schemas/README.md) — sixteen JSON Schemas (draft 2020-12): observation, consent, source, risk, accessibility, publication, correction, ai-permission, federation, memory, photographic-witness, media-provenance, observer-perception, location-evidence, landscape-memory, movement-trace, projection-accountability, map-missingness, location-protection
- [`cards/README.md`](cards/README.md) — one human-readable card per schema, shared template

## Device, Web Engine, API

- [`device/README.md`](device/README.md) · [`device/parts-list.md`](device/parts-list.md) · [`device/circuit-notes.md`](device/circuit-notes.md) · [`device/enclosure-notes.md`](device/enclosure-notes.md) · [`device/firmware-plan.md`](device/firmware-plan.md) · [`device/accessibility-hardware.md`](device/accessibility-hardware.md) · [`device/field-companion-workflow.md`](device/field-companion-workflow.md)
- [`web-engine/README.md`](web-engine/README.md) · [`web-engine/architecture.md`](web-engine/architecture.md) · [`web-engine/screens.md`](web-engine/screens.md) · [`web-engine/local-first-plan.md`](web-engine/local-first-plan.md) · [`web-engine/p5-ml5-prototype-plan.md`](web-engine/p5-ml5-prototype-plan.md)
- [`api/api-principles.md`](api/api-principles.md) · [`api/endpoints-draft.md`](api/endpoints-draft.md) · [`api/openapi-draft.yaml`](api/openapi-draft.yaml) · [`api/versioning.md`](api/versioning.md)

## Accessibility

- [`accessibility/baseline.md`](accessibility/baseline.md) — repository, web engine, and device accessibility requirements; links to Accessible by Design
- [`accessibility/blind-editor-workflow.md`](accessibility/blind-editor-workflow.md)
- [`accessibility/captions-transcripts-alt-text.md`](accessibility/captions-transcripts-alt-text.md)
- [`accessibility/keyboard-workflow.md`](accessibility/keyboard-workflow.md)
- [`accessibility/tactile-and-haptic.md`](accessibility/tactile-and-haptic.md)

## Diagrams

- [`diagrams/README.md`](diagrams/README.md) — Mermaid source: system overview, governance flow, device architecture, API roadmap, observation pipeline, federation (stub)

## Examples

- [`examples/omoluabi-field-observation.json`](examples/omoluabi-field-observation.json)
- [`examples/esl-sensor-reading.json`](examples/esl-sensor-reading.json)
- [`examples/umada-archive-fragment.json`](examples/umada-archive-fragment.json)

## Funding

- [`funding/one-page-brief.md`](funding/one-page-brief.md)
- [`funding/fellowship-language.md`](funding/fellowship-language.md)
- [`funding/reviewer-facing-summary.md`](funding/reviewer-facing-summary.md)
- [`funding/ssrc-application-notes.md`](funding/ssrc-application-notes.md)

## Bridges & Sandboxes

- [`earth-sensors-lab-bridge/README.md`](earth-sensors-lab-bridge/README.md) · [`earth-sensors-lab-bridge/sensor-observation-model.md`](earth-sensors-lab-bridge/sensor-observation-model.md) — links to [Earth Sensors Lab](https://github.com/ukadike/Earth-Sensors-Lab)
- [`umada-sandbox/README.md`](umada-sandbox/README.md) · [`umada-sandbox/stress-tests.md`](umada-sandbox/stress-tests.md) — speculative stress-testing, distinct from the `ukadike/Umada` narrative repository

## Demonstrations

- [`ufo-connection/README.md`](ufo-connection/README.md) — The UFO Connection: a self-contained GitHub Pages demo reading official PURSUE UAP/UFO disclosure records ([live page](ufo-connection/index.html), [`ufo-connection/PROJECT_BRIEF.md`](ufo-connection/PROJECT_BRIEF.md), [`ufo-connection/SOURCE_NOTES.md`](ufo-connection/SOURCE_NOTES.md))
- [`world-layer-sandbox/README.md`](world-layer-sandbox/README.md) — Coastal Relay: an exploratory, non-canon Umada world-layer p5.js sketch ([`world-layer-sandbox/p5-coastal-relay/`](world-layer-sandbox/p5-coastal-relay/))

## Investigation Engine

- [`investigation-engine/README.md`](investigation-engine/README.md) — domain-agnostic evidence, reasoning, and knowledge-graph architecture
- [`investigation-engine/architecture/`](investigation-engine/architecture/) — system overview, evidence model, reasoning layers (34), research states, workflow, knowledge graph, intelligence modes
- [`investigation-engine/governance/`](investigation-engine/governance/) — constitutional rules (IE-001..IE-005), human-governance model
- [`investigation-engine/schemas/`](investigation-engine/schemas/) · [`investigation-engine/cards/`](investigation-engine/cards/) — seven JSON Schemas (evidence object, claim, reasoning step, contradiction, confidence score, knowledge graph entity, investigation case) and their companion cards
- [`investigation-engine/docs/`](investigation-engine/docs/) — universal research domains, output formats, transparency rules, accessibility
- [`investigation-engine/examples/`](investigation-engine/examples/) — one linked example case across all seven schemas

## Site

- [`index.html`](index.html) — public landing page (paired with [`site.css`](site.css) and [`variables.css`](variables.css))
- [`research/speculative-instrumentation/index.html`](research/speculative-instrumentation/index.html) — "From Speculative Futures to Better Instruments," the public proof-of-method page
