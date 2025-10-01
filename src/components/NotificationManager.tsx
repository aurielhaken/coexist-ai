'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Settings, CheckCircle } from 'lucide-react';

export function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Vérifier le support des notifications
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }

    // Vérifier l'état d'abonnement
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'abonnement:', error);
      }
    }
  };

  const requestPermission = async () => {
    if (!isSupported) return;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        await subscribeToNotifications();
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
    }
  };

  const subscribeToNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Clé publique VAPID (en production, utilisez une vraie clé)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI0FyHdQN4x4gE';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      });

      // Envoyer l'abonnement au serveur
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      setIsSubscribed(true);
      console.log('✅ Abonnement aux notifications réussi');
    } catch (error) {
      console.error('Erreur lors de l\'abonnement:', error);
    }
  };

  const unsubscribeFromNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        
        // Notifier le serveur
        await fetch('/api/notifications/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });

        setIsSubscribed(false);
        console.log('✅ Désabonnement réussi');
      }
    } catch (error) {
      console.error('Erreur lors du désabonnement:', error);
    }
  };

  const sendTestNotification = async () => {
    if (permission === 'granted') {
      new Notification('COEXIST.AI - Test', {
        body: 'Ceci est une notification de test de COEXIST.AI',
        icon: '/icon-192.svg',
        badge: '/icon-72.svg',
        tag: 'test-notification',
        requireInteraction: true,
        actions: [
          {
            action: 'open',
            title: 'Ouvrir l\'app'
          }
        ]
      });
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <BellOff className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-800">
            Les notifications ne sont pas supportées sur ce navigateur
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Notifications
        </h3>
      </div>

      <div className="space-y-4">
        {/* Statut des permissions */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              permission === 'granted' ? 'bg-green-500' : 
              permission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">
              Permission: {permission === 'granted' ? 'Autorisée' : 
                          permission === 'denied' ? 'Refusée' : 'En attente'}
            </span>
          </div>
          
          {permission === 'default' && (
            <button
              onClick={requestPermission}
              className="px-3 py-1 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-colors"
            >
              Autoriser
            </button>
          )}
        </div>

        {/* Statut de l'abonnement */}
        {permission === 'granted' && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${
                isSubscribed ? 'text-green-500' : 'text-gray-400'
              }`} />
              <span className="text-sm font-medium text-gray-700">
                Abonnement: {isSubscribed ? 'Actif' : 'Inactif'}
              </span>
            </div>
            
            <button
              onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                isSubscribed 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isSubscribed ? 'Désabonner' : 'S\'abonner'}
            </button>
          </div>
        )}

        {/* Test de notification */}
        {permission === 'granted' && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-800">
              Tester les notifications
            </span>
            <button
              onClick={sendTestNotification}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
            >
              Envoyer test
            </button>
          </div>
        )}

        {/* Types de notifications */}
        {permission === 'granted' && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Types de notifications disponibles :
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                Rappels de méditation quotidienne
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                Conseils de paix personnalisés
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                Citations inspirantes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                Mises à jour de l'application
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {permission === 'denied' && (
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-red-800">
              Les notifications ont été refusées. Pour les activer, allez dans les paramètres de votre navigateur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
