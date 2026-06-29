import { normalizeRecord, getSearchableText } from './data-normalizer.js';
import { loadBeautifulDisclosure, extractYouTubeEmbedUrl } from './youtube-layer.js';

const statusEl = document.querySelector('#data-status');
const releaseFilter = document.querySelector('#release-filter');
const typeFilter = document.querySelector('#type-filter');
const searchInput = document.querySelector('#search-input');
const countMessage = document.querySelector('#record-count-message');
const recordsEl = document.querySelector('#records');
const discourseEl = document.querySelector('#public-discourse');

let allRecords = [];

init().catch(showFatalError);

async function init() {
  const disclosure = await loadDisclosure();
  allRecords = (Array.isArray(disclosure.records) ? disclosure.records : []).map(normalizeRecord);

  populateFilters(allRecords);
  renderRecords(allRecords);
  renderStatus(disclosure, allRecords);
  await renderBeautifulDisclosure();

  releaseFilter.addEventListener('change', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);
}

async function loadDisclosure() {
  const response = await fetch('./data/disclosure.json');
  if (!response.ok) throw new Error('Local disclosure cache could not be loaded.');
  return response.json();
}

function populateFilters(records) {
  unique(records.map(r => r.release)).forEach(value => appendOption(releaseFilter, value));
  unique(records.map(r => r.document_type)).forEach(value => appendOption(typeFilter, value));
}

function applyFilters() {
  const q = searchInput.value.toLowerCase().trim();
  const release = releaseFilter.value;
  const type = typeFilter.value;

  const filtered = allRecords.filter(record => {
    if (release !== 'all' && record.release !== release) return false;
    if (type !== 'all' && record.document_type !== type) return false;
    if (q && !getSearchableText(record).includes(q)) return false;
    return true;
  });

  renderRecords(filtered);
}

function renderStatus(disclosure, records) {
  const fetchedAt = disclosure._fetchedAt || 'not yet fetched';
  statusEl.textContent = `${records.length} cached official records loaded. Last cache update: ${fetchedAt}.`;
}

function renderRecords(records) {
  recordsEl.replaceChildren();
  countMessage.textContent = `Showing ${records.length} of ${allRecords.length} records.`;

  if (!records.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No records match the current filters. If this is a fresh repository, run the GitHub Action or `npm run cache:pursue` to populate data.';
    recordsEl.appendChild(empty);
    return;
  }

  records.forEach((record, index) => recordsEl.appendChild(createRecordCard(record, index)));
}

function createRecordCard(record, index) {
  const article = document.createElement('article');
  article.className = 'record-card';

  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = `${record.agency} · Release ${record.release}`;

  const title = document.createElement('h3');
  title.textContent = record.title;

  const grid = document.createElement('div');
  grid.className = 'record-grid';

  const official = document.createElement('section');
  official.setAttribute('aria-labelledby', `official-${index}`);
  const officialHeading = document.createElement('h4');
  officialHeading.id = `official-${index}`;
  officialHeading.textContent = 'Official record';
  official.appendChild(officialHeading);
  official.appendChild(createFieldList([
    ['Incident date', record.incident_date],
    ['Location', record.incident_location],
    ['Type', record.document_type],
    ['Description', record.description]
  ]));
  official.appendChild(createLinks(record));

  const reading = document.createElement('section');
  reading.setAttribute('aria-labelledby', `reading-${index}`);
  const readingHeading = document.createElement('h4');
  readingHeading.id = `reading-${index}`;
  readingHeading.textContent = 'Omoluabi Reading';
  reading.appendChild(readingHeading);
  reading.appendChild(createList('Known', record.omoluabi.known));
  reading.appendChild(createList('Missing / unresolved', record.omoluabi.missing));
  reading.appendChild(createList('Evidence present', record.omoluabi.evidence_present.length ? record.omoluabi.evidence_present : ['No media/source file detected in normalized data.']));

  grid.append(official, reading);
  article.append(meta, title, createMediaPreview(record), grid);
  return article;
}

function createMediaPreview(record) {
  const wrap = document.createElement('div');
  wrap.className = 'media-preview';
  if (record.image_url) {
    const img = document.createElement('img');
    img.src = record.image_url;
    img.alt = `Official record image preview for ${record.title}`;
    wrap.appendChild(img);
  }
  if (record.video_url) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = record.video_url;
    a.rel = 'noopener noreferrer';
    a.textContent = 'Open official video source';
    p.appendChild(a);
    wrap.appendChild(p);
  }
  return wrap;
}

function createLinks(record) {
  const p = document.createElement('p');
  if (record.file_url) {
    const file = document.createElement('a');
    file.href = record.file_url;
    file.rel = 'noopener noreferrer';
    file.textContent = 'Open source file';
    p.appendChild(file);
    p.appendChild(document.createTextNode(' · '));
  }
  const official = document.createElement('a');
  official.href = record.official_source;
  official.rel = 'noopener noreferrer';
  official.textContent = 'Official PURSUE page';
  p.appendChild(official);
  return p;
}

function createFieldList(fields) {
  const dl = document.createElement('dl');
  dl.className = 'field-list';
  fields.forEach(([label, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value || 'Not available';
    dl.append(dt, dd);
  });
  return dl;
}

function createList(title, items) {
  const section = document.createElement('div');
  const h = document.createElement('h5');
  h.textContent = title;
  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  section.append(h, ul);
  return section;
}

async function renderBeautifulDisclosure() {
  const items = await loadBeautifulDisclosure();
  discourseEl.replaceChildren();
  if (!items.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No curated public-discourse videos yet. Add verified YouTube items to ufo-connection/data/beautiful-disclosure.json.';
    discourseEl.appendChild(empty);
    return;
  }
  items.forEach(item => {
    const embed = extractYouTubeEmbedUrl(item.youtube || item.url || item.videoId);
    if (!embed) return;
    const article = document.createElement('article');
    article.className = 'record-card';
    const h = document.createElement('h3');
    h.textContent = item.title || 'Untitled public discussion';
    const p = document.createElement('p');
    p.textContent = item.summary || 'Public discourse item. Not official evidence.';
    const iframe = document.createElement('iframe');
    iframe.src = embed;
    iframe.title = item.title || 'YouTube video';
    iframe.loading = 'lazy';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    article.append(h, p, iframe);
    discourseEl.appendChild(article);
  });
}

function appendOption(select, value) {
  if (!value) return;
  const option = document.createElement('option');
  option.value = value;
  option.textContent = value;
  select.appendChild(option);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function showFatalError(error) {
  statusEl.textContent = error.message;
  const p = document.createElement('p');
  p.textContent = 'Open docs/offline.html for recovery instructions or check the GitHub Action logs.';
  recordsEl.replaceChildren(p);
}
