const C='palmadapp-v6';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./manifest.webmanifest','./icon-192.png','./apple-touch-icon.png','./pdf-lib.min.js?v=1.17.1'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return}
 if(/(^|\.)gstatic\.com$|fonts\.googleapis\.com$/.test(u.hostname)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok&&res.type!=='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))}});
