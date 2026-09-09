# The Unseen Record — source notes and update protocol

## What Omoluabi publishes

This is a curated editorial investigation, not a comprehensive sightings index.
Every published case pairs:

1. an official AARO/DVIDS public-media release;
2. a direct DVIDS embed or source link;
3. Omoluabi's distinct evidence reading; and
4. an explicit account of what the public release does not establish.

The original public record and the Omoluabi reading are separate layers. AARO's
assessment is preserved as the source institution's assessment; Omoluabi does
not replace it with an automated truth score or a claim about origin.

## Current official sources

- AARO official imagery catalogue: <https://www.aaro.mil/UAP-Cases/Official-UAP-Imagery/>
- DVIDS public media API: <https://api.dvidshub.net/docs>
- DVIDS terms: <https://api.dvidshub.net/docs/tos>

Current case-source identifiers are held in `data/curated-cases.json`:

| Case | DVIDS video ID |
|---|---:|
| PR-017, Europe 2024 | 988675 |
| PR-001, Africa 2022 | 973045 |
| Middle East Red Balloon 2024 | 964843 |
| PR-002, Africa 2024 | 973048 |

## Refresh and removal rule

The public page embeds the originating DVIDS player. It does not download or
store a replacement copy of the video.

The GitHub Action `Refresh curated DVIDS UAP metadata` uses the DVIDS API only
from the repository workflow. A `DVIDS_API_KEY` repository secret is required;
the browser never receives that key. The workflow refreshes source availability
and official metadata for the already selected cases. It does not automatically
publish a new case or generate an Omoluabi reading.

If DVIDS reports that a selected asset is no longer public, the workflow marks
the source unavailable. The public case page then removes the embed and directs
the audience to the source record rather than retaining a stale media copy.

Any newly selected event requires human editorial review of its source,
publication status, context, accessibility record, and Omoluabi reading before
it is added to this sequence.
