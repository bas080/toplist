(()=>{JSON.parse('{"name":"toplist","version":"0.0.0","author":"","license":"ISC","description":"","dependencies":{"js-levenshtein":"^1.1.6","lit-html":"^3.1.4","qrcode-svg":"^1.1.0","unique-names-generator":"^4.7.1"},"devDependencies":{"@parcel/packager-raw-url":"^2.12.0","@parcel/transformer-webmanifest":"^2.12.0"},"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","build":"npx parcel build --public-url /toplist","serve":"npx parcel serve"},"targets":{"default":{"source":["./index.html"]}}}').version;let e={undefined(e){console.error(`No action with name "${e.data.action}".`)},clearCache(){caches.keys().then(function(e){for(let t of e)caches.delete(t)})}};self.addEventListener("fetch",async({request:e})=>{try{let t=await caches.match(e);if(t)return t;return await fetch(e)}catch(e){throw console.error("Fetch error:",e),e}}),self.addEventListener("message",t=>{e[t.data.action](t)})})();
//# sourceMappingURL=service-worker.js.map