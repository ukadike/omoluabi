export function extractYouTubeEmbedUrl(input) {
  if (!input) return null;
  const value = String(input).trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return `https://www.youtube-nocookie.com/embed/${match[1]}`;
  }
  return null;
}

export async function loadBeautifulDisclosure() {
  const response = await fetch('./data/beautiful-disclosure.json');
  if (!response.ok) return [];
  const data = await response.json();
  const items = Array.isArray(data.items) ? data.items : [];
  return items.filter(item => extractYouTubeEmbedUrl(item.youtube || item.url || item.videoId));
}
