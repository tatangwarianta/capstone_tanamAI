let currentHash = '';
const CACHE_NAME = 'story-app-shell-v9';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.bundle.js',
  '/styles/main.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline.html',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log('[SW] Cached:', url);
        } catch (err) {
          console.error('[SW] Failed to cache:', url, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (
    url.includes('hot-update') ||
    url.includes('webpack-dev-server') ||
    url.includes('__webpack')
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      // Jika permintaan gambar, coba cache-first
      if (event.request.destination === 'image') {
        const cachedImage = await caches.match(event.request);
        if (cachedImage) return cachedImage;
      }

      try {
        const networkResponse = await fetch(event.request);

        if (event.request.method === 'GET') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch (err) {
        const cachedResponse = await caches.match(event.request);

        // Fallback khusus untuk login/register
        if (
          url.includes('/login') ||
          url.includes('/register') ||
          url.endsWith('/') ||
          url.endsWith('/index.html')
        ) {
          return caches.match('/index.html');
        }

        // Fallback halaman offline
        if (!cachedResponse && event.request.destination === 'document') {
          return caches.match('/offline.html');
        }

        return cachedResponse || new Response('', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      }
    })()
  );
});

self.addEventListener('push', event => {
  let title = 'Notifikasi Baru';
  let options = { body: 'Ada pesan baru!' };

  if (event.data) {
    try {
      const data = event.data.json();
      title = data.title || title;
      options.body = data.body || options.body;
    } catch (error) {
      console.warn('[SW] Push data bukan JSON. Menggunakan text() sebagai body.');
      options.body = event.data.text();
    }
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('message', event => {
  const { type, payload, hash } = event.data || {};

  switch (type) {
    case 'SHOW_LOCAL_NOTIFICATION':
      if (payload) {
        const { title, options } = payload;
        event.waitUntil(
          self.registration.showNotification(title, options)
        );
      }
      break;

    case 'UPDATE_HASH':
      currentHash = hash;
      console.log('[SW] Hash diperbarui:', currentHash);
      break;

    default:
      console.warn('[SW] Tidak dikenal:', type);
  }
});
