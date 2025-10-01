'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Volume2, VolumeX, Sparkles, Heart, Lightbulb, Shield, Lightbulb as LightbulbIcon } from 'lucide-react';
import QuickSuggestions from './QuickSuggestions';
import PeaceMetrics from './PeaceMetrics';
import EncouragementNotification from './EncouragementNotification';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'encouragement';
}

export default function ModernChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Bonjour ! Je suis COEXIST.AI, votre assistant spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique. 🌟\n\nJe suis là pour vous accompagner avec bienveillance et sagesse. Comment puis-je vous aider à transformer vos défis en opportunités de croissance ?',
      isUser: false,
      timestamp: new Date(),
      type: 'encouragement'
    }
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionStart] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false); // Masquer les suggestions après le premier message
    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'Je suis désolé, je ne peux pas répondre pour le moment.',
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Afficher une notification d'encouragement
      if (messages.length % 3 === 0) {
        setNotificationMessage('Bravo ! Vous progressez dans votre chemin vers la paix 🌟');
        setShowNotification(true);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Une erreur est survenue. Veuillez réessayer.',
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (content: string) => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const getMessageIcon = (message: Message) => {
    if (message.isUser) return <User className="w-5 h-5" />;
    
    switch (message.type) {
      case 'encouragement': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'suggestion': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getMessageStyle = (message: Message) => {
    if (message.isUser) {
      return 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg';
    }
    
    switch (message.type) {
      case 'encouragement': 
        return 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800';
      case 'suggestion': 
        return 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800';
      default: 
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header moderne */}
      <div className="glass border-b border-white/20 dark:border-gray-700/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">COEXIST.AI</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Assistant de coexistence pacifique</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Confidentiel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-6">
        {/* Suggestions rapides */}
        {showSuggestions && messages.length === 1 && (
          <div className="animate-fade-in-up">
            <QuickSuggestions onSuggestionClick={handleSuggestionClick} />
          </div>
        )}

        {/* Métriques de paix */}
        {messages.length > 2 && (
          <div className="animate-fade-in-up">
            <PeaceMetrics 
              messageCount={messages.length - 1} // -1 pour exclure le message de bienvenue
              sessionDuration={Math.floor((new Date().getTime() - sessionStart.getTime()) / 60000)}
            />
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                message.isUser 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                {getMessageIcon(message)}
              </div>

              {/* Message Bubble */}
              <div className={`chat-bubble ${getMessageStyle(message)}`}>
                <div className="relative">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Timestamp et actions */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    
                    {!message.isUser && (
                      <button
                        onClick={() => handleSpeak(message.content)}
                        className="ml-2 p-1.5 rounded-full hover:bg-white/20 dark:hover:bg-gray-600/20 transition-colors"
                        title={isSpeaking ? 'Arrêter la lecture' : 'Lire le message'}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3 h-3" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator moderne */}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex max-w-[80%] items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="chat-bubble bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Réflexion en cours...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bouton flottant pour les suggestions */}
      {!showSuggestions && (
        <button
          onClick={() => setShowSuggestions(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
          title="Voir les suggestions"
        >
          <LightbulbIcon className="w-6 h-6" />
        </button>
      )}

      {/* Input moderne */}
      <div className="glass border-t border-white/20 dark:border-gray-700/20 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Partagez votre situation avec moi... Je suis là pour vous aider à trouver la paix ✨"
              className="input-modern resize-none pr-12"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                height: 'auto',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
              {inputValue.length}/500
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none px-4 py-3"
            title="Envoyer le message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        {/* Suggestions rapides */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Comment gérer un conflit au travail ?",
            "Aider à la médiation familiale",
            "Techniques de communication non-violente"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputValue(suggestion)}
              className="px-3 py-1.5 text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications d'encouragement */}
      {showNotification && (
        <EncouragementNotification
          message={notificationMessage}
          type="encouragement"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}