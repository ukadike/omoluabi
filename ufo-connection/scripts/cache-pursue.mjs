import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_PAGE = 'https://www.war.gov/ufo/';
// PURSUE_CSV_URL, when set, is used verbatim and bypasses page discovery.
const CSV_URL_OVERRIDE = process.env.PURSUE_CSV_URL || '';

// The official page references the live CSV path from its own JavaScript and it
// has changed before, so we discover .csv links from the page at run time.
// These known paths are tried as fallbacks if discovery finds nothing.
const FALLBACK_CSV_URLS = [
  'https://www.war.gov/Portals/1/Interactive/2026/UFO/uap-csv.csv',
  'https://www.war.gov/Portals/1/Interactive/2026/UFO/uap-release001.csv',
  'https://www.war.gov/Portals/1/Interactive/2026/UFO/uap-release002.csv',
  'https://www.war.gov/Portals/1/Interactive/2026/UFO/uap-release003.csv'
];

// Resolve output paths relative to this script so the cache works regardless of
// the working directory the script is invoked from.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(SCRIPT_DIR, '..', 'data');
const RELEASE_DIR = path.join(OUT_DIR, 'releases');

async function main() {
  await fs.mkdir(RELEASE_DIR, { recursive: true });
  const fetchedAt = new Date().toISOString();

  // Build the candidate CSV list: an explicit override wins; otherwise discover
  // .csv links from the official page and append the known fallbacks.
  let candidates;
  if (CSV_URL_OVERRIDE) {
    candidates = [CSV_URL_OVERRIDE];
  } else {
    const discovered = await discoverCsvUrls(SOURCE_PAGE);
    candidates = [...new Set([...discovered, ...FALLBACK_CSV_URLS])];
    console.log('Candidate CSV URLs:', candidates);
  }

  // Fetch every candidate that responds; merge and de-duplicate the rows so a
  // combined CSV and per-release CSVs can coexist without double-counting.
  const seen = new Set();
  const parsed = [];
  const usedUrls = [];
  let lastError;
  for (const url of candidates) {
    try {
      const rows = parseCsv(await fetchText(url));
      if (!rows.length) continue;
      let added = 0;
      for (const row of rows) {
        const key = JSON.stringify(row);
        if (seen.has(key)) continue;
        seen.add(key);
        parsed.push(row);
        added++;
      }
      if (added) usedUrls.push(url);
      console.log(`Fetched ${rows.length} rows (${added} new) from ${url}`);
    } catch (error) {
      lastError = error;
      console.log(`Skipped ${url}: ${error.message}`);
    }
  }

  if (parsed.length === 0) {
    throw new Error(`Refusing to overwrite cache: no PURSUE CSV could be fetched or parsed. Last error: ${lastError ? lastError.message : 'all candidates were empty'}`);
  }

  const CSV_URL = usedUrls.length === 1 ? usedUrls[0] : usedUrls;
  const headers = [...new Set(parsed.flatMap(row => Object.keys(row)))];
  console.log('Observed CSV headers:', headers);

  const records = parsed.map((row, index) => normalizePursueRow(row, index));
  const validRecords = records.filter(record => record.title || record.file_url || record.description);

  if (!validRecords.length) {
    throw new Error('Refusing to overwrite cache: records normalized to empty content.');
  }

  const releases = groupByRelease(validRecords);
  const filesToWrite = [];

  for (const [release, releaseRecords] of Object.entries(releases)) {
    filesToWrite.push({
      path: `${RELEASE_DIR}/${safeFileName(release)}.json`,
      data: {
        release,
        _fetchedAt: fetchedAt,
        source: SOURCE_PAGE,
        csvSource: CSV_URL,
        records: releaseRecords
      }
    });
  }

  filesToWrite.push({
    path: `${OUT_DIR}/disclosure.json`,
    data: {
      _fetchedAt: fetchedAt,
      source: SOURCE_PAGE,
      csvSource: CSV_URL,
      releases: Object.keys(releases).sort(),
      records: validRecords
    }
  });

  filesToWrite.push({
    path: `${OUT_DIR}/schema-observation.json`,
    data: {
      observedAt: fetchedAt,
      csvSource: CSV_URL,
      recordCount: parsed.length,
      headers
    }
  });

  // Only write after all fetch/parse/normalization succeeds.
  await Promise.all(filesToWrite.map(file => fs.writeFile(file.path, JSON.stringify(file.data, null, 2))));
  console.log(`Cached ${validRecords.length} PURSUE records from ${CSV_URL}`);
}

