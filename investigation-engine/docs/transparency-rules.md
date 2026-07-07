# Transparency Rules

Every answer this engine helps produce — in any intelligence mode, any output format —
must show:

1. **What is known** — backed by `research_state: known` or `supported` claims, with
   evidence IDs.
2. **What is assumed** — the `assumptions` field on `schemas/claim.schema.json`.
3. **What is inferred** — the `inferences` field on `schemas/claim.schema.json`,
   distinct from assumptions: an inference follows from evidence via reasoning; an
   assumption is taken as given without direct evidentiary support.
4. **What remains unknown** — the `unknowns` field, required on both Evidence Objects
   and Claims, not left implicit.
5. **What evidence is missing** — the `missing_evidence` field, and the Missing
   Evidence reasoning layer's output where it ran.
6. **Why confidence received its score** — the `factors` array on
   `schemas/confidence-score.schema.json`; a bare number with no rationale is an
   incomplete record, not a valid one.

## Enforcement

These six items are not a formatting suggestion for human writers — they are schema
fields (`schemas/claim.schema.json`, `schemas/confidence-score.schema.json`) that a
case cannot reach `approved` `human_governance` status without populating. An output
format (`docs/output-formats.md`) may simplify their presentation for a given
audience (e.g. a plain-language summary versus an academic summary) but may not omit
any of the six.

## Status

Rule set settled per the master specification (verbatim: "known / assumed / inferred /
unknown / missing evidence / confidence rationale"). Field-level enforcement is
schema-level only today; no validator runs these checks yet.
