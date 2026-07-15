import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const samples = JSON.parse(await readFile(resolve(root, 'data/sample-records.json'), 'utf8'));
const types = new Set();

for (const record of samples.records) {
  for (const media of record.media || []) {
    types.add(media.type);
    await verifyItem(media);
  }
}

for (const requiredType of ['image', 'video', 'audio', 'slideshow']) {
  assert.ok(types.has(requiredType), `Missing demonstration media type: ${requiredType}`);
}

async function verifyItem(item) {
  if (item.src?.startsWith('./')) await assertFile(item.src);
  if (item.poster?.startsWith('./')) await assertFile(item.poster);
  if (item.transcript?.startsWith('./')) await assertFile(item.transcript);
  for (const track of item.captions || []) if (track.src?.startsWith('./')) await assertFile(track.src);
  for (const child of item.items || []) await verifyItem(child);
  assert.equal(item.playback?.autoplay, false, `${item.id} must not autoplay.`);
  if (item.type === 'image') assert.equal(typeof item.alt, 'string', `${item.id} requires alt text.`);
  if (['video', 'audio'].includes(item.type)) assert.ok(item.transcript || item.transcript_text, `${item.id} requires a transcript.`);
}

async function assertFile(relative) {
  const path = resolve(root, relative.replace(/^\.\//, ''));
  await access(path, constants.R_OK);
}

console.log('media-data.test.mjs: passed');
