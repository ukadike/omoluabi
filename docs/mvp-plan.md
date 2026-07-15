# Omoluabi MVP Plan — Rules-Based Media and Governed Records

**Version:** 1.0.0  
**Status:** Active prototype plan  
**Updated:** 2026-07-15

## MVP proposition

Omoluabi is a portable, accessible publishing and evidence-reading system in which:

> AI assists. SSL rules govern. Humans publish.

The MVP is not only a content interface. It is a governed record pipeline that can show why a record is ready, incomplete, restricted, or blocked.

## MVP users

- independent journalists and documentary producers;
- community archivists and cultural-memory stewards;
- researchers and educators;
- accessibility practitioners;
- civic and environmental observers;
- small institutions that need portable, self-hosted publishing infrastructure.

## MVP record flow

Observation → Consent → Source → Risk → Accessibility → Media → Rule Evaluation → Human Review → Publication Status → Archive → API-ready record

## MVP implementation layers

### 1. Governed record

A record extends the Small Systems Lab Universal Schema and includes:

- identity;
- provenance;
- epistemic status;
- accessibility;
- consent when applicable;
- risk;
- human governance;
- publication status;
- returnability;
- maintenance;
- zero or more SSL media items.

### 2. SSL rules engine

The MVP loads the versioned rule set at:

```text
/rules/ssl-rules.v1.json
```

The engine produces `pass`, `warn`, `fail`, or `not_applicable` outcomes. It does not execute arbitrary expressions from the rule file. Named tests are implemented in reviewed code.

Rule failures remain visible. The interface must not silently repair, suppress, or reinterpret a failed rule.

### 3. Universal SSL Media Field

The MVP includes a reusable web component capable of displaying:

- images;
- video;
- audio;
- slideshows;
- mixed-media record sets;
- unsupported media through a safe source-link fallback.

Native semantic HTML remains the foundation. p5 may add removable analysis and annotation overlays but may not replace the source element.

### 4. Human review

The interface distinguishes:

- rule evaluation;
- AI assistance;
- human review;
- publication decision.

A passing rule evaluation is not the same as editorial approval.

### 5. Offline and local-first behavior

- Cached data and media remain usable without a live third-party source.
- User-selected CSV files are parsed locally in the browser.
- No automatic client-side request is made to WAR.GOV.
- The media field continues to work if p5 or any enhancement layer fails.

## First public implementation: The UFO Connection

The UFO Connection is the first visible implementation of the rules-based MVP. It demonstrates:

- official-source and sample-data modes;
- explicit sample/synthetic labeling;
- one governed record shape;
- image, video, audio, and slideshow rendering;
- media provenance and evidentiary limits;
- accessibility metadata;
- executable rule results per record;
- separation of evidence, interpretation, hypothesis, belief, and speculation;
- human-review status distinct from automated checks.

## MVP acceptance criteria

The MVP is present when all of the following are true:

1. A record can be loaded from local JSON or a user-selected CSV.
2. A record can contain multiple media items.
3. Image, video, audio, and slideshow examples render without autoplay.
4. Each media item exposes source status and provenance.
5. Meaningful images expose alt text.
6. Timed media expose transcript status; video exposes caption status.
7. The rules engine evaluates every record and media item.
8. Rule failures and warnings are visible to the user.
9. Public status and human-review status remain separate.
10. p5 analysis is removable and the original semantic media remains available.
11. The page works at narrow widths and with keyboard-only navigation.
12. The page remains functional when official data is unavailable.
13. The repository contains the universal SSL schema card, media schema card, JSON Schemas, and versioned rules.
14. A project can extend the same media field and rule set without copying UFO-specific logic.

## Not in this MVP

- automated truth, credibility, belief, or reliability scoring;
- autonomous publication;
- biometric identification;
- hidden ranking of testimony or communities;
- destructive replacement of original media;
- remote storage of a visitor’s locally selected CSV;
- federation trust decisions without a human-governed trust model.

## Next implementation steps

1. Move the universal media component to a dedicated SSL package or repository.
2. Add JSON Schema validation in CI.
3. Add rule-test fixtures for all SSL projects.
4. Connect rule outcomes to a human-review queue.
5. Add correction and override records.
6. Add durable media checksums and local-cache manifests.
7. Apply the universal rules to Earth Sensors Lab, Ounjẹ, UMADA, and other SSL branches.
