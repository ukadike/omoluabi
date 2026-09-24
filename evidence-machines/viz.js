(() => {
  'use strict';

  const buttons = Array.from(document.querySelectorAll('.viz-toolbar button[data-filter]'));
  const marks = Array.from(document.querySelectorAll('.event-mark[data-group]'));
  const provCells = Array.from(document.querySelectorAll('.prov-cell[data-group]'));
  const contradictionCards = Array.from(document.querySelectorAll('.contradiction-card[data-group]'));
  const summary = document.querySelector('#timeline-summary');

  if (!buttons.length || !summary) return;

  const eventCounts = {
    all: 11,
    cooper: 3,
    edwards: 2,
    mercury: 2,
    apollo: 4
  };

  function applyFilter(filter) {
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });

    marks.forEach(mark => {
      mark.hidden = filter !== 'all' && mark.dataset.group !== filter;
    });

    provCells.forEach(cell => {
      cell.hidden = filter !== 'all' && cell.dataset.group !== filter;
    });

    contradictionCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.group !== filter;
    });

    const count = eventCounts[filter] ?? eventCounts.all;
    const label = filter === 'all' ? 'structured events' : filter + ' events';
    summary.textContent = count + ' ' + label + ' shown';
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  applyFilter('all');
})();