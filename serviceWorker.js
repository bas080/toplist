const e={undefined(e){console.error(`No action with name "${e.data.action}".`)},clearCache(){caches.keys().then(function(e){for(let t of e)caches.delete(t)})}};self.addEventListener("fetch",async({request:e})=>{try{let t=await caches.match(e);if(t)return t;return await fetch(e)}catch(e){throw console.error("Fetch error:",e),e}}),self.addEventListener("message",t=>{e[t.data.action](t)});
//# sourceMappingURL=serviceWorker.js.map
