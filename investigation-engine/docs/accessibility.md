# Accessibility

The Investigation Engine inherits Omoluabi's baseline accessibility requirements
(`accessibility/baseline.md` at the repository root) and extends them to reasoning
outputs specifically.

## Requirements

- **Keyboard-first** — any future review interface for Claims, contradictions, or
  approvals must be fully operable without a pointing device.
- **Screen-reader optimized** — every output format (`docs/output-formats.md`) needs a
  screen-reader-coherent structure, not only a visual layout.
- **Blind editor mode** — a human reviewer using a screen reader must be able to
  complete the full `governance/human-governance.md` approval workflow, per the
  pattern in `accessibility/blind-editor-workflow.md`.
- **Captions, transcripts** — required on any Audio or Video `media_type` Evidence
  Object before it can support a Claim above `unverified`.
- **Plain-language summaries** — required alongside any Academic summary or Research
  report output format, per Educational Mode and Public Briefing intelligence modes.
- **Expert summaries** — the counterpart to plain-language summaries for Scientific
  Review and Technical Analysis modes; both may be required on the same case for
  different audiences.
- **High contrast, low bandwidth, offline mode** — inherited directly from
  `accessibility/baseline.md`; no separate requirement invented for this subsystem.
- **Multilingual, translation provenance** — every translated Evidence Object carries
  `translation_status` (original language, translator, translation confidence,
  provenance note) on `schemas/evidence-object.schema.json` — translation is treated
  as a reasoning step with its own confidence, not an invisible pass-through.
- **Alternative visualizations** — the Knowledge Graph and Interactive Timeline output
  formats need non-visual equivalents (structured text, tables) for users who cannot
  use graphical rendering.
- **Audio-first workflows** — relevant to Field Companion and Emergency Mode
  intelligence modes, where a field investigator may need eyes-free operation.

## Status

Requirements list settled, matching the master specification and consistent with
`accessibility/baseline.md`. None of the interfaces referenced above (review UI,
output renderer) exist yet; this document specifies what they must satisfy once built.
