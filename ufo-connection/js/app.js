import { normalizeRecord, getSearchableText } from './data-normalizer.js';
import { loadBeautifulDisclosure, extractYouTubeEmbedUrl } from './youtube-layer.js';
import { recordsFromCsv } from './csv-loader.js';
import { renderOverview } from './overview.js';

const statusEl = document.querySelector('#data-status');
const releaseFilter = document.querySelector('#release-filter');
const typeFilter = document.querySelector('#type-filter');
const searchInput = document.querySelector('#search-input');
const countMessage = document.querySelector('#record-count-message');
const recordsEl = document.querySelector('#records');
const overviewEl = document.querySelector('#overview');
const discourseEl = document.querySelector('#public-discourse');
const csvInput = document.querySelector('#csv-file');
const dropzone = document.querySelector('#dropzone');
const loadStatus = document.querySelector('#load-status');
const downloadButton = document.querySelector('#download-json');
const resetButton = document.querySelector('#reset-data');
const sampleBanner = document.querySelector('#sample-banner');
const loadSampleButton = document.querySelector('#load-sample');

let allRecords = [];
let cachedDisclosure = null;
let loadedDisclosure = null;

init().catch(showFatalError);

async function init() {
  cachedDisclosure = await loadDisclosure();
  const cachedRecords = Array.isArray(cachedDisclosure.records) ? cachedDisclosure.records : [];
  if (cachedRecords.length) {
    showOfficialCache();
  } else {
    // Nothing cached (war.gov is unreachable from automation), so populate the
    // page with clearly-labelled sample data — a visitor sees it working at once.
    await loadSample('No official records are cached yet, so this is sample data.');
  }
  await renderBeautifulDisclosure();

  releaseFilter.addEventListener('change', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);
  if (csvInput) csvInput.addEventListener('change', event => readCsvFile(event.target.files && event.target.files[0]));
  if (downloadButton) downloadButton.addEventListener('click', downloadDisclosure);
  if (resetButton) resetButton.addEventListener('click', showOfficialCache);
  if (loadSampleButton) loadSampleButton.addEventListener('click', () => loadSample());
  setupDropzone();
}

// --- dataset modes: official cache / sample / user CSV ----------------

function setDataset(records, { statusText, sample = false, allowDownload = false } = {}) {
  allRecords = records.map(normalizeRecord);
  resetFilter(releaseFilter);
  resetFilter(typeFilter);
  populateFilters(allRecords);
  searchInput.value = '';
  renderView(allRecords);
  statusEl.textContent = statusText;

  sampleBanner.hidden = !sample;
  if (sample) {
    sampleBanner.textContent = 'Demonstration view — sample data, not official PURSUE records. Load the official CSV, or clear to return to the official (currently empty) cache.';
  }
  loadedDisclosure = allowDownload
    ? { _fetchedAt: new Date().toISOString(), source: 'https://www.war.gov/ufo/', note: 'Loaded in-browser from a user-provided CSV file.', records }
    : null;
  downloadButton.hidden = !allowDownload;
  resetButton.hidden = !(sample || allowDownload);
}

function showOfficialCache() {
  const records = Array.isArray(cachedDisclosure.records) ? cachedDisclosure.records : [];
  const fetchedAt = cachedDisclosure._fetchedAt || 'not yet fetched';
  setDataset(records, { statusText: `${records.length} cached official records loaded. Last cache update: ${fetchedAt}.` });
  if (csvInput) csvInput.value = '';
  loadStatus.textContent = records.length ? '' : 'Showing the official cache (currently empty). Load sample data or an official CSV above.';
}

async function loadSample(prefix = '') {
  let data;
  try {
    const response = await fetch('./data/sample-records.json');
    if (!response.ok) throw new Error('sample missing');
    data = await response.json();
  } catch {
    loadStatus.textContent = 'Sample data could not be loaded.';
    return;
  }
  const records = Array.isArray(data.records) ? data.records : [];
  setDataset(records, {
    sample: true,
    statusText: `${prefix} Showing ${records.length} sample records (illustrative, not official).`.trim()
  });
  if (csvInput) csvInput.value = '';
  loadStatus.textContent = `Loaded ${records.length} sample records. Filters, search, and the overview now work on them.`;
}

function readCsvFile(file) {
  if (!file) return;
  loadStatus.textContent = `Reading "${file.name}"…`;
  const reader = new FileReader();
  reader.onerror = () => { loadStatus.textContent = 'That file could not be read.'; };
  reader.onload = () => {
    let records;
    try {
      records = recordsFromCsv(String(reader.result));
    } catch {
      loadStatus.textContent = 'That file could not be parsed as CSV. Make sure it is the PURSUE CSV.';
      return;
    }
    if (!records.length) {
      loadStatus.textContent = 'No records were found in that file. Make sure it is the PURSUE CSV.';
      return;
    }
    setDataset(records, {
      allowDownload: true,
      statusText: `${records.length} records loaded from "${file.name}" in this browser session. This data is shown here only and is not saved to the site.`
    });
    loadStatus.textContent = `Loaded ${records.length} records. Filters, search, and the overview now work on them.`;
  };
  reader.readAsText(file);
}

function setupDropzone() {
  if (!dropzone) return;
  ['dragenter', 'dragover'].forEach(evt => dropzone.addEventListener(evt, event => {
    event.preventDefault();
    dropzone.classList.add('dragging');
  }));
  ['dragleave', 'drop'].forEach(evt => dropzone.addEventListener(evt, event => {
    event.preventDefault();
    dropzone.classList.remove('dragging');
  }));
  dropzone.addEventListener('drop', event => {
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) readCsvFile(file);
  });
}

function renderView(records) {
  renderRecords(records);
  renderOverview(overviewEl, records);
}

function downloadDisclosure() {
  if (!loadedDisclosure) return;
  const blob = new Blob([JSON.stringify(loadedDisclosure, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'disclosure.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function resetFilter(select) {
  while (select.options.length > 1) select.remove(1);
  select.value = 'all';
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

  renderView(filtered);
}

function renderRecords(records) {
  recordsEl.replaceChildren();
  countMessage.textContent = `Showing ${records.length} of ${allRecords.length} records.`;

  if (!records.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No records to show. Use “Get records” above to load sample data or an official CSV.';
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
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'Open official video source';
    a.appendChild(createNewTabLabel());
    p.appendChild(a);
    wrap.appendChild(p);
  }
  return wrap;
}

function createNewTabLabel() {
  const span = document.createElement('span');
  span.className = 'sr-only';
  span.textContent = ' (opens in a new tab)';
  return span;
}

function createLinks(record) {
  const p = document.createElement('p');
  if (record.file_url) {
    const file = document.createElement('a');
    file.href = record.file_url;
    file.target = '_blank';
    file.rel = 'noopener noreferrer';
    file.textContent = 'Open source file';
    file.appendChild(createNewTabLabel());
    p.appendChild(file);
    p.appendChild(document.createTextNode(' · '));
  }
  const official = document.createElement('a');
  official.href = record.official_source;
  official.target = '_blank';
  official.rel = 'noopener noreferrer';
  official.textContent = 'Official PURSUE page';
  official.appendChild(createNewTabLabel());
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
