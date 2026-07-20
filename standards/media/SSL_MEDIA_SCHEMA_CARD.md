---
schema_name: Small Systems Lab Universal Media Schema Card
schema_id: ssl-media-schema
version: 1.0.0
status: active
maintainer: Small Systems Lab
last_reviewed: 2026-07-15
extends:
  schema_id: ssl-universal-schema
  version: 1.0.0
---

# Small Systems Lab Universal Media Schema Card

## Purpose

This card governs media used across all SSL projects. It defines one shared structure and interaction contract for images, video, audio, slideshows, mixed-media galleries, documents, maps, p5 sketches, sensor visualizations, livestreams, and future media types.

The reusable interface is called **SSL Media Field**.

## Core rule

> The interpretive or p5 layer may annotate, compare, sonify, or visualize media, but it must never replace access to the original semantic media element.

## Supported media types

- image
- video
- audio
- slideshow
- gallery
- document
- map
- interactive
- sensor_visualization
- livestream
- model_3d
- unknown

## Required media identity

```yaml
media:
  id:
  type:
  title:
  description:
  source_status:
  src:
  format:
  license:
```

Permitted `source_status` values:

- source
- annotated
- transformed
- reconstructed
- synthetic
- fictional
- unknown

## Accessibility requirements

### Images

Meaningful images require alt text. Complex images should also provide an extended description. Decorative images must use an empty alt attribute.

### Video

Video requires keyboard-operable controls, captions when audio contains meaningful information, and a transcript. Audio description or a visual description must be provided when essential visual information is otherwise unavailable.

### Audio

Audio requires keyboard-operable controls and a transcript or equivalent description.

### Slideshows

Slideshows must announce the current slide and total, support previous/next keyboard operation, preserve individual alt text and captions, and never auto-advance by default.

### p5 and canvas layers

Canvas output requires a semantic source-media fallback and a textual description of annotations or transformations.

## Provenance and transformations

Every media item must preserve:

```yaml
provenance:
  source_name:
  source_url:
  creator:
  publisher:
  date_created:
  date_published:
  date_retrieved:
  original_format:
  current_format:
  transformations: []
  checksum:
  verification_status:
```

Cropping, color correction, speed changes, frame extraction, denoising, stabilization, transcription, translation, annotation, and AI generation are transformations and must be declared.

## Playback rules

```yaml
playback:
  autoplay: false
  controls: true
  looping: false
  muted: false
  playback_rates: [0.5, 0.75, 1, 1.25, 1.5, 2]
  captions_default: false
```

Autoplay is prohibited for public SSL interfaces unless a documented accessibility and safety exception is approved.

## Evidentiary status

Each item must state what it can and cannot establish.

```yaml
evidentiary_status:
  classification:
  known: []
  does_not_establish: []
  limitations: []
```

## Analysis layer

```yaml
analysis_layer:
  enabled:
  renderer:
  annotations: []
  annotations_removable:
  source_media_remains_available:
  accessible_alternative:
  transformation_disclosure:
```

`renderer` may be `p5`, `canvas`, `svg`, `dom`, or `none`.

## Rendering contract

The SSL Media Field must:

1. Render native `<img>`, `<video>`, or `<audio>` elements where applicable.
2. Expose title, type, source status, caption, credit, license, and source link.
3. Keep source and annotated modes visibly distinct.
4. Provide an explicit fallback for unsupported formats.
5. Continue to work if p5 or other enhancement libraries fail.
6. Avoid autoplay.
7. Respect reduced-motion preferences.
8. expose rule results and known accessibility gaps.
9. Avoid using color alone to communicate status.
10. Keep data and external text out of unsafe `innerHTML` paths.

## Machine-readable schema

Canonical JSON Schema:

```text
/schemas/media.schema.json
```

Canonical executable rules:

```text
/rules/ssl-rules.v1.json
```
