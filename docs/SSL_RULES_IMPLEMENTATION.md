# SSL Rules-Based Implementation

## Architecture

```text
SSL Universal Schema Card
        ↓
JSON Schemas + Versioned Rule Set
        ↓
Project Normalizer
        ↓
Deterministic Rules Engine
        ↓
Visible Pass / Warning / Failure Results
        ↓
Human Review
        ↓
Publication Decision
```

## Separation of concerns

- **Schema** defines the shape of a record.
- **Rules** define minimum conditions and policy outcomes.
- **Normalizer** maps project data into the shared shape.
- **Rules engine** runs named deterministic tests.
- **Human reviewer** makes accountable editorial and publication decisions.

## Why named tests

`ssl-rules.v1.json` stores identifiers such as `media.image.alt`. JavaScript maps those identifiers to reviewed functions. The system never evaluates arbitrary code embedded in JSON.

This keeps the rule layer inspectable and reduces injection risk.

## Universal versus project-specific rules

Universal rules apply across SSL. A project may add rules such as:

```text
OMOLUABI-001
ESL-001
OUNJE-001
UMADA-001
```

Project rules may strengthen the universal standard. They may not silently weaken a universal blocking rule.

## Rule override record

An override is a governed decision, not a hidden bypass.

```json
{
  "override_id": "override-001",
  "rule_id": "SSL-000",
  "record_id": "record-001",
  "reason": "",
  "approved_by": "",
  "approved_at": "",
  "impact": "",
  "mitigation": "",
  "expires_at": ""
}
```

## Current implementation

The UFO Connection contains the first browser implementation:

- `ufo-connection/js/ssl-rules-engine.js`
- `ufo-connection/js/ssl-media-field.js`
- `rules/ssl-rules.v1.json`

The browser shows rule outcomes as editorial information. It does not claim that passing automated checks proves a record is true, safe, or ready to publish.
