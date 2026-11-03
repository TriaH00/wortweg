const V='ww-shell-5.0.0';
const SHELL=['./','index.html','style.css','app.js','data.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','fonts/barlow-latin-400-normal.woff2','fonts/barlow-latin-500-normal.woff2','fonts/barlow-latin-600-normal.woff2','fonts/barlow-semi-condensed-latin-600-normal.woff2','fonts/barlow-semi-condensed-latin-700-normal.woff2','fonts/literata-latin-wght-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('ww-shell')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.includes('/audio/')||/\/tts\/(ort|phon|voice)/.test(u.pathname)){e.respondWith(caches.open('ww-media').then(async c=>{const r=await c.match(e.request,{ignoreSearch:true});if(r)return r;const n=await fetch(e.request);if(n.ok)c.put(e.request,n.clone());return n}));return}
  if(u.pathname.includes('/tts/'))return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const net=fetch(e.request).then(n=>{if(n.ok)caches.open(V).then(c=>c.put(e.request,n.clone()));return n}).catch(()=>r||caches.match('index.html'));return r||net}))});
