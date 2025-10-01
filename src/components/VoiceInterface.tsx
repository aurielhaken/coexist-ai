'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface VoiceInterfaceProps {
  onTranscript: (text: string) => void;
  onSpeak: (text: string) => void;
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStartSpeaking: () => void;
  onStopSpeaking: () => void;
}

export function VoiceInterface({
  onTranscript,
  onSpeak,
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onStartSpeaking,
  onStopSpeaking
}: VoiceInterfaceProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<any>(null);
  const [currentUtterance, setCurrentUtterance] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Vérifier le support des APIs vocales
    if (typeof window !== 'undefined') {
      const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechSynthesis = window.speechSynthesis;
      
      if (speechRecognition && speechSynthesis) {
        setIsSupported(true);
        
        // Configuration de la reconnaissance vocale
        const recognitionInstance = new speechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'fr-FR';
        
        recognitionInstance.onstart = () => {
          setIsProcessing(true);
        };
        
        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          setTranscript(finalTranscript || interimTranscript);
          
          if (finalTranscript) {
            onTranscript(finalTranscript);
            setIsProcessing(false);
          }
        };
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Erreur de reconnaissance vocale:', event.error);
          setIsProcessing(false);
        };
        
        recognitionInstance.onend = () => {
          setIsProcessing(false);
        };
        
        setRecognition(recognitionInstance);
        setSynthesis(speechSynthesis);
      }
    }
  }, [onTranscript]);

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript('');
      recognition.start();
      onStartListening();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      onStopListening();
    }
  };

  const speak = (text: string) => {
    if (synthesis && !isMuted) {
      // Arrêter toute synthèse en cours
      synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        onStartSpeaking();
      };
      
      utterance.onend = () => {
        onStopSpeaking();
      };
      
      utterance.onerror = (event) => {
        console.error('Erreur de synthèse vocale:', event.error);
        onStopSpeaking();
      };
      
      setCurrentUtterance(utterance);
      synthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      onStopSpeaking();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  // Exposer les fonctions pour le composant parent
  useEffect(() => {
    if (typeof onSpeak === 'function') {
      onSpeak(speak);
    }
  }, [onSpeak]);

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p className="text-yellow-800 text-sm">
          🎤 Les fonctionnalités vocales ne sont pas supportées sur votre navigateur.
          <br />
          Veuillez utiliser Chrome, Edge ou Safari pour une expérience complète.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          🎤 Interface Vocale
        </h3>
        <p className="text-gray-600 text-sm">
          Parlez naturellement pour interagir avec COEXIST.AI
        </p>
      </div>

      {/* Transcription en temps réel */}
      {transcript && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-800 mb-2">
            Transcription :
          </h4>
          <p className="text-purple-700 text-sm">
            {transcript}
          </p>
        </div>
      )}

      {/* Contrôles vocaux */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Microphone */}
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isSpeaking}
          className={`p-4 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : isProcessing
              ? 'bg-yellow-500 text-white'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          } ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Contrôle du son */}
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full transition-all duration-200 ${
            isMuted
              ? 'bg-gray-500 text-white'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        {/* Arrêter la parole */}
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <Pause className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Statut */}
      <div className="text-center">
        {isListening && (
          <p className="text-red-600 text-sm font-medium animate-pulse">
            🎤 Écoute en cours... Parlez maintenant
          </p>
        )}
        {isSpeaking && !isMuted && (
          <p className="text-green-600 text-sm font-medium">
            🔊 COEXIST.AI vous parle...
          </p>
        )}
        {isMuted && (
          <p className="text-gray-500 text-sm">
            🔇 Son désactivé
          </p>
        )}
        {!isListening && !isSpeaking && !isMuted && (
          <p className="text-gray-500 text-sm">
            Cliquez sur le microphone pour commencer
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">
          💡 Conseils d'utilisation :
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Parlez clairement et à un rythme normal</li>
          <li>• Évitez les bruits de fond</li>
          <li>• Attendez que l'IA termine de parler avant de répondre</li>
          <li>• Utilisez des phrases complètes pour de meilleurs résultats</li>
        </ul>
      </div>
    </div>
  );
}

// Types pour TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}