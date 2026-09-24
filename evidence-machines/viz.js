(() => {
  'use strict';

  const source = '../ufo-connection/data/apollo-anomaly-evidence.json';
  const chart = document.querySelector('#evidence-chart');
  const tableBody = document.querySelector('#evidence-table-body');
  const summary = document.querySelector('#viz-summary');
  const controls = document.querySelector('#mission-controls');

  if (!chart || !tableBody || !summary || !controls) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  function missionOrder(records) {
    const preferred = ['Apollo 10', 'Apollo 11', 'Apollo 17', 'Apollo program'];
    const found = [...new Set(records.map(r => r.mission))];
    return preferred.filter(m => found.includes(m)).concat(found.filter(m => !preferred.includes(m)));
  }

  function renderTable(records) {
    tableBody.innerHTML = records.map(record => `
      <tr>
        <td><code>${esc(record.id)}</code></td>
        <td>${esc(record.mission)}</td>
        <td>${esc(record.event)}</td>
        <td>${esc(record.evidenceClass)}</td>
        <td>${esc(record.status)}</td>
      </tr>`
    ).join('');
  }

  function renderChart(records) {
    const missions = missionOrder(records);
    const grouped = new Map(missions.map(m => [m, records.filter(r => r.mission === m)]));
    const maxRecords = Math.max(1, ...[...grouped.values()].map(list => list.length));
    const width = 760;
    const laneLeft = 160;
    const laneRight = 720;
    const top = 52;
    const rowHeight = 72;
    const height = top + missions.length * rowHeight + 42;
    const usable = laneRight - laneLeft;
    const step = usable / maxRecords;

    const lines = missions.map((mission, row) => {
      const y = top + row * rowHeight;
      const recordsForMission = grouped.get(mission);
      const marks = recordsForMission.map((record, i) => {
        const x = laneLeft + step * (i + 0.5);
        return `
          <g tabindex="0" role="img" aria-label="${esc(record.id)}: ${esc(record.event)}. Evidence class: ${esc(record.evidenceClass)}.">
            <circle class="chart-mark" cx="${x}" cy="${y}" r="9"></circle>
            <text class="chart-small" x="${x}" y="${y + 25}" text-anchor="middle">${esc(record.id)}</text>
            <title>${esc(record.event)} — ${esc(record.evidenceClass)}</title>
          </g>`;
      }).join('');

      return `
        <text class="chart-label" x="12" y="${y + 4}">${esc(mission)}</text>
        <line class="chart-lane" x1="${laneLeft}" y1="${y}" x2="${laneRight}" y2="${y}"></line>
        ${marks}`;
    }).join('');

    chart.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">Apollo evidence records grouped by mission</title>
        <desc id="chart-desc">Each dot is one record from the Omoluabi Apollo anomaly evidence ledger. Rows group records by Apollo mission or archive collection.</desc>
        <text class="chart-label" x="12" y="20">RECORDS BY MISSION</text>
        <text class="chart-small" x="12" y="38">Each mark is a structured evidence record, not a claim of extraterrestrial origin.</text>
        ${lines}
      </svg>`;
  }

  function renderControls(records, active = 'All') {
    const missions = missionOrder(records);
    const names = ['All', ...missions];
    controls.innerHTML = names.map(name =>
      `<button type="button" data-mission="${esc(name)}" aria-pressed="${name === active}">${esc(name)}</button>`
    ).join('');
  }

  function render(records, allRecords, active) {
    renderChart(records);
    renderTable(records);
    summary.textContent = active === 'All'
      ? `Showing all ${records.length} structured records in the Apollo evidence ledger.`
      : `Showing ${records.length} record${records.length === 1 ? '' : 's'} for ${active}.`;
    renderControls(allRecords, active);
  }

  fetch(source)
    .then(response => {
      if (!response.ok) throw new Error('Could not load evidence data.');
      return response.json();
    })
    .then(data => {
      const records = Array.isArray(data.records) ? data.records : [];
      render(records, records, 'All');

      controls.addEventListener('click', event => {
        const button = event.target.closest('button[data-mission]');
        if (!button) return;
        const mission = button.dataset.mission;
        const filtered = mission === 'All' ? records : records.filter(r => r.mission === mission);
        render(filtered, records, mission);
      });
    })
    .catch(error => {
      chart.innerHTML = '<p class="text-body">The visualization could not load. The source data remains available through the linked JSON ledger.</p>';
      summary.textContent = error.message;
    });
})();