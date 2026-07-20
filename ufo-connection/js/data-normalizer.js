const OFFICIAL_SOURCE = 'https://www.war.gov/ufo/';
const OFFICIAL_HOSTS = ['war.gov', 'www.war.gov', 'defense.gov', 'www.defense.gov', 'dvidshub.net', 'www.dvidshub.net'];

export function normalizeRecord(raw, index = 0) {
  if (raw?.identity && raw?.provenance && raw?.epistemic_status) return normalizeGovernedRecord(raw, index);
  return normalizeImportedRecord(raw || {}, index);
}

export function getSearchableText(record) {
  return [
    record.title,
    record.agency,
    record.release,
    record.incident_date,
    record.incident_location,
    record.document_type,
    record.description,
    record.provenance?.source_name,
    record.provenance?.verification_status,
    ...(record.epistemic_status?.known || []),
    ...(record.epistemic_status?.missing || []),
    ...(record.media || []).map(item => `${item.title || ''} ${item.description || ''} ${item.type || ''}`)
  ].join(' ').toLowerCase();
}

function normalizeGovernedRecord(raw, index) {
  const title = first(raw.title, raw.identity?.title, `Governed record ${index + 1}`);
  const description = first(raw.description, raw.summary, raw.identity?.description, 'No description provided.');
  const record = {
    ...raw,
    identity: {
      id: first(raw.identity?.id, raw.id, `record-${index + 1}`),
      system: first(raw.identity?.system, 'omoluabi'),
      title,
      artifact_type: first(raw.identity?.artifact_type, 'observation'),
      version: first(raw.identity?.version, '1.0.0'),
      status: first(raw.identity?.status, 'prototype'),
      maintainer: first(raw.identity?.maintainer, 'Small Systems Lab'),
      ...raw.identity
    },
    id: first(raw.id, raw.identity?.id, `record-${index + 1}`),
    title,
    agency: first(raw.agency, raw.provenance?.publisher, raw.provenance?.source_name, 'Unknown agency'),
    release: first(raw.release, raw.release_number, 'Unspecified'),
    incident_date: first(raw.incident_date, raw.date, 'Unknown'),
    incident_location: first(raw.incident_location, raw.location, 'Unknown'),
    document_type: first(raw.document_type, raw.type, raw.identity?.artifact_type, 'unknown'),
    description,
    official_source: safeUrl(first(raw.official_source, raw.provenance?.source_url, OFFICIAL_SOURCE)),
    media: normalizeMediaArray(raw.media, title),
    publication_status: first(raw.publication_status, 'internal_review')
  };
  record.omoluabi = buildReading(record);
  return record;
}

function normalizeImportedRecord(raw, index) {
  const title = first(raw.title, raw.asset_file_name, raw.file_name, raw.filename, raw.name, `PURSUE record ${index + 1}`);
  const agency = first(raw.agency, raw.source_agency, raw.organization, 'Unknown agency');
  const release = first(raw.release, raw.release_number, raw.release_date, 'Unspecified');
  const incidentDate = first(raw.incident_date, raw.date, raw.event_date, 'Unknown');
  const incidentLocation = first(raw.incident_location, raw.location, raw.place, 'Unknown');
  const documentType = first(raw.type, raw.file_type, raw.document_type, inferType(raw));
  const description = first(raw.description, raw.summary, raw.caption, raw.notes, 'No description provided in the imported record.');
  const fileUrl = safeOfficialUrl(first(raw.download_url, raw.file_url, raw.url, raw.document_url, ''));
  const imageUrl = safeOfficialUrl(first(raw.image_url, raw.thumbnail, raw.thumbnail_url, ''));
  const videoUrl = safeOfficialUrl(first(raw.video_url, raw.media_url, documentType === 'video' ? fileUrl : ''));
  const recordId = first(raw.id, raw.record_id, raw.pr_number, raw.virin, `record-${index + 1}`);
  const media = normalizeImportedMedia({ title, description, fileUrl, imageUrl, videoUrl, documentType, agency });

  const record = {
    id: recordId,
    title,
    agency,
    release,
    incident_date: incidentDate,
    incident_location: incidentLocation,
    document_type: documentType,
    description,
    file_url: fileUrl,
    official_source: OFFICIAL_SOURCE,
    identity: {
      id: recordId,
      system: 'omoluabi',
      title,
      artifact_type: 'uap_disclosure_record',
      version: '1.0.0',
      status: 'prototype',
      maintainer: 'Small Systems Lab',
      created_at: '',
      updated_at: new Date().toISOString(),
      license: 'Official source terms apply'
    },
    provenance: {
      source_name: agency !== 'Unknown agency' ? agency : 'PURSUE / WAR.GOV',
      source_type: 'official_disclosure',
      source_url: OFFICIAL_SOURCE,
      source_identifier: recordId,
      creator: agency,
      publisher: 'United States Department of Defense',
      date_created: incidentDate !== 'Unknown' ? incidentDate : '',
      date_published: '',
      date_retrieved: '',
      retrieval_method: 'PURSUE cache or user-selected official CSV',
      original_format: documentType,
      current_format: documentType,
      transformations: ['Field-name normalization for display'],
      checksum: '',
      verification_status: 'partially_verified',
      verification_notes: 'The record was imported from the project cache or a user-selected CSV. A human reviewer should verify the individual source file and metadata before publication.'
    },
    epistemic_status: buildEpistemic({ agency, incidentDate, incidentLocation, documentType, description, fileUrl, media }),
    accessibility: {
      keyboard_operable: true,
      screen_reader_tested: 'pending',
      captions_available: media.some(item => item.type === 'video') ? 'unknown' : 'not_applicable',
      transcript_available: media.some(item => ['video', 'audio'].includes(item.type)) ? 'unknown' : 'not_applicable',
      audio_description_available: 'unknown',
      image_descriptions_available: media.some(item => item.type === 'image') ? 'pending_human_description' : 'not_applicable',
      color_independent: true,
      reduced_motion_supported: true,
      high_contrast_supported: true,
      text_resize_tested: 'pending',
      plain_language_summary: description,
      known_barriers: accessibilityBarriers(media),
      testing_date: '',
      testing_method: 'Not yet tested for this imported record'
    },
    human_governance: {
      automated_actions: ['CSV or JSON normalization', 'Rule evaluation'],
      human_review_required: true,
      reviewer_role: 'Omoluabi editor',
      review_status: 'pending',
      reviewed_by: '',
      reviewed_at: '',
      override_available: true,
      appeal_route: 'Repository issue or project editorial process'
    },
    risk: {
      affected_people: ['People or institutions named or implied by the record', 'Public readers'],
      possible_harms: ['Loss of context', 'Overclaiming', 'Mistaking missing metadata for certainty'],
      severity: 'moderate',
      likelihood: 'moderate',
      mitigation: ['Preserve source links', 'Show missing fields', 'Require human review', 'Keep interpretations separate']
    },
    returnability: {
      corrections_supported: true,
      deletion_supported: true,
      consent_withdrawal_supported: 'unknown',
      version_recovery_supported: true,
      human_appeal_supported: true,
      reversible_actions: ['Normalized metadata can be corrected through version control'],
      irreversible_actions: [],
      unrecoverable_losses: ['Source material may become unavailable at the originating website']
    },
    maintenance: {
      maintainer: 'Small Systems Lab',
      last_reviewed: '',
      next_review: '',
      issue_reporting: 'Repository issue'
    },
    publication_status: 'internal_review',
    media
  };
  record.omoluabi = buildReading(record);
  return record;
}

function normalizeMediaArray(value, recordTitle) {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => normalizeMediaItem(item, `${slug(recordTitle)}-media-${index + 1}`));
}

function normalizeMediaItem(item, fallbackId) {
  const type = first(item?.type, inferType(item || {}));
  const normalized = {
    ...item,
    id: first(item?.id, fallbackId),
    type,
    title: first(item?.title, `${type || 'Media'} item`),
    description: first(item?.description, ''),
    source_status: first(item?.source_status, 'unknown'),
    src: safeUrl(first(item?.src, item?.url, '')),
    thumbnail: safeUrl(first(item?.thumbnail, '')),
    poster: safeUrl(first(item?.poster, '')),
    source_url: safeUrl(first(item?.source_url, item?.provenance?.source_url, '')),
    transcript: safeUrl(first(item?.transcript, '')),
    captions: Array.isArray(item?.captions) ? item.captions.map(track => ({ ...track, src: safeUrl(track.src) })) : [],
    playback: {
      autoplay: false,
      controls: true,
      looping: false,
      muted: false,
      ...(item?.playback || {}),
      autoplay: false,
      controls: true
    },
    provenance: {
      source_name: first(item?.provenance?.source_name, item?.credit, 'Unknown source'),
      verification_status: first(item?.provenance?.verification_status, item?.source_status === 'synthetic' ? 'synthetic' : 'unknown'),
      transformations: Array.isArray(item?.provenance?.transformations) ? item.provenance.transformations : [],
      ...(item?.provenance || {})
    },
    accessibility: {
      keyboard_operable: true,
      known_barriers: [],
      ...(item?.accessibility || {})
    },
    evidentiary_status: {
      classification: first(item?.evidentiary_status?.classification, item?.source_status || 'unknown'),
      known: Array.isArray(item?.evidentiary_status?.known) ? item.evidentiary_status.known : [],
      does_not_establish: Array.isArray(item?.evidentiary_status?.does_not_establish) ? item.evidentiary_status.does_not_establish : [],
      limitations: Array.isArray(item?.evidentiary_status?.limitations) ? item.evidentiary_status.limitations : [],
      ...(item?.evidentiary_status || {})
    }
  };
  if (Array.isArray(item?.items)) normalized.items = item.items.map((child, index) => normalizeMediaItem(child, `${normalized.id}-item-${index + 1}`));
  return normalized;
}

function normalizeImportedMedia({ title, description, fileUrl, imageUrl, videoUrl, documentType, agency }) {
  const items = [];
  if (imageUrl) {
    items.push(normalizeMediaItem({
      id: `${slug(title)}-image`,
      type: 'image',
      title: `${title} — official image`,
      description,
      source_status: 'source',
      src: imageUrl,
      alt: '',
      caption: 'Official image associated with this record. A human-written image description is pending.',
      credit: agency,
      source_url: imageUrl,
      format: inferFormat(imageUrl, 'image'),
      license: 'Official source terms apply',
      provenance: {
        source_name: agency,
        source_url: imageUrl,
        transformations: [],
        verification_status: 'partially_verified'
      },
      accessibility: {
        keyboard_operable: true,
        extended_description_available: false,
        screen_reader_supported: true,
        reduced_motion_supported: true,
        known_barriers: ['Human-authored alt text has not yet been verified.']
      },
      playback: { autoplay: false, controls: true, looping: false },
      evidentiary_status: {
        classification: 'official source media',
        known: ['The image URL is associated with the imported official record.'],
        does_not_establish: ['Origin, distance, size, intent, or explanation of the depicted object without additional evidence.'],
        limitations: ['Image context and accessibility description require human verification.']
      }
    }, `${slug(title)}-image`));
  }
  if (videoUrl) {
    items.push(normalizeMediaItem({
      id: `${slug(title)}-video`,
      type: 'video',
      title: `${title} — official video`,
      description,
      source_status: 'source',
      src: videoUrl,
      caption: 'Official video associated with this record. Caption and transcript status require verification.',
      credit: agency,
      source_url: videoUrl,
      format: inferFormat(videoUrl, 'video'),
      license: 'Official source terms apply',
      transcript: '',
      captions: [],
      provenance: {
        source_name: agency,
        source_url: videoUrl,
        transformations: [],
        verification_status: 'partially_verified'
      },
      accessibility: {
        keyboard_operable: true,
        captions_available: 'unknown',
        transcript_available: false,
        audio_description_available: 'unknown',
        screen_reader_supported: true,
        reduced_motion_supported: true,
        known_barriers: ['Captions, transcript, and audio-description status have not been verified.']
      },
      playback: { autoplay: false, controls: true, looping: false },
      evidentiary_status: {
        classification: 'official source media',
        known: ['The video URL is associated with the imported official record.'],
        does_not_establish: ['Origin, distance, size, intent, or explanation without additional evidence.'],
        limitations: ['Transcript, captions, and contextual metadata require human review.']
      }
    }, `${slug(title)}-video`));
  }
  if (!items.length && fileUrl && ['image', 'video', 'audio'].includes(documentType)) {
    items.push(normalizeMediaItem({
      id: `${slug(title)}-${documentType}`,
      type: documentType,
      title: `${title} — source media`,
      description,
      source_status: 'source',
      src: fileUrl,
      alt: documentType === 'image' ? '' : undefined,
      transcript: ['video', 'audio'].includes(documentType) ? '' : undefined,
      format: inferFormat(fileUrl, documentType),
      license: 'Official source terms apply',
      provenance: { source_name: agency, source_url: fileUrl, transformations: [], verification_status: 'partially_verified' },
      accessibility: { keyboard_operable: true, known_barriers: ['Accessibility metadata requires human verification.'] },
      playback: { autoplay: false, controls: true, looping: false },
      evidentiary_status: { classification: 'official source media', known: ['Associated with the imported record.'], does_not_establish: ['A definitive explanation.'], limitations: ['Human verification is pending.'] }
    }, `${slug(title)}-${documentType}`));
  }
  return items;
}

