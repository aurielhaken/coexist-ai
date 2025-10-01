/**
 * COEXIST.AI - Optimisations de Performance
 * Système de mise en cache et d'optimisation pour améliorer l'expérience utilisateur
 */

// Cache pour les réponses IA
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache pour les composants lourds
const componentCache = new Map<string, any>();

// Debounce pour les recherches
let searchTimeout: NodeJS.Timeout | null = null;

/**
 * Cache une réponse IA pour éviter les appels répétés
 */
export function cacheResponse(key: string, response: string): void {
  responseCache.set(key, {
    response,
    timestamp: Date.now()
  });
  
  // Nettoyer le cache si il devient trop volumineux
  if (responseCache.size > 100) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
}

/**
 * Récupère une réponse mise en cache
 */
export function getCachedResponse(key: string): string | null {
  const cached = responseCache.get(key);
  if (!cached) return null;
  
  // Vérifier si le cache n'est pas expiré
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    responseCache.delete(key);
    return null;
  }
  
  return cached.response;
}

/**
 * Génère une clé de cache basée sur le message et le contexte
 */
export function generateCacheKey(message: string, context: string = ''): string {
  const normalizedMessage = message.toLowerCase().trim();
  return `${normalizedMessage}_${context}`;
}

/**
 * Debounce pour les recherches et interactions
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    searchTimeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Lazy loading pour les composants lourds
 */
export function lazyLoadComponent<T>(
  componentName: string,
  loader: () => Promise<T>
): T | null {
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName);
  }
  
  // Charger le composant de manière asynchrone
  loader().then(component => {
    componentCache.set(componentName, component);
  });
  
  return null;
}

/**
 * Optimisation des images
 */
export function optimizeImage(src: string, width?: number, height?: number): string {
  // Ici, on pourrait intégrer un service d'optimisation d'images
  // Pour l'instant, on retourne l'URL originale
  return src;
}

/**
 * Préchargement des ressources critiques
 */
export function preloadCriticalResources(): void {
  // Précharger les polices
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = '/fonts/inter.woff2';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
  
  // Précharger les icônes critiques
  const iconLink = document.createElement('link');
  iconLink.rel = 'preload';
  iconLink.href = '/coexist-icon.svg';
  iconLink.as = 'image';
  document.head.appendChild(iconLink);
}

/**
 * Optimisation des animations
 */
export function optimizeAnimations(): void {
  // Désactiver les animations pour les utilisateurs qui préfèrent la réduction de mouvement
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--animation-iteration-count', '1');
  }
}

/**
 * Monitoring des performances
 */
export function trackPerformance(metricName: string, value: number): void {
  // En production, on pourrait envoyer ces métriques à un service d'analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${metricName} = ${value}ms`);
  }
}

/**
 * Optimisation de la mémoire
 */
export function cleanupMemory(): void {
  // Nettoyer les caches expirés
  const now = Date.now();
  for (const [key, value] of responseCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      responseCache.delete(key);
    }
  }
  
  // Nettoyer le cache des composants si il devient trop volumineux
  if (componentCache.size > 50) {
    const keysToDelete = Array.from(componentCache.keys()).slice(0, 25);
    keysToDelete.forEach(key => componentCache.delete(key));
  }
}

/**
 * Initialisation des optimisations
 */
export function initializePerformanceOptimizations(): void {
  // Précharger les ressources critiques
  preloadCriticalResources();
  
  // Optimiser les animations
  optimizeAnimations();
  
  // Nettoyer la mémoire toutes les 5 minutes
  setInterval(cleanupMemory, 5 * 60 * 1000);
  
  // Nettoyer la mémoire quand la page devient visible
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      cleanupMemory();
    }
  });
}

/**
 * Mesure du temps de réponse
 */
export function measureResponseTime<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  const startTime = performance.now();
  
  return operation().then(result => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    trackPerformance(operationName, duration);
    
    return result;
  });
}

/**
 * Compression des données
 */
export function compressData(data: any): string {
  // En production, on pourrait utiliser une vraie compression
  return JSON.stringify(data);
}

/**
 * Décompression des données
 */
export function decompressData<T>(compressedData: string): T {
  return JSON.parse(compressedData);
}

/**
 * Gestion des erreurs de performance
 */
export function handlePerformanceError(error: Error, context: string): void {
  console.error(`Performance Error in ${context}:`, error);
  
  // En production, on pourrait envoyer l'erreur à un service de monitoring
  if (process.env.NODE_ENV === 'production') {
    // Envoyer à un service comme Sentry, LogRocket, etc.
  }
}

// Initialiser les optimisations au chargement du module
if (typeof window !== 'undefined') {
  initializePerformanceOptimizations();
}
