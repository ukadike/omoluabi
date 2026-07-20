# Omoluabi Schema Card Addendum — SSL Rules and Universal Media

```yaml
extends:
  schema_id: ssl-universal-schema
  version: 1.0.0

uses:
  media_schema: ssl-media-schema@1.0.0
  rule_set: ssl-rules@1.0.0
```

## Omoluabi implementation statement

Omoluabi applies the Small Systems Lab Universal Schema as a governed publishing and evidence-reading workflow.

The Omoluabi MVP now includes:

- a versioned universal SSL rule set;
- deterministic browser rule evaluation;
- visible pass, warning, and failure states;
- a universal SSL Media Field;
- explicit source, annotation, transformation, synthetic, and fictional media states;
- native image, video, audio, and slideshow rendering;
- optional removable p5 analysis overlays;
- human-review status distinct from automated rule results;
- publication status distinct from consent.

## Omoluabi-specific hard rules

1. AI may assist but may not govern or publish.
2. Official records remain separate from commentary and public discourse.
3. Source media remains accessible when an analysis layer is active.
4. Evidence, interpretation, hypothesis, belief, speculation, and fiction remain visibly distinct.
5. Missing information remains visible.
6. Rule failures may not be hidden by interface design.
7. Human review is required for governed public publication.
8. Corrections preserve prior values and reasons.