// Minimal dependency-free RFC 4180-style CSV parser. Handles quoted fields,
// embedded commas/newlines, "" escaping, BOM, and CRLF. The first non-empty
// row is treated as the header; each record is returned as a trimmed object.
// Short or long rows are tolerated (extra cells ignored, missing cells empty).
function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text; // strip BOM

  const endField = () => { row.push(field); field = ''; };
  const endRow = () => { endField(); rows.push(row); row = []; };

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      endField();
    } else if (ch === '\n') {
      endRow();
    } else if (ch === '\r') {
      // swallow; \n (if present) ends the row
    } else {
      field += ch;
    }
  }
  // flush trailing field/row if the file did not end with a newline
  if (field !== '' || row.length) endRow();

  const nonEmpty = rows.filter(r => r.some(c => c.trim() !== ''));
  if (!nonEmpty.length) return [];

  const headers = nonEmpty[0].map(h => h.trim());
  return nonEmpty.slice(1).map(cells => {
    const record = {};
    headers.forEach((key, idx) => { record[key] = (cells[idx] ?? '').trim(); });
    return record;
  });
}

// A browser-like User-Agent; a custom token risks being bot-blocked by war.gov.
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 omoluabi-ufo-connection/0.3';

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

// Discover absolute .csv URLs referenced anywhere in the official page's HTML or
// inline JavaScript. Relative paths are resolved against war.gov. Returns [] if
// the page itself cannot be fetched (callers fall back to known URLs).
async function discoverCsvUrls(pageUrl) {
  let html;
  try {
    html = await fetchText(pageUrl);
  } catch (error) {
    console.log(`Could not load ${pageUrl} for CSV discovery: ${error.message}`);
    return [];
  }
  const found = new Set();
  const re = /(https?:\/\/[^\s"'<>()]+?\.csv|\/[^\s"'<>()]+?\.csv)/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    try {
      found.add(new URL(match[1], 'https://www.war.gov').href);
    } catch {
      // ignore malformed matches
    }
  }
  return [...found];
}

function normalizePursueRow(row, index) {
  const title = first(row['Asset File Name'], row['File Name'], row['Filename'], row['Title'], row['Record Title'], row['Description'], `PURSUE record ${index + 1}`);
  const release = first(row['Release'], row['Release Number'], row['Release Date'], inferRelease(row), 'Unspecified');
  const agency = first(row['Agency'], row['Source Agency'], row['Organization'], row['Component'], 'Unknown agency');
  const incidentDate = first(row['Incident Date'], row['Date'], row['Event Date'], row['Sighting Date'], 'Unknown');
  const incidentLocation = first(row['Incident Location'], row['Location'], row['Place'], row['Country'], 'Unknown');
  const documentType = first(row['Type'], row['File Type'], row['Document Type'], row['Media Type'], inferType(row), 'unknown');
  const description = first(row['Description'], row['Summary'], row['Caption'], row['Notes'], '');
  const fileUrl = safeUrl(first(row['Download'], row['Download URL'], row['File URL'], row['URL'], row['Document URL'], ''));
  const imageUrl = safeUrl(first(row['Image URL'], row['Thumbnail'], row['Thumbnail URL'], ''));
  const videoUrl = safeUrl(first(row['Video URL'], row['Media URL'], ''));

  return {
    id: first(row['ID'], row['Record ID'], row['PR Number'], row['VIRIN'], `record-${index + 1}`),
    title,
    release,
    agency,
    incident_date: incidentDate,
    incident_location: incidentLocation,
    document_type: documentType,
    description,
    file_url: fileUrl,
    image_url: imageUrl,
    video_url: videoUrl,
    source_url: SOURCE_PAGE,
    raw: row
  };
}

function inferRelease(row) {
  const text = JSON.stringify(row).toLowerCase();
  if (text.includes('release 03') || text.includes('june 12') || text.includes('06 12 26')) return '03';
  if (text.includes('release 02') || text.includes('may 22') || text.includes('05 22 26')) return '02';
  if (text.includes('release 01') || text.includes('may 8') || text.includes('05 08 26')) return '01';
  return '';
}

function inferType(row) {
  const text = JSON.stringify(row).toLowerCase();
  if (text.includes('.mp4') || text.includes('video')) return 'video';
  if (text.includes('.jpg') || text.includes('.jpeg') || text.includes('.png') || text.includes('photo') || text.includes('image')) return 'image';
  if (text.includes('.pdf') || text.includes('document')) return 'document';
  return '';
}

function groupByRelease(records) {
  return records.reduce((acc, record) => {
    const key = record.release || 'unspecified';
    acc[key] ||= [];
    acc[key].push(record);
    return acc;
  }, {});
}

function first(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== '') return String(value).trim();
  }
  return '';
}

function safeUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  if (/^javascript:/i.test(value)) return '';
  try {
    const parsed = value.startsWith('http') ? new URL(value) : new URL(value, 'https://www.war.gov');
    return parsed.href;
  } catch {
    return '';
  }
}

function safeFileName(value) {
  return String(value || 'unspecified').replace(/[^a-zA-Z0-9_-]/g, '-');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
