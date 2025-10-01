'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, Laptop } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'mobile' | 'desktop' | 'unknown'>('unknown');

  useEffect(() => {
    // Détecter la plateforme
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'mobile';
      } else if (/windows|macintosh|linux/i.test(userAgent)) {
        return 'desktop';
      }
      return 'unknown';
    };

    setPlatform(detectPlatform());

    // Vérifier si l'app est déjà installée
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      
      // Vérifier si l'app est dans la liste des apps installées
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(() => {
          // L'app peut être installée
          setShowInstallPrompt(true);
        });
      }
    };

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    checkIfInstalled();

    // Nettoyer les écouteurs
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ Utilisateur a accepté l\'installation');
      } else {
        console.log('❌ Utilisateur a refusé l\'installation');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Ne plus montrer pendant cette session
    sessionStorage.setItem('install-prompt-dismissed', 'true');
  };

  // Ne pas afficher si déjà installée ou si l'utilisateur a refusé
  if (isInstalled || !showInstallPrompt || sessionStorage.getItem('install-prompt-dismissed')) {
    return null;
  }

  const getPlatformIcon = () => {
    switch (platform) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      case 'desktop':
        return <Monitor className="w-6 h-6" />;
      default:
        return <Laptop className="w-6 h-6" />;
    }
  };

  const getPlatformText = () => {
    switch (platform) {
      case 'mobile':
        return 'Installer l\'app mobile';
      case 'desktop':
        return 'Installer l\'app desktop';
      default:
        return 'Installer l\'application';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
            {getPlatformIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {getPlatformText()}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Installez COEXIST.AI pour un accès rapide et une expérience optimale
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-1"
              >
                <Download className="w-3 h-3" />
                Installer
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Avantages de l'installation */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              Accès hors ligne
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              Notifications
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              Lancement rapide
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              Interface native
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}