'use client';

import { useState } from 'react';
import { Heart, Users, Lightbulb, Shield, MessageCircle, BookOpen } from 'lucide-react';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
}

const suggestions = [
  {
    id: 'conflict-resolution',
    title: 'Résolution de conflits',
    description: 'Techniques pour apaiser les tensions',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    suggestions: [
      'Comment gérer un conflit au travail ?',
      'Aider à la médiation familiale',
      'Techniques de communication non-violente',
      'Gérer les émotions dans un conflit'
    ]
  },
  {
    id: 'cultural-understanding',
    title: 'Compréhension culturelle',
    description: 'Bridger les différences culturelles',
    icon: Users,
    color: 'from-blue-500 to-indigo-500',
    suggestions: [
      'Promouvoir le dialogue interculturel',
      'Comprendre les différences religieuses',
      'Valeurs communes entre cultures',
      'Gérer les malentendus culturels'
    ]
  },
  {
    id: 'peaceful-communication',
    title: 'Communication pacifique',
    description: 'Améliorer vos relations',
    icon: MessageCircle,
    color: 'from-green-500 to-emerald-500',
    suggestions: [
      'Améliorer ma communication',
      'Écouter activement',
      'Exprimer mes besoins sans agressivité',
      'Gérer les conversations difficiles'
    ]
  },
  {
    id: 'spiritual-guidance',
    title: 'Guidance spirituelle',
    description: 'Sagesse universelle et paix intérieure',
    icon: BookOpen,
    color: 'from-purple-500 to-violet-500',
    suggestions: [
      'Citations inspirantes pour la paix',
      'Méditation pour la résolution de conflits',
      'Sagesse des différentes traditions',
      'Développer la compassion'
    ]
  },
  {
    id: 'practical-tools',
    title: 'Outils pratiques',
    description: 'Méthodes concrètes pour la paix',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    suggestions: [
      'Exercices de méditation guidée',
      'Techniques de respiration apaisante',
      'Jeux de rôle pour la résolution de conflits',
      'Outils de médiation'
    ]
  },
  {
    id: 'safety-support',
    title: 'Soutien et sécurité',
    description: 'Ressources en cas de besoin',
    icon: Shield,
    color: 'from-gray-500 to-slate-500',
    suggestions: [
      'Ressources d\'urgence',
      'Contacts de médiateurs professionnels',
      'Groupes de soutien locaux',
      'Techniques d\'autoprotection'
    ]
  }
];

export default function QuickSuggestions({ onSuggestionClick, className = '' }: QuickSuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Comment puis-je vous aider ? 🌟
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choisissez une catégorie ou explorez nos suggestions
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {suggestions.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            >
              <div className="card-modern p-4 text-center group-hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {category.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions détaillées */}
      {activeCategory && (
        <div className="animate-fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {suggestions.find(s => s.id === activeCategory)?.title}
              </h4>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="grid gap-2">
              {suggestions
                .find(s => s.id === activeCategory)
                ?.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSuggestionClick(suggestion);
                      setActiveCategory(null);
                    }}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Suggestions populaires */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
          Suggestions populaires 💫
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            'Comment gérer un conflit au travail ?',
            'Techniques de méditation pour la paix',
            'Améliorer la communication en famille',
            'Comprendre les différences culturelles',
            'Développer l\'empathie au quotidien'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-3 py-1.5 text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
