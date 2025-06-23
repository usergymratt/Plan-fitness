const CACHE_NAME = 'plan-pro-cache-v1';
const urlsToCache = [
  '/',
  'index.html'
];

// Instala el service worker y guarda los archivos base en la caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Sirve el contenido desde la caché cuando no hay conexión
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en la caché, lo devuelve.
        if (response) {
          return response;
        }
        // Si no, lo busca en la red.
        return fetch(event.request);
      })
  );
});
