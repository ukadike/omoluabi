import { normalizeRecord, getSearchableText } from './data-normalizer.js';
import { loadBeautifulDisclosure, extractYouTubeEmbedUrl } from './youtube-layer.js';
import { recordsFromCsv } from './csv-loader.js';
import { renderOverview } from './overview.js';
import { loadRuleSet, evaluateArtifact } from './ssl-rules-engine.js';
import './ssl-media-field.js';

const elements = {
  dataStatus: document.querySelector('#data-status'),
  dataMode: document.querySelector('#data-mode'),
  rulesStatus: document.querySelector('#rules-status'),
  rulesSummary: document.querySelector('#rules-summary'),
  releaseFilter: document.querySelector('#release-filter'),
  typeFilter: document.querySelector('#type-filter'),
  searchInput: document.querySelector('#search-input'),
  countMessage: document.querySelector('#record-count-message'),
  records: document.querySelector('#records'),
  overview: document.querySelector('#overview'),
  discourse: document.querySelector('#public-discourse'),
  csvInput: document.querySelector('#csv-file'),
  dropzone: document.querySelector('#dropzone'),
  loadStatus: document.querySelector('#load-status'),
  resetButton: document.querySelector('#reset-data'),
  loadSampleButton: document.querySelector('#load-sample'),
  banner: document.querySelector('#dataset-banner')
};

let allRecords = [];
let cachedDisclosure = null;
let ruleSet = null;
let datasetMode = 'loading';

init().catch(showFatalError);

async function init() {
  ruleSet = await loadRuleSet('../rules/ssl-rules.v1.json');
  renderRuleSetStatus();
  cachedDisclosure = await loadDisclosure();
  const cachedRecords = Array.isArray(cachedDisclosure.records) ? cachedDisclosure.records : [];

  if (cachedRecords.length) showOfficialCache();
  else await loadSample('No official records are cached, so the governed demonstration is shown.');

  await renderBeautifulDisclosure();
  elements.releaseFilter.addEventListener('change', applyFilters);
  elements.typeFilter.addEventListener('change', applyFilters);
  elements.searchInput.addEventListener('input', applyFilters);
  elements.csvInput?.addEventListener('change', event => readCsvFile(event.target.files?.[0]));
  elements.resetButton?.addEventListener('click', showOfficialCache);
  elements.loadSampleButton?.addEventListener('click', () => loadSample());
  setupDropzone();
}

function setDataset(records, options = {}) {
  datasetMode = options.mode || 'unknown';
  allRecords = records.map((record, index) => {
    const normalized = normalizeRecord(record, index);
    normalized.rule_evaluation = evaluateArtifact(normalized, ruleSet);
    return normalized;
  });

  resetFilter(elements.releaseFilter);
  resetFilter(elements.typeFilter);
  populateFilters(allRecords);
  elements.searchInput.value = '';
  elements.dataStatus.textContent = options.statusText || `${allRecords.length} records loaded.`;
  elements.dataMode.textContent = datasetModeLabel(datasetMode);
  elements.dataMode.className = `status-badge mode-${datasetMode}`;
  renderDatasetBanner(options.bannerText || '');
  elements.resetButton.hidden = datasetMode === 'official';
  renderView(allRecords);
}

function showOfficialCache() {
  const records = Array.isArray(cachedDisclosure?.records) ? cachedDisclosure.records : [];
  const fetchedAt = cachedDisclosure?._fetchedAt || 'not yet fetched';
  setDataset(records, {
    mode: 'official',
    statusText: `${records.length} cached official record${records.length === 1 ? '' : 's'} loaded. Last cache update: ${fetchedAt}.`,
    bannerText: records.length
      ? 'OFFICIAL CACHE · Records are normalized for review. Rule results do not replace human verification.'
      : 'OFFICIAL CACHE EMPTY · Load the governed demonstration or select an official PURSUE CSV.'
  });
  if (elements.csvInput) elements.csvInput.value = '';
  elements.loadStatus.textContent = records.length ? '' : 'The official cache is currently empty.';
}

async function loadSample(prefix = '') {
  try {
    const response = await fetch('./data/sample-records.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Sample data is missing.');
    const data = await response.json();
    const records = Array.isArray(data.records) ? data.records : [];
    setDataset(records, {
      mode: 'synthetic',
      statusText: `${prefix} Showing ${records.length} governed synthetic record${records.length === 1 ? '' : 's'}.`.trim(),
      bannerText: 'SYNTHETIC DEMONSTRATION · These records and media were created to show the SSL Media Field and rules engine. They are not official evidence.'
    });
    if (elements.csvInput) elements.csvInput.value = '';
    elements.loadStatus.textContent = `Loaded ${records.length} demonstration records with image, video, audio, and slideshow media.`;
  } catch (error) {
    elements.loadStatus.textContent = `Demonstration data could not be loaded: ${error.message}`;
  }
}

