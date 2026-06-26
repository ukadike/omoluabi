# Web Engine Architecture

## Stack

- Local-first web app
- p5.js / ml5.js for prototyping and lightweight ML-assisted experiments
- Structured JSON records validated against `schemas/`
- Human review interface over the governance pipeline

## MVP User Flow

```mermaid
flowchart TD
  A[Open Observation] --> B[Review Source]
  B --> C[Review Consent]
  C --> D[Review Risk]
  D --> E[Review Accessibility]
  E --> F[Optional AI Assist]
  F --> G[Human Decision]
  G --> H[Set Publication Status]
  H --> I[Archive]
```

## Status

Architecture is a first-pass MVP description. Framework choice, hosting, and sync transport are not yet decided.

## Source

Verbatim diagram and stack list from `09_web_engine/WEB_ENGINE_MVP.md`.