'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Clock, Sparkles, TrendingUp } from 'lucide-react';

interface PeaceMetricsProps {
  messageCount: number;
  sessionDuration: number; // en minutes
  className?: string;
}

export default function PeaceMetrics({ messageCount, sessionDuration, className = '' }: PeaceMetricsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Afficher les métriques après 3 messages
    if (messageCount >= 3) {
      setIsVisible(true);
    }
  }, [messageCount]);

  if (!isVisible) return null;

  const peaceScore = Math.min(100, Math.floor((messageCount * 10) + (sessionDuration * 2)));
  const level = peaceScore >= 80 ? 'Expert' : peaceScore >= 60 ? 'Avancé' : peaceScore >= 40 ? 'Intermédiaire' : 'Débutant';
  const levelColor = peaceScore >= 80 ? 'text-purple-600' : peaceScore >= 60 ? 'text-blue-600' : peaceScore >= 40 ? 'text-green-600' : 'text-yellow-600';

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-200 dark:border-gray-600 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
          Votre Score de Paix
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${levelColor} bg-white/50 dark:bg-gray-800/50`}>
          {level}
        </div>
      </div>

      <div className="space-y-4">
        {/* Score principal */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {peaceScore}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${peaceScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Points de paix accumulés
          </p>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {messageCount}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Messages échangés
            </div>
          </div>

          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {sessionDuration}m
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Temps de réflexion
            </div>
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
          <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {peaceScore >= 80 
              ? "🌟 Vous êtes un véritable artisan de paix !"
              : peaceScore >= 60
              ? "💙 Votre engagement pour la paix est remarquable !"
              : peaceScore >= 40
              ? "✨ Vous progressez bien dans votre chemin vers la paix !"
              : "🌱 Chaque conversation vous rapproche de la paix !"
            }
          </p>
        </div>

        {/* Prochain objectif */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>
              Prochain niveau : {Math.ceil((peaceScore + 1) / 20) * 20} points
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
