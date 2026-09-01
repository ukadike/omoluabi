# Omoluabi

![Minimal black-and-white line drawing of a woman seated at a desk in Lagos, wearing a headwrap and working on a laptop connected to a small portable publishing device, with cables visible and a faint city skyline in the background.](omoluabi-sketch.png)

## An accessible portable newsroom system and publishing node.

Omoluabi is an open research initiative developing trustworthy infrastructure for observation, documentation, accessibility, provenance, consent, and civic knowledge.

Omoluabi-News, an accessible, portable newsroom system, is the first live implementation of this model: self-hostable, deployable on low-cost hardware, and built to help independent publishers reclaim control over how they create, publish, and sustain their work.

The system integrates AI assistance with clear human oversight, prioritizing editorial accountability, accessibility, and long-term autonomy from platform dependence. Omoluabi is designed to support interconnected deployments, enabling stories to be shared across independent nodes without central platform control.

## Why Omoluabi?

Omoluabi begins with a simple question.

> How do we protect stories from erasure?

Rather than starting with software, Omoluabi begins with people, memory, accountability, and community stewardship.

Read the full vision:

**[docs/vision/omoluabi-origin-storyboard.md](docs/vision/omoluabi-origin-storyboard.md)**

## Core Principle

> AI assists. Rules govern. Humans publish.

## The Governance Loop

Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive → API-ready record

## Core Principles

- Editorial control with transparent AI assistance
- Accessibility-centered design
- Portable, self-hosted infrastructure
- Durable autonomy from platform dependence
- Support for interconnected nodes

## Start Here

- [`000_START_HERE.md`](000_START_HERE.md) — orientation and reading order
- [`ROADMAP.md`](ROADMAP.md) — what's built, in progress, and planned
- [`SSL-METHOD.md`](SSL-METHOD.md) — the Small Systems Lab method this project applies


## SSL Rules and Universal Media

Omoluabi now applies the [Small Systems Lab Universal Schema Card](standards/SSL_SCHEMA_CARD.md), the [SSL Universal Media Schema Card](standards/media/SSL_MEDIA_SCHEMA_CARD.md), and the versioned [SSL rules](rules/ssl-rules.v1.json). The UFO Connection is the first browser implementation: governed records, image/video/audio/slideshow media, visible rule outcomes, optional p5 analysis, and human review kept separate from automated checks.

## Demonstrations

- [`ufo-connection/`](ufo-connection/) — **The UFO Connection**, an Omoluabi user case that
  reads official PURSUE UAP/UFO disclosure records through the evidence-reading layer (known /
  missing / unresolved), keeping official records separate from public discourse and making no
  claims about the phenomena. Data is cached locally by a scheduled GitHub Action.
- [`world-layer-sandbox/`](world-layer-sandbox/) — exploratory **Umada world-layer** visuals
  (e.g. the *Coastal Relay* p5 sketch), kept deliberately separate from the archival layer:
  non-canon, reduced-motion aware, offline.
- [`investigation-engine/`](investigation-engine/) — the **Investigation Engine**, a
  domain-agnostic evidence, reasoning, and knowledge-graph architecture for turning
  evidence into inspectable, reversible, human-governed conclusions in any research
  domain. Scaffolded (schemas, cards, architecture, governance); no reasoning code
  runs yet.

## Status

Prototype development and architectural documentation in progress. This repository is being scaffolded in public; see `ROADMAP.md` for what exists today versus what is planned.

## License

This repository uses two licenses, split by content type:

- **Code, JSON Schemas, and firmware** — `schemas/`, `device/`, `web-engine/` code, `api/`, `investigation-engine/schemas/` — are licensed under [Apache License 2.0](LICENSE).
- **Documentation, governance, research, and narrative materials** — everything else, including `governance/`, `cards/`, `architecture/`, `research/`, `docs/`, `funding/`, `umada-sandbox/`, `earth-sensors-lab-bridge/`, `diagrams/`, `investigation-engine/` (excluding its `schemas/`), and this README — are licensed under [CC BY 4.0](LICENSE-DOCS.md).

The demonstration directories follow the same split (code under Apache-2.0, docs under CC BY 4.0). One exception: `world-layer-sandbox/p5-coastal-relay/vendor/p5.min.js` is third-party software (p5.js) under its own LGPL-2.1 license, included verbatim as `vendor/p5-LICENSE.txt`.

If a specific file's license is unclear from this split, open an issue.

## Small Systems Lab

Omoluabi is part of Small Systems Lab, a public-interest lab for tender systems.
