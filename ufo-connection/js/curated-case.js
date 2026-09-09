const content = document.querySelector('#case-content');
const crumb = document.querySelector('#crumb-title');
const selectedId = new URLSearchParams(window.location.search).get('case');

init().catch(showError);

async function init() {
  const response = await fetch('./data/curated-cases.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('The curated case data is unavailable.');
  const data = await response.json();
  const cases = Array.isArray(data.cases) ? data.cases : [];
  const selected = cases.find(item => item.id === selectedId) || cases[0];
  if (!selected) throw new Error('No case is available.');
  crumb.textContent = selected.shortTitle;
  document.title = `Omoluabi — ${selected.shortTitle}`;
  renderCase(selected, cases);
}

function renderCase(record, cases) {
  content.replaceChildren(
    caseHead(record),
    mediaSection(record),
    readingSection(record),
    signalLedger(record),
    sourceMethod(record, cases)
  );
}

function caseHead(record) {
  const section = element('section', 'case-head');
  section.append(
    text('p', `CASE ${record.sequence} · ${record.lens}`, 'case-identifier'),
    text('h1', record.shortTitle),
    text('p', record.dek, 'case-dek')
  );
  const line = element('div', 'status-line');
  line.append(chip(record.status, record.statusType), chip(record.sensor, 'neutral'), chip(record.duration, 'neutral'));
  section.append(line);
  return section;
}

function mediaSection(record) {
  const section = element('section', 'media-section');
  const header = element('header');
  const source = link('Open the original DVIDS release', record.source.dvidsUrl, 'source-link');
  source.target = '_blank';
  source.rel = 'noopener noreferrer';
  header.append(text('h2', 'The official record'), source);
  section.append(header);

  if (record.source.available === false) {
    section.append(text('p', 'The originating public media is currently unavailable. Omoluabi does not retain a replacement copy.', 'load-error'));
  } else {
    const shell = element('div', 'player-shell');
    const wrapper = element('div', 'video-wrapper');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.dvidshub.net/video/embed/${record.source.dvidsVideoId}`;
    iframe.title = `${record.shortTitle}: official DVIDS video`;
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    wrapper.append(iframe);
    shell.append(wrapper);
    section.append(shell);
  }
  section.append(text('p', record.mediaCaption, 'media-caption'));
  return section;
}

function readingSection(record) {
  const section = element('section', 'record-reading');
  const label = element('div');
  label.append(text('p', 'OMOLUABI READING', 'eyebrow'), text('h2', record.reading.title));
  section.append(label, text('p', record.reading.introduction));
  const grid = element('div', 'analysis-grid');
  record.reading.cards.forEach(card => {
    const article = element('article', `analysis-card ${card.tone ? `is-${card.tone}` : ''}`);
    article.append(text('p', card.label, 'reading-label'), text('h3', card.title));
    if (card.items?.length) article.append(list(card.items));
    else article.append(text('p', card.body));
    grid.append(article);
  });
  section.append(grid);
  return section;
}

function signalLedger(record) {
  const section = element('section', 'signal-ledger');
  const header = element('header');
  header.append(text('p', 'MULTIMODAL LEDGER', 'eyebrow'), text('h2', 'What this public record carries—and does not carry.'));
  section.append(header);
  const listElement = element('ul', 'ledger-list');
  record.ledger.forEach(item => {
    const stateClass = `is-${item.state.replace(/[^a-z]+/gi, '-').toLowerCase()}`;
    const row = element('li', stateClass);
    row.append(text('p', item.state, 'ledger-state'), text('strong', item.mode), text('p', item.detail));
    listElement.append(row);
  });
  section.append(listElement);
  return section;
}

function sourceMethod(record, cases) {
  const section = element('section', 'source-method');
  const intro = element('div');
  intro.append(text('p', 'PROVENANCE AND CARE', 'eyebrow'), text('h2', 'How this page holds the source.'));
  section.append(intro);
  const detail = element('div');
  const listElement = document.createElement('dl');
  [
    ['Publisher', record.source.publisher],
    ['Record ID', record.source.recordId],
    ['Public release', record.source.published],
    ['Source status', 'Official public media · embedded from DVIDS'],
    ['Omoluabi status', 'Curated editorial reading · no automated conclusion']
  ].forEach(([label, value]) => {
    const row = document.createElement('div');
    row.append(text('dt', label), text('dd', value));
    listElement.append(row);
  });
  detail.append(listElement, text('p', record.methodNote));
  const next = nextCase(record, cases);
  if (next) detail.append(next);
  section.append(detail);
  return section;
}

function nextCase(record, cases) {
  const index = cases.findIndex(item => item.id === record.id);
  const following = cases[index + 1] || cases[0];
  const nav = element('nav', 'next-case');
  nav.setAttribute('aria-label', 'Case navigation');
  nav.append(text('span', following.id === record.id ? 'End of this sequence' : 'Continue the investigation'), link(`Read ${following.shortTitle} →`, `./case.html?case=${encodeURIComponent(following.id)}`));
  return nav;
}

function chip(value, type) {
  return text('span', value, `status-chip ${type === 'neutral' ? '' : `is-${type}`}`.trim());
}

function list(items) {
  const output = document.createElement('ul');
  items.forEach(item => output.append(text('li', item)));
  return output;
}

function link(label, href, className = '') {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.textContent = label;
  if (className) anchor.className = className;
  return anchor;
}

function text(tag, value, className = '') {
  const node = document.createElement(tag);
  node.textContent = value;
  if (className) node.className = className;
  return node;
}

function element(tag, className = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function showError(error) {
  crumb.textContent = 'Case unavailable';
  content.replaceChildren(text('p', `This case cannot be displayed: ${error.message}`, 'load-error'));
}
