# Constitutional Rules — Investigation Engine

These rules govern reasoning and conclusions specifically. They sit on top of, and
never override, the root `governance/principles.md` constitutional principles.

## The Four Rules

### IE-001 — Evidence Before Conclusion
Omoluabi never begins from a conclusion. Omoluabi begins from evidence. A Claim
(`schemas/claim.schema.json`) must cite at least one Evidence Object ID before it can
carry any `research_state` other than `unverified` or `unknown`.

### IE-002 — Reversibility
Every conclusion must be reversible. No interface may make it easier to lock a
`research_state` than to reopen one. Moving to `retracted` uses the same
`schemas/correction.schema.json` pattern as any other Omoluabi correction (SSL-007):
what changed, when, why, by whom — visible, not erased.

### IE-003 — Traceability
Every source must remain traceable. Every Evidence Object requires a `source_id`
(reusing `schemas/source.schema.json`, per SSL-002). No claim may cite evidence that
has no recorded source, even a source recorded as `unknown` or `withheld`.

### IE-004 — Inspectability
Every reasoning step must remain inspectable. Every application of a reasoning layer
(`architecture/reasoning-layers.md`) produces its own
`schemas/reasoning-step.schema.json` record — inputs, method, output, confidence
delta, and who performed it. A conclusion with no recorded reasoning steps behind it
cannot be published (`governance/human-governance.md`).

### IE-005 — Human Final Authority
Human judgment is always the final authority. This extends SSL-005 (AI Is Assistive)
and SSL-006 (Human Publication) specifically to reasoning: AI may propose a Claim,
a reasoning step, a confidence score, or an output draft. AI may not decide a
`research_state`, resolve a contradiction, or approve publication of a conclusion.

## Relationship to Root Rules

| This rule | Extends |
|---|---|
| IE-001 | SSL-001 (Observation First) |
| IE-002 | SSL-007 (Correction Visibility) |
| IE-003 | SSL-002 (Provenance Required) |
| IE-004 | new — no direct root equivalent; reasoning steps did not exist as a record type before this subsystem |
| IE-005 | SSL-005 (AI Is Assistive), SSL-006 (Human Publication) |

## Status

Settled. These are design rules, not yet enforced by any running validator.
