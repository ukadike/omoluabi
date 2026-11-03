# Omoluabi schema and card mapping

This POC uses the repo's existing schema library.

| POC data | Existing schema/card | Role |
|---|---|---|
| data/investigation-observation.json | observation.schema.json / observation.card.md | Investigation envelope and AI-assist disclosure
| data/accessibility-record.json | accessibility.schema.json / accessibility.card.md | Map labels and text equivalent
| data/risk-record.json | risk.schema.json / risk.card.md | Misinterpretation, category, and change risks
| data/correction-log.json | correction.schema.json / correction.card.md | Append-only corrections |
| data/source-records.json | source.schema.json / source.card.md | Imported source provenance |
| data/projection-accountability.json | projection-accountability.schema.json and card | Projection purpose and distortions |
| data/map-missingness.json | map-missingness.schema.json and card | Excluded territories and coverage limits |
| data/publication-review.json | publication.schema.json / publication.card.md | Publication decision record |
| REASONING_LAYER_PASS.md | Omoluabi Reasoning Layer v2 | 15-layer interpretation, uncertainty and open gaps |
| Interactive map/table | accessibility schema/card | Keyboard focus, text labels, table alternative |

Records are implementation examples. Validate against the canonical checked-in schemas before future data imports or status changes.
