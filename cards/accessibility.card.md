# Accessibility Card

## System

Any SSL system using `schemas/accessibility.schema.json`.

## Purpose

Carries the accessibility metadata required before any object is considered complete for publication (SSL-004).

## Who is affected

Readers/listeners using screen readers, captions, plain language, tactile/haptic interfaces, or reduced-motion settings.

## Consent required

Not directly.

## Evidence required

At minimum, an accessible equivalent appropriate to the media present (alt text for images, transcript for audio, captions for video).

## Accessibility required

This card *is* the accessibility record.

## Risk level

Not assessed here.

## What AI may do

Draft alt text, transcripts, or plain-language summaries for human review (SSL-005).

## What AI may not do

Publish an AI-drafted accessibility artifact without human verification (SSL-005, SSL-006).

## Human decision required

Yes — a human confirms or corrects any AI-drafted accessibility content before publication.

## Archive status

Preserved alongside the observation; corrections go through `cards/correction.card.md`.

## Publication status

No object reaches `public` status without an accessibility record (SSL-004).

## Federation status

Not yet scoped.

## Version

Schema: `schemas/accessibility.schema.json`.

## Source

Authored to pair with `schemas/accessibility.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
