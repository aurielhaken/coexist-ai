'use client';

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Heart, BarChart3, Lightbulb } from 'lucide-react';
import { getLearningInsights } from '@/lib/learning-system';

interface LearningInsight {
  totalInteractions: number;
  averageEffectiveness: number;
  topPatterns: Array<{
    pattern: string;
    context: string;
    effectiveResponse: string;
    successRate: number;
    usageCount: number;
    lastUsed: string;
  }>;
  improvementAreas: string[];
  userSatisfaction: number;
}

export function LearningInsights() {
  const [insights, setInsights] = useState<LearningInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = getLearningInsights();
        setInsights(data);
      } catch (error) {
        console.error('Erreur lors du chargement des insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInsights();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Aucune donnée d'apprentissage disponible
        </h3>
        <p className="text-gray-500 text-sm">
          Les insights apparaîtront après quelques interactions
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Insights d'Apprentissage
        </h3>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {insights.totalInteractions}
          </div>
          <div className="text-sm text-purple-700">Interactions</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {Math.round(insights.averageEffectiveness)}%
          </div>
          <div className="text-sm text-green-700">Efficacité</div>
        </div>
        
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {insights.topPatterns.length}
          </div>
          <div className="text-sm text-blue-700">Patterns</div>
        </div>
        
        <div className="text-center p-4 bg-pink-50 rounded-lg">
          <div className="text-2xl font-bold text-pink-600 mb-1">
            {Math.round(insights.userSatisfaction)}%
          </div>
          <div className="text-sm text-pink-700">Satisfaction</div>
        </div>
      </div>

      {/* Patterns les plus efficaces */}
      {insights.topPatterns.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Patterns les Plus Efficaces
          </h4>
          <div className="space-y-3">
            {insights.topPatterns.slice(0, 3).map((pattern, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {pattern.context}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {Math.round(pattern.successRate)}% de réussite
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {pattern.effectiveResponse.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Utilisé {pattern.usageCount} fois</span>
                  <span>•</span>
                  <span>Dernière utilisation: {new Date(pattern.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zones d'amélioration */}
      {insights.improvementAreas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Zones d'Amélioration
          </h4>
          <div className="space-y-2">
            {insights.improvementAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommandations */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          Recommandations
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          {insights.averageEffectiveness < 70 && (
            <p>• Continuez à interagir pour améliorer la personnalisation</p>
          )}
          {insights.userSatisfaction < 80 && (
            <p>• N'hésitez pas à donner votre feedback sur les réponses</p>
          )}
          {insights.topPatterns.length < 3 && (
            <p>• Explorez différents types de questions pour enrichir l'apprentissage</p>
          )}
          <p>• Utilisez les fonctionnalités de méditation pour le bien-être</p>
          <p>• Activez l'interface vocale pour une expérience plus naturelle</p>
        </div>
      </div>
    </div>
  );
}
