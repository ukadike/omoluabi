import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const app = await readFile(resolve(root, 'js/app.js'), 'utf8');
const media = await readFile(resolve(root, 'js/ssl-media-field.js'), 'utf8');

for (const id of ['main-content', 'data-status', 'rules-status', 'records', 'overview', 'public-discourse']) {
  assert.ok(html.includes(`id="${id}"`), `index.html is missing #${id}.`);
}
assert.ok(html.includes('SSL Media Schema Card'));
assert.ok(app.includes('evaluateArtifact'));
assert.ok(media.includes("customElements.define('ssl-media-field'"));
assert.ok(!/<(?:video|audio)[^>]*\sautoplay(?:\s|=|>)/i.test(html));

console.log('static-page.test.mjs: passed');
