---
schema_name: Small Systems Lab Universal Schema Card
schema_id: ssl-universal-schema
version: 1.0.0
status: active
maintainer: Small Systems Lab
last_reviewed: 2026-07-15
applies_to:
  - software
  - hardware
  - datasets
  - media
  - research
  - curriculum
  - archives
  - public_interfaces
  - speculative_systems
  - physical_installations
---

# Small Systems Lab Universal Schema Card

## Purpose

This is the constitutional schema for Small Systems Lab (SSL). It defines the minimum structural, ethical, accessibility, provenance, governance, and maintenance requirements shared by every SSL project.

Projects may extend this schema. They may not silently remove or weaken it.

## Governing sentence

> Humans define the purpose. Rules constrain the system. Automation assists. Accountable people decide.

## Scope

This schema applies to Omoluabi, Earth Sensors Lab, Ounjẹ, UMADA, Accessible by Design, Ìjóyà, Ìrántí, Echo, and future SSL projects.

## Required record groups

Every governed SSL artifact must expose or link to the following groups when applicable:

1. **Identity** — what the artifact is, who maintains it, its version and status.
2. **Provenance** — where information or media came from and how it changed.
3. **Epistemic status** — observation, evidence, testimony, interpretation, hypothesis, belief, speculation, fiction, or unknown.
4. **Accessibility** — what access features exist, what has been tested, and what barriers remain.
5. **Consent and human subjects** — permission, permitted uses, restrictions, withdrawal, and anonymization.
6. **Human governance** — what is automated, who reviews it, and who can override it.
7. **Risk** — potential harms, affected people, mitigations, and escalation.
8. **Publication** — private, internal review, public, embargoed, withdrawn, deprecated, or archived.
9. **Returnability** — correction, deletion, appeal, version recovery, and irreversible loss.
10. **Maintenance** — last review, next review, dependencies, issue reporting, and deprecation.

## Universal required identity fields

```yaml
identity:
  id:
  system:
  title:
  artifact_type:
  version:
  status:
  maintainer:
  created_at:
  updated_at:
  canonical_url:
  license:
```

## Provenance

```yaml
provenance:
  source_name:
  source_type:
  source_url:
  source_identifier:
  creator:
  publisher:
  date_created:
  date_published:
  date_retrieved:
  retrieval_method:
  original_format:
  current_format:
  transformations: []
  checksum:
  verification_status:
  verification_notes:
```

Permitted verification values:

- verified
- partially_verified
- unverified
- disputed
- synthetic
- fictional
- unknown

Synthetic, fictional, reconstructed, annotated, simulated, or speculative material must be visibly labeled.

## Epistemic separation

```yaml
epistemic_status:
  classification:
  confidence:
  known: []
  missing: []
  unresolved: []
  supporting_evidence: []
  contradicting_evidence: []
  alternative_interpretations: []
  what_would_change_assessment: []
```

Confidence must not be represented as certainty.

## Accessibility

```yaml
accessibility:
  keyboard_operable:
  screen_reader_tested:
  captions_available:
  transcript_available:
  audio_description_available:
  image_descriptions_available:
  color_independent:
  reduced_motion_supported:
  high_contrast_supported:
  text_resize_tested:
  plain_language_summary:
  known_barriers: []
  testing_date:
  testing_method:
```

Unknown accessibility status must be declared as unknown rather than assumed.

## Human governance

```yaml
human_governance:
  automated_actions: []
  human_review_required:
  reviewer_role:
  review_status:
  reviewed_by:
  reviewed_at:
  override_available:
  appeal_route:
```

No automated output may be represented as verified evidence solely because software produced it.

## Consent

```yaml
consent:
  required:
  obtained:
  consent_type:
  consent_date:
  permitted_uses: []
  prohibited_uses: []
  withdrawal_process:
  anonymization_status:
  community_restrictions: []
```

Public availability does not automatically equal ethical permission for reuse.

## Risk

```yaml
risk:
  affected_people: []
  possible_harms: []
  severity:
  likelihood:
  vulnerable_groups: []
  misuse_scenarios: []
  failure_scenarios: []
  mitigation: []
  escalation_route:
  shutdown_or_withdrawal_process:
```

## Returnability

```yaml
returnability:
  corrections_supported:
  deletion_supported:
  consent_withdrawal_supported:
  version_recovery_supported:
  human_appeal_supported:
  reversible_actions: []
  irreversible_actions: []
  unrecoverable_losses: []
```

## Rules-based implementation

The universal card is implemented by a versioned rule set, not only described in prose.

Canonical machine-readable rule set:

```text
/rules/ssl-rules.v1.json
```

Rules produce one of four outcomes:

- **pass** — the requirement is satisfied.
- **warn** — publication may continue only with a visible limitation or human decision.
- **fail** — publication is blocked until corrected or explicitly overridden by an accountable reviewer.
- **not_applicable** — the rule does not apply to this artifact.

Every override must record the rule, reason, approver, date, impact, and mitigation.

## Project extensions

Each SSL project should maintain a project card that declares:

```yaml
extends:
  schema_id: ssl-universal-schema
  version: 1.0.0
```

Project extensions document project-specific fields, risks, governance, interfaces, and declared exceptions.

## Governing statement

An SSL artifact must not hide:

- where information came from;
- how it was transformed;
- what rules shaped it;
- what remains uncertain;
- what access barriers remain;
- who may be harmed;
- who retains authority;
- whether a decision can be corrected or reversed.
