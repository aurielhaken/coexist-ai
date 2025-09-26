// Service Worker pour COEXIST.AI
const CACHE_NAME = 'coexist-ai-v1.0.0';
const urlsToCache = [
  '/',
  '/about',
  '/test-comparison',
  '/coexist-icon-minimal.svg',
  '/coexist-logo-minimal.svg',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('COEXIST.AI: Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('COEXIST.AI: Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retourner la réponse du cache
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Vérifier si nous avons reçu une réponse valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cloner la réponse
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // En cas d'erreur réseau, retourner une page d'erreur
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Gestion des messages du client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notification push (pour futures fonctionnalités)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nouveau message de COEXIST.AI',
    icon: '/coexist-icon-minimal.svg',
    badge: '/coexist-icon-minimal.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ouvrir COEXIST.AI',
        icon: '/coexist-icon-minimal.svg'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/coexist-icon-minimal.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('COEXIST.AI - Message de Paix', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
