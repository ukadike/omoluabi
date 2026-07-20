# Investigation Workflow

The engine models investigation as a cycle, not a pipeline with an end state. Every
stage below maps to `schemas/investigation-case.schema.json`'s `workflow_stage` enum.

```text
Observe → Collect → Verify → Compare → Challenge → Corroborate →
Model → Explain → Publish → Monitor → Update → Archive → Repeat
```

| Stage | What happens | Status |
|---|---|---|
| Observe | An Observation or externally sourced item is noticed as potentially relevant. | Reuses `schemas/observation.schema.json` — scaffolded |
| Collect | The item becomes an Evidence Object with provenance. | Scaffolded (`schemas/evidence-object.schema.json`) |
| Verify | Authenticity, source ladder, and evidence quality layers run. | `[Planned]` — see `architecture/reasoning-layers.md` |
| Compare | The Claim is checked against existing Claims and the knowledge graph. | `[Planned]` |
| Challenge | Bias, incentive, and alternative-explanation layers run. | `[Research]` |
| Corroborate | Independent evidence is sought; contradiction and confidence scores update. | `[Planned]` |
| Model | The Claim is placed into the knowledge graph and timeline. | `[Planned]` |
| Explain | An output artifact is drafted for a given audience (see `docs/output-formats.md`). | `[Planned]` |
| Publish | A human approves release, per the root governance loop and `governance/human-governance.md`. | Reuses root governance — scaffolded |
| Monitor | The Claim is watched for new evidence or contradictions. | `[Research]` — no monitoring implementation exists |
| Update | Research state or confidence changes; a correction record is written if needed. | Reuses `schemas/correction.schema.json` — scaffolded |
| Archive | The case moves to `archived` publication status; nothing is deleted. | Reuses root archive convention — scaffolded |
| Repeat | Archived cases can reopen if new evidence appears; the cycle is never permanently closed. | Design principle, not yet enforced by any interface |

## Status

The stage vocabulary and its ordering are settled. "Scaffolded" above means the stage
is either reusing an existing, drafted Omoluabi schema, or is fully specified as a
schema field in this directory. "`[Planned]`" means the stage's data shape is defined
but the logic that would move a case between stages is not implemented. "`[Research]`"
means the stage requires methodology this specification does not yet have (for
example, what "sufficient corroboration" means is domain-dependent and unresolved).
Per the master specification's instruction, these placeholders are preserved rather
than removed, and none of the workflow scope has been quietly reduced to only the
scaffolded stages.
