# AI Permission Card

## System

Any SSL system using `schemas/ai-permission.schema.json`.

## Purpose

Records what an AI assist action did, on what task, with what confidence, and whether a human verified it (SSL-005). See `governance/ai-permissions.md`.

## Who is affected

Anyone relying on AI-assisted content (transcripts, translations, alt text, summaries, entity/risk suggestions).

## Consent required

Not directly — but AI may never use this record to override a consent record.

## Evidence required

The `task`, and a `human_verified` flag.

## Accessibility required

Not directly.

## Risk level

Not assessed here.

## What AI may do

Transcript, translation, alt-text, entity, risk, or summary drafts (SSL-005, `governance/ai-permissions.md` "AI May").

## What AI may not do

Publish, erase, override consent, finalize risk, or decide publication status (SSL-005, `governance/ai-permissions.md` "AI May Not").

## Human decision required

Yes — `human_verified` must be set by a human before the AI-drafted content can inform a publication decision.

## Archive status

Preserved as an audit trail of AI involvement, regardless of whether the draft was accepted.

## Publication status

Not applicable directly.

## Federation status

Not yet scoped.

## Version

Schema: `schemas/ai-permission.schema.json`.

## Source

Authored to pair with `schemas/ai-permission.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
