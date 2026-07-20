# Human Governance

## Principle

AI proposes. Humans decide. Every major decision is explainable. Every decision can
be challenged.

## What AI May Do

- Draft a Claim from Evidence Objects.
- Apply a scaffolded reasoning layer and produce a `reasoning-step` record.
- Propose a confidence score with rationale.
- Draft an output artifact (report, brief, summary) in any `docs/output-formats.md` format.
- Flag a contradiction for human attention.
- Suggest future research directions.

## What AI May Not Do

- Set a `research_state` of `known`, `supported`, `disputed`, `contradicted`, or
  `retracted` without human sign-off.
- Resolve a contradiction (`schemas/contradiction.schema.json`'s `resolution_status`)
  unilaterally.
- Approve `publication_status` transitions to `public` (SSL-006, unchanged from root
  governance).
- Delete or hide an `unknowns`, `open_questions`, or `contradiction_ids` entry to make
  a claim look more settled than the evidence supports.
- Merge or discard a minority hypothesis.

## Approval Workflow

Every `schemas/investigation-case.schema.json` record carries a `human_governance`
block:

- `proposed_by`: `ai` / `human` / `hybrid`
- `approval_status`: `proposed` → `human_review` → `approved` | `rejected` |
  `revision_requested`
- `approved_by`: the reviewing human's identifier
- `decision_notes`: why the decision was made — required for `rejected` and
  `revision_requested`, so the record of *why* survives even when a conclusion doesn't
  ship
- `decided_at`

This mirrors the root `governance/publication-status.md` decision model rather than
inventing a second one.

## Challengeability

Any human reviewer — not only the original case owner — may reopen a case at
`approved` status by filing a new Evidence Object or Claim with `contradiction_ids`
pointing at the approved Claim. This is the mechanism behind Workflow's `Repeat` stage
(`architecture/workflow.md`): approval is a governance checkpoint, not a lock.

## Status

Model settled; reuses the root publication-status decision shape. No interface
exists yet to enforce these rules in software — this document is the specification an
eventual review interface must satisfy.
