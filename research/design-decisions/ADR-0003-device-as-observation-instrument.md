# ADR-0003: Device as Observation Instrument

**Status:** accepted

## Decision

The physical Omoluabi device is designed as a governed observation instrument, not a camera. Every hardware control maps to a governance field rather than a raw capture function: the Record Button creates an observation ID, the Consent Switch sets a consent state, the Mark Button flags a moment for review, and the device workflow attaches timestamp, device ID, and (optional) AI labels before locking the original record for later sync (`device/` planned, source: `DEVICE_MVP_PLAN.md`).

## Why

If the device only captured raw media, governance would have to be reconstructed after the fact, during review — which is exactly the "afterthought" pattern Omoluabi rejects (Device Principle, `docs/vision.md`: "The physical device is not a camera. It is a governed observation instrument.").

## Consequences

- Hardware control choices (which buttons/switches exist, and what they read) are a governance decision, not just an industrial-design decision.
- The device's consent switch states must eventually reconcile with the schema's publication-status states — currently flagged as open in `governance/consent-model.md`.
- Firmware must write structured local JSON (per the Device Workflow diagram) rather than an undifferentiated media file, even before any network sync is available (SSL-009, Local First).

## Source

Derived from the Device Principle in `CLAUDE_CODE_MASTER_DIRECTIVE.md` and the Controls/Device Workflow sections of `DEVICE_MVP_PLAN.md`, in the packet delivered by Kemi on 2026-06-26.
