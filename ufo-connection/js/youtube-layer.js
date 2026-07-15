const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export async function loadBeautifulDisclosure(url = './data/beautiful-disclosure.json') {
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export function extractYouTubeEmbedUrl(value) {
  if (!value) return '';
  const text = String(value).trim();
  let id = YOUTUBE_ID.test(text) ? text : '';
  if (!id) {
    try {
      const url = new URL(text);
      if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
      else if (url.hostname.endsWith('youtube.com')) id = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop();
    } catch {
      return '';
    }
  }
  return YOUTUBE_ID.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : '';
}
