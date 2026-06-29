// Accessible overview visualization: counts by release, type, and agency, plus a
// decade timeline. Meaning is carried by text ("Type video — 8 records"); the
// bar is decorative (aria-hidden), so there is no color- or length-only meaning.
// No animation, so it is fine under reduced-motion.

export function renderOverview(container, records) {
  container.replaceChildren();
  if (!records.length) {
    const p = document.createElement('p');
    p.className = 'quiet';
    p.textContent = 'Load records to see the overview: totals by release, type, agency, and a decade timeline.';
    container.appendChild(p);
    return;
  }

  const total = document.createElement('p');
  total.className = 'overview-total';
  total.textContent = `${records.length} records in view.`;
  container.appendChild(total);

  const grid = document.createElement('div');
  grid.className = 'overview-grid';
  grid.append(
    chartBlock('By release', countBy(records, r => labelOr(r.release, 'Unspecified'))),
    chartBlock('By type', countBy(records, r => labelOr(r.document_type, 'unknown'))),
    chartBlock('By agency', countBy(records, r => labelOr(r.agency, 'Unknown agency'))),
    chartBlock('By decade', countByDecade(records), { keepOrder: true })
  );
  container.appendChild(grid);
}

function chartBlock(title, counts, { keepOrder = false } = {}) {
  const section = document.createElement('section');
  section.className = 'chart-block';

  const h = document.createElement('h3');
  h.textContent = title;
  section.appendChild(h);

  const entries = Object.entries(counts);
  if (!keepOrder) entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const max = Math.max(1, ...entries.map(([, n]) => n));

  const list = document.createElement('ul');
  list.className = 'chart';
  for (const [label, n] of entries) {
    const li = document.createElement('li');
    li.className = 'chart-row';

    const text = document.createElement('span');
    text.className = 'chart-label';
    text.textContent = `${label} — ${n}`;

    const track = document.createElement('span');
    track.className = 'chart-bar';
    track.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('span');
    fill.className = 'chart-fill';
    fill.style.width = `${Math.round((n / max) * 100)}%`;
    track.appendChild(fill);

    li.append(text, track);
    list.appendChild(li);
  }
  section.appendChild(list);
  return section;
}

function countBy(records, keyFn) {
  const out = {};
  for (const r of records) {
    const key = keyFn(r);
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

function countByDecade(records) {
  const out = {};
  for (const r of records) {
    const year = parseInt(String(r.incident_date).slice(0, 4), 10);
    const key = Number.isFinite(year) ? `${Math.floor(year / 10) * 10}s` : 'Unknown';
    out[key] = (out[key] || 0) + 1;
  }
  // chronological order, Unknown last
  return Object.fromEntries(
    Object.entries(out).sort((a, b) => {
      if (a[0] === 'Unknown') return 1;
      if (b[0] === 'Unknown') return -1;
      return parseInt(a[0], 10) - parseInt(b[0], 10);
    })
  );
}

function labelOr(value, fallback) {
  const v = (value ?? '').toString().trim();
  return v === '' ? fallback : v;
}