function readCsvFile(file) {
  if (!file) return;
  elements.loadStatus.textContent = `Reading “${file.name}”…`;
  const reader = new FileReader();
  reader.onerror = () => { elements.loadStatus.textContent = 'That file could not be read.'; };
  reader.onload = () => {
    try {
      const records = recordsFromCsv(String(reader.result));
      if (!records.length) throw new Error('No records were detected.');
      setDataset(records, {
        mode: 'local',
        statusText: `${records.length} record${records.length === 1 ? '' : 's'} loaded locally from “${file.name}”. Nothing was uploaded.`,
        bannerText: 'LOCAL BROWSER SESSION · The selected CSV is parsed only in this browser. Imported records remain in internal-review status until human verification.'
      });
      elements.loadStatus.textContent = `Loaded ${records.length} records. Media and rules are evaluated from the fields present in the CSV.`;
    } catch (error) {
      elements.loadStatus.textContent = `The file could not be parsed as a PURSUE-style CSV: ${error.message}`;
    }
  };
  reader.readAsText(file);
}

function setupDropzone() {
  if (!elements.dropzone) return;
  ['dragenter', 'dragover'].forEach(type => elements.dropzone.addEventListener(type, event => {
    event.preventDefault();
    elements.dropzone.classList.add('dragging');
  }));
  ['dragleave', 'drop'].forEach(type => elements.dropzone.addEventListener(type, event => {
    event.preventDefault();
    elements.dropzone.classList.remove('dragging');
  }));
  elements.dropzone.addEventListener('drop', event => readCsvFile(event.dataTransfer?.files?.[0]));
}

function renderView(records) {
  renderRecords(records);
  renderOverview(elements.overview, records);
  renderAggregateRules(records);
}

function applyFilters() {
  const query = elements.searchInput.value.toLowerCase().trim();
  const release = elements.releaseFilter.value;
  const type = elements.typeFilter.value;
  const filtered = allRecords.filter(record => {
    if (release !== 'all' && record.release !== release) return false;
    if (type !== 'all' && record.document_type !== type) return false;
    if (query && !getSearchableText(record).includes(query)) return false;
    return true;
  });
  renderView(filtered);
}

function renderRecords(records) {
  elements.records.replaceChildren();
  elements.countMessage.textContent = `Showing ${records.length} of ${allRecords.length} records.`;

  if (!records.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No records match the current filters.';
    elements.records.appendChild(empty);
    return;
  }

  records.forEach((record, index) => elements.records.appendChild(createRecordCard(record, index)));
}

function createRecordCard(record, index) {
  const article = document.createElement('article');
  article.className = 'record-card';
  article.dataset.publicationStatus = record.publication_status;

  const header = document.createElement('header');
  header.className = 'record-header';
  const headingWrap = document.createElement('div');
  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = `${record.agency} · ${record.release} · ${record.document_type}`;
  const title = document.createElement('h3');
  title.id = `record-title-${index}`;
  title.textContent = record.title;
  headingWrap.append(meta, title);
  const badges = document.createElement('div');
  badges.className = 'record-badges';
  badges.append(
    badge(sourceStatusLabel(record.provenance?.verification_status), `verification-${record.provenance?.verification_status || 'unknown'}`),
    badge(publicationLabel(record.publication_status), `publication-${record.publication_status || 'unknown'}`),
    ruleBadge(record.rule_evaluation?.summary)
  );
  header.append(headingWrap, badges);
  article.appendChild(header);

  const description = document.createElement('p');
  description.className = 'record-description';
  description.textContent = record.description;
  article.appendChild(description);

  const mediaField = document.createElement('ssl-media-field');
  mediaField.media = record.media;
  mediaField.evaluation = record.rule_evaluation;
  article.appendChild(mediaField);

  const grid = document.createElement('div');
  grid.className = 'record-grid';
  grid.append(
    officialRecordSection(record, index),
    evidenceReadingSection(record, index),
    governanceSection(record, index)
  );
  article.appendChild(grid);
  article.appendChild(recordRulePanel(record));
  return article;
}

