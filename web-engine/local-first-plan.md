# Local-First Plan

Status: research for production — not yet scoped. A prototype-only decision is recorded below for `app/`.

## Prototype Decision (this pass)

`web-engine/app/` uses browser IndexedDB, one object store per schema record type (`observation`, `consent`, `source`, `risk`, `accessibility`, `publication`), keyed by that record's own id field. This answers "what local storage layer" for the running prototype only. It does not answer, and should not be read as pre-deciding:

- the production storage layer (could stay IndexedDB, could move to an embedded database, could change entirely)
- sync transport or conflict resolution (still fully open, see below)
- encryption-at-rest (not implemented in the prototype; every record in the prototype store is stored in the clear, in the reviewer's own browser, and nothing leaves that browser — there is no network call anywhere in `app/`)

If this prototype's storage approach is not what Kemi wants carried into production, that's expected — it was chosen to make the review screens in `screens.md` testable, not to settle the architecture.

## Why local-first

Governed observation records, especially from field and device sources, need to be usable without guaranteed connectivity, and need to remain under the control of the person or community that captured them until a publication decision is made. This is consistent with SSL-009 (see `governance/rule-library.md`) and with Data Lifecycle step 2 in `architecture/data-lifecycle.md`.

## Open Questions

- What local storage layer (browser storage, local file system, embedded database)?
- How are conflicts resolved when a record is edited in two places before sync?
- What is the sync transport, and how does it interact with `architecture/sync-and-federation.md`, which is itself unscoped?
- How does local-first storage interact with encryption-at-rest requirements noted in `device/parts-list.md` research items?

None of these questions are answered by the source packet. They are listed here as open research, not settled design.

## Source

Derived from SSL-009 and `architecture/data-lifecycle.md`; no local-first design exists yet in the source packet.