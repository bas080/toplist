const staticTopList = "toplist-v1";
const assets = [
  "/",
  "/index.html",
  "/toplist/",
  "/toplist/index.html",
  // Add more assets as needed
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticTopList).then((cache) => {
      cache.addAll(assets);
    }),
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    }),
  );
});

// Listen for messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "clearCache") {
    caches.delete(staticTopList).then(() => {
      console.log(`${staticTopList} cache cleared`);
    });
  }
});
