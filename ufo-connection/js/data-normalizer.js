const WAR_BASE = 'https://www.war.gov';

export function normalizeRecord(raw, index = 0) {
  const title = first(raw.title, raw.asset_file_name, raw.file_name, raw.filename, raw.name, `PURSUE record ${index + 1}`);
  const agency = first(raw.agency, raw.source_agency, raw.organization, 'Unknown agency');
  const release = first(raw.release, raw.release_number, raw.release_date, 'Unspecified');
  const incidentDate = first(raw.incident_date, raw.date, raw.event_date, 'Unknown');
  const incidentLocation = first(raw.incident_location, raw.location, raw.place, 'Unknown');
  const documentType = first(raw.type, raw.file_type, raw.document_type, inferType(raw));
  const description = first(raw.description, raw.summary, raw.caption, raw.notes, 'No description provided in cached record.');
  const fileUrl = safeOfficialUrl(first(raw.download_url, raw.file_url, raw.url, raw.document_url, ''));
  const imageUrl = safeOfficialUrl(first(raw.image_url, raw.thumbnail, raw.thumbnail_url, ''));
  const videoUrl = safeOfficialUrl(first(raw.video_url, raw.media_url, ''));

  return {
    id: first(raw.id, raw.record_id, raw.pr_number, raw.virin, `record-${index + 1}`),
    title,
    agency,
    release,
    incident_date: incidentDate,
    incident_location: incidentLocation,
    document_type: documentType,
    description,
    file_url: fileUrl,
    image_url: imageUrl,
    video_url: videoUrl,
    official_source: 'https://www.war.gov/ufo/',
    omoluabi: buildOmoluabiReading({ title, agency, incidentDate, incidentLocation, documentType, description, fileUrl, imageUrl, videoUrl })
  };
}

export function getSearchableText(record) {
  return [
    record.title,
    record.agency,
    record.release,
    record.incident_date,
    record.incident_location,
    record.document_type,
    record.description
  ].join(' ').toLowerCase();
}

function buildOmoluabiReading(record) {
  const known = [
    record.agency !== 'Unknown agency' ? `Agency: ${record.agency}` : '',
    record.incidentDate !== 'Unknown' ? `Incident date: ${record.incidentDate}` : '',
    record.incidentLocation !== 'Unknown' ? `Incident location: ${record.incidentLocation}` : '',
    record.documentType !== 'unknown' ? `Record type: ${record.documentType}` : ''
  ].filter(Boolean);

  const missing = [];
  if (record.incidentDate === 'Unknown') missing.push('Incident date is not available in normalized data.');
  if (record.incidentLocation === 'Unknown') missing.push('Incident location is not available in normalized data.');
  if (!record.fileUrl) missing.push('Direct download/source file URL is missing.');
  if (!record.description || record.description.startsWith('No description')) missing.push('Plain description is missing.');
  if (record.videoUrl) missing.push('Transcript/captions should be verified for video access.');
  if (record.imageUrl) missing.push('Alt text should be verified for image access.');

  return {
    known,
    missing,
    evidence_present: [record.fileUrl && 'source file', record.imageUrl && 'image', record.videoUrl && 'video'].filter(Boolean),
    accessibility_needs: ['plain-language summary', 'source citation', 'alt text for images', 'transcript for video/audio when present'],
    distortion_risk: 'This record can be misread if separated from provenance, missing context, or official source links.',
    historical_note: 'This record is part of a public disclosure process and should be read as evidence under uncertainty.'
  };
}

function first(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== '') return String(value).trim();
  }
  return '';
}

function inferType(raw) {
  const text = JSON.stringify(raw).toLowerCase();
  if (text.includes('.mp4') || text.includes('video')) return 'video';
  if (text.includes('.jpg') || text.includes('.png') || text.includes('image') || text.includes('photo')) return 'image';
  if (text.includes('.pdf') || text.includes('document')) return 'document';
  return 'unknown';
}

function safeOfficialUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  if (/^javascript:/i.test(value)) return '';
  try {
    const parsed = value.startsWith('http') ? new URL(value) : new URL(value, WAR_BASE);
    return parsed.href;
  } catch {
    return '';
  }
}
