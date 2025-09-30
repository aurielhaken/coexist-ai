"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles, User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { useTextToSpeech } from "./VoiceInterface";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export default function ChatGPT() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speak, stop } = useTextToSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        (window as any).speechRecognition = recognition;
      }
    }
  }, []);

  const startListening = () => {
    if ((window as any).speechRecognition) {
      (window as any).speechRecognition.start();
    }
  };

  const stopListening = () => {
    if ((window as any).speechRecognition) {
      (window as any).speechRecognition.stop();
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

    // Ajuster la hauteur du textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messageToSend,
          history: messages.slice(-10).map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

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
        content: "Désolé, une erreur s'est produite. Veuillez vérifier que votre clé API est configurée et réessayer.",
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

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header élégant */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  COEXIST.AI
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  En ligne • Prêt à vous aider
                </p>
              </div>
            </div>
            <button
              onClick={() => setMessages([])}
              className="p-3 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600"
              title="Nouvelle conversation"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Bienvenue sur COEXIST.AI
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Votre assistant de sagesse universelle pour la paix et la coexistence
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => setInputMessage("Comment puis-je résoudre un conflit avec quelqu'un ?")}
                  className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Résolution de conflits</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Obtenez des conseils pour apaiser les tensions</p>
                </button>
                <button
                  onClick={() => setInputMessage("Comment promouvoir la paix dans ma communauté ?")}
                  className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Paix communautaire</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stratégies pour l'harmonie sociale</p>
                </button>
                <button
                  onClick={() => setInputMessage("Quelles sont les valeurs communes entre les religions ?")}
                  className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Harmonie religieuse</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Découvrez les liens spirituels universels</p>
                </button>
                <button
                  onClick={() => setInputMessage("Comment développer ma compassion ?")}
                  className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Développement spirituel</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cultivez votre sagesse intérieure</p>
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 ${message.isUser ? "flex justify-end" : "flex justify-start"}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isUser 
                    ? "bg-gray-600" 
                    : "bg-gradient-to-br from-blue-500 to-purple-600"
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message */}
                <div className={`relative group ${
                  message.isUser ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800"
                } rounded-2xl px-4 py-3 max-w-full`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  
                  {/* Actions pour les messages IA */}
                  {!message.isUser && (
                    <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="w-7 h-7 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        title="Copier"
                      >
                        <Copy className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleSpeakMessage(message.content)}
                        className="w-7 h-7 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        title={isSpeaking ? "Arrêter la lecture" : "Lire le message"}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        )}
                      </button>
                      <button
                        className="w-7 h-7 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        title="Bien"
                      >
                        <ThumbsUp className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Réflexion...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={sendMessage} className="relative">
            <div className="flex items-end space-x-3">
              {/* Bouton vocal */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                disabled={isLoading}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isListening
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                title={isListening ? "Arrêter l'écoute" : "Parler"}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              {/* Champ de saisie */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  placeholder="Tapez votre message..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none overflow-hidden transition-all duration-200"
                  rows={1}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
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
                className="flex-shrink-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
                title="Envoyer"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
