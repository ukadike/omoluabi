# Photographic Witness Layer — Interface Components

Design documentation only. Nothing described here is implemented; the web engine's running prototype (the [Omoluabi-News repository](https://github.com/ukadike/omoluabi-news)'s `engine/`) does not yet include these screens. See `web-engine/screens.md` for the currently implemented review screens and `architecture/governance-pipeline.md` for the review order any future implementation must respect.

## Governing rule

The interface must never silently replace an original file with an enhanced image. Every component below either shows the original by default or makes the substitution of a derivative explicit and reversible.

## Components

### Photographic Evidence Card

The summary view for one `schemas/photographic-witness.schema.json` record. Shows the original thumbnail, capture timestamp and confidence, camera and position summary, and status chips for consent, risk, and accessibility completeness (reusing the existing review-screen pattern from `web-engine/screens.md` screens 3–6, not a new visual language). Opens into the panels below.

### Original vs. Derived comparison view

Side-by-side (or, in a narrow/screen-reader layout, sequential) comparison of `media_provenance.original_file` against any entry in `derivative_files`. The original is always labeled "Original — unmodified" and the derivative is always labeled with its `derivation` text. Neither panel may be visually favored (no larger default size, no "recommended" badge) because Workstream 2's rule prohibits the interface from implying one is more authoritative by default.

### Observer Saw / Sensor Recorded panel

Two-column layout pairing `observer-perception.description` against the photographic-witness capture. Any `perceived_difference_from_capture` note renders between the two columns, not hidden in a tooltip, since the gap between testimony and sensor output is itself evidentiary content, not a caveat.

### Capture Conditions panel

Renders `camera`, `position`, `orientation`, `environmental_conditions`, and `low_light_or_obstruction_warning` from `photographic-witness.schema.json` as a plain-language summary before showing the raw field table, per `accessibility/baseline.md`'s plain-language-summary requirement.

### Alteration History panel

Read-only, append-only rendering of `media-provenance.alteration_history` and `chain_of_custody`, oldest first. This panel has no edit controls; changes to the record happen only through `schemas/correction.schema.json` (SSL-007), surfaced via the existing correction workflow, not a new one.

### Accessibility Description panel

Renders `accessibility_id` (from the linked observation) and `observer-perception.accessibility_notes` together, since both describe what could and could not be perceived, from different vantage points (the record's general accessibility metadata vs. this specific observer's account).

### Evidence Confidence panel

Displays `observer-perception.confidence` (self-reported) and `timestamp_confidence` (device/clock-sourced) as two separately labeled values — never merged into one "confidence score" — because they measure different things and merging them would misrepresent both. Each value is labeled with its source per the Evidence Confidence panel's purpose in the directive: distinguishing self-reported testimony confidence from technical timestamp confidence.

## Accessibility notes (apply to all components above)

- No status is conveyed by color alone (consistent with `index.html`'s existing pattern of text-labeled states, e.g. "Consent unclear").
- All comparison and panel content must be reachable and operable by keyboard, per `accessibility/keyboard-workflow.md` (keybinding specifics still an open question there).
- Alt text is required for the original and every derivative shown in the Original vs. Derived view (SSL-004); an image without alt text does not enter this component's review queue.

## Open questions

- Whether the Original vs. Derived view should support more than one derivative side-by-side, or strictly one-at-a-time, is not yet decided — deferred to `web-engine/local-first-plan.md`'s production framework decision.
- Exact layout for the two-column Observer Saw / Sensor Recorded panel on narrow/mobile viewports is unspecified.

## Source

Authored per Workstream 2 ("Required photographic interface components") of the Omoluabi MVP Instrumentation and Research-Evidence Directive (v0.02).
