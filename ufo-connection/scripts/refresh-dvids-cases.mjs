import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const apiKey = process.env.DVIDS_API_KEY;
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(scriptDirectory, '..', 'data', 'curated-cases.json');

if (!apiKey) {
  console.log('DVIDS_API_KEY is not configured; curated source metadata was not refreshed.');
  process.exit(0);
}

const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
const cases = Array.isArray(data.cases) ? data.cases : [];
const refreshedAt = new Date().toISOString();

for (const record of cases) {
  const metadata = await getAsset(record.source.dvidsVideoId);
  record.source.lastCheckedAt = refreshedAt;

  if (metadata.unavailable) {
    record.source.available = false;
    record.source.availabilityNote = 'DVIDS did not make this asset available during the most recent source check.';
    continue;
  }

  record.source.available = true;
  delete record.source.availabilityNote;
  record.source.apiMetadata = {
    assetId: metadata.id,
    title: metadata.title,
    sourceUpdatedAt: metadata.timestamp || null,
    sourcePublishedAt: metadata.date_published || null,
    durationSeconds: metadata.duration ?? null,
    captionsAvailable: Array.isArray(metadata.closed_caption_urls) && metadata.closed_caption_urls.length > 0,
    sourceUrl: metadata.url || record.source.dvidsUrl
  };
}

data.updatedAt = refreshedAt;
await fs.writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Refreshed official DVIDS metadata for ${cases.length} curated case(s).`);

async function getAsset(videoId) {
  const url = new URL('https://api.dvidshub.net/asset');
  url.searchParams.set('id', `video:${videoId}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('fields', 'id,title,timestamp,date_published,duration,closed_caption_urls,url');

  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (response.status === 403 || response.status === 404) return { unavailable: true };
  if (!response.ok) throw new Error(`DVIDS asset ${videoId} could not be refreshed: ${response.status} ${response.statusText}`);

  const body = await response.json();
  if (!body?.results?.id) throw new Error(`DVIDS asset ${videoId} returned no published result.`);
  return body.results;
}
