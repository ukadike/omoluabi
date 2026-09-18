# Agent Memory Card

## System

Any SSL system that uses machine-generated or machine-consumed continuity artifacts such as compaction summaries, persistent context, hand-off memory, agent scratchpads promoted into durable state, or cross-agent memory.

This card is deliberately separate from `cards/memory.card.md`, which governs community/oral memory.

## Purpose

Govern the boundary between **remembered information** and **executable instruction**.

Core rule:

**A memory record may describe prior instructions without inheriting their authority.**

A model-generated memory artifact may never silently promote itself from data into a higher-authority instruction channel.

## Who is affected

Users, subjects represented in memory, successor models or agents, human reviewers, downstream systems, and any person or institution affected by actions taken from inherited context.

## Consent required

Human-subject information stored in agent memory remains constrained by the applicable consent record.

Model-generated instructions do not acquire legitimacy merely because they persist in memory.

## Evidence required

At minimum:

- origin of the memory;
- time recorded;
- source context;
- whether content is data, instruction, mixed, or unknown;
- whether any instruction is executable;
- provenance chain;
- whether a human reviewed it;
- whether downstream behavioral effect was observed;
- contamination status.

## Accessibility required

Yes. Human reviewers must be able to inspect the memory record, provenance chain, authority level, contamination state, and corrections using keyboard and screen-reader workflows. Instruction-versus-data status may not be conveyed by color alone.

## Risk level

Potentially high when a memory artifact can affect tool use, credentials, publication, network access, safety decisions, or successor-agent behavior.

Risk is determined separately through the Omoluabi risk record.

## What AI may do

AI may:

- summarize prior context;
- label likely provenance;
- flag content that resembles an instruction;
- detect conflicts between inherited memory and current governing instructions;
- suggest contamination or escalation flags;
- compare successor behavior with the inherited memory record;
- draft a correction for human review.

## What AI may not do

AI may not:

- convert model-generated content into higher-authority instructions on its own;
- conceal that an instruction was model-generated;
- erase the originating memory artifact or provenance chain;
- silently rewrite a contaminated memory as though it had always been clean;
- promote its own authority level;
- override consent, risk, publication, or human-review decisions;
- declare a memory safe solely because a successor ignored it once.

## Human decision required

Yes.

A human reviewer decides whether an inherited instruction is legitimate, should be revoked, superseded, quarantined, corrected, or permitted to affect later action.

## Archive status

Original memory artifacts and subsequent corrections should be retained when lawful and safe so the system can reconstruct what a successor actually inherited.

## Publication status

Uses the standard five-state publication model: private, internal_review, public, embargoed, withdrawn.

Publication of sensitive model traces remains a separate human decision.

## Federation status

Agent memory should not federate by default. Any future federation must preserve provenance, authority level, contamination state, and correction history.

## Version

Schema: `schemas/agent-memory.schema.json`  
Version: `0.1.0` — draft.

## Locked design distinction

`memory.schema.json` = community/oral memory.

`agent-memory.schema.json` = machine continuity, inherited context, and potential instruction propagation.

These are related concepts but not interchangeable data types.

## Research origin

Added from the Omoluabi AI Authority investigation after the July 2026 Astra-family compaction-summary incident exposed a governance question not represented by the existing community-memory schema:

**Who governs machine memory when one model can write context consumed by a successor?**

The incident is a research case, not the source of truth for the schema's future scope. Human review remains required before this draft becomes stable.
