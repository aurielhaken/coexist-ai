'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Heart, Star, MessageCircle } from 'lucide-react';
import { recordFeedback } from '@/lib/learning-system';

interface FeedbackSystemProps {
  messageId: string;
  onFeedbackSubmitted?: (feedback: 'positive' | 'negative' | 'neutral') => void;
}

export function FeedbackSystem({ messageId, onFeedbackSubmitted }: FeedbackSystemProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<'positive' | 'negative' | 'neutral' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailedFeedback, setDetailedFeedback] = useState('');

  const handleFeedback = async (feedback: 'positive' | 'negative' | 'neutral') => {
    if (isSubmitted) return;

    setSelectedFeedback(feedback);
    
    try {
      recordFeedback(messageId, feedback);
      setIsSubmitted(true);
      onFeedbackSubmitted?.(feedback);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du feedback:', error);
    }
  };

  const handleDetailedFeedback = async () => {
    if (!detailedFeedback.trim() || isSubmitted) return;

    try {
      // Ici, on pourrait envoyer le feedback détaillé à l'API
      console.log('Feedback détaillé:', detailedFeedback);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du feedback détaillé:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
        <Heart className="w-4 h-4 text-green-600" />
        <span className="text-sm text-green-700 font-medium">
          Merci pour votre feedback ! 🌟
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          Cette réponse vous a-t-elle aidé ?
        </span>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-purple-600 hover:text-purple-700"
        >
          {showDetails ? 'Masquer' : 'Détails'}
        </button>
      </div>

      {/* Boutons de feedback rapide */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => handleFeedback('positive')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            selectedFeedback === 'positive'
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Utile</span>
        </button>

        <button
          onClick={() => handleFeedback('neutral')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            selectedFeedback === 'neutral'
              ? 'bg-yellow-500 text-white'
              : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Correct</span>
        </button>

        <button
          onClick={() => handleFeedback('negative')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
            selectedFeedback === 'negative'
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>Pas utile</span>
        </button>
      </div>

      {/* Feedback détaillé */}
      {showDetails && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partagez votre expérience (optionnel)
            </label>
            <textarea
              value={detailedFeedback}
              onChange={(e) => setDetailedFeedback(e.target.value)}
              placeholder="Que pensez-vous de cette réponse ? Comment pourrions-nous l'améliorer ?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-sm"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDetailedFeedback}
              disabled={!detailedFeedback.trim()}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
            >
              Envoyer
            </button>
            <span className="text-xs text-gray-500">
              Votre feedback nous aide à améliorer COEXIST.AI
            </span>
          </div>
        </div>
      )}

      {/* Suggestions d'amélioration */}
      {selectedFeedback === 'negative' && (
        <div className="mt-3 p-3 bg-red-50 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 mb-2">
            Comment pouvons-nous améliorer ?
          </h4>
          <div className="space-y-1 text-xs text-red-700">
            <p>• La réponse était-elle trop longue ou trop courte ?</p>
            <p>• Manquait-il des informations importantes ?</p>
            <p>• Le ton était-il approprié à votre situation ?</p>
            <p>• Souhaitez-vous une approche différente ?</p>
          </div>
        </div>
      )}

      {selectedFeedback === 'positive' && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2">
            Merci ! 🌟
          </h4>
          <p className="text-xs text-green-700">
            Votre feedback positif nous encourage à continuer à améliorer COEXIST.AI pour promouvoir la paix et la coexistence.
          </p>
        </div>
      )}
    </div>
  );
}
