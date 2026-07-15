import { attachP5Analysis } from './p5-media-annotation.js';

class SSLMediaField extends HTMLElement {
  constructor() {
    super();
    this._items = [];
    this._evaluation = null;
    this._activeIndex = 0;
    this._destroyAnalysis = null;
  }

  set media(value) {
    this._items = Array.isArray(value) ? value : value ? [value] : [];
    this._activeIndex = 0;
    this.render();
  }

  get media() {
    return this._items;
  }

  set evaluation(value) {
    this._evaluation = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.destroyAnalysis();
  }

  render() {
    if (!this.isConnected) return;
    this.destroyAnalysis();
    this.replaceChildren();
    this.classList.add('ssl-media-field');

    if (!this._items.length) {
      const empty = document.createElement('p');
      empty.className = 'quiet';
      empty.textContent = 'No media is attached to this record.';
      this.appendChild(empty);
      return;
    }

    const heading = document.createElement('div');
    heading.className = 'media-field-heading';
    const title = document.createElement('h4');
    title.textContent = 'Media field';
    const count = document.createElement('span');
    count.className = 'media-count';
    count.textContent = `${this._items.length} item${this._items.length === 1 ? '' : 's'}`;
    heading.append(title, count);
    this.appendChild(heading);

    if (this._items.length > 1) this.appendChild(this.createSelector());

    const active = this._items[this._activeIndex];
    this.appendChild(this.renderItem(active));
  }

