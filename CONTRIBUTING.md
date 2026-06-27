# Contributing

Omoluabi is governed before it is built. Contributions are welcome, but every contribution is expected to honor the rule library in `governance/rule-library.md`.

## Ground Rules

- **Schema-first.** New record types start as a schema and a card (see `architecture/data-lifecycle.md`), not as UI or app code. (SSL-001)
- **Provenance is required.** Every observation must identify its source, origin, device, collector, or import method. (SSL-002)
- **Consent is required.** No observation moves forward without a declared consent state. (SSL-003)
- **Accessibility is required, not optional.** No public object is complete without accessibility metadata. (SSL-004)
- **AI is assistive, never governing.** AI may suggest, summarize, transcribe, translate, classify, or draft. AI may not publish, erase, override, or govern. Disclose AI involvement in any contribution that used it. (SSL-005)
- **Human publication.** A human must approve public release of anything produced through this repository's processes. (SSL-006)
- **Corrections stay visible.** Don't silently edit out a mistake — record what changed, when, why, and by whom. (SSL-007)

## How to Contribute

1. Open an issue describing the observation, gap, or proposal before writing code or schema.
2. If your contribution touches governance, schemas, or cards, reference the relevant rule ID(s).
3. Flag open questions explicitly rather than resolving them silently — see `research/design-decisions/ADR-0004-consent-and-publication-status-are-distinct.md` for an example of how a flagged open question (originally raised in `research/design-decisions/ADR-0003-device-as-observation-instrument.md`) was carried through to a documented, resolved decision.
4. Keep documentation and code in the same change when they describe the same decision.

## Code of Conduct

This project follows the `CODE_OF_CONDUCT.md` in this repository.
