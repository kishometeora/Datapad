/* Datapad offline cache — bump VERSION whenever files change */
const VERSION="datapad-imperial-v24";
const FILES=["./","index.html","manifest.json","icon-180.png","icon-512.png",
  "fonts/orbitron-900.woff2","fonts/orbitron-700.woff2","fonts/aurebesh-canon.otf",
  "emblems/imperial.png","emblems/rebel.png","emblems/deathstar.png","emblems/r2.png","emblems/c3po.png","emblems/cogbird.png","suspects/_placeholder.png","suspects/cassian.png","suspects/kenobi.png","suspects/kenobiold.png","suspects/luke.png","suspects/lukeold.png","suspects/hansolo.png","suspects/han.png","suspects/hanold.png","suspects/leia.png","suspects/leiaold.png","suspects/lando.png","suspects/landoold.png","suspects/landorise.png","suspects/qira.png","suspects/monmothma.png","suspects/chirrut.png","suspects/bodhi.png","suspects/wedge.png","suspects/wedgeold.png","suspects/biggs.png","suspects/rieekan.png","suspects/owenyoung.png","suspects/owen.png","suspects/owenold.png","suspects/beruyoung.png","suspects/beru.png","suspects/beruold.png","suspects/quigon.png","suspects/mace.png","suspects/saw.png","suspects/jyn.png","suspects/ahsoka.png","suspects/hera.png","suspects/sabine.png","suspects/bix.png","suspects/vel.png","suspects/fennec.png","suspects/rose.png","suspects/baze.png","suspects/finn.png","suspects/poe.png","suspects/bail.png","suspects/chewie.png","suspects/yoda.png","suspects/jarjar.png","extras/datapad-wallpaper.png","emblems/republic.svg","emblems/jedi.svg"];
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