  createSelector() {
    const nav = document.createElement('div');
    nav.className = 'media-selector';
    nav.setAttribute('aria-label', 'Choose media item');
    this._items.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'media-selector-button';
      button.setAttribute('aria-pressed', index === this._activeIndex ? 'true' : 'false');
      button.textContent = `${index + 1}. ${typeLabel(item.type)}`;
      button.addEventListener('click', () => {
        this._activeIndex = index;
        this.render();
      });
      nav.appendChild(button);
    });
    return nav;
  }

  renderItem(item) {
    const article = document.createElement('article');
    article.className = 'media-item';

    const header = document.createElement('header');
    header.className = 'media-item-header';
    const titleWrap = document.createElement('div');
    const label = document.createElement('p');
    label.className = 'meta';
    label.textContent = `${typeLabel(item.type)} · ${sourceLabel(item.source_status)}`;
    const title = document.createElement('h5');
    title.textContent = item.title || 'Untitled media';
    titleWrap.append(label, title);
    header.appendChild(titleWrap);
    article.appendChild(header);

    if (item.description) {
      const description = document.createElement('p');
      description.textContent = item.description;
      article.appendChild(description);
    }

    const frame = document.createElement('div');
    frame.className = `media-frame media-frame-${item.type || 'unknown'}`;
    const rendered = this.renderByType(item);
    frame.appendChild(rendered);
    article.appendChild(frame);

    if (item.caption || item.credit) {
      const caption = document.createElement('p');
      caption.className = 'media-caption';
      caption.textContent = [item.caption, item.credit ? `Credit: ${item.credit}` : ''].filter(Boolean).join(' ');
      article.appendChild(caption);
    }

    if (item.analysis_layer?.enabled) article.appendChild(this.createAnalysisPanel(item));
    article.appendChild(this.createMetadata(item));
    article.appendChild(this.createRulePanel(item));
    return article;
  }

  renderByType(item) {
    switch (item.type) {
      case 'image': return this.renderImage(item);
      case 'video': return this.renderVideo(item);
      case 'audio': return this.renderAudio(item);
      case 'slideshow': return this.renderSlideshow(item);
      default: return this.renderFallback(item);
    }
  }

  renderImage(item) {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = safeAssetUrl(item.src);
    image.alt = typeof item.alt === 'string' ? item.alt : '';
    image.loading = 'lazy';
    image.decoding = 'async';
    figure.appendChild(image);
    return figure;
  }

  renderVideo(item) {
    const wrap = document.createElement('div');
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.autoplay = false;
    video.loop = Boolean(item.playback?.looping);
    video.muted = Boolean(item.playback?.muted);
    if (item.poster) video.poster = safeAssetUrl(item.poster);
    const source = document.createElement('source');
    source.src = safeAssetUrl(item.src);
    if (item.format) source.type = item.format;
    video.appendChild(source);
    (item.captions || []).forEach(trackData => {
      const track = document.createElement('track');
      track.kind = trackData.kind || 'captions';
      track.src = safeAssetUrl(trackData.src);
      track.srclang = trackData.srclang || 'en';
      track.label = trackData.label || 'Captions';
      track.default = Boolean(trackData.default);
      video.appendChild(track);
    });
    video.appendChild(document.createTextNode('Your browser does not support HTML video.'));
    wrap.appendChild(video);
    wrap.appendChild(this.createTranscript(item));
    return wrap;
  }

  renderAudio(item) {
    const wrap = document.createElement('div');
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'metadata';
    audio.autoplay = false;
    audio.loop = Boolean(item.playback?.looping);
    const source = document.createElement('source');
    source.src = safeAssetUrl(item.src);
    if (item.format) source.type = item.format;
    audio.appendChild(source);
    audio.appendChild(document.createTextNode('Your browser does not support HTML audio.'));
    wrap.append(audio, this.createTranscript(item));
    return wrap;
  }

  renderSlideshow(item) {
    const slides = Array.isArray(item.items) ? item.items : [];
    const wrap = document.createElement('div');
    wrap.className = 'slideshow';
    if (!slides.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No slides are available.';
      wrap.appendChild(empty);
      return wrap;
    }

    let index = 0;
    const live = document.createElement('p');
    live.className = 'slideshow-status';
    live.setAttribute('aria-live', 'polite');
    const stage = document.createElement('div');
    stage.className = 'slideshow-stage';
    const controls = document.createElement('div');
    controls.className = 'slideshow-controls';
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.textContent = 'Previous';
    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = 'Next';

    const update = () => {
      const slide = slides[index];
      stage.replaceChildren(this.renderImage(slide));
      if (slide.caption) {
        const caption = document.createElement('p');
        caption.className = 'media-caption';
        caption.textContent = slide.caption;
        stage.appendChild(caption);
      }
      live.textContent = `Slide ${index + 1} of ${slides.length}: ${slide.title || 'Untitled slide'}`;
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    };

    previous.addEventListener('click', () => {
      if (index > 0) index -= 1;
      update();
    });
    next.addEventListener('click', () => {
      if (index < slides.length - 1) index += 1;
      update();
    });
    controls.append(previous, next);
    wrap.append(live, stage, controls);
    update();
    return wrap;
  }

  renderFallback(item) {
    const wrap = document.createElement('div');
    const message = document.createElement('p');
    message.textContent = `This media type (${item.type || 'unknown'}) is not rendered directly.`;
    wrap.appendChild(message);
    if (item.src) {
      const link = document.createElement('a');
      link.href = safeAssetUrl(item.src);
      link.textContent = 'Open the source media';
      setExternalBehavior(link);
      wrap.appendChild(link);
    }
    return wrap;
  }

  createTranscript(item) {
    const details = document.createElement('details');
    details.className = 'transcript-panel';
    const summary = document.createElement('summary');
    summary.textContent = 'Transcript or media description';
    details.appendChild(summary);
    if (item.transcript_text) {
      const text = document.createElement('p');
      text.textContent = item.transcript_text;
      details.appendChild(text);
    }
    if (item.transcript) {
      const link = document.createElement('a');
      link.href = safeAssetUrl(item.transcript);
      link.textContent = 'Open transcript file';
      setExternalBehavior(link);
      details.appendChild(link);
    }
    if (!item.transcript && !item.transcript_text) {
      const missing = document.createElement('p');
      missing.textContent = 'No transcript has been supplied.';
      details.appendChild(missing);
    }
    return details;
  }

  createAnalysisPanel(item) {
    const details = document.createElement('details');
    details.className = 'analysis-panel';
    const summary = document.createElement('summary');
    summary.textContent = 'Optional p5 analysis layer';
    const disclosure = document.createElement('p');
    disclosure.textContent = item.analysis_layer.transformation_disclosure || 'This optional layer adds annotations without replacing the source media.';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Render analysis view';
    const host = document.createElement('div');
    host.className = 'analysis-host';
    button.addEventListener('click', () => {
      this.destroyAnalysis();
      this._destroyAnalysis = attachP5Analysis(host, item);
      button.disabled = true;
      button.textContent = 'Analysis view rendered';
    });
    details.append(summary, disclosure, button, host);
    return details;
  }

  createMetadata(item) {
    const details = document.createElement('details');
    details.className = 'media-metadata';
    const summary = document.createElement('summary');
    summary.textContent = 'Provenance, access, and evidentiary limits';
    details.appendChild(summary);

    const grid = document.createElement('div');
    grid.className = 'metadata-grid';
    grid.append(
      metadataSection('Provenance', [
        ['Source', item.provenance?.source_name],
        ['Verification', item.provenance?.verification_status],
        ['Format', item.format],
        ['License', item.license],
        ['Transformations', arrayText(item.provenance?.transformations)]
      ]),
      metadataSection('Accessibility', [
        ['Keyboard', formatValue(item.accessibility?.keyboard_operable)],
        ['Captions', formatValue(item.accessibility?.captions_available)],
        ['Transcript', formatValue(item.accessibility?.transcript_available)],
        ['Known barriers', arrayText(item.accessibility?.known_barriers)]
      ]),
      metadataSection('Evidentiary limit', [
        ['Classification', item.evidentiary_status?.classification],
        ['Known', arrayText(item.evidentiary_status?.known)],
        ['Does not establish', arrayText(item.evidentiary_status?.does_not_establish)],
        ['Limitations', arrayText(item.evidentiary_status?.limitations)]
      ])
    );
    details.appendChild(grid);

    if (item.source_url) {
      const sourceLink = document.createElement('a');
      sourceLink.href = safeAssetUrl(item.source_url);
      sourceLink.textContent = 'Open original source';
      setExternalBehavior(sourceLink);
      details.appendChild(sourceLink);
    }
    return details;
  }

  createRulePanel(item) {
    const details = document.createElement('details');
    details.className = 'media-rule-panel';
    const summary = document.createElement('summary');
    const mediaIds = new Set(collectMediaIds(item));
    const results = this._evaluation?.results?.filter(result => mediaIds.has(result.media_id)) || [];
    const counts = countOutcomes(results);
    summary.textContent = `Media rules — ${counts.fail} failures, ${counts.warn} warnings`;
    details.appendChild(summary);
    if (!results.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No media-specific rule results are available.';
      details.appendChild(empty);
      return details;
    }
    const list = document.createElement('ul');
    list.className = 'rule-result-list';
    results.forEach(result => {
      const itemEl = document.createElement('li');
      itemEl.className = `rule-result rule-${result.outcome}`;
      const strong = document.createElement('strong');
      strong.textContent = `${result.rule_id} · ${result.outcome.toUpperCase()}`;
      const text = document.createTextNode(` — ${result.detail}`);
      itemEl.append(strong, text);
      list.appendChild(itemEl);
    });
    details.appendChild(list);
    return details;
  }

  destroyAnalysis() {
    if (typeof this._destroyAnalysis === 'function') this._destroyAnalysis();
    this._destroyAnalysis = null;
  }
}


