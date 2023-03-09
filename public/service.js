const currentCache = "23w10a1";
console.log(currentCache);
self.addEventListener("install", (evt) => {
  self.skipWaiting().then(r => undefined);
  evt.waitUntil(caches.open(currentCache).then((cache) => {
    return cache.addAll([

    ]);
  }));
});

self.addEventListener("fetch", (evt) => {
  const url = new URL(evt.request.url);
  const isIndex = url.host === "limestart.cn" && url.pathname === "/";
  evt.respondWith(caches.match(
    isIndex ? "index-copy" : evt.request
  ).then((response) => {
    return response || fetch(evt.request).catch(() => 0);
  }).then((data) => {
    return data || new Response(null, {
      status: 502,
      statusText: "Bad Gateway"
    });
  }));
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (cacheName !== currentCache) {
        return caches.delete(cacheName);
      }
    }));
  }));
});