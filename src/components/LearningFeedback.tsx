'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Heart, Brain, TrendingUp, Star } from 'lucide-react';
import { recordFeedback, getLearningInsights } from '@/lib/learning-system';

interface LearningFeedbackProps {
  interactionId: string;
  message: string;
  response: string;
  onFeedbackSubmitted?: () => void;
}

export default function LearningFeedback({ 
  interactionId, 
  message, 
  response, 
  onFeedbackSubmitted 
}: LearningFeedbackProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | 'neutral' | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const handleFeedback = (type: 'positive' | 'negative' | 'neutral') => {
    setFeedback(type);
    recordFeedback(interactionId, type);
    
    // Afficher un message de remerciement
    const messages = {
      positive: "Merci ! Votre feedback positif aide COEXIST.AI à s'améliorer ! 🌟",
      negative: "Merci pour votre retour ! COEXIST.AI va apprendre de cette expérience ! 🧠",
      neutral: "Merci pour votre évaluation ! Chaque feedback compte ! 💫"
    };
    
    alert(messages[type]);
    onFeedbackSubmitted?.();
  };

  const showLearningInsights = () => {
    const learningData = getLearningInsights();
    setInsights(learningData);
    setShowInsights(true);
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'positive': return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'negative': return <ThumbsDown className="h-5 w-5 text-red-500" />;
      case 'neutral': return <Heart className="h-5 w-5 text-blue-500" />;
      default: return null;
    }
  };

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'negative': return 'border-red-200 bg-red-50';
      case 'neutral': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Feedback Buttons */}
      {!feedback && (
        <div className="peaceful-card p-4">
          <h4 className="peaceful-title text-sm font-semibold mb-3 flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Aidez COEXIST.AI à apprendre !</span>
          </h4>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleFeedback('positive')}
              className="flex items-center space-x-2 px-4 py-2 border border-green-200 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Utile</span>
            </button>
            
            <button
              onClick={() => handleFeedback('neutral')}
              className="flex items-center space-x-2 px-4 py-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Heart className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">Correct</span>
            </button>
            
            <button
              onClick={() => handleFeedback('negative')}
              className="flex items-center space-x-2 px-4 py-2 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <ThumbsDown className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">À améliorer</span>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Votre feedback aide COEXIST.AI à donner de meilleures réponses ! 🧠✨
          </p>
        </div>
      )}

      {/* Feedback Submitted */}
      {feedback && (
        <div className={`peaceful-card p-4 ${getFeedbackColor(feedback)}`}>
          <div className="flex items-center space-x-2">
            {getFeedbackIcon(feedback)}
            <span className="peaceful-text font-medium">
              Merci pour votre feedback ! COEXIST.AI apprend de chaque interaction.
            </span>
          </div>
        </div>
      )}

      {/* Learning Insights */}
      <div className="peaceful-card p-4">
        <button
          onClick={showLearningInsights}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">Voir les insights d'apprentissage</span>
        </button>
        
        {showInsights && insights && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {insights.totalInteractions}
                </div>
                <div className="text-xs text-gray-500">Interactions totales</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(insights.averageEffectiveness)}%
                </div>
                <div className="text-xs text-gray-500">Efficacité moyenne</div>
              </div>
            </div>
            
            {insights.topPatterns.length > 0 && (
              <div>
                <h5 className="font-semibold text-sm mb-2">Patterns les plus efficaces :</h5>
                <div className="space-y-1">
                  {insights.topPatterns.slice(0, 3).map((pattern: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="truncate">{pattern.context}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{Math.round(pattern.successRate)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {insights.improvementAreas.length > 0 && (
              <div>
                <h5 className="font-semibold text-sm mb-2">Domaines d'amélioration :</h5>
                <div className="space-y-1">
                  {insights.improvementAreas.slice(0, 3).map((area: string, index: number) => (
                    <div key={index} className="text-xs text-orange-600">
                      • {area}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Learning Progress */}
      <div className="peaceful-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="peaceful-text text-sm font-medium">Progrès d'apprentissage</span>
          <span className="text-xs text-gray-500">COEXIST.AI s'améliore constamment</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="peaceful-gradient h-2 rounded-full transition-all duration-1000"
            style={{ 
              width: `${Math.min(100, insights?.averageEffectiveness || 50)}%` 
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Débutant</span>
          <span>Expert en coexistence</span>
        </div>
      </div>
    </div>
  );
}
