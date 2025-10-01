// COEXIST.AI - Service Worker
// Cache intelligent pour l'application PWA

const CACHE_NAME = 'coexist-ai-v1.0.0';
const STATIC_CACHE = 'coexist-ai-static-v1.0.0';
const DYNAMIC_CACHE = 'coexist-ai-dynamic-v1.0.0';

// Ressources à mettre en cache au moment de l'installation
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/coexist-icon.svg',
  '/coexist-logo.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/_next/static/css/',
  '/_next/static/js/'
];

// Ressources dynamiques à mettre en cache
const DYNAMIC_ASSETS = [
  '/api/chat',
  '/api/search',
  '/api/advice'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation en cours...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation terminée');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Erreur lors de l\'installation', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation en cours...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Suppression de l\'ancien cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation terminée');
        return self.clients.claim();
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Stratégie de cache pour les API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Stratégie de cache pour les ressources statiques
  if (request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'image') {
    event.respondWith(handleStaticRequest(request));
    return;
  }
  
  // Stratégie de cache pour les autres ressources
  event.respondWith(handleOtherRequest(request));
});

// Gestion des requêtes API avec cache intelligent
async function handleApiRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Pour les requêtes GET, vérifier le cache d'abord
  if (request.method === 'GET' && cachedResponse) {
    const cacheDate = cachedResponse.headers.get('sw-cache-date');
    const cacheAge = Date.now() - new Date(cacheDate).getTime();
    
    // Utiliser le cache si il a moins de 5 minutes
    if (cacheAge < 5 * 60 * 1000) {
      console.log('📱 Service Worker: Utilisation du cache API');
      return cachedResponse;
    }
  }
  
  try {
    // Faire la requête réseau
    const networkResponse = await fetch(request);
    
    // Mettre en cache les réponses réussies
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      responseToCache.headers.set('sw-cache-date', new Date().toISOString());
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('🌐 Service Worker: Erreur réseau', error);
    
    // Retourner la réponse en cache si disponible
    if (cachedResponse) {
      console.log('📱 Service Worker: Fallback vers le cache');
      return cachedResponse;
    }
    
    // Retourner une réponse d'erreur personnalisée
    return new Response(
      JSON.stringify({
        error: 'Service temporairement indisponible',
        message: 'Veuillez vérifier votre connexion internet'
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Gestion des ressources statiques
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('📁 Service Worker: Erreur pour ressource statique', error);
    return new Response('Ressource non disponible', { status: 404 });
  }
}

// Gestion des autres requêtes
async function handleOtherRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('🔗 Service Worker: Erreur pour autre requête', error);
    return new Response('Ressource non disponible', { status: 404 });
  }
}

// Gestion des messages du client
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
      
    case 'GET_CACHE_STATUS':
      getCacheStatus().then(status => {
        event.ports[0].postMessage(status);
      });
      break;
      
    default:
      console.log('📨 Service Worker: Message non reconnu', type);
  }
});

// Nettoyer tous les caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('🧹 Service Worker: Tous les caches ont été nettoyés');
}

// Obtenir le statut du cache
async function getCacheStatus() {
  const cacheNames = await caches.keys();
  const status = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    status[cacheName] = keys.length;
  }
  
  return status;
}

// Gestion des notifications push (pour les futures fonctionnalités)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192.svg',
      badge: '/icon-72.svg',
      vibrate: [200, 100, 200],
      data: data.data,
      actions: [
        {
          action: 'open',
          title: 'Ouvrir COEXIST.AI',
          icon: '/icon-72.svg'
        },
        {
          action: 'close',
          title: 'Fermer',
          icon: '/icon-72.svg'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('🌟 Service Worker COEXIST.AI chargé avec succès !');