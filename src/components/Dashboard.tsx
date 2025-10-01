'use client';

import { useState } from 'react';
import { BarChart3, Brain, Heart, Users, TrendingUp, Settings } from 'lucide-react';
import { LearningInsights } from './LearningInsights';
import { MeditationGuide } from './MeditationGuide';
import { NotificationManager } from './NotificationManager';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'insights' | 'meditation' | 'settings'>('insights');

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Tableau de Bord COEXIST.AI</h2>
        <p className="text-purple-100">
          Suivez votre parcours vers la paix et la coexistence
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('insights')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'insights'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Insights
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('meditation')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'meditation'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Méditation
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'settings'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Paramètres
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <LearningInsights />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Bien-être</h3>
                    <p className="text-sm text-blue-600">Votre niveau de paix intérieure</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-blue-800">85%</div>
                  <div className="text-sm text-blue-600">Excellent !</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Relations</h3>
                    <p className="text-sm text-green-600">Qualité de vos interactions</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-green-800">92%</div>
                  <div className="text-sm text-green-600">Très bien !</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-800">Progrès</h3>
                    <p className="text-sm text-purple-600">Votre évolution personnelle</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-purple-800">78%</div>
                  <div className="text-sm text-purple-600">En progression</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meditation' && (
          <div>
            <MeditationGuide />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Paramètres Personnalisés
            </h3>
            
            {/* Gestionnaire de notifications */}
            <NotificationManager />
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Préférences de Communication</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600">Réponses détaillées</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600">Citations inspirantes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-600">Mode strict (sans emojis)</span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Fonctionnalités</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600">Interface vocale</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600">Méditations guidées</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600">Système de feedback</span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Langue</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
