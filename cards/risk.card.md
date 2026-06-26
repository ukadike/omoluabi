# Risk Card

## System

Any SSL system using `schemas/risk.schema.json`.

## Purpose

Assesses potential harm from distributing an observation, so distribution can be constrained before exposure (SSL-008).

## Who is affected

The observation's subject(s), the observer, and any community implicated by the content.

## Consent required

Consent state informs but does not replace risk assessment — an observation can be consented and still high-risk to distribute widely.

## Evidence required

A `risk_level`, and any `risk_factors` or `mitigations` identified.

## Accessibility required

Not directly.

## Risk level

This card's subject. `risk_level` is a first-draft scale (low / moderate / high / severe), not yet reviewed by Kemi.

## What AI may do

Suggest risk flags for human review (SSL-005).

## What AI may not do

Finalize a risk assessment (SSL-005, "AI may not... finalize risk").

## Human decision required

Yes — a human finalizes risk level and any reach constraints.

## Archive status

Preserved with the observation; later corrections create a new correction record rather than overwriting.

## Publication status

Risk level constrains, but does not by itself set, publication status — see `governance/publication-status.md`.

## Federation status

A `high` or `severe` risk_level should block federation/API exposure; exact mechanism not yet scoped.

## Version

Schema: `schemas/risk.schema.json`.

## Source

Authored to pair with `schemas/risk.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
