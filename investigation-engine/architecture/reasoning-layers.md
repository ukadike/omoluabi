# Reasoning Layers

Every layer below can be applied to a Claim or Evidence Object, producing a
`schemas/reasoning-step.schema.json` record: what layer ran, what it took as input,
what it concluded, and a `status` of `implemented`, `requires_further_evidence`, or
`placeholder`. No domain gets a different set of layers — the same 34 layers apply
whether the case is a scientific paper, a UAP report, or a historical dispute.

Status legend, matching root `ROADMAP.md`:

- **Scaffolded** — the layer's inputs/outputs are fully specified as schema fields
  today (`schemas/reasoning-step.schema.json` can represent it), even though no code
  performs the reasoning yet.
- **[Planned]** — the shape is specified, but the method needs a defined procedure
  before it can be scaffolded further.
- **[Research]** — the method itself is an open problem; premature to schema-lock.

## Source and Evidence Quality

| Layer | What it does | Status |
|---|---|---|
| Source Ladder | Ranks a source's reliability tier against known reference classes. | Scaffolded |
| Evidence Quality | Scores completeness, directness, and corroboration of a piece of evidence. | Scaffolded |
| Data Quality | Checks for gaps, inconsistency, or malformed data within an evidence artifact. | Scaffolded |
| Missing Evidence | Flags what would be expected to exist but hasn't been found. | Scaffolded |
| Chain of Custody | Verifies unbroken, documented handling from origin to current custody. | Scaffolded (field on `evidence-object.schema.json`) |

## Context and Time

| Layer | What it does | Status |
|---|---|---|
| Historical Context | Places evidence against known historical record. | [Planned] |
| Temporal Reasoning | Checks whether claimed sequences and durations are physically/logically consistent. | [Planned] |
| Timeline Reconstruction | Builds an ordered event sequence from evidence with timeline positions. | Scaffolded (derived view, `architecture/knowledge-graph.md`) |
| Geographic Mapping | Places evidence and entities spatially; checks geographic plausibility. | Scaffolded (derived view) |

## Contradiction and Alternatives

| Layer | What it does | Status |
|---|---|---|
| Contradiction Detection | Flags when two claims or evidence items conflict. | Scaffolded (`schemas/contradiction.schema.json`) |
| Narrative Probability | Estimates how likely a proposed explanatory narrative is relative to alternatives. | [Research] |
| Alternative Explanations | Enumerates competing explanations for the same evidence. | [Planned] |
| Minority Hypotheses | Preserves less-favored but not disproven explanations rather than discarding them. | Scaffolded (field: a Claim's `contradicting_claim_ids` may include a minority hypothesis explicitly marked, not deleted) |

## Bias and Incentive

| Layer | What it does | Status |
|---|---|---|
| Bias Detection | Flags likely cognitive, institutional, or source bias affecting a claim. | [Research] |
| Institutional Incentives | Considers what an institution gains or loses from a claim being true. | [Research] |
| Economic Incentives | Considers financial motive relevant to a claim's origin. | [Research] |
| Political Incentives | Considers political motive relevant to a claim's origin. | [Research] |

## Technical and Scientific

| Layer | What it does | Status |
|---|---|---|
| Technical Feasibility | Checks whether a claim is physically/technically possible given known constraints. | [Planned] |
| Scientific Consensus | Compares a claim against current expert consensus, with consensus sourced and dated. | [Planned] |
| Sensor Correlation | Cross-checks claims against independent sensor data (e.g. Earth Sensors Lab readings). | [Planned] — see `earth-sensors-lab-bridge/` in root repo |
| Image Analysis | Examines images for manipulation, consistency, or corroborating detail. | [Research] |
| Audio Analysis | Examines audio for manipulation, consistency, or corroborating detail. | [Research] |
| Document Analysis | Examines documents for consistency, authenticity markers, or alteration. | [Research] |

## Ethics, Access, and Rights

| Layer | What it does | Status |
|---|---|---|
| Accessibility Review | Confirms an artifact meets accessibility requirements before use in an output. | Scaffolded (`docs/accessibility.md`, reuses `schemas/accessibility.schema.json`) |
| Translation Confidence | Scores confidence in a translation and preserves translation provenance. | Scaffolded (field on `evidence-object.schema.json`) |
| Ethics Review | Flags ethical concerns in collecting, holding, or publishing evidence. | [Planned] |
| Privacy Review | Flags personal-data exposure risk. | Scaffolded (reuses root `schemas/risk.schema.json` and `governance/consent-model.md`) |
| Legal Review | Flags legal exposure in publishing a claim or evidence artifact. | [Research] |

## Human and Field Input

| Layer | What it does | Status |
|---|---|---|
| Community Testimony | Incorporates testimony from affected communities as evidence, with consent tracked. | Scaffolded (`media_type: testimony` on `evidence-object.schema.json`, reuses `governance/consent-model.md`) |
| Field Observations | Incorporates direct field observations. | Scaffolded (reuses `schemas/observation.schema.json`) |

## Mapping and Synthesis

| Layer | What it does | Status |
|---|---|---|
| Relationship Mapping | Builds edges between knowledge-graph entities. | Scaffolded (`architecture/knowledge-graph.md`) |

## Meta-Reasoning

| Layer | What it does | Status |
|---|---|---|
| Uncertainty Analysis | Makes explicit what is not known, distinct from what is disputed. | Scaffolded (`docs/transparency-rules.md`) |
| Confidence Scoring | Produces a numeric confidence score with a documented rationale. | Scaffolded (`schemas/confidence-score.schema.json`) |
| Future Research Suggestions | Proposes what evidence or method would resolve an open question. | Scaffolded (field: `open_questions` plus free-text suggestion on `investigation-case.schema.json`) |

## Total

34 layers, matching the master specification's Master Reasoning Layers list exactly.
None have been dropped, renamed away from the spec's naming, or merged to reduce
count — layers that share a data shape (e.g. Timeline Reconstruction and Geographic
Mapping being derived views) are noted as such but each still appears as its own row
and can still produce its own `schemas/reasoning-step.schema.json` record with its own
`layer` value.

## Note on `[Research]` Layers

Layers marked `[Research]` (Bias Detection, Institutional/Economic/Political
Incentives, Narrative Probability, Image/Audio/Document Analysis, Legal Review) are
exactly the layers where a method claiming to "detect" something as slippery as bias
or manipulation risks fabricating false confidence if schema-locked prematurely. Per
the no-fabrication rule, these remain explicit placeholders — `requires further
evidence` — rather than a shipped scoring method that would imply more rigor than
exists today.
