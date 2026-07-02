# Accessibility Baseline

Accessibility is architecture, not polish.

## Repository Accessibility

Every public document should use:

- clear headings
- short sections
- descriptive links
- alt text for images
- text equivalents for diagrams
- plain-language summaries
- markdown tables only when needed

## Web Engine Accessibility

Required:

- keyboard-first workflow
- screen reader support
- high contrast mode
- color-independent status indicators
- captions
- transcripts
- alt text
- form labels
- visible focus states
- skip links
- reduced motion option

## Device Accessibility

Required:

- tactile controls
- one-handed operation research
- haptic feedback
- audio feedback option
- nonvisual consent state confirmation
- large physical buttons
- status redundancy: light + sound + vibration

## Blind Editor Workflow

A blind editor must be able to:

1. review an observation
2. hear or read transcript
3. inspect consent state
4. inspect risk state
5. inspect source state
6. edit alt text
7. approve or hold publication

## Related Work

Accessibility auditing methodology and tooling for this baseline (automated WCAG 2.2+ checks, p5.js/canvas-specific review, PDF structural checks, and structured remediation guidance) is developed in a sibling Small Systems Lab project, [Accessible by Design](https://github.com/ukadike/accessible-by-design-prototyping) (`accessible-by-design-prototyping`). That repository is the source of the auditing principles this baseline draws on; the `system` enum in `schemas/observation.schema.json` already lists `accessible-by-design` as one of the SSL systems that can produce a governed observation.

## Source

Verbatim from `11_accessibility/ACCESSIBILITY_BASELINE.md`.