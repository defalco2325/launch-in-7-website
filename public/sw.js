const CACHE_NAME = 'launchin7-v1';
const STATIC_CACHE_NAME = 'launchin7-static-v1';

// Cache static assets aggressively
const STATIC_ASSETS = [
  '/',
  '/assets/index.css',
  '/assets/index.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap',
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy: Cache first for static assets, network first for API calls
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Static assets: Cache first
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'font' ||
      url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches.open(STATIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
    return;
  }

  // API calls: Network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // HTML pages: Network first with cache fallback
  event.respondWith(
    fetch(request).then((response) => {
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseClone);
      });
      return response;
    }).catch(() => {
      return caches.match(request);
    })
  );
});