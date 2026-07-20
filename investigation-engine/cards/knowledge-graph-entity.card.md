# Knowledge Graph Entity Card

## System

investigation-engine (any domain).

## Purpose

A node in the investigation knowledge graph: a person, place, organization, event,
technology, document, media item, scientific concept, policy, project, object, claim,
or evidence item, connected to other entities by typed edges.

## Who is affected

Whoever or whatever the entity represents; anyone whose relationships are mapped.

## Consent required

Where `entity_type` is `person`, yes — reuses `governance/consent-model.md`. Public
figures acting in a public capacity may be represented per existing Omoluabi
editorial norms; this is not separately re-specified here.

## Evidence required

`entity_type`, `name`. `source_evidence_ids` should be populated before an entity is
treated as more than a placeholder node.

## Reasoning transparency

Edges (`related_entity_ids`) should be traceable to a Relationship Mapping reasoning
step where the connection isn't self-evident from the cited evidence.

## Accessibility required

Graph views need a non-visual, structured-text equivalent (`docs/accessibility.md`,
"Alternative visualizations").

## Risk level

Follows the most restrictive risk level of any linked evidence naming the entity.

## What AI may do

Propose an entity, propose edges, populate `timeline_position` /
`geographic_location` from cited evidence (SSL-005).

## What AI may not do

Assert a relationship type implying wrongdoing or affiliation without a cited
evidence basis in `related_entity_ids[].description`.

## Human decision required

Required before an entity or edge is included in a published Knowledge Graph output.

## Reversibility

Yes — edges and `research_state` can change; nothing is silently removed from the
graph, only marked `retracted` or `archived`.

## Publication status

Surfaces through the Knowledge Graph and Interactive Timeline output formats.

## Version

Schema: `schemas/knowledge-graph-entity.schema.json`.
