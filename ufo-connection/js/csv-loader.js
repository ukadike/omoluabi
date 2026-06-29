// Browser-side loader for a user-provided PURSUE CSV file.
//
// This makes NO network request to war.gov. The user downloads the official CSV
// in their own browser and selects it here; the file is read locally and mapped
// to the same record shape as data/disclosure.json. This honours the project's
// "no client-side fetch from WAR.GOV" rule while giving a no-CLI way to load
// real records. It mirrors scripts/cache-pursue.mjs so both paths agree.

const SOURCE_PAGE = 'https://www.war.gov/ufo/';

export function recordsFromCsv(text) {
  return parseCsv(text)
    .map((row, index) => normalizePursueRow(row, index))
    .filter(record => record.title || record.file_url || record.description);
}

// Minimal RFC 4180-style CSV parser: quoted fields, embedded commas/newlines,
// "" escaping, BOM, CRLF, blank-line skip, short/long row tolerance.
export function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

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
      // swallow
    } else {
      field += ch;
    }
  }
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
    source_url: SOURCE_PAGE
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
