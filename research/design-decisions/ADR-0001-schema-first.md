# ADR-0001: Schema First

**Status:** accepted

## Decision

Every new record type in Omoluabi starts as a JSON Schema and a human-readable schema card before any UI, device firmware, or API work begins.

## Why

The Core Architecture Sentence states: rules produce schemas, schemas produce interfaces, interfaces produce software, software produces public infrastructure — and this order is not to be reversed (`docs/vision.md`). Building UI or device code before the schema exists would let implementation details define governance instead of the other way around.

## Consequences

- More upfront documentation and schema work before anything is demoable.
- Schemas and cards become the stable contract that device, web engine, and API code are built against.
- Changing a record type's shape later requires a schema change first, which is traceable, rather than an ad hoc code change.

## Source

Derived from the Core Architecture Sentence in `CLAUDE_CODE_MASTER_DIRECTIVE.md`, in the packet delivered by Kemi on 2026-06-26.
