# Intelligence Modes

An `investigation-case` (`schemas/investigation-case.schema.json`) declares one
`intelligence_mode`. The mode does not change the evidence model, reasoning layers, or
governance rules — every mode uses identical underlying schemas — it changes which
output formats are typically produced and which audience the explanation layer writes
for.

| Mode | Typical audience | Typical output formats |
|---|---|---|
| Research | Researchers, peer reviewers | Academic summary, dataset |
| Journalism | Editors, the public | Public article, newsroom package |
| Scientific Review | Domain scientists | Academic summary, evidence cards |
| Historical Investigation | Historians, archivists | Research report, timeline |
| Policy Analysis | Policymakers | Policy brief |
| Accessibility Audit | Accessibility reviewers | Accessibility report |
| Technical Analysis | Engineers, technical reviewers | Research report, machine-readable schema |
| Educational Mode | Students, educators | Plain-language summary, public article |
| Emergency Mode | Field responders | Field companion, public briefing |
| Public Briefing | General public | Public briefing, plain-language summary |
| Field Companion | On-site investigators | Field companion, evidence cards |
| Editorial Controller | Human editors/publishers | Every format, gated by `governance/human-governance.md` |

## Rule

No mode grants an exception to the transparency contract (`docs/transparency-rules.md`)
or to human governance (`governance/human-governance.md`). A mode is a presentation
and audience setting, not a trust level.

## Status

Vocabulary and mode-to-format mapping are settled. Per-mode drafting logic (how an
Explain-stage output is actually generated for a given mode) is `[Planned]` — no
generation interface exists yet.
