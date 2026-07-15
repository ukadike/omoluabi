# Small Systems Lab Rules

`ssl-rules.v1.json` is the first executable SSL governance layer.

The rule file declares policy. A project-specific rules engine maps each `test` identifier to deterministic code. No arbitrary expressions are evaluated from JSON.

## Rule outcomes

- `pass`
- `warn`
- `fail`
- `not_applicable`

## Publication behavior

A `block` rule that returns `fail` should prevent a record from being represented as publishable. The interface may still display the record in internal-review or demonstration mode, but it must expose the failure.

A `warn` rule allows display only with the limitation visible or with a recorded human decision.

## Overrides

Overrides must be separate records. Minimum fields:

```json
{
  "rule_id": "SSL-000",
  "reason": "",
  "approved_by": "",
  "approved_at": "",
  "impact": "",
  "mitigation": ""
}
```

## First implementation

The UFO Connection uses `/ufo-connection/js/ssl-rules-engine.js` to evaluate normalized records and their media items against this rule set.
