# NASA / Space Context Layer

## Purpose

The NASA layer is a comparator and context system for Omoluabi's UFO/UAP evidence pages. It must never convert a contextual match into proof of identity or origin.

The layer separates:

- **Reference archive** — NASA imagery useful for visual comparison or background.
- **Event-correlated context** — data that can be queried against a case date/time/location.
- **Insufficient precision** — cases whose public release does not expose enough event metadata for a defensible temporal/geographic comparison.

## Current case constraint

The four curated cases currently expose region and year, but not exact UTC event time or coordinates. NASA material may therefore be collected as reference context, but no current case should be labelled a NASA event match.

## Source adapters

| Adapter | Endpoint | Use |
|---|---|---|
| NASA Images | `https://images-api.nasa.gov/search` | Reference imagery/video and metadata |
| EPIC | `https://epic.gsfc.nasa.gov/api/natural/date/{YYYY-MM-DD}` | Full-disc Earth imagery for an exact date |
| JPL/CNEOS Fireballs | `https://ssd-api.jpl.nasa.gov/fireball.api` | Bolide/fireball comparator by time and, when available, location |
| DONKI | `https://api.nasa.gov/DONKI/{service}` | Solar/geomagnetic context |
| EONET v3 | `https://eonet.gsfc.nasa.gov/api/v3/events` | Natural-event context with date range and bounding box |
| GIBS | `https://gibs.earthdata.nasa.gov/` | Time-enabled Earth observation imagery |
| JPL Horizons | `https://ssd.jpl.nasa.gov/api/horizons.api` | Observer geometry for Sun, Moon, planets and selected spacecraft/small bodies |

## Case metadata required for event correlation

Add this optional object to a curated case when the official source exposes it:

```json
{
  "event": {
    "dateTimeUtc": "2024-01-15T21:42:00Z",
    "latitude": 12.345,
    "longitude": -45.678,
    "locationPrecision": "exact|approximate|region-only",
    "timePrecision": "second|minute|hour|date|year",
    "source": "official source URL or record id"
  }
}
```

The ingestion script treats event-level correlation as eligible only when a date is known. Geographic matching additionally requires coordinates.

## Evidence states

- `reference_only`: useful visual/scientific context, not correlated to the event.
- `candidate_context`: time-window overlap exists; geography or other constraints may remain incomplete.
- `spatiotemporal_candidate`: time and geography overlap. Still not an identification.
- `no_match_in_query_window`: no result returned for that source/query.
- `insufficient_event_precision`: public case metadata is too coarse to run a defensible correlation.
- `source_error`: upstream source failed; never reinterpret as "no event."

## Default query windows

- Fireball: event time ± 12 hours.
- DONKI: event calendar date ± 1 day.
- EONET: event date ± 1 day; bounding box ± 5 degrees when coordinates are available.
- EPIC: event UTC calendar date.
- NASA Images: reference-only searches; never treated as event correlation by search resemblance.

## Editorial rule

A NASA result is a comparator, not a verdict. The page must preserve the distinction between:

1. the official UAP source record;
2. NASA/JPL environmental or astronomical context;
3. an Omoluabi comparison;
4. a human editorial conclusion, if one is justified.

No automated layer may promote a case from unresolved to resolved.
