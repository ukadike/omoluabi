export function renderOverview(container, records) {
  container.replaceChildren();
  const total = document.createElement('p');
  total.className = 'overview-total';
  total.textContent = `${records.length} record${records.length === 1 ? '' : 's'} in the current view.`;
  container.appendChild(total);

  if (!records.length) return;
  const grid = document.createElement('div');
  grid.className = 'overview-grid';
  grid.append(
    chartBlock('By release', count(records, record => record.release || 'Unspecified')),
    chartBlock('By record type', count(records, record => record.document_type || 'unknown')),
    chartBlock('By source status', countMedia(records, item => item.source_status || 'unknown')),
    chartBlock('By media type', countMedia(records, item => item.type || 'unknown'))
  );
  container.appendChild(grid);
}

function chartBlock(title, entries) {
  const section = document.createElement('section');
  section.className = 'chart-block';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const list = document.createElement('ul');
  list.className = 'chart';
  const max = Math.max(1, ...entries.map(([, value]) => value));
  entries.forEach(([label, value]) => {
    const item = document.createElement('li');
    item.className = 'chart-row';
    const text = document.createElement('span');
    text.className = 'chart-label';
    text.textContent = `${label} — ${value}`;
    const bar = document.createElement('span');
    bar.className = 'chart-bar';
    bar.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('span');
    fill.className = 'chart-fill';
    fill.style.width = `${Math.max(4, (value / max) * 100)}%`;
    bar.appendChild(fill);
    item.append(text, bar);
    list.appendChild(item);
  });
  section.append(heading, list);
  return section;
}

function count(records, getter) {
  const map = new Map();
  records.forEach(record => {
    const key = getter(record);
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function countMedia(records, getter) {
  const items = records.flatMap(record => flattenMedia(record.media || []));
  if (!items.length) return [['No media', 0]];
  const map = new Map();
  items.forEach(item => {
    const key = getter(item);
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function flattenMedia(items) {
  return items.flatMap(item => [item, ...(Array.isArray(item.items) ? flattenMedia(item.items) : [])]);
}
