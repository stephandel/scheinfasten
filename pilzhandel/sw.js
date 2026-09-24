/* Grabstein-Service-Worker.
   Pilz Handel liegt jetzt unter https://stephandel.github.io/heilpilze/pilzhandel/.
   Dieser Worker meldet sich selbst ab und löscht seine Caches, damit bereits
   installierte Kopien nicht dauerhaft die alte Fassung ausliefern. Er hat bewusst
   keinen fetch-Handler: Anfragen gehen ans Netz und landen bei der Weiterleitung. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
