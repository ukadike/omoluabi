const FALLBACK_RULES = {
  rule_set_id: 'ssl-rules',
  version: '1.0.0-fallback',
  status: 'fallback',
  rules: [
    { id: 'SSL-001', title: 'Identity is present', level: 'block', scope: 'artifact', test: 'artifact.identity.required', message: 'Required identity fields must be present.' },
    { id: 'SSL-002', title: 'Provenance is visible', level: 'block', scope: 'artifact', test: 'artifact.provenance.required', message: 'Source and verification fields must be present.' },
    { id: 'SSL-006', title: 'Meaningful images have descriptions', level: 'block', scope: 'media', test: 'media.image.alt', message: 'Meaningful images require alt text.' },
    { id: 'SSL-007', title: 'Timed media have transcripts', level: 'block', scope: 'media', test: 'media.timed.transcript', message: 'Video and audio require transcripts.' },
    { id: 'SSL-009', title: 'Media does not autoplay', level: 'block', scope: 'media', test: 'media.no_autoplay', message: 'Media must not autoplay.' }
  ]
};

const APPROVED_OFFICIAL_HOSTS = [
  'war.gov',
  'www.war.gov',
  'defense.gov',
  'www.defense.gov',
  'dvidshub.net',
  'www.dvidshub.net'
];

export async function loadRuleSet(url = '../rules/ssl-rules.v1.json') {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Rules request returned ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.rules)) throw new Error('Rule set is malformed.');
    return { ...data, loaded_from: url, fallback: false };
  } catch (error) {
    return { ...FALLBACK_RULES, fallback: true, load_error: error.message };
  }
}

export function evaluateArtifact(artifact, ruleSet) {
  const rules = Array.isArray(ruleSet?.rules) ? ruleSet.rules : FALLBACK_RULES.rules;
  const results = [];

  for (const rule of rules) {
    if (rule.scope === 'media') {
      const mediaItems = flattenMedia(Array.isArray(artifact.media) ? artifact.media : []);
      if (!mediaItems.length) {
        results.push(makeResult(rule, 'not_applicable', 'No media items are attached to this record.', null));
        continue;
      }
      mediaItems.forEach((media, index) => {
        const testResult = runTest(rule.test, artifact, media);
        results.push(toOutcome(rule, testResult, media.id || `media-${index + 1}`));
      });
    } else {
      const testResult = runTest(rule.test, artifact, null);
      results.push(toOutcome(rule, testResult, null));
    }
  }

  return {
    rule_set_id: ruleSet?.rule_set_id || FALLBACK_RULES.rule_set_id,
    rule_set_version: ruleSet?.version || FALLBACK_RULES.version,
    evaluated_at: new Date().toISOString(),
    results,
    summary: summarizeRuleResults(results)
  };
}

export function summarizeRuleResults(results = []) {
  const summary = { pass: 0, warn: 0, fail: 0, not_applicable: 0 };
  results.forEach(result => {
    if (Object.prototype.hasOwnProperty.call(summary, result.outcome)) summary[result.outcome] += 1;
  });
  summary.publishable_by_rules = summary.fail === 0;
  return summary;
}

export function resultsForMedia(evaluation, mediaId) {
  if (!evaluation?.results) return [];
  return evaluation.results.filter(result => result.media_id === mediaId);
}

function toOutcome(rule, testResult, mediaId) {
  if (!testResult.applicable) return makeResult(rule, 'not_applicable', testResult.detail, mediaId);
  if (testResult.passed) return makeResult(rule, 'pass', testResult.detail, mediaId);
  return makeResult(rule, rule.level === 'block' ? 'fail' : 'warn', testResult.detail, mediaId);
}

function makeResult(rule, outcome, detail, mediaId) {
  return {
    rule_id: rule.id,
    title: rule.title,
    level: rule.level,
    scope: rule.scope,
    outcome,
    detail: detail || rule.message,
    message: rule.message,
    remediation: rule.remediation || '',
    media_id: mediaId
  };
}

function runTest(testId, artifact, media) {
  const test = TESTS[testId];
  if (!test) return { applicable: true, passed: false, detail: `No implementation exists for test “${testId}”.` };
  try {
    return test(artifact, media);
  } catch (error) {
    return { applicable: true, passed: false, detail: `Rule test error: ${error.message}` };
  }
}

const TESTS = {
  'artifact.identity.required': artifact => {
    const required = ['id', 'system', 'title', 'artifact_type', 'version', 'status', 'maintainer'];
    const missing = required.filter(key => !hasValue(artifact.identity?.[key]));
    return result(missing.length === 0, missing.length ? `Missing identity fields: ${missing.join(', ')}.` : 'Required identity fields are present.');
  },

  'artifact.provenance.required': artifact => {
    const required = ['source_name', 'source_type', 'verification_status'];
    const missing = required.filter(key => !hasValue(artifact.provenance?.[key]));
    return result(missing.length === 0, missing.length ? `Missing provenance fields: ${missing.join(', ')}.` : 'Source and verification state are declared.');
  },

  'artifact.epistemic.required': artifact => {
    const status = artifact.epistemic_status;
    const passed = hasValue(status?.classification) && hasValue(status?.confidence) && Array.isArray(status?.known) && Array.isArray(status?.missing);
    return result(passed, passed ? 'Epistemic classification, confidence, known, and missing fields are present.' : 'Classification, confidence, known, and missing fields are required.');
  },

  'artifact.human_review.declared': artifact => {
    const governance = artifact.human_governance;
    const passed = typeof governance?.human_review_required === 'boolean' && hasValue(governance?.review_status) && typeof governance?.override_available === 'boolean';
    return result(passed, passed ? `Human-review status: ${governance.review_status}.` : 'Human-review requirement, status, and override availability must be declared.');
  },

  'publication.public.reviewed': artifact => {
    if (artifact.publication_status !== 'public') return notApplicable('The record is not currently marked public.');
    if (artifact.human_governance?.human_review_required === false) return result(true, 'Human review is explicitly not required for this public record.');
    const accepted = ['reviewed', 'approved'];
    const passed = accepted.includes(artifact.human_governance?.review_status);
    return result(passed, passed ? 'Required human review is complete.' : `Public status conflicts with review status “${artifact.human_governance?.review_status || 'missing'}”.`);
  },

  'media.image.alt': (_artifact, media) => {
    if (media.type !== 'image') return notApplicable('This media item is not an image.');
    const passed = typeof media.alt === 'string';
    return result(passed, passed ? (media.alt.length ? 'Image alt text is present.' : 'Image is explicitly marked decorative with empty alt text.') : 'Image alt text is missing.');
  },

  'media.timed.transcript': (_artifact, media) => {
    if (!['video', 'audio'].includes(media.type)) return notApplicable('This media item is not timed audio or video.');
    const passed = hasValue(media.transcript) || hasValue(media.transcript_text);
    return result(passed, passed ? 'A transcript or equivalent textual description is available.' : 'No transcript or equivalent description is declared.');
  },

  'media.video.captions': (_artifact, media) => {
    if (media.type !== 'video') return notApplicable('This media item is not video.');
    const declared = media.accessibility && Object.prototype.hasOwnProperty.call(media.accessibility, 'captions_available');
    if (!declared) return result(false, 'Caption availability is not declared.');
    const captions = Array.isArray(media.captions) ? media.captions : [];
    const passed = media.accessibility.captions_available === false || media.accessibility.captions_available === 'not_applicable' || captions.length > 0;
    return result(passed, passed ? 'Caption status is declared and consistent with supplied tracks.' : 'Captions are marked available, but no caption track is supplied.');
  },

  'media.no_autoplay': (_artifact, media) => {
    const passed = media.playback?.autoplay === false;
    return result(passed, passed ? 'Autoplay is disabled.' : 'Autoplay must be explicitly disabled.');
  },

  'media.source_status.declared': (_artifact, media) => {
    const allowed = ['source', 'annotated', 'transformed', 'reconstructed', 'synthetic', 'fictional', 'unknown'];
    const passed = allowed.includes(media.source_status) && Array.isArray(media.provenance?.transformations);
    return result(passed, passed ? `Media is labeled “${media.source_status}” and transformations are declared.` : 'Source status or transformation history is missing.');
  },

  'media.analysis.semantic_fallback': (_artifact, media) => {
    if (!media.analysis_layer?.enabled) return notApplicable('No analysis layer is enabled.');
    const analysis = media.analysis_layer;
    const passed = analysis.source_media_remains_available === true && hasValue(analysis.accessible_alternative) && analysis.annotations_removable === true;
    return result(passed, passed ? 'The source media remains available and the analysis has a removable, textual alternative.' : 'The analysis layer needs a semantic source fallback, removable annotations, and a textual alternative.');
  },

  'artifact.accessibility.declared': artifact => {
    const accessibility = artifact.accessibility;
    const passed = accessibility && Object.prototype.hasOwnProperty.call(accessibility, 'keyboard_operable') && Object.prototype.hasOwnProperty.call(accessibility, 'reduced_motion_supported') && Array.isArray(accessibility.known_barriers);
    return result(passed, passed ? 'Accessibility status and known barriers are declared.' : 'Accessibility metadata is incomplete.');
  },

  'media.official.domain': artifact => {
    const official = artifact.provenance?.source_type === 'official_disclosure' || artifact.provenance?.source_type === 'official';
    if (!official) return notApplicable('This artifact is not labeled as an official source record.');
    const sourceUrl = artifact.provenance?.source_url || artifact.official_source || '';
    if (!sourceUrl) return result(false, 'Official-source labeling has no source URL.');
    if (sourceUrl.startsWith('./') || sourceUrl.startsWith('../') || sourceUrl.startsWith('/')) {
      const verifiedCache = ['verified', 'partially_verified'].includes(artifact.provenance?.verification_status);
      return result(verifiedCache, verifiedCache ? 'A local cache is accompanied by a verification state.' : 'A local official cache must preserve verification metadata.');
    }
    try {
      const hostname = new URL(sourceUrl).hostname.toLowerCase();
      const passed = APPROVED_OFFICIAL_HOSTS.includes(hostname) || hostname.endsWith('.mil');
      return result(passed, passed ? `Official source domain accepted: ${hostname}.` : `Unapproved official-source domain: ${hostname}.`);
    } catch {
      return result(false, 'The official source URL is invalid.');
    }
  },

  'artifact.returnability.declared': artifact => {
    const returnability = artifact.returnability;
    const passed = returnability && Object.prototype.hasOwnProperty.call(returnability, 'corrections_supported') && Object.prototype.hasOwnProperty.call(returnability, 'version_recovery_supported') && Object.prototype.hasOwnProperty.call(returnability, 'human_appeal_supported');
    return result(passed, passed ? 'Correction, version recovery, and appeal status are declared.' : 'Returnability metadata is incomplete.');
  },

  'artifact.ai.disclosed': artifact => {
    if (!artifact.ai_assist) return notApplicable('No AI assistance is declared for this artifact.');
    const passed = hasValue(artifact.ai_assist.task) && typeof artifact.ai_assist.human_verified === 'boolean';
    return result(passed, passed ? 'AI task and human-verification state are disclosed.' : 'AI assistance requires a task description and human-verification state.');
  }
};

function flattenMedia(items) {
  const flattened = [];
  for (const item of items) {
    flattened.push(item);
    if (Array.isArray(item.items)) flattened.push(...flattenMedia(item.items));
  }
  return flattened;
}

function result(passed, detail) {
  return { applicable: true, passed, detail };
}

function notApplicable(detail) {
  return { applicable: false, passed: true, detail };
}

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}
