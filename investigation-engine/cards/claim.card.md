# Claim Card

## System

investigation-engine (any domain).

## Purpose

A statement derived from one or more Evidence Objects, carrying a research state,
its supporting and contradicting evidence, and a full transparency record
(assumptions, inferences, unknowns, missing evidence).

## Who is affected

The claim's subject(s), anyone whose work the claim assesses, and any reader who
relies on its research state.

## Consent required

Inherited from the Evidence Objects it cites; a Claim adds no new consent
requirement of its own.

## Evidence required

At least one `supporting_evidence_ids` entry before `research_state` may be anything
other than `unverified` or `unknown` (IE-001).

## Reasoning transparency

`reasoning_step_ids` links every reasoning layer applied. `assumptions`,
`inferences`, `unknowns`, and `missing_evidence` are required fields per
`docs/transparency-rules.md`.

## Accessibility required

Plain-language and expert summary variants required for Educational Mode / Public
Briefing and Scientific Review / Technical Analysis intelligence modes respectively
(`docs/accessibility.md`).

## Risk level

Inherited from cited evidence; a Claim carries no independent risk score.

## What AI may do

Draft the claim, propose supporting/contradicting links, propose a confidence score,
draft assumptions/inferences (SSL-005).

## What AI may not do

Set `research_state` to `known`, `supported`, `disputed`, `contradicted`, or
`retracted` without human sign-off (IE-005); merge or discard a minority hypothesis.

## Human decision required

Yes — `human_reviewed` must be `true` and a `reviewer_id` recorded before
`publication_status` can move to `public`.

## Reversibility

Yes — any `research_state` can move back to `disputed` or `contradicted` given new
evidence; retraction uses `schemas/correction.schema.json` (IE-002).

## Publication status

One of: private, internal_review, public, embargoed, withdrawn.

## Version

Schema: `schemas/claim.schema.json`.
