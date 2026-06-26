# Federation Card

## System

Any SSL system using `schemas/federation.schema.json`.

## Purpose

Status: draft placeholder. Would record which fields of a record were exposed to another node or the public API. The trust model and manifest shape are not yet scoped — see `architecture/sync-and-federation.md`.

## Who is affected

Anyone whose data could become reachable from another node once federation exists.

## Consent required

Federation should never expose more than the linked consent and publication records permit — exact mechanism not yet scoped.

## Evidence required

`exposed_fields`, at minimum.

## Accessibility required

Not directly.

## Risk level

A `high` or `severe` risk_level should block federation; exact mechanism not yet scoped.

## What AI may do

Not yet scoped.

## What AI may not do

Not yet scoped.

## Human decision required

Likely yes, but not yet scoped.

## Archive status

Not yet scoped.

## Publication status

Only `public` records are candidates for federation (Constitutional Principle #13).

## Federation status

This card's subject — and the least-defined part of the schema set.

## Version

Schema: `schemas/federation.schema.json`.

## Source

Authored to pair with `schemas/federation.schema.json`, per the `SCHEMA_INDEX.md` Claude Code Task, in the packet delivered by Kemi on 2026-06-26.
