# Output Formats

An `investigation-case` may produce any of the following, recorded in
`output_formats_produced` on `schemas/investigation-case.schema.json`:

| Format | Description | Status |
|---|---|---|
| Research report | Long-form written findings with full evidence trail. | [Planned] |
| Evidence cards | One card per Evidence Object, following `cards/evidence-object.card.md`'s template. | Scaffolded |
| Interactive timeline | Rendered view of `timeline_position` fields across a case's entities. | [Planned] — depends on `architecture/knowledge-graph.md` rendering layer |
| Knowledge graph | Rendered view of `schemas/knowledge-graph-entity.schema.json` nodes and edges. | [Planned] |
| Contradiction report | Listing of all `schemas/contradiction.schema.json` records for a case, resolved and unresolved. | Scaffolded |
| Public article | Journalism-mode narrative output for general audiences. | [Planned] |
| Academic summary | Research-mode structured summary with citations. | [Planned] |
| Policy brief | Policy Analysis-mode short-form recommendation document. | [Planned] |
| Newsroom package | Bundle of public article + evidence cards + accessibility metadata, ready for editorial review. | [Planned] |
| Accessibility report | Output of the Accessibility Review reasoning layer across a case's artifacts. | Scaffolded (reuses `schemas/accessibility.schema.json`) |
| Machine-readable schema | The case's own JSON representation, per `schemas/investigation-case.schema.json`. | Scaffolded |
| API response | A case or its components served through an API. | [Planned] — no Investigation Engine API endpoints are drafted yet; would extend `api/openapi-draft.yaml`, marked "not yet implemented" like every other endpoint there |
| Dataset | Structured export of a case's evidence and claims for external analysis. | [Planned] |

## Rule

Every output format, regardless of audience, must satisfy `docs/transparency-rules.md`
in full. A "public article" is not exempt from showing what remains unknown; it may
summarize that transparency in plain language, but it may not omit it.

## Status

Format list settled (13 formats, matching the master specification). Two are
scaffolded today because they are direct renderings of an already-scaffolded schema
(Evidence cards, Machine-readable schema) or a reused one (Accessibility report,
Contradiction report). The rest require a generation or rendering interface that does
not exist yet.
