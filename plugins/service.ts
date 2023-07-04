import type { Plugin } from "vite";
import * as fs from "fs";


function writeServiceWorker(caches: string[]): void {
    const data = `
const version = "1.0";

self.addEventListener("install", (evt) => {
  self.skipWaiting().then(r => undefined);
  evt.waitUntil(caches.open(version).then((cache) => {
    return cache.addAll(${JSON.stringify(caches)});
  }));
});

self.addEventListener("fetch", (evt) => {
  const url = new URL(evt.request.url);
  evt.respondWith(caches.match(
    (url.host === "fystart.deeptrain.net" && url.pathname === "/") ? "index" : evt.request
  ).then((response) => {
    return response || fetch(evt.request).catch(() => 0);
  }).then((data) => {
    return data || new Response(null, { status: 502, statusText: "Bad Gateway" });
  }));
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (cacheName !== version) return caches.delete(cacheName);
    }));
  }));
});`
    fs.writeFile('./dist/service.js', data, 'utf8', () => 0);

}
export default function serviceWorkerPlugin(): Plugin {
    return {
        name: 'vite:service-worker',
        closeBundle () {
            fs.readFile('./dist/manifest.json', 'utf8', (err, data) => {
                if (err) throw err; /** @ts-ignore **/
                const caches = Object.values(JSON.parse(data)).map((data: {file: string}) => data['file']);
                caches.push("background.webp", "favicon.ico", "index");
                writeServiceWorker(caches);
            })
        }
    }
}
