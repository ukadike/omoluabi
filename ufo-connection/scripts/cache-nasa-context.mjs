import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const CASES_PATH = path.join(ROOT, "data", "curated-cases.json");
const OUTPUT_PATH = path.join(ROOT, "data", "nasa-context.json");
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function isoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function shiftIso(value, ms) {
  return new Date(new Date(value).getTime() + ms).toISOString();
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function getEvent(caseRecord) {
  const event = caseRecord.event || {};
  return {
    dateTimeUtc: event.dateTimeUtc || null,
    latitude: finiteNumber(event.latitude) ? event.latitude : null,
    longitude: finiteNumber(event.longitude) ? event.longitude : null,
    locationPrecision: event.locationPrecision || "unknown",
    timePrecision: event.timePrecision || "year"
  };
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "Omoluabi-UFO-Connection/1.0" }
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function safeQuery(label, url) {
  try {
    return { label, url, ok: true, data: await getJson(url) };
  } catch (error) {
    return {
      label,
      url,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

function bboxAround(lat, lon, radius = 5) {
  return [
    Math.max(-180, lon - radius),
    Math.min(90, lat + radius),
    Math.min(180, lon + radius),
    Math.max(-90, lat - radius)
  ].join(",");
}

async function buildReferenceArchive() {
  const searches = [
    ["meteor-bolide", "meteor bolide"],
    ["aurora", "aurora"],
    ["rocket-launch", "rocket launch"],
    ["atmospheric-optics", "atmospheric optics"],
    ["weather-balloon", "weather balloon"],
    ["satellite", "satellite"]
  ];

  const results = [];
  for (const [slug, q] of searches) {
    const params = new URLSearchParams({
      q,
      media_type: "image,video",
      page_size: "12"
    });
    const url = `https://images-api.nasa.gov/search?${params}`;
    results.push({ slug, ...(await safeQuery("NASA Image and Video Library", url)) });
  }
  return results;
}

async function correlateCase(caseRecord) {
  const event = getEvent(caseRecord);

  if (!event.dateTimeUtc) {
    return {
      caseId: caseRecord.id,
      state: "insufficient_event_precision",
      reason: "The public case record does not provide an exact event date/time.",
      event,
      queries: []
    };
  }

  const eventDate = isoDate(event.dateTimeUtc);
  const queries = [];

  // EPIC: exact UTC date.
  queries.push(await safeQuery(
    "EPIC",
    `https://epic.gsfc.nasa.gov/api/natural/date/${eventDate}`
  ));

  // CNEOS fireballs: narrow temporal comparator.
  const fireballParams = new URLSearchParams({
    "date-min": shiftIso(event.dateTimeUtc, -12 * HOUR).replace(".000Z", ""),
    "date-max": shiftIso(event.dateTimeUtc, 12 * HOUR).replace(".000Z", ""),
    "req-loc": "true"
  });
  queries.push(await safeQuery(
    "JPL/CNEOS Fireballs",
    `https://ssd-api.jpl.nasa.gov/fireball.api?${fireballParams}`
  ));

  // Space weather: broader daily context.
  const swStart = isoDate(new Date(event.dateTimeUtc).getTime() - DAY);
  const swEnd = isoDate(new Date(event.dateTimeUtc).getTime() + DAY);
  for (const service of ["GST", "FLR", "CME"]) {
    const params = new URLSearchParams({
      startDate: swStart,
      endDate: swEnd,
      api_key: NASA_API_KEY
    });
    queries.push(await safeQuery(
      `DONKI ${service}`,
      `https://api.nasa.gov/DONKI/${service}?${params}`
    ));
  }

  // Natural event metadata; add a bounding box only when coordinates exist.
  const eonetParams = new URLSearchParams({
    start: swStart,
    end: swEnd,
    status: "all",
    limit: "100"
  });
  if (event.latitude !== null && event.longitude !== null) {
    eonetParams.set("bbox", bboxAround(event.latitude, event.longitude));
  }
  queries.push(await safeQuery(
    "EONET v3",
    `https://eonet.gsfc.nasa.gov/api/v3/events?${eonetParams}`
  ));

  const state =
    event.latitude !== null && event.longitude !== null
      ? "spatiotemporal_candidate"
      : "candidate_context";

  return { caseId: caseRecord.id, state, event, queries };
}

const raw = await fs.readFile(CASES_PATH, "utf8");
const caseData = JSON.parse(raw);
const referenceArchive = await buildReferenceArchive();
const cases = [];

for (const caseRecord of caseData.cases || []) {
  cases.push(await correlateCase(caseRecord));
}

const output = {
  schemaVersion: "1.0.0",
  generatedAt: new Date().toISOString(),
  editorialRule:
    "NASA/JPL results are comparator context. They are not automated identifications and may not resolve a UAP case.",
  referenceArchive,
  cases
};

await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf8");
console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}`);