function officialRecordSection(record, index) {
  const section = document.createElement('section');
  section.setAttribute('aria-labelledby', `official-${index}`);
  const heading = document.createElement('h4');
  heading.id = `official-${index}`;
  heading.textContent = 'Record and source';
  section.append(heading, createFieldList([
    ['Incident date', record.incident_date],
    ['Location', record.incident_location],
    ['Record type', record.document_type],
    ['Source type', record.provenance?.source_type],
    ['Verification', record.provenance?.verification_status],
    ['Transformations', arrayText(record.provenance?.transformations)]
  ]));
  const links = createSourceLinks(record);
  if (links.childNodes.length) section.appendChild(links);
  return section;
}

function evidenceReadingSection(record, index) {
  const section = document.createElement('section');
  section.setAttribute('aria-labelledby', `reading-${index}`);
  const heading = document.createElement('h4');
  heading.id = `reading-${index}`;
  heading.textContent = 'Omoluabi evidence reading';
  const classification = document.createElement('p');
  classification.className = 'epistemic-label';
  classification.textContent = `Classification: ${record.epistemic_status?.classification || 'unknown'} · Confidence: ${record.epistemic_status?.confidence || 'unknown'}`;
  section.append(
    heading,
    classification,
    createList('Known', record.epistemic_status?.known),
    createList('Missing', record.epistemic_status?.missing),
    createList('Unresolved', record.epistemic_status?.unresolved),
    createList('What could change the assessment', record.epistemic_status?.what_would_change_assessment)
  );
  return section;
}

function governanceSection(record, index) {
  const section = document.createElement('section');
  section.setAttribute('aria-labelledby', `governance-${index}`);
  const heading = document.createElement('h4');
  heading.id = `governance-${index}`;
  heading.textContent = 'Human governance';
  section.append(heading, createFieldList([
    ['Publication status', publicationLabel(record.publication_status)],
    ['Human review required', yesNo(record.human_governance?.human_review_required)],
    ['Review status', record.human_governance?.review_status],
    ['Reviewer role', record.human_governance?.reviewer_role],
    ['Automated actions', arrayText(record.human_governance?.automated_actions)],
    ['Corrections supported', yesNo(record.returnability?.corrections_supported)],
    ['Appeal supported', yesNo(record.returnability?.human_appeal_supported)]
  ]));
  return section;
}

function recordRulePanel(record) {
  const details = document.createElement('details');
  details.className = 'record-rule-panel';
  const summary = document.createElement('summary');
  const counts = record.rule_evaluation?.summary || { pass: 0, warn: 0, fail: 0 };
  summary.textContent = `SSL rule evaluation — ${counts.pass} passed, ${counts.warn} warnings, ${counts.fail} failures`;
  details.appendChild(summary);

  const note = document.createElement('p');
  note.className = 'quiet';
  note.textContent = 'Automated rule checks expose completeness and governance conditions. They do not determine truth or replace human editorial review.';
  details.appendChild(note);

  const list = document.createElement('ul');
  list.className = 'rule-result-list';
  (record.rule_evaluation?.results || []).filter(result => !result.media_id).forEach(result => {
    const item = document.createElement('li');
    item.className = `rule-result rule-${result.outcome}`;
    const strong = document.createElement('strong');
    strong.textContent = `${result.rule_id} · ${result.outcome.toUpperCase()}`;
    item.append(strong, document.createTextNode(` — ${result.detail}`));
    list.appendChild(item);
  });
  details.appendChild(list);
  return details;
}

function renderAggregateRules(records) {
  const totals = { pass: 0, warn: 0, fail: 0, not_applicable: 0 };
  records.forEach(record => {
    const summary = record.rule_evaluation?.summary;
    if (!summary) return;
    Object.keys(totals).forEach(key => { totals[key] += summary[key] || 0; });
  });
  elements.rulesSummary.replaceChildren();
  const list = document.createElement('ul');
  list.className = 'aggregate-rule-list';
  [
    ['Passed', totals.pass],
    ['Warnings', totals.warn],
    ['Failures', totals.fail],
    ['Not applicable', totals.not_applicable]
  ].forEach(([label, value]) => {
    const item = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = String(value);
    item.append(strong, document.createTextNode(` ${label}`));
    list.appendChild(item);
  });
  elements.rulesSummary.appendChild(list);
}

function renderRuleSetStatus() {
  const fallbackText = ruleSet.fallback ? ` Fallback rules are active because the canonical rule file could not load: ${ruleSet.load_error}` : '';
  elements.rulesStatus.textContent = `SSL rules ${ruleSet.version} · ${ruleSet.rules.length} rules loaded.${fallbackText}`;
}

