# Case Study One: Photographic Witness Instrumentation

## 1. Speculative trigger

UMADA's frame narrative carries a future reporter / time traveler who documents a historically significant event and must return with evidence that survives scrutiny (`/home/user/Umada/CLAUDE.md`, Frame narrative). The directive that initiated this workstream states the trigger plainly: "UMADA's time traveler must be able to return from a historically significant event with images that are not dismissed as low-quality, decontextualized, manipulated, or technically inadequate."

## 2. Observational problem

If the only evidence produced is a bare image file, every one of those dismissals is available to a bad-faith or merely cautious reviewer, because nothing in the file itself answers: what did the sensor actually record, what did the observer perceive that the sensor might have missed, was the image altered, and under what conditions was it taken.

## 3. Present-day analogue

This is not a future-only problem. Before this workstream, `schemas/observation.schema.json`'s `media.image` field was a bare file-path string (confirmed in `docs/research/instrumentation/current-state-audit.md` §2–3): no capture metadata, no original/derivative distinction, no observer account separate from the file. Any present-day Omoluabi field photograph had exactly the same evidentiary weakness the speculative scenario describes.

## 4. Technical requirements discovered

- Separate what the sensor recorded from what the observer reports, what the device inferred, what software enhanced, and what remains unresolved (the Photographic Witness Layer's five-way distinction).
- Preserve the original file and its hash permanently, distinct from any derivative.
- Record capture timestamp with its source and confidence, not just a bare timestamp.
- Record camera, position, and orientation metadata at capture time.
- Distinguish optical capture from computational reconstruction explicitly (`capture_mode`).
- Never let an interface silently substitute a derivative for the original.

These became `schemas/photographic-witness.schema.json`, `schemas/media-provenance.schema.json`, and `schemas/observer-perception.schema.json`.

## 5. Governance requirements discovered

- The new schemas must not create a second, competing consent or risk model — `rights_and_risk.consent_status` is explicitly documented as a narrower facet subordinate to `schemas/consent.schema.json`, not a replacement (see each new card's "Consent required" section).
- AI-drafted enhancements or reconstructions must never be marked human-verified by AI itself, and alteration history must be append-only (SSL-005, SSL-007) — enforced in `cards/media-provenance.card.md`'s "What AI may not do."
- The device remains an observation instrument, not an authority (ADR-0003): none of the new schemas grant the device a publication shortcut.

## 6. Accessibility implications

- `observer-perception.accessibility_notes` records what the observer could and could not perceive, independent of the record's general accessibility metadata (SSL-004).
- The Observer Saw / Sensor Recorded interface panel (`docs/mvp/interface/photographic-witness-interface.md`) surfaces this as visible text, not a tooltip, so non-visual review paths are not penalized.
- Evidence Confidence is displayed as two separately labeled values (self-reported observer confidence vs. device timestamp confidence) rather than one merged score, so a screen-reader user is not given a falsely simplified number.

## 7. MVP changes

- Three new schemas and three new cards (`schemas/photographic-witness.schema.json`, `schemas/media-provenance.schema.json`, `schemas/observer-perception.schema.json` + companion cards).
- New interface design documentation: `docs/mvp/interface/photographic-witness-interface.md`.
- `device/field-companion-workflow.md` incorporates photographic capture into both its Rapid Capture and Deep Documentation modes.
- `docs/mvp/hardware/instrumentation-revision-v0.02.md` formalizes camera calibration workflow, orientation-linked capture, and clock-confidence reporting as MVP-relevant hardware requirements.

## 8. Unresolved research questions

- No camera calibration workflow exists yet (`camera.calibration_status` will read `uncalibrated` or `unknown` for the foreseeable MVP).
- Whether `capture_mode` classification can be reliably automated at all, or must always be a human judgment call, is unresolved.
- The exact UI behavior when an observer's account and the sensor capture substantially disagree (beyond displaying both) is not yet designed.

## 9. Evidence artifacts and commit references

- `schemas/photographic-witness.schema.json`, `schemas/media-provenance.schema.json`, `schemas/observer-perception.schema.json`
- `cards/photographic-witness.card.md`, `cards/media-provenance.card.md`, `cards/observer-perception.card.md`
- `docs/mvp/interface/photographic-witness-interface.md`
- `docs/research/instrumentation/current-state-audit.md` §2–3 (the audit finding that motivated this case study)
- Decision record: `04-design-decisions-log.md`, decision `DR-0001`
- Commit list: see `docs/portfolio/omoluabi-proof-of-method.md` and the branch history on `claude/new-session-twd6l5`.

## Source

Authored per Workstream 6 of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
