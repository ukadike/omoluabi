# Evidence Model

## Principle

Every claim the Investigation Engine helps organize traces back to one or more
Evidence Objects. Nothing exists without provenance. An Evidence Object is not itself
a conclusion — it is the traceable material a Claim (`schemas/claim.schema.json`) is
built from.

## Evidence Object

Defined in `schemas/evidence-object.schema.json`. Every Evidence Object stores:

| Field | Purpose | Reuses |
|---|---|---|
| `original_source` | what the evidence is and where it came from | — |
| `source_id` | structured provenance record | `schemas/source.schema.json` |
| `acquired_at` | when this engine took custody of the evidence | — |
| `author`, `organization` | who produced it | — |
| `geographic_location` | where it concerns or originates | shape from `schemas/observation.schema.json`'s `location` |
| `timeline_position` | when the evidenced event occurred, with precision | — |
| `media_type` | document, image, audio, video, dataset, testimony, sensor reading, physical object, other | — |
| `domain` | which research domain this evidence belongs to | `docs/research-domains.md` |
| `confidence` | current confidence and its rationale | `schemas/confidence-score.schema.json` |
| `authenticity_status` | verified / probable / disputed / unverified / fabrication suspected / unknown | — |
| `accessibility_id` | alt text, transcript, plain-language summary, etc. | `schemas/accessibility.schema.json` |
| `translation_status` | whether translated, by whom, translation confidence, provenance note | — |
| `chain_of_custody` | who has held or transformed this evidence, and when | — |
| `citations` | other evidence this evidence cites or depends on | — |
| `contradiction_ids` | known contradictions involving this evidence | `schemas/contradiction.schema.json` |
| `unknowns`, `open_questions` | explicit gaps — required, not optional | — |
| `research_state` | Known / Supported / Likely / Possible / Disputed / Unverified / Unknown / Contradicted / Retracted / Archived | `architecture/research-states.md` |
| `publication_status` | private / internal_review / public / embargoed / withdrawn | reuses `schemas/observation.schema.json` enum |

## Why Evidence Is Not an Observation

`schemas/observation.schema.json` is the smallest unit of *governed field capture* —
something a device or a human witnessed directly. An Evidence Object is broader: it
can be built from one Observation, from many, from an externally acquired document, a
public dataset, a piece of community testimony, or an archival record with no
Omoluabi-device origin at all. Every Evidence Object still needs a `source_id`
(SSL-002, Provenance Required) whether or not an Observation produced it.

## No Fabrication

Consistent with the root no-fabrication rule: if an Evidence Object is referenced but
not physically present in the repository or the case file, it gets an index entry
only, tagged `AWAITING FRAGMENT`. Its `unknowns` and `open_questions` fields are not
optional filler — they are how the schema enforces "unknowns become explicit
questions" rather than silently dropped.

## Status

`schemas/evidence-object.schema.json` is a first draft, cross-referenced with
`schemas/source.schema.json` and `schemas/accessibility.schema.json`, not yet reviewed
by Kemi (same status as the nine non-verbatim root schemas — see `schemas/README.md`).
