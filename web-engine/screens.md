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

Screens 1–9 (Inbox through Publication status) were implemented as running screens by the now-retired browser prototype, preserved in the [Omoluabi-News repository](https://github.com/ukadike/omoluabi-news) at `archive/engine-browser-prototype/` (built here as `web-engine/app/`, moved there per Kemi's 2026-07-08 direction, retired 2026-08-16 — see its `ARCHIVED.md`). Its `js/gate.js` enforced the no-skipping-ahead rule programmatically — a locked stage rendered a locked notice instead of its form even if navigated to directly by URL. Screen 10 (Archive/search) was implemented as a read-only table with export limited to non-private records, plus a "New observation" form (`#/new`, required headline) and a news preview (`#/news`, human-`public`-decided records only). That prototype was a first pass, not a final design; whether the successor engine keeps these screens is not yet known (its specification is `AWAITING FRAGMENT` — see the Omoluabi-News repo's `engine/README.md`).

## Source

Verbatim "First Screens" list from `09_web_engine/WEB_ENGINE_MVP.md`.