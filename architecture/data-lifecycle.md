# Data Lifecycle

## 1. Capture

A human begins an observation through a web form, field device, import, or sensor.

## 2. Local Record

The system creates a local record before any network dependency.

## 3. Schema Validation

The record is validated against stable JSON Schemas.

## 4. Governance Attachment

The observation must attach or create:

- consent state
- source record
- risk record
- accessibility record
- publication status

## 5. AI Assist

AI may produce suggestions:

- transcript draft
- translation draft
- alt text draft
- entity suggestions
- risk suggestions
- summary draft

AI may not:

- override consent
- publish
- delete evidence
- erase provenance
- finalize risk
- decide public status

## 6. Human Review

A human editor/reviewer confirms, corrects, adds context, and decides status.

## 7. Archive

Original records remain preserved with version history.

## 8. API/Federation

Only approved fields and public-safe records become API-exposable.

## Source

Verbatim from `DATA_LIFECYCLE.md` in the packet delivered by Kemi on 2026-06-26.
