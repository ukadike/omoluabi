# Glossary

**Observation** — The smallest unit of record in Omoluabi. Every record begins as an observation, not a conclusion (SSL-001).

**Consent** — A versioned declaration of how an observation's subject(s) permit it to be used and shared. Required before sharing (SSL-003).

**Source** — Provenance metadata identifying where an observation came from: origin, device, collector, or import method (SSL-002).

**Risk** — An assessment of potential harm from distributing an observation, used to constrain reach before exposure (SSL-008).

**Accessibility metadata** — Structured information (alt text, transcripts, tactile/haptic equivalents, etc.) required before any object is considered complete for publication (SSL-004).

**Publication status** — The governed state of a record's visibility: private, internal review, public, embargoed, or withdrawn. See `governance/publication-status.md`.

**AI Assist** — Suggestions AI may contribute (transcripts, translations, alt text drafts, entity suggestions, summaries). AI may not publish, erase, override consent, or finalize risk or status (SSL-005).

**Human Review** — The required human step that confirms, corrects, adds context to, and decides the publication status of a record (SSL-006).

**Card** — A human-readable companion document to a JSON Schema, explaining what a record type is, why it exists, and how it is governed. See `cards/` (planned).

**Schema** — A machine-readable JSON Schema defining the structure and validation rules for a record type. See `schemas/` (planned).

**SSL** — Small Systems Lab; the shared rule-ID prefix for rules that apply across SSL projects (Omoluabi, Echo, UMADA, Earth Sensors Lab).

**OM** — The rule-ID prefix reserved for rules specific to Omoluabi.

**Federation** — The planned mechanism by which approved, public-safe records become exposable across independent Omoluabi nodes or via API.

**Archive** — The preserved record of an observation and its full version history, including corrections, regardless of publication status.

## Source

Terms are drawn from `GOVERNANCE_CORE.md` and `DATA_LIFECYCLE.md` in the packet delivered by Kemi on 2026-06-26.
