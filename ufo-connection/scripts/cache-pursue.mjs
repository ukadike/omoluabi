import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_PAGE = 'https://www.war.gov/ufo/';
const DEFAULT_CSV_URL = 'https://www.war.gov/Portals/1/Interactive/2026/UFO/uap-csv.csv';
const CSV_URL = process.env.PURSUE_CSV_URL || DEFAULT_CSV_URL;

// Resolve output paths relative to this script so the cache works regardless of
// the working directory the script is invoked from.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(SCRIPT_DIR, '..', 'data');
const RELEASE_DIR = path.join(OUT_DIR, 'releases');

async function main() {
  await fs.mkdir(RELEASE_DIR, { recursive: true });
  const fetchedAt = new Date().toISOString();
  const csv = await fetchText(CSV_URL);
  const parsed = parseCsv(csv);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('Refusing to overwrite cache: parsed zero records.');
  }

  const headers = Object.keys(parsed[0] || {});
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

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'omoluabi-ufo-connection/0.2' } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
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