function buildEpistemic({ agency, incidentDate, incidentLocation, documentType, description, fileUrl, media }) {
  const known = [
    agency !== 'Unknown agency' ? `Agency: ${agency}` : '',
    incidentDate !== 'Unknown' ? `Incident date: ${incidentDate}` : '',
    incidentLocation !== 'Unknown' ? `Incident location: ${incidentLocation}` : '',
    documentType !== 'unknown' ? `Record type: ${documentType}` : '',
    fileUrl ? 'A source-file link is present.' : '',
    media.length ? `${media.length} media item(s) detected.` : ''
  ].filter(Boolean);
  const missing = [];
  if (incidentDate === 'Unknown') missing.push('Incident date is not available in normalized data.');
  if (incidentLocation === 'Unknown') missing.push('Incident location is not available in normalized data.');
  if (!fileUrl) missing.push('Direct source-file URL is missing.');
  if (!description || description.startsWith('No description')) missing.push('Plain description is missing.');
  return {
    classification: 'evidence',
    confidence: 'indeterminate',
    known,
    missing,
    unresolved: ['The record alone does not establish the origin or explanation of the reported phenomenon.'],
    supporting_evidence: media.map(item => item.title),
    contradicting_evidence: [],
    alternative_interpretations: [],
    what_would_change_assessment: ['Verified source context', 'Complete metadata', 'Corroborating records', 'Human editorial review']
  };
}

function buildReading(record) {
  return {
    known: record.epistemic_status?.known || [],
    missing: [...(record.epistemic_status?.missing || []), ...(record.epistemic_status?.unresolved || [])],
    evidence_present: (record.media || []).map(item => `${item.type}: ${item.title}`),
    accessibility_needs: record.accessibility?.known_barriers || [],
    distortion_risk: 'This record can be misread if separated from provenance, missing context, source status, or evidentiary limits.',
    historical_note: 'Read this record as governed evidence under uncertainty, not as a belief or truth score.'
  };
}

function accessibilityBarriers(media) {
  const barriers = [];
  media.forEach(item => {
    if (item.type === 'image' && !item.alt) barriers.push(`Image description pending for “${item.title}”.`);
    if (['video', 'audio'].includes(item.type) && !item.transcript && !item.transcript_text) barriers.push(`Transcript pending for “${item.title}”.`);
    if (item.type === 'video' && !(item.captions || []).length) barriers.push(`Caption verification pending for “${item.title}”.`);
  });
  if (!barriers.length) barriers.push('Formal assistive-technology testing remains pending.');
  return barriers;
}

function safeOfficialUrl(value) {
  const url = safeUrl(value);
  if (!url) return '';
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.origin === window.location.origin) return parsed.href;
    const hostname = parsed.hostname.toLowerCase();
    if (OFFICIAL_HOSTS.includes(hostname) || hostname.endsWith('.mil')) return parsed.href;
    return '';
  } catch {
    return '';
  }
}

function safeUrl(value) {
  if (!value) return '';
  const text = String(value).trim();
  if (/^(javascript|data:text\/html):/i.test(text)) return '';
  try {
    const base = typeof window !== 'undefined' ? window.location.href : OFFICIAL_SOURCE;
    const parsed = new URL(text, base);
    if (!['http:', 'https:', 'blob:'].includes(parsed.protocol)) return '';
    return parsed.href;
  } catch {
    return '';
  }
}

function first(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== '') return String(value).trim();
  }
  return '';
}

function inferType(raw) {
  const text = JSON.stringify(raw).toLowerCase();
  if (text.includes('.mp4') || text.includes('.mov') || text.includes('video')) return 'video';
  if (text.includes('.wav') || text.includes('.mp3') || text.includes('audio')) return 'audio';
  if (text.includes('.jpg') || text.includes('.jpeg') || text.includes('.png') || text.includes('.svg') || text.includes('image') || text.includes('photo')) return 'image';
  if (text.includes('.pdf') || text.includes('document')) return 'document';
  return 'unknown';
}

function inferFormat(url, type) {
  const lower = String(url || '').toLowerCase();
  if (lower.includes('.mp4')) return 'video/mp4';
  if (lower.includes('.webm')) return 'video/webm';
  if (lower.includes('.wav')) return 'audio/wav';
  if (lower.includes('.mp3')) return 'audio/mpeg';
  if (lower.includes('.svg')) return 'image/svg+xml';
  if (lower.includes('.png')) return 'image/png';
  if (lower.includes('.jpg') || lower.includes('.jpeg')) return 'image/jpeg';
  return `${type || 'application'}/unknown`;
}

function slug(value) {
  return String(value || 'record').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 64) || 'record';
}
