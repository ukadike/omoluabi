# Local-First Plan

Status: research — not yet scoped.

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