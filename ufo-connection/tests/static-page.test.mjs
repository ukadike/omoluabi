import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const index = await readFile(resolve(root, 'index.html'), 'utf8');
const detail = await readFile(resolve(root, 'case.html'), 'utf8');
const app = await readFile(resolve(root, 'js/curated-case.js'), 'utf8');
const data = JSON.parse(await readFile(resolve(root, 'data/curated-cases.json'), 'utf8'));

assert.ok(index.includes('The Unseen Record'));
assert.ok(index.includes('This is not a sightings database.'));
assert.equal(/<(?:input|select|button)\b/i.test(index), false, 'The public index must not expose search, filters, upload, or voting controls.');
assert.ok(detail.includes('id="case-content"'));
assert.ok(app.includes('www.dvidshub.net/video/embed/'));
assert.equal(data.cases.length, 4, 'Expected four curated case readings.');

for (const record of data.cases) {
  assert.ok(record.source.dvidsVideoId, `${record.id} needs a DVIDS video ID.`);
  assert.ok(record.source.dvidsUrl.startsWith('https://www.dvidshub.net/video/'), `${record.id} needs an official DVIDS source URL.`);
  assert.ok(record.reading.cards.some(card => card.label === 'WHAT IT DOES NOT ESTABLISH' || card.label === 'WHAT REMAINS OUTSIDE THE RELEASE' || card.label === 'WHAT IS STILL LIMITED'), `${record.id} must state a limitation.`);
  assert.ok(record.ledger.some(item => item.state === 'Protected uncertainty'), `${record.id} must preserve protected uncertainty.`);
}

assert.equal(/autoplay\s*(?:=|\b)/i.test(`${index}\n${detail}\n${app}`), false, 'Media must not autoplay.');
assert.equal(app.includes('innerHTML'), false, 'Curated case rendering must use safe DOM text nodes.');

console.log('static-page.test.mjs: passed');
