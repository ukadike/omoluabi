const SOURCE_PAGE = 'https://www.war.gov/ufo/';

export function recordsFromCsv(text) {
  return parseCsv(text)
    .map((row, index) => normalizePursueRow(row, index))
    .filter(record => record.title || record.file_url || record.description);
}

export function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  const source = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const endField = () => { row.push(field); field = ''; };
  const endRow = () => { endField(); rows.push(row); row = []; };

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (inQuotes) {
      if (character === '"') {
        if (source[index + 1] === '"') { field += '"'; index += 1; }
        else inQuotes = false;
      } else field += character;
    } else if (character === '"') inQuotes = true;
    else if (character === ',') endField();
    else if (character === '\n') endRow();
    else if (character !== '\r') field += character;
  }
  if (field !== '' || row.length) endRow();

  const nonEmpty = rows.filter(cells => cells.some(cell => cell.trim() !== ''));
  if (!nonEmpty.length) return [];
  const headers = nonEmpty[0].map(header => header.trim());
  return nonEmpty.slice(1).map(cells => {
    const record = {};
    headers.forEach((header, index) => { record[header] = (cells[index] || '').trim(); });
    return record;
  });
}

function normalizePursueRow(row, index) {
  const title = first(row['Asset File Name'], row['File Name'], row.Filename, row.Title, row['Record Title'], row.Description, `PURSUE record ${index + 1}`);
  return {
    id: first(row.ID, row['Record ID'], row['PR Number'], row.VIRIN, `record-${index + 1}`),
    title,
    release: first(row.Release, row['Release Number'], row['Release Date'], 'Unspecified'),
    agency: first(row.Agency, row['Source Agency'], row.Organization, row.Component, 'Unknown agency'),
    incident_date: first(row['Incident Date'], row.Date, row['Event Date'], row['Sighting Date'], 'Unknown'),
    incident_location: first(row['Incident Location'], row.Location, row.Place, row.Country, 'Unknown'),
    document_type: first(row.Type, row['File Type'], row['Document Type'], row['Media Type'], inferType(row), 'unknown'),
    description: first(row.Description, row.Summary, row.Caption, row.Notes, ''),
    file_url: safeUrl(first(row.Download, row['Download URL'], row['File URL'], row.URL, row['Document URL'], '')),
    image_url: safeUrl(first(row['Image URL'], row.Thumbnail, row['Thumbnail URL'], '')),
    video_url: safeUrl(first(row['Video URL'], row['Media URL'], '')),
    source_url: SOURCE_PAGE
  };
}

function inferType(row) {
  const text = JSON.stringify(row).toLowerCase();
  if (text.includes('.mp4') || text.includes('.mov') || text.includes('video')) return 'video';
  if (text.includes('.wav') || text.includes('.mp3') || text.includes('audio')) return 'audio';
  if (text.includes('.jpg') || text.includes('.jpeg') || text.includes('.png') || text.includes('photo') || text.includes('image')) return 'image';
  if (text.includes('.pdf') || text.includes('document')) return 'document';
  return '';
}

function safeUrl(value) {
  if (!value || /^(javascript|data:text\/html):/i.test(value)) return '';
  try {
    const url = new URL(value, 'https://www.war.gov');
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function first(...values) {
  for (const value of values) if (value !== undefined && value !== null && String(value).trim() !== '') return String(value).trim();
  return '';
}
