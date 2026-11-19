/* Service worker do Cockpit Transportes: guarda a "casca" da app para abrir sem rede.
   Nunca guarda em cache pedidos ao Google (entrada, Drive, Sheets): esses vão sempre à rede. */
const VERSAO = "cockpit-v2.2.3";
const CASCA = ["./", "./index.html", "./app.js?v=2.2.3", "./config.js?v=2.2.3", "./tailwind.css?v=2.2.3", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCA)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", ev => {
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Google e outros: só rede
  // rede primeiro (para receber atualizações do GitHub), cache se não houver rede
  ev.respondWith(
    fetch(req, { cache: "no-cache" }).then(r => { if (r && r.ok) { const c = r.clone(); caches.open(VERSAO).then(x => x.put(req, c)); } return r; })
      .catch(() => caches.match(req).then(m => m || caches.match("./index.html")))
  );
});
