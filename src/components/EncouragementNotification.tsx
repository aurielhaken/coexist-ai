'use client';

import { useState, useEffect } from 'react';
import { Heart, Sparkles, CheckCircle } from 'lucide-react';

interface EncouragementNotificationProps {
  message: string;
  type?: 'success' | 'encouragement' | 'achievement';
  duration?: number;
  onClose?: () => void;
}

const encouragements = [
  "Bravo ! Vous faites un pas vers la paix 🌟",
  "Votre ouverture d'esprit est admirable 💙",
  "Chaque conversation est un pas vers l'harmonie ✨",
  "Votre bienveillance inspire les autres 🤝",
  "Merci de croire en un monde meilleur 🕊️",
  "Votre courage de dialoguer est remarquable 💪",
  "Ensemble, nous créons la paix 🌈",
  "Votre empathie fait la différence 💖"
];

export default function EncouragementNotification({ 
  message, 
  type = 'encouragement',
  duration = 4000,
  onClose 
}: EncouragementNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [randomEncouragement] = useState(
    encouragements[Math.floor(Math.random() * encouragements.length)]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'achievement':
        return <Sparkles className="w-6 h-6 text-yellow-500" />;
      default:
        return <Heart className="w-6 h-6 text-pink-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800';
      case 'achievement':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-fade-in-up">
      <div className={`max-w-sm p-4 rounded-2xl shadow-lg border ${getBackgroundColor()} backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {message || randomEncouragement}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                COEXIST.AI
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
