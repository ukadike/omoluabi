# Examples — Investigation Engine

Illustrative, synthetic records showing how the seven schemas in `../schemas/` link
together into one small case. IDs, dates, and content are invented for schema
demonstration only — they are not real evidence, real claims, or real findings about
any actual event, matching the convention of the root `examples/` directory's sample
records.

## The Example Case

`example-investigation-case.json` (`ie-case-0001`) ties together:

- Two Evidence Objects (`example-evidence-object.json` shows `ie-ev-0001`; a second,
  `ie-ev-0002`, is referenced but not separately filed, and is tagged accordingly)
- One Claim (`example-claim.json`, `ie-claim-0001`) built from that evidence
- One Reasoning Step (`example-reasoning-step.json`) applying the Source Ladder layer
- One Contradiction (`example-contradiction.json`) between the claim and a competing,
  unfiled minority hypothesis
- One Confidence Score (`example-confidence-score.json`) for the claim
- One Knowledge Graph Entity (`example-knowledge-graph-entity.json`) for the
  organization the evidence concerns

This is a demonstration of schema shape and cross-linking, not a template for a real
investigation.
