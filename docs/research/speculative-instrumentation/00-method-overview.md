# Method Overview — Speculative Instrumentation Research

## UMADA as a speculative research environment

UMADA (`github.com/ukadike/Umada`) is a narrative worldbuilding project, governed by its own strict no-fabrication canon rules (`/home/user/Umada/CLAUDE.md`). Within Omoluabi, UMADA is used differently than as a story: it functions as a speculative research environment. Its future historical crises are built with enough material and historical detail — dates, locations, named survivors, described mechanisms of harm — that they can be interrogated the way a real historical case study would be: what would an observer have been able to prove, preserve, or recover, and with what instrument?

This is consistent with, not a departure from, how Omoluabi already treats UMADA: `SCHEMA_CARD.md` lists `umada` as one of the `system` enum values on `schemas/observation.schema.json`, and `examples/umada-archive-fragment.json` already demonstrates a UMADA scenario represented as a governed Omoluabi observation record, cross-checked against Umada's own locked canon in `docs/REPO_AUDIT.md` with no contradiction found.

## Omoluabi as the technical and governance response

UMADA does not answer its own observational failures with more narrative. It hands them to Omoluabi as design pressure. When a scenario reveals that an observer's account "cannot be dismissed as low-quality" or that "an entire settlement can be renamed or removed from the record," those are not narrative complaints — they are functional requirements for a real instrument, expressed as fiction because the crisis that would motivate them has not happened yet.

## Why fiction is being used to stress-test instruments

Present-day instrumentation planning is usually driven by known, already-encountered failure modes. Speculative fiction lets Omoluabi's design process reach for failure modes that have not yet been forced onto the project by an actual field incident — while still requiring the same rigor a real case study would: a real date, a real place, a real described mechanism, and (per UMADA's own no-fabrication rule) an explicit `OPEN QUESTION` wherever the scenario doesn't yet specify enough to answer a design question.

## How narrative conditions expose present-day limitations

The method, concretely:

```text
Speculative scenario
→ observational failure becomes visible
→ failure is analyzed as an instrumentation problem
→ present-day technical requirements are identified
→ Omoluabi MVP is revised
→ the design decision is documented as research evidence
```

A scenario detail ("a time traveler returns with images dismissed as low-quality") is read literally as an instrumentation question: what would a trustworthy field camera need to preserve, today, so that dismissal is a documented editorial judgment rather than an unavoidable technical gap? See `01-photographic-witness-case-study.md` and `02-cartographic-witness-case-study.md` for the two completed applications of this reading.

## How a discovery moves from story to schema to hardware to interface

1. A UMADA scenario or its already-locked canon detail (e.g. Cape Wipeout, March 19 2226, near Cape Agulhas) is read for what a present-day observer on the scene would have needed to prove what they saw.
2. The observational failure is restated as a present-day analogue question (see each case study's "Present-day question").
3. The question is translated into schema fields (`schemas/`), hardware components (`docs/mvp/hardware/`), interface components (`docs/mvp/interface/`), and governance rules — never only one of these, since a field without an interface to review it or a governance rule to constrain it is incomplete.
4. Each translation step is logged as a decision (`04-design-decisions-log.md`) and indexed in the traceability matrix (`03-speculative-to-technical-traceability-matrix.md`).

## Role of accessibility, provenance, public memory, and human governance

None of the four are treated as separate concerns bolted onto the new schemas afterward. Every new schema in this pass (`schemas/photographic-witness.schema.json` through `schemas/location-protection.schema.json`) inherits the existing governance loop (Observation → Consent → Source → Risk → Accessibility → Human Review → Publication Status → Archive), the existing accessibility requirement (SSL-004), and the existing device accessibility baseline (`device/accessibility-hardware.md`) rather than defining new versions of any of them. Public memory is the throughline: both case studies are, at root, about what a community is later able to prove happened to it.

## Why this method matters beyond Omoluabi

- **Journalism**: a photographic or geospatial claim that cannot show its own capture conditions is a claim a newsroom cannot defend under challenge.
- **Civic technology**: erasure of place names and landscape features is not speculative for many real communities; UMADA's Cape Wipeout scenario is a stress test of a real, recurring failure mode (colonial and administrative renaming, disputed boundaries), not an invented one.
- **Cultural heritage**: preserving multiple simultaneous place names (`schemas/landscape-memory.schema.json`) without picking one "correct" name is a heritage-preservation requirement independent of UMADA.
- **Design research**: this document itself is offered as a case study in translating narrative/speculative material into buildable, versioned, governance-constrained technical artifacts — the method is the deliverable, not only its two outputs so far.
- **Future studies**: the method generalizes; `05-future-instrumentation-questions.md` lists candidate future applications not yet pursued.

## Source

Authored per Workstream 6 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
