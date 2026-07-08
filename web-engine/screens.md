# First Screens

The initial MVP screen set for the web engine:

1. Inbox / new observations
2. Observation detail view
3. Source review
4. Consent review
5. Risk review
6. Accessibility review
7. AI assist panel (optional, advisory only)
8. Human decision screen
9. Publication status screen
10. Archive / search view

## Relationship to Governance

Each screen corresponds to a stage of `architecture/governance-pipeline.md`. No screen may skip ahead in the pipeline (for example, setting publication status before consent and risk are reviewed).

## Implementation Status

Screens 1–9 (Inbox through Publication status) are implemented as running screens in `app/`, gated by `app/js/gate.js`, which enforces the no-skipping-ahead rule programmatically — a locked stage renders a locked notice instead of its form even if navigated to directly by URL. Screen 10 (Archive/search) is implemented as a read-only table with export limited to non-private records. A "New observation" form (`#/new`) is also implemented, so Screen 1 covers both the inbox and manual creation — an observation can be authored without a field device, recorded with `source.origin_type: "web-form"`. This is a first-pass prototype, not a final design for any of these screens.

## Source

Verbatim "First Screens" list from `09_web_engine/WEB_ENGINE_MVP.md`.