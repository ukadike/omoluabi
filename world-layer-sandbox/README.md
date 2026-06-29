# World-layer sandbox

Exploratory **diegetic world-layer** visuals for the Umada world — colorful,
painted, weather-rich. This is a play space, **not canon and not the archival
presentation layer**.

## Why it is separate

The Omoluabi/Umada visual system has two layers that must not be mixed:

- **Presentation / archive layer** (the main site, the UFO Connection demo):
  monochrome graphite, no gradients, no shadows, **no animation**,
  screen-reader-first. That layer stays pure.
- **Diegetic world layer** (this folder): colorful and animated when the mood
  calls for it. Kept here so it can never leak into the archival layer.

## Ground rules honoured here

- Asserts **no canon**; invents nothing about the story.
- Uses **no Nago signs or glyphs** (avoids the no-generic-glyphs rule entirely
  by staying abstract — light, weather, horizon, never signage).
- **Names no real-world place** in public text (palette/place references stay
  internal mood notes).
- Accessibility is still infrastructure: `prefers-reduced-motion` paints one
  static frame, the canvas is `aria-hidden` with a text alternative in the
  figcaption, and motion has a keyboard-reachable pause/replay control.
- No external network calls — p5 is vendored locally.

## Pieces

- `p5-coastal-relay/` — a painted coastal dusk with a relay of light along the
  horizon (four ticks, then a bloom): a felt echo of the opening rhythm and of
  the relay/signal idea. Open `p5-coastal-relay/index.html`.

## Run locally

```bash
python3 -m http.server 8000 -d world-layer-sandbox/p5-coastal-relay
# open http://localhost:8000/
```