function collectMediaIds(item) {
  const ids = item?.id ? [item.id] : [];
  for (const child of item?.items || []) ids.push(...collectMediaIds(child));
  return ids;
}

function metadataSection(title, fields) {
  const section = document.createElement('section');
  const heading = document.createElement('h6');
  heading.textContent = title;
  const list = document.createElement('dl');
  list.className = 'field-list compact';
  fields.forEach(([label, value]) => {
    const term = document.createElement('dt');
    const definition = document.createElement('dd');
    term.textContent = label;
    definition.textContent = hasValue(value) ? value : 'Not declared';
    list.append(term, definition);
  });
  section.append(heading, list);
  return section;
}

function safeAssetUrl(value) {
  if (!value) return '';
  const text = String(value).trim();
  if (/^(javascript|data:text\/html):/i.test(text)) return '';
  try {
    const url = new URL(text, window.location.href);
    if (!['http:', 'https:', 'blob:'].includes(url.protocol)) return '';
    return url.href;
  } catch {
    return '';
  }
}

function setExternalBehavior(link) {
  try {
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  } catch {
    // Keep a same-page fallback if parsing fails.
  }
}

function typeLabel(type) {
  return ({ image: 'Image', video: 'Video', audio: 'Audio', slideshow: 'Slideshow' })[type] || 'Media';
}

function sourceLabel(status) {
  return ({
    source: 'Source media',
    annotated: 'Annotated media',
    transformed: 'Transformed media',
    reconstructed: 'Reconstructed media',
    synthetic: 'Synthetic demonstration',
    fictional: 'Fictional media',
    unknown: 'Source status unknown'
  })[status] || 'Source status not declared';
}

function arrayText(value) {
  return Array.isArray(value) && value.length ? value.join('; ') : '';
}

function formatValue(value) {
  if (value === true) return 'Available';
  if (value === false) return 'Not available';
  return hasValue(value) ? String(value) : '';
}

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

function countOutcomes(results) {
  const counts = { pass: 0, warn: 0, fail: 0, not_applicable: 0 };
  results.forEach(result => {
    if (counts[result.outcome] !== undefined) counts[result.outcome] += 1;
  });
  return counts;
}

if (!customElements.get('ssl-media-field')) customElements.define('ssl-media-field', SSLMediaField);

export { SSLMediaField };
