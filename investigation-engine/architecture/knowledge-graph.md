# Knowledge Graph

Every entity an investigation touches becomes a node in a connected graph, defined by
`schemas/knowledge-graph-entity.schema.json`.

## Entity Types

People, Places, Organizations, Events, Technologies, Documents, Media, Scientific
Concepts, Policies, Projects, Objects, Claims, Evidence, Relationships, Contradictions,
Timelines.

`Claims` and `Evidence` are dual-represented: they are first-class records in
`schemas/claim.schema.json` and `schemas/evidence-object.schema.json`, and they also
appear as graph nodes so they can be related to People, Places, Organizations, and so
on without a separate join schema. `Relationships`, `Contradictions`, and `Timelines`
are not separate node types stored twice — `Relationships` are edges
(`related_entity_ids` on `knowledge-graph-entity.schema.json`), `Contradictions` are
already their own record (`schemas/contradiction.schema.json`) referenced by ID, and
`Timelines` are a derived view over every entity's `timeline_position` field, not a
stored record type.

## Edges

An edge is a `{entity_id, relationship_type, description}` tuple on the
`related_entity_ids` array. `relationship_type` is a free-text field in the first
draft (for example: "employed_by", "present_at", "cites", "contradicts",
"corroborates", "authored"). A closed enum of relationship types is `[Research]` —
the master specification does not fix one, and inventing a closed list before seeing
real cases would risk forcing evidence into the wrong shape.

## Geographic and Temporal Mapping

Every entity may carry `geographic_location` and `timeline_position` (same shapes as
`architecture/evidence-model.md`). Geographic Mapping and Timeline Reconstruction
(both named reasoning layers) are views computed over these fields, not separate
storage.

## Status

Schema shape: scaffolded. Graph storage engine, query interface, and visualization
(interactive timeline, knowledge graph output formats in `docs/output-formats.md`):
`[Planned]` — no graph database or rendering layer exists yet. This mirrors
`web-engine/README.md`'s status elsewhere in the repository: plans and schemas exist,
running code does not.
