# Omoluabi Claim Check Card

**Schema ID:** `ssl.editorial.claim_check`  
**Version:** `1.0.0`  
**Status:** Active working card  
**Uses:** `ssl.core.claim_verification`  
**Protected Core:** Rules-based; no model authority

> Preserve the claim, its context, and the evidence trail. Keep the editorial decision human.

## Purpose

The Claim Check Card is an evidence dossier for one bounded claim. It captures exact wording, context, atomic questions, evidence that supports or challenges the claim, source lineage, evidence gaps, and a human decision. It feeds the existing `ssl.core.claim_verification` rule system; it does not define a second verdict system.

## Required record

See [`schemas/claim-check.schema.json`](../schemas/claim-check.schema.json). Each claim check holds:

- the exact claim wording and its source, date, language, time scope, place, and context;
- testable subclaims, so compound statements are not assessed as one unit;
- an evidence ledger with relationship, source, originating source chain, directness, time/place fit, language notes, and limitations;
- evidence gaps, contradictions, and protected unknowns;
- a deterministic `verification` result from `ssl.core.claim_verification`;
- a separate human decision with reviewer, reason, and timestamp;
- correction history.

## Canonical verification states

The rule status remains the one defined by `ssl.core.claim_verification`:

`UNKNOWN`, `UNSUPPORTED`, `NEEDS_CORROBORATION`, `READY_FOR_REVIEW`, `CORROBORATED`, `DISPUTED`, `INVALIDATED`.

`UNSUPPORTED` means no qualifying supporting evidence is recorded; it does not mean false. Two or more explicitly confirmed independent supporting source chains can reach `READY_FOR_REVIEW`, never automatically `CORROBORATED`. Material contradiction takes precedence and yields `DISPUTED`. Only an authorized human can set `CORROBORATED` or `INVALIDATED`.

Context flags such as `MISSING_CONTEXT`, `MIXED_EVIDENCE`, `OUTDATED`, and `NOT_YET_VERIFIABLE` describe limitations. They do not replace the canonical verification state.

## Governance rules

1. Preserve the claim's exact wording. Label paraphrases and translations.
2. Break compound statements into individually checkable subclaims.
3. Attach supporting, challenging, contextual, and conflicting evidence with provenance.
4. Use the same source-chain identifier for republications derived from one origin.
5. Count independence only when a human reviewer confirms the source relationship.
6. Evaluate whether evidence matches the claim's people, quantity, definitions, time, and geography.
7. Search for evidence that could weaken or disprove the claim.
8. Preserve translation uncertainty and apply Language Stewardship rules to community-governed material.
9. Do not calculate a truth score from source count, popularity, reputation, or model confidence.
10. Keep rule output, human decision, and publication status as separate fields.
11. Preserve prior decisions and corrections; never silently overwrite an assessment.

## Deterministic rule mapping

| Rule | Behavior |
|---|---|
| `CLAIM.R001` | No qualifying supporting source → `UNSUPPORTED` |
| `CLAIM.R002` | One independent supporting source chain → `NEEDS_CORROBORATION` |
| `CLAIM.R003` | Two or more independent supporting chains → `READY_FOR_REVIEW` |
| `CLAIM.R004` | Material contradiction → `DISPUTED`, overriding source count |
| `CLAIM.R005–R008` | Human corroboration, approval, override audit, and protected unknowns remain mandatory |

Every rule result requires human review. A rule outcome is not truth and cannot publish a claim.
