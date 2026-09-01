# Research States

Every Claim (`schemas/claim.schema.json`) and every Evidence Object
(`schemas/evidence-object.schema.json`) carries a `research_state`, one of:

| State | Meaning |
|---|---|
| `known` | Directly established by strong, corroborated evidence. |
| `supported` | Well-supported by evidence, without full certainty. |
| `likely` | More probable than not, given current evidence. |
| `possible` | Consistent with evidence but not yet substantiated. |
| `disputed` | Credible evidence exists on more than one side. |
| `unverified` | Asserted, but not yet checked against evidence. |
| `unknown` | No evidence exists either way. |
| `contradicted` | Evidence directly conflicts with this claim. |
| `retracted` | Previously asserted, formally withdrawn; visible per SSL-007 (Correction Visibility). |
| `archived` | No longer under active investigation; preserved for record. |

## Rules

- A state is a snapshot, not a verdict. Every state must be reversible: new evidence
  can move a Claim from `known` back to `disputed`, and the prior state remains
  visible in the Claim's history, not overwritten (see `governance/constitutional-rules.md`,
  Rule 1).
- `unknown` and `unverified` are valid, complete answers. The engine must never round
  `unknown` up to `possible` or `likely` to appear more conclusive.
- Moving a Claim to `retracted` requires a `schemas/correction.schema.json`-style
  record (what changed, why, by whom, when) per SSL-007, reused directly from the root
  schema rather than duplicated here.

## Status

Vocabulary and rules above are settled per the master specification. The transition
logic between states (what evidence or reasoning-layer output triggers a state change)
is `[Planned]` — see `architecture/reasoning-layers.md` for which layers currently
have enough specification to drive a transition versus which remain research.
