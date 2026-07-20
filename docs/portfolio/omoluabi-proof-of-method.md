# Omoluabi: Proof of Method

Written for external evaluators — doctoral admissions committees, fellowship reviewers, research labs, creative-technology teams, innovation and strategy employers, cultural institutions, journalism and civic-media organizations, agencies, and collaborators assessing Omoluabi as a research platform. This document is portfolio material: it interprets and cross-references the technical work in this repository; it does not introduce new schemas or plans of its own.

## Positioning statement

> The researcher uses speculative narrative as a systems-research environment. Future historical scenarios are constructed to expose failures in present-day observation, evidence, accessibility, and governance systems. Those failures are then translated into testable requirements for Omoluabi, a human-governed field and editorial intelligence platform.

## What problem is the researcher investigating?

How do you build field-observation and editorial infrastructure that is trustworthy under later scrutiny — for accessibility, consent, provenance, and evidentiary integrity — before an incident forces the question? Most instrumentation planning reacts to failures already encountered. This project's central methodological question is whether speculative scenario-building, disciplined enough to be read as a case study rather than as decoration, can surface those failures earlier, with the same rigor a real historical case study would demand.

## What is original about the method?

The originality is not the individual schemas — provenance tracking, accessibility metadata, and geospatial accuracy disclosure all have precedent elsewhere. What is original is the traceable pipeline connecting a speculative narrative detail to a specific, versioned technical artifact, with every intermediate step documented and inspectable:

```text
UMADA scenario → observational failure → research question → technical requirement
→ Omoluabi MVP change → documented design evidence
```

See `docs/research/speculative-instrumentation/00-method-overview.md` for the full explanation, and `docs/research/speculative-instrumentation/03-speculative-to-technical-traceability-matrix.md` for the pipeline applied concretely across five rows of evidence.

## How does speculative fiction produce technical insight?

By requiring the same discipline a real case study requires. UMADA's own governance rules (`/home/user/Umada/CLAUDE.md`) forbid inventing canon — unknowns are marked `OPEN QUESTION`, not filled in. That discipline is what makes UMADA usable as research material rather than decoration: a scenario detail like "Cape Wipeout, March 19, 2226, near Cape Agulhas" is locked, checkable canon (`/home/user/Umada/00_governance/CANON_STATUS.md`), not an invented convenience. Reading a locked detail literally — what would a present-day observer on that scene have needed to prove what they saw — is what produces a genuine technical question rather than a rhetorical one.

## What decisions changed because of the research?

Two completed case studies, each with a logged decision record:

- **Photographic Witness Layer** (`docs/research/speculative-instrumentation/01-photographic-witness-case-study.md`, decision `DR-0001`): three new schemas (`schemas/photographic-witness.schema.json`, `schemas/media-provenance.schema.json`, `schemas/observer-perception.schema.json`) separating what a sensor recorded, what an observer reports, and what was later enhanced or reconstructed — because before this research pass, a field photograph in this repository was a bare file-path string with no such distinction.
- **Cartographic Witness Layer** (`docs/research/speculative-instrumentation/02-cartographic-witness-case-study.md`, decision `DR-0002`): six new schemas (`schemas/location-evidence.schema.json`, `landscape-memory.schema.json`, `movement-trace.schema.json`, `projection-accountability.schema.json`, `map-missingness.schema.json`, `location-protection.schema.json`) separating measured coordinates from map projections, and letting local/historical/administrative/disputed place names coexist rather than collapsing to one authoritative name — because before this research pass, location in this repository was two numbers and a precision flag.

Both decisions also produced hardware documentation (`docs/mvp/hardware/instrumentation-revision-v0.02.md`), interface design documentation (`docs/mvp/interface/`), and a revised field-capture workflow (`device/field-companion-workflow.md`) with two explicit modes — Rapid Capture and Deep Documentation — for operating under field pressure versus deliberate fieldwork.

## What artifacts prove the work occurred?

Every claim above is backed by a file in this repository, not by narrative alone:

- `docs/research/instrumentation/current-state-audit.md` — the audit establishing what was missing before this pass, based on a repository-wide keyword search, not assertion.
- 9 new JSON Schemas and 9 matching cards, each internally consistent with the existing 10-schema governance loop (`SCHEMA_CARD.md`).
- 2 new interface design documents, 1 hardware revision document, 1 Field Companion workflow document.
- 7 research documents in `docs/research/speculative-instrumentation/`, including a design decisions log with explicit rationale, risks, and validation-needed fields for each decision.
- A public-facing page (`research/speculative-instrumentation/index.html`) making the method legible without prior UMADA knowledge.
- A version-controlled commit history on this branch, referencing case-study and decision IDs.

## What disciplines does the work connect?

Narrative worldbuilding and speculative design; systems and information architecture (JSON Schema, governance pipelines); accessibility (WCAG-aligned, tactile/haptic, plain-language); geospatial science (datum, projection, accuracy disclosure); digital preservation and provenance (hashing, chain of custody, correction models); civic technology and journalism (evidentiary standards, source ladders); and public-interest hardware design (field-instrument accuracy limits, offline-first operation).

## Why does this matter to a doctoral program, fellowship, innovation team, agency, newsroom, museum, or public-interest technology lab?

Because the deliverable is not only the two subsystems this pass produced — it is a demonstrated, repeatable process for turning speculative or exploratory material into governed, versioned, buildable technical requirements, with every step left inspectable rather than asserted. That is a transferable research capability, evaluable independently of whether a reviewer has any prior interest in UMADA as a story.

## Compact résumé-ready version

> Developed a speculative-to-technical research method in which future scenarios reveal weaknesses in contemporary observation systems; translated findings into photographic provenance, geospatial evidence, accessibility, mapping, and hardware requirements for the Omoluabi MVP.

## Fellowship-ready version

> Through UMADA, I construct future historical crises that allow me to test what present-day instruments fail to preserve. The first two studies — photographic witnessing and cartographic witnessing — have directly changed the Omoluabi MVP, producing new requirements for sensor metadata, observer testimony, map projection accountability, coordinate uncertainty, movement traces, protected locations, and offline geospatial evidence.

## What this document does not claim

- No claim that UMADA "predicted" these two features; the value is the repeatable process, not prediction (see `docs/research/speculative-instrumentation/00-method-overview.md`, "Why this method matters").
- No claim that any of the new schemas, hardware components, or interfaces are implemented, tested, or field-validated — all are documentation and plan-layer artifacts, consistent with `ROADMAP.md`'s existing scaffolded-not-implemented status for the rest of the repository.
- No claim of survey-grade or forensic-grade accuracy for any hardware component; see `docs/mvp/hardware/instrumentation-revision-v0.02.md`'s explicit accuracy caveats.

## Source

Authored per Workstream 8 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
