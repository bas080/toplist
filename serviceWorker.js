const staticTopList = "toplist-v1";

const actions = {
  undefined(event) {
    console.error(`No action with name "${event.data.action}".`)
  },
  clearCache() {
    caches.keys().then(function(names) {
      for (let name of names)
        caches.delete(name);
    });
  }
}

self.addEventListener("fetch", async ({request}) => {
  try {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) return cachedResponse;

    return await fetch(request);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
});

// Listen for messages from clients
self.addEventListener("message", (event) => {
  actions[event.data.action](event)
});

