"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Heart, MessageCircle } from "lucide-react";
import { useTextToSpeech } from "./VoiceInterface";
import AnimatedBackground from "./AnimatedBackground";
import ModernVoiceHelp from "./ModernVoiceHelp";

// Types pour la reconnaissance vocale
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
    speechRecognition?: SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly confidence: number;
  readonly transcript: string;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ModernChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bonjour ! Je suis COEXIST.AI, votre assistant de sagesse universelle. Je suis là pour vous accompagner dans tous vos défis, que ce soit pour résoudre des conflits, trouver la paix, ou simplement discuter de la vie. Comment allez-vous aujourd'hui ? 😊",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speak, stop } = useTextToSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reconnaissance vocale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        window.speechRecognition = recognition;
      }
    }
  }, []);

  const startListening = () => {
    if (window.speechRecognition) {
      window.speechRecognition.start();
    }
  };

  const stopListening = () => {
    if (window.speechRecognition) {
      window.speechRecognition.stop();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi du message");

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Lecture automatique
      setTimeout(() => speak(data.response), 500);
    } catch (error) {
      console.error("Erreur:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(content);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      {/* Header moderne */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 p-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Assistant de Sagesse Universelle
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              En ligne • Prêt à vous aider
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"} group`}
          >
            <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600" 
                  : "bg-gradient-to-br from-emerald-500 to-teal-600"
              }`}>
                {message.isUser ? (
                  <MessageCircle className="w-4 h-4 text-white" />
                ) : (
                  <Heart className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message */}
              <div className={`relative px-6 py-4 rounded-3xl shadow-sm ${
                message.isUser
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                  : "bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50"
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Contrôles pour les messages IA */}
                {!message.isUser && (
                  <div className="absolute -right-2 -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleSpeakMessage(message.content)}
                      className="w-8 h-8 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                      title={isSpeaking ? "Arrêter la lecture" : "Lire le message"}
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-3xl px-6 py-4 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Réflexion...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input moderne */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 p-6 relative z-10">
        <form onSubmit={sendMessage} className="relative">
          <div className="flex items-end space-x-3">
            {/* Bouton vocal moderne */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              disabled={isLoading}
              className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isListening
                  ? "bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg scale-110"
                  : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 hover:from-blue-100 hover:to-indigo-200 dark:hover:from-blue-700 dark:hover:to-indigo-600 hover:text-blue-600 dark:hover:text-blue-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"}`}
              title={isListening ? "Arrêter l'écoute" : "Parler au lieu de taper"}
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            {/* Champ de saisie */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tapez votre message ou utilisez la reconnaissance vocale..."
                className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 shadow-sm"
                disabled={isLoading}
              />
              {isListening && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Bouton d'envoi */}
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:scale-105 disabled:hover:scale-100"
              title="Envoyer le message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Indicateurs d'état */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Mic className="w-3 h-3 mr-1" />
                Reconnaissance vocale
              </span>
              <span className="flex items-center">
                <Volume2 className="w-3 h-3 mr-1" />
                Lecture automatique
              </span>
              <ModernVoiceHelp />
            </div>
            {isSpeaking && (
              <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Lecture en cours...</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
