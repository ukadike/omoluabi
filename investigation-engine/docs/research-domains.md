# Universal Research Domains

The Investigation Engine supports any research domain, including but not limited to:

Science, Journalism, History, Government, Intelligence, Accessibility, Climate,
Public Health, Education, Archaeology, Space, Astronomy, UAP/UFO investigations,
AI Safety, Civic Technology, Human Rights, Economics, Law, Culture, Language,
Indigenous Knowledge, Disaster Response, Speculative Research.

## Rule

No domain receives special-cased reasoning. Every domain uses the identical
architecture: the same Evidence Object shape (`schemas/evidence-object.schema.json`),
the same 34 reasoning layers (`architecture/reasoning-layers.md`), the same research
states (`architecture/research-states.md`), and the same human-governance gate
(`governance/human-governance.md`).

`domain` is a field on `schemas/evidence-object.schema.json`,
`schemas/claim.schema.json`, and `schemas/investigation-case.schema.json` — an open
string, not a closed enum, so a domain not listed above is not blocked, only
undocumented until someone adds it here.

## Existing Domain Precedent in This Repository

Two domains already have running (or scaffolded) work elsewhere in Omoluabi, which the
Investigation Engine should reuse rather than duplicate:

- **UAP/UFO investigations** — `ufo-connection/`, which reads official PURSUE UAP/UFO
  disclosure records through an evidence-reading layer (known / missing / unresolved),
  a narrower precursor to this engine's `research_state` vocabulary. Any Investigation
  Engine case in this domain should treat `ufo-connection/SOURCE_NOTES.md` as its
  starting evidence base, not re-collect from scratch.
- **Climate / environmental sensing** — `earth-sensors-lab-bridge/`, bridging to Earth
  Sensors Lab sensor readings, relevant to the Sensor Correlation reasoning layer.

## Status

Domain list settled per the master specification (verbatim). Reuse notes above are new
observations from this scaffolding pass, not yet confirmed with Kemi.
