'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Heart, Brain, Leaf } from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutes
  category: 'peace' | 'conflict' | 'mindfulness' | 'gratitude';
  steps: string[];
}

const MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: 'peace-breathing',
    title: 'Respiration de Paix',
    description: 'Une méditation simple pour calmer l\'esprit et trouver la paix intérieure',
    duration: 5,
    category: 'peace',
    steps: [
      'Asseyez-vous confortablement, dos droit',
      'Fermez les yeux et respirez naturellement',
      'Inspirez lentement en comptant jusqu\'à 4',
      'Retenez votre souffle en comptant jusqu\'à 4',
      'Expirez lentement en comptant jusqu\'à 6',
      'Répétez 10 fois en vous concentrant sur la paix'
    ]
  },
  {
    id: 'conflict-resolution',
    title: 'Résolution de Conflit Intérieur',
    description: 'Une méditation pour comprendre et résoudre les conflits internes',
    duration: 10,
    category: 'conflict',
    steps: [
      'Prenez une position confortable',
      'Identifiez le conflit que vous ressentez',
      'Visualisez les deux parties en conflit',
      'Imaginez un pont entre elles',
      'Envoyez de l\'amour et de la compréhension',
      'Visualisez la résolution harmonieuse'
    ]
  },
  {
    id: 'gratitude-practice',
    title: 'Pratique de Gratitude',
    description: 'Cultiver la gratitude pour améliorer le bien-être et les relations',
    duration: 8,
    category: 'gratitude',
    steps: [
      'Asseyez-vous et fermez les yeux',
      'Respirez profondément 3 fois',
      'Pensez à 3 choses dont vous êtes reconnaissant',
      'Ressentez la gratitude dans votre cœur',
      'Envoyez cette gratitude aux autres',
      'Remerciez-vous pour votre existence'
    ]
  },
  {
    id: 'mindful-listening',
    title: 'Écoute Consciente',
    description: 'Développer l\'écoute empathique pour mieux comprendre les autres',
    duration: 7,
    category: 'mindfulness',
    steps: [
      'Prenez une position d\'écoute active',
      'Imaginez une personne avec qui vous avez des difficultés',
      'Écoutez avec votre cœur, pas seulement vos oreilles',
      'Essayez de comprendre ses émotions',
      'Envoyez-lui de la compassion',
      'Visualisez une conversation harmonieuse'
    ]
  }
];

export default function MeditationGuide() {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSession && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedSession, timeRemaining]);

  const startMeditation = (session: MeditationSession) => {
    setSelectedSession(session);
    setCurrentStep(0);
    setTimeRemaining(session.duration * 60);
    setIsPlaying(true);
  };

  const stopMeditation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTimeRemaining(0);
  };

  const nextStep = () => {
    if (selectedSession && currentStep < selectedSession.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'peace': return <Heart className="h-5 w-5 text-red-500" />;
      case 'conflict': return <Brain className="h-5 w-5 text-blue-500" />;
      case 'mindfulness': return <Leaf className="h-5 w-5 text-green-500" />;
      case 'gratitude': return <Volume2 className="h-5 w-5 text-purple-500" />;
      default: return <Heart className="h-5 w-5 text-gray-500" />;
    }
  };

  if (selectedSession && isPlaying) {
    return (
      <div className="peaceful-card p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="peaceful-title text-2xl font-bold mb-2">
            {selectedSession.title}
          </h2>
          <p className="peaceful-text text-gray-600 mb-4">
            {selectedSession.description}
          </p>
          
          {/* Timer */}
          <div className="peaceful-badge text-lg mb-4">
            {formatTime(timeRemaining)}
          </div>
          
          {/* Progress */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="peaceful-gradient h-2 rounded-full transition-all duration-1000"
              style={{ 
                width: `${((selectedSession.duration * 60 - timeRemaining) / (selectedSession.duration * 60)) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="peaceful-card p-6 mb-6">
          <h3 className="peaceful-title text-lg font-semibold mb-3">
            Étape {currentStep + 1} sur {selectedSession.steps.length}
          </h3>
          <p className="peaceful-text text-lg leading-relaxed">
            {selectedSession.steps[currentStep]}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={stopMeditation}
            className="peaceful-button px-6 py-3 flex items-center space-x-2"
          >
            <Pause className="h-5 w-5" />
            <span>Arrêter</span>
          </button>
          
          {currentStep < selectedSession.steps.length - 1 && (
            <button
              onClick={nextStep}
              className="peaceful-button px-6 py-3 flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Suivant</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="peaceful-title text-3xl font-bold mb-4">
          🌸 Guide de Méditation COEXIST.AI
        </h1>
        <p className="peaceful-text text-lg">
          Trouvez la paix intérieure et développez votre sagesse à travers la méditation guidée
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MEDITATION_SESSIONS.map((session) => (
          <div key={session.id} className="peaceful-card p-6 peaceful-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(session.category)}
                <h3 className="peaceful-title text-xl font-semibold">
                  {session.title}
                </h3>
              </div>
              <span className="peaceful-badge">
                {session.duration} min
              </span>
            </div>
            
            <p className="peaceful-text mb-4">
              {session.description}
            </p>
            
            <button
              onClick={() => startMeditation(session)}
              className="peaceful-button w-full flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Commencer la méditation</span>
            </button>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="peaceful-card p-6 mt-8">
        <h3 className="peaceful-title text-xl font-semibold mb-4">
          💡 Conseils pour une méditation réussie
        </h3>
        <ul className="peaceful-text space-y-2">
          <li>• Trouvez un endroit calme et confortable</li>
          <li>• Éteignez votre téléphone ou mettez-le en mode avion</li>
          <li>• Portez des vêtements confortables</li>
          <li>• Ne vous jugez pas si votre esprit vagabonde</li>
          <li>• Pratiquez régulièrement pour de meilleurs résultats</li>
        </ul>
      </div>
    </div>
  );
}
