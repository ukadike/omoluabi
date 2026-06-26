# System Overview

```mermaid
flowchart TD
  SSL[Small Systems Lab] --> Rules[Rules Library]
  Rules --> Cards[Schema Cards]
  Cards --> Schemas[JSON Schemas]
  Schemas --> Device[Physical Device]
  Schemas --> Web[Web Engine]
  Device --> Archive[Archive]
  Web --> Archive
  Archive --> API[Future APIs]
  API --> Federation[Federation]
```

## Layers

```text
Small Systems Lab
  ↓
Rules Library
  ↓
Schema Cards
  ↓
JSON Schemas
  ↓
Device Capture
  ↓
Web Engine Review
  ↓
Archive
  ↓
API / Federation
```

## Source

Verbatim from `DIAGRAMS.md` and `MVP_ARCHITECTURE.md` in the packet delivered by Kemi on 2026-06-26.
