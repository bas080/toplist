const e="toplist-v1",t=["/","/index.html","/toplist/","/toplist/index.html"];self.addEventListener("install",a=>{a.waitUntil(caches.open(e).then(e=>{e.addAll(t)}))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))}),self.addEventListener("message",t=>{t.data&&"clearCache"===t.data.action&&caches.delete(e).then(()=>{console.log(`${e} cache cleared`)})});
//# sourceMappingURL=serviceWorker.js.map
