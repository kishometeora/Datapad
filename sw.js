/* Datapad offline cache — bump VERSION whenever files change */
const VERSION="datapad-imperial-v7";
const FILES=["./","index.html","manifest.json","icon-180.png","icon-512.png",
  "fonts/orbitron-900.woff2","fonts/orbitron-700.woff2","fonts/aurebesh-canon.otf",
  "emblems/imperial.png","emblems/rebel.png","emblems/deathstar.png","emblems/r2.png","emblems/c3po.png","emblems/republic.svg","emblems/jedi.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n)))));self.clients.claim()});
/* cache first (instant, works with no signal); refresh the cache in the background when online */
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(VERSION).then(x=>x.put(e.request,c))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
