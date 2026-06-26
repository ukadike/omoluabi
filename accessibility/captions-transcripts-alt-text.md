# Captions, Transcripts, Alt Text

## Requirements (from baseline)

- captions
- transcripts
- alt text
- form labels

## Relationship to Schemas

These requirements correspond to fields in `schemas/accessibility.schema.json` and to the governance rules SSL-004, SSL-005, and SSL-006 in `governance/rule-library.md` (consent, accessibility, and human review obligations).

Any observation with audio or image media (see the `media` field in `schemas/observation.schema.json`) should have a path toward a transcript and/or alt text before it can move toward a public `publication_status`.

## Source

Derived from the "Web Engine Accessibility" list in `11_accessibility/ACCESSIBILITY_BASELINE.md`, cross-referenced to schemas and governance rules.