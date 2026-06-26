# Observation Pipeline

The MVP Loop — the path a single observation takes from capture to publication:

```mermaid
flowchart TD
  A[Observation Begins] --> B[Create Observation ID]
  B --> C[Attach Source Metadata]
  C --> D[Attach Consent State]
  D --> E[Assess Risk]
  E --> F[Generate Accessibility Metadata]
  F --> G[Optional AI Assist]
  G --> H[Human Review]
  H --> I{Publication Decision}
  I -->|Private| J[Private Archive]
  I -->|Review| K[Editorial Queue]
  I -->|Public| L[Public Archive]
  I -->|Embargoed| M[Timed Hold]
  I -->|Withdrawn| N[Withdrawal Record]
  L --> O[Future API]
```

This is the same loop described in `docs/mvp-plan.md`. For the governance rules that gate each step, see `architecture/governance-pipeline.md`. For the underlying capture-to-archive lifecycle, see `architecture/data-lifecycle.md`.

## Source

Verbatim from `MVP_ARCHITECTURE.md` in the packet delivered by Kemi on 2026-06-26.