async function renderBeautifulDisclosure() {
  const items = await loadBeautifulDisclosure();
  elements.discourse.replaceChildren();
  if (!items.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No public-discourse media has been approved yet. This layer remains intentionally separate from official records and from synthetic demonstrations.';
    elements.discourse.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const embed = extractYouTubeEmbedUrl(item.youtube || item.url || item.videoId);
    if (!embed) return;
    const article = document.createElement('article');
    article.className = 'discourse-card';
    const heading = document.createElement('h3');
    heading.textContent = item.title || 'Untitled public discussion';
    const context = document.createElement('p');
    context.textContent = item.summary || 'Public discourse item. Not official evidence.';
    const iframe = document.createElement('iframe');
    iframe.src = embed;
    iframe.title = item.title || 'Public-discourse video';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.sandbox = 'allow-scripts allow-same-origin allow-presentation';
    article.append(heading, context, iframe);
    elements.discourse.appendChild(article);
  });
}

async function loadDisclosure() {
  try {
    const response = await fetch('./data/disclosure.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Cache request returned ${response.status}`);
    return response.json();
  } catch (error) {
    return { _fetchedAt: null, records: [], load_error: error.message };
  }
}

function renderDatasetBanner(text) {
  elements.banner.hidden = !text;
  elements.banner.textContent = text;
}

function populateFilters(records) {
  unique(records.map(record => record.release)).forEach(value => appendOption(elements.releaseFilter, value));
  unique(records.map(record => record.document_type)).forEach(value => appendOption(elements.typeFilter, value));
}

function resetFilter(select) {
  while (select.options.length > 1) select.remove(1);
  select.value = 'all';
}

function appendOption(select, value) {
  if (!value) return;
  const option = document.createElement('option');
  option.value = value;
  option.textContent = value;
  select.appendChild(option);
}

function createFieldList(fields) {
  const list = document.createElement('dl');
  list.className = 'field-list';
  fields.forEach(([label, value]) => {
    const term = document.createElement('dt');
    const definition = document.createElement('dd');
    term.textContent = label;
    definition.textContent = hasValue(value) ? String(value) : 'Not available';
    list.append(term, definition);
  });
  return list;
}

function createList(title, values) {
  const section = document.createElement('div');
  const heading = document.createElement('h5');
  heading.textContent = title;
  const list = document.createElement('ul');
  const items = Array.isArray(values) && values.length ? values : ['None declared.'];
  items.forEach(value => {
    const item = document.createElement('li');
    item.textContent = value;
    list.appendChild(item);
  });
  section.append(heading, list);
  return section;
}

function createSourceLinks(record) {
  const paragraph = document.createElement('p');
  paragraph.className = 'source-links';
  const candidates = [
    ['Open source file', record.file_url],
    ['Open source or provenance page', record.provenance?.source_url],
    ['Open official PURSUE page', record.official_source]
  ];
  const seen = new Set();
  candidates.forEach(([label, href]) => {
    if (!href || seen.has(href)) return;
    seen.add(href);
    if (paragraph.childNodes.length) paragraph.appendChild(document.createTextNode(' · '));
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    setExternal(link);
    paragraph.appendChild(link);
  });
  return paragraph;
}

function setExternal(link) {
  try {
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  } catch {
    // Leave the link unchanged.
  }
}

function badge(text, className) {
  const element = document.createElement('span');
  element.className = `status-badge ${className}`;
  element.textContent = text;
  return element;
}

function ruleBadge(summary = {}) {
  const failures = summary.fail || 0;
  const warnings = summary.warn || 0;
  if (failures) return badge(`${failures} rule failure${failures === 1 ? '' : 's'}`, 'rule-fail');
  if (warnings) return badge(`${warnings} rule warning${warnings === 1 ? '' : 's'}`, 'rule-warn');
  return badge('Rules passed', 'rule-pass');
}

function datasetModeLabel(mode) {
  return ({ official: 'Official cache', synthetic: 'Synthetic demonstration', local: 'Local CSV session' })[mode] || 'Unknown dataset';
}

function sourceStatusLabel(value) {
  return ({ verified: 'Verified source', partially_verified: 'Partially verified', unverified: 'Unverified', disputed: 'Disputed', synthetic: 'Synthetic', fictional: 'Fictional', unknown: 'Verification unknown' })[value] || 'Verification unknown';
}

function publicationLabel(value) {
  return String(value || 'unknown').replaceAll('_', ' ');
}

function yesNo(value) {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return hasValue(value) ? String(value) : 'Not declared';
}

function arrayText(value) {
  return Array.isArray(value) && value.length ? value.join('; ') : '';
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

function showFatalError(error) {
  elements.dataStatus.textContent = `The page could not initialize: ${error.message}`;
  const message = document.createElement('p');
  message.textContent = 'The source files remain available in the repository. Check browser console output and GitHub Pages deployment status.';
  elements.records.replaceChildren(message);
}
