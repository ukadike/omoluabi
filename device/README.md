## Resolved: Consent vs. Publication Status

The device's planned consent switch (`private` / `consented` / `review-public`) sets consent state only — it does not set `publication_status`. Publication status is a separate, later, human-governed decision (SSL-006). See `governance/consent-model.md` for the constraint table and ADR-0004 (`research/design-decisions/ADR-0004-consent-and-publication-status-are-distinct.md`) for the full reasoning.
