# ADR-0003: Device as Observation Instrument

## Decision

The physical device (Arduino-based MVP) is treated as an observation instrument, not an independent authority. Every reading it produces is an observation record subject to the same governance pipeline as any other observation: consent, source, risk, accessibility, human review, publication status.

## Why

A device that silently published readings would bypass the governance loop that makes Omoluabi trustworthy. Treating the device's output as just another observation — no privileged shortcut to publication — keeps the schema model and the governance model consistent regardless of capture method (human-entered, sensor-captured, or hybrid).

## Consequences

- The device's consent switch sets the observation's consent state, not its publication status. These are distinct, sequential fields — resolved in ADR-0004 (`research/design-decisions/ADR-0004-consent-and-publication-status-are-distinct.md`), which also defines the constraint table for which consent states permit which publication statuses.
- The device must surface consent state changes nonvisually (per `accessibility/tactile-and-haptic.md`) since a blind operator cannot rely on a screen to confirm consent state.
- Firmware changes to the device's consent switch behavior require the same governance review as schema changes, since they affect what consent state gets recorded.

## Source

Synthesizes `DEVICE_MVP_PLAN.md` from the packet delivered by Kemi on 2026-06-26.
