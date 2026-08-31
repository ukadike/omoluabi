document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('a[href]').forEach(a=>{
    const raw=a.getAttribute('href');
    if(!raw||/^(https?:|mailto:|tel:|#)/i.test(raw))return;
    const hash=raw.includes('#')?raw.slice(raw.indexOf('#')):'';
    const clean=hash?raw.slice(0,raw.indexOf('#')):raw;
    if(!/\.md$/i.test(clean))return;
    const path=clean.replace(/^\.\//,'').replace(/\.md$/i,'');
    a.setAttribute('href','document.html?path='+encodeURIComponent(path)+hash);
  });
});
