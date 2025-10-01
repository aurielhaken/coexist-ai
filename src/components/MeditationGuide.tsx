'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Brain, Sun, Moon } from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutes
  type: 'breathing' | 'loving-kindness' | 'unity' | 'gratitude' | 'body-scan';
  icon: React.ReactNode;
  steps: string[];
}

const MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: 'breathing',
    title: 'Respiration Consciente',
    description: 'Technique 4-7-8 pour la relaxation profonde',
    duration: 5,
    type: 'breathing',
    icon: <Brain className="w-6 h-6" />,
    steps: [
      'Asseyez-vous confortablement, le dos droit',
      'Inspirez par le nez en comptant jusqu\'à 4',
      'Retenez votre souffle en comptant jusqu\'à 7',
      'Expirez par la bouche en comptant jusqu\'à 8',
      'Répétez ce cycle 4-5 fois'
    ]
  },
  {
    id: 'loving-kindness',
    title: 'Méditation de l\'Amour-Bienveillant',
    description: 'Cultiver la compassion envers soi et les autres',
    duration: 10,
    type: 'loving-kindness',
    icon: <Heart className="w-6 h-6" />,
    steps: [
      'Fermez les yeux et respirez naturellement',
      'Dirigez l\'amour vers vous-même : "Puissé-je être en paix"',
      'Étendez cet amour à vos proches',
      'Incluez les personnes neutres dans votre vie',
      'Envoyez de l\'amour même à vos "ennemis"',
      'Embrassez tous les êtres vivants avec compassion'
    ]
  },
  {
    id: 'unity',
    title: 'Méditation de l\'Unité',
    description: 'Sentir la connexion avec tous les êtres',
    duration: 15,
    type: 'unity',
    icon: <Sun className="w-6 h-6" />,
    steps: [
      'Visualisez une lumière dorée dans votre cœur',
      'Cette lumière grandit et emplit votre corps',
      'Elle rayonne vers vos proches et amis',
      'Elle s\'étend à votre communauté',
      'Elle touche tous les êtres de la planète',
      'Sentez cette unité et cette connexion profonde'
    ]
  },
  {
    id: 'gratitude',
    title: 'Méditation de Gratitude',
    description: 'Apprécier les bénédictions de la vie',
    duration: 8,
    type: 'gratitude',
    icon: <Moon className="w-6 h-6" />,
    steps: [
      'Prenez trois respirations profondes',
      'Pensez à 3 choses pour lesquelles vous êtes reconnaissant',
      'Ressentez la gratitude dans votre cœur',
      'Remerciez pour les défis qui vous ont fait grandir',
      'Envoyez de la gratitude à l\'univers',
      'Ouvrez les yeux avec un sourire'
    ]
  }
];

export function MeditationGuide() {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const startMeditation = (session: MeditationSession) => {
    setSelectedSession(session);
    setTimeRemaining(session.duration * 60); // Convertir en secondes
    setCurrentStep(0);
    setIsCompleted(false);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetMeditation = () => {
    if (selectedSession) {
      setTimeRemaining(selectedSession.duration * 60);
      setCurrentStep(0);
      setIsCompleted(false);
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = selectedSession ? ((selectedSession.duration * 60 - timeRemaining) / (selectedSession.duration * 60)) * 100 : 0;

  if (selectedSession && !isCompleted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
              {selectedSession.icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {selectedSession.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {selectedSession.description}
          </p>
          
          {/* Timer */}
          <div className="mb-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {formatTime(timeRemaining)}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={togglePlayPause}
              className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetMeditation}
              className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          {/* Current Step */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">
              Étape {currentStep + 1} sur {selectedSession.steps.length}
            </h4>
            <p className="text-purple-700 text-sm">
              {selectedSession.steps[currentStep]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Méditation Terminée ! 🎉
          </h3>
          <p className="text-gray-600">
            Félicitations ! Vous avez complété votre session de méditation.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={resetMeditation}
            className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Recommencer
          </button>
          <button
            onClick={() => setSelectedSession(null)}
            className="w-full bg-gray-200 text-gray-600 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Choisir une autre méditation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          🧘‍♀️ Méditations Guidées
        </h3>
        <p className="text-gray-600">
          Choisissez une méditation pour cultiver la paix intérieure
        </p>
      </div>

      <div className="grid gap-4">
        {MEDITATION_SESSIONS.map((session) => (
          <button
            key={session.id}
            onClick={() => startMeditation(session)}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-200 transition-colors">
                {session.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {session.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {session.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-600">
                  <span>⏱️ {session.duration} min</span>
                  <span>•</span>
                  <span>🎯 {session.steps.length} étapes</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}