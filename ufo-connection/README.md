# Omoluabi — The UFO Connection

An Omoluabi user case: a small, accessible GitHub Pages demonstration of the
Omoluabi evidence-reading layer applied to official PURSUE UAP/UFO disclosure
records.

This is not an alien-proof page. It is a public-interest evidence interface.
Omoluabi does not tell users what to believe. It helps users see what is
present, what is missing, what remains unresolved, and what questions remain.

This demo lives in its own folder so it does not disturb the main Omoluabi
project site at the repository root. Served via GitHub Pages it is reachable at
`/ufo-connection/`.

## Core build decision

No browser fetch from WAR.GOV.

The GitHub Action fetches the official CSV, converts it to local JSON, commits
the JSON into `ufo-connection/data/`, and GitHub Pages reads only local JSON.
This avoids CORS failure and keeps the public site stable. On a failed or empty
fetch the cache script throws before writing, so existing cached JSON is never
overwritten with partial data.

## Hard rules

1. No alien-proof claims; no truth, reliability, or voting scores.
2. YouTube / Beautiful Disclosure is public discourse, never official evidence.
3. Official records stay separate from commentary.
4. The original official source link is always visible.
5. External text is escaped through `textContent`; no `innerHTML` for data.
6. YouTube IDs are validated against a strict 11-character pattern and embedded
   through `youtube-nocookie.com`.
7. Ontological Realities is an interpretation layer, not evidence.

## Official source

- PURSUE official page: https://www.war.gov/ufo/

The official CSV path is referenced from the page's own JavaScript and has
changed before, so the cache script **discovers `.csv` link(s) from the page at
run time**, fetches and merges them (combined or per-release), and falls back to
known paths (`uap-csv.csv`, `uap-release001..003.csv`) if discovery finds none.
To pin a specific endpoint and bypass discovery, set `PURSUE_CSV_URL` (in
`.github/workflows/cache-pursue.yml` or as an environment variable).

### Why the demo may show no records

war.gov fronts its site with edge bot-protection that returns `403 Forbidden`
to automated requests from datacenter IPs — including GitHub Actions runners. So
the scheduled cache job usually cannot reach the official source and the page
shows empty states by design. This is intentional: the demo only ever displays
records cached from the official source, never invented or third-party data, and
the cache job keeps the existing data untouched and exits cleanly when the
source is unreachable.

To populate real records, run the cache once from a network that can load
war.gov (for example your own machine):

```bash
cd ufo-connection && npm run cache:pursue
git add data && git commit -m "chore: cache PURSUE data" && git push
```

The scheduled Action will also populate automatically if war.gov ever becomes
reachable from CI (e.g. via a self-hosted runner on an allowed network).

## Serve locally

```bash
# from the repository root
python3 -m http.server 8000 -d ufo-connection
# open http://localhost:8000/
```

## Update data locally

```bash
cd ufo-connection
npm run cache:pursue        # or: node scripts/cache-pursue.mjs
```

No dependencies and no `npm install` are required — the script uses a built-in
CSV parser and Node's `fetch`. It writes `data/disclosure.json`, per-release
files under `data/releases/`, and `data/schema-observation.json` (the real
observed CSV headers). Output paths are resolved relative to the script, so it
works from any working directory.

## Folder structure

```text
.github/workflows/cache-pursue.yml   # scheduled/manual cache job (repo root)
ufo-connection/
  index.html                         # public demo page
  offline.html                       # fallback page
  css/ufo-connection.css
  js/app.js                          # render + filter/search (textContent only)
  js/data-normalizer.js              # record normalization + Omoluabi reading
  js/youtube-layer.js                # strict YouTube ID validation
  data/disclosure.json               # cached official records (local only)
  data/releases/{1,2,3}.json
  data/beautiful-disclosure.json     # curated public-discourse items (empty by default)
  data/schema-observation.json       # observed CSV headers
  scripts/cache-pursue.mjs           # fetch + normalize + cache
  package.json
```

## Page sections

Hero / framing · Data status · Filters (release, type, search) · Official
records · Omoluabi Reading · Beautiful Disclosure · Ontological Realities
(evidence / interpretation / hypothesis / belief / speculation) · Source footer.
