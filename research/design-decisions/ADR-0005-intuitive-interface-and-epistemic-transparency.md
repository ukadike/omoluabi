# ADR-0005 — Intuitive Interface and Epistemic Transparency

**Date:** 2026-09-01  
**Status:** Accepted  
**Decision scope:** Omoluabi interface, field device, reasoning presentation, and future prototype work

## Context

Omoluabi is becoming capable of coordinating increasingly complex inputs: observation records, images, audio, location, maps, public records, local testimony, timelines, contradictions, provenance, accessibility requirements, external sensors, and uncertainty.

Increasing capability creates a design risk: exposing internal complexity directly to the user can make the system harder to operate at exactly the moment it is most needed.

A second risk runs in the opposite direction: simplifying the output too aggressively can turn a transparent research tool into an opaque authority.

This ADR resolves the tension between those two risks.

## Decision

Omoluabi adopts the following core interface principle:

> **The more advanced the system, the more intuitive the interface should become.**

For Omoluabi, this is operationalized as:

> **Reduce operational complexity without reducing epistemic transparency.**

The primary interface should simplify the act of using Omoluabi while preserving the ability to interrogate evidence, uncertainty, provenance, contradictions, source material, assumptions, and alternative interpretations.

## Canonical interaction hierarchy

The preferred progressive-disclosure sequence is:

**WHAT YOU NEED TO KNOW → NEXT ACTION → WHY → EVIDENCE → MAP / INVESTIGATE**

Equivalent wording may be used when context requires it, but the hierarchy should remain recognizable:

1. immediate human-scale understanding;
2. an actionable next step where appropriate;
3. explanation;
4. supporting evidence and provenance;
5. deeper investigation.

## Non-oracle rule

Omoluabi must not present uncertainty as certainty simply because a simple interface is desirable.

A valid high-level response may be:

> **Collect another reading before making a determination.**

The system should be able to defer, identify missing evidence, show contradictions, or present competing interpretations.

## Accessibility rule

Accessibility is not a secondary mode attached to the primary interface.

Critical information should be representable, where technically and contextually appropriate, through combinations of:

- text;
- speech;
- sound;
- vibration;
- tactile patterns;
- light/status indicators;
- directional cues;
- physical controls.

The user must retain control over adaptive behavior and representation choices.

## Hardware consequence

New capability does not automatically justify new interaction complexity.

A camera module, environmental sensor, location source, communications module, or future sensor may increase the system's observational capacity while leaving the primary interaction model substantially unchanged.

**Capability may expand without interaction complexity expanding with it.**

Field hardware should favor usefulness, modularity, maintainability, repairability, understandable controls, and documented failure states.

## Failure-mode consequence

Critical field interaction should not assume continuous network access, a pristine touchscreen, or a single sensory channel. Physical controls, local operation, redundant feedback, and recoverable state should be considered according to the risk and use case.

## Human-control rule

Human judgment remains final.

Omoluabi may assist with comparison, translation, prioritization, contradiction detection, uncertainty presentation, or recommendation. The user must be able to ask why, inspect evidence, identify what is unknown, reject an interpretation, or defer a determination.

## Cultural/design provenance

This decision emerged partly through analysis of cultural depictions of useful machinery and advanced interfaces.

### Green Lantern: Beware My Power (2022)

At approximately the 16-minute mark, Green Arrow refers to an idea attributed to Hal Jordan concerning advanced interfaces becoming more intuitive. The exact dialogue has not yet been verified against an authoritative transcript or subtitle source, so it must not be presented as a verified direct quotation.

The scene is recorded as a **design stimulus**, not technical evidence.

### Aliens (1986)

The film's industrial and rescue machinery is recorded as a visual/design stimulus for the observation that believable machinery often reveals its purpose through form. It is not technical evidence for Omoluabi's engineering decisions.

## Research-method rule

Speculative fiction and cultural artifacts may help formulate research questions. They do not validate those questions.

Omoluabi uses the following pathway:

**FICTION / CULTURAL OBSERVATION → QUESTION → DESIGN PRINCIPLE → RESEARCH → PROTOTYPE → TESTING → EVIDENCE**

Claims about usability, comprehension, safety, cognitive load, accessibility, or effectiveness must be tested rather than inferred from the cultural reference.

## Relationship to Luabi

**Omoluabi is the real-world research prototype environment. Luabi is the fictional UMADA descendant / extrapolation.**

They may inform one another, but fictional Luabi capabilities do not become claims about the present-day Omoluabi system, and Omoluabi changes do not automatically become UMADA canon.

## Consequences

### Positive

- supports increasingly capable systems without dashboard inflation;
- makes accessibility part of the core architecture;
- preserves evidence and uncertainty behind concise outputs;
- gives hardware and software a shared interaction philosophy;
- creates a testable research program rather than a purely aesthetic design language.

### Risks

- oversimplification may hide distinctions important to expert users;
- adaptive interfaces can become paternalistic or unpredictable if not user-controlled;
- concise recommendations can appear more certain than their evidence warrants;
- multimodal translations can alter meaning if transformation rules are undocumented.

These risks are reasons for progressive disclosure, traceability, user override, and testing—not reasons to abandon simplicity.

## Related Small Systems Lab doctrine

This ADR is Omoluabi's implementation of the Small Systems Lab **Intuitive Systems Doctrine v0.1**. The cross-project doctrine remains the source for shared principles; this ADR records the Omoluabi-specific decision.
