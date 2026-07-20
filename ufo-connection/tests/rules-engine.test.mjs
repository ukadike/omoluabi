import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { normalizeRecord } from '../js/data-normalizer.js';
import { evaluateArtifact } from '../js/ssl-rules-engine.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const repoRoot = resolve(root, '..');
const samples = JSON.parse(await readFile(resolve(root, 'data/sample-records.json'), 'utf8'));
const rules = JSON.parse(await readFile(resolve(repoRoot, 'rules/ssl-rules.v1.json'), 'utf8'));

assert.equal(rules.rule_set_id, 'ssl-rules');
assert.ok(rules.rules.length >= 15, 'Expected the full SSL v1 rule set.');
assert.ok(samples.records.length >= 2, 'Expected at least two demonstration records.');

for (const [index, raw] of samples.records.entries()) {
  const record = normalizeRecord(raw, index);
  const evaluation = evaluateArtifact(record, rules);
  assert.equal(evaluation.summary.fail, 0, `${record.title} has blocking rule failures:\n${evaluation.results.filter(item => item.outcome === 'fail').map(item => `${item.rule_id}: ${item.detail}`).join('\n')}`);
  assert.equal(record.publication_status, 'public');
  assert.equal(record.human_governance.review_status, 'approved');
}

console.log('rules-engine.test.mjs: passed');
