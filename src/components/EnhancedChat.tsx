'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Globe, Brain, Heart, Settings } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  enhanced?: {
    personalized: boolean;
    language: string;
    culturalContext?: string;
    knowledgeSources?: string[];
    followUpSuggestions?: string[];
  };
}

interface UserProfile {
  name?: string;
  language: string;
  culturalBackground?: string;
  religiousBackground?: string;
}

export default function EnhancedChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    language: 'fr',
    culturalBackground: '',
    religiousBackground: ''
  });
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Message de bienvenue personnalisé
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: `🌍 Bonjour ! Je suis COEXIST.AI, votre assistant de sagesse universelle. 

✨ **Nouvelles capacités :**
• 🧠 **Mémoire persistante** - Je me souviens de nos conversations
• 🌐 **Multilingue** - Je parle 10+ langues
• 🎯 **Personnalisation** - Réponses adaptées à votre culture
• 📚 **Base de connaissances** - Sagesse des traditions de paix
• 🕊️ **Interventions d'urgence** - Détection des situations dangereuses

Comment puis-je vous accompagner vers la paix aujourd'hui ?`,
      isUser: false,
      timestamp: new Date(),
      enhanced: {
        personalized: true,
        language: 'fr'
      }
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          useDemo: true,
          userId: localStorage.getItem('coexist-user-id') || undefined,
          language: userProfile.language,
          culturalBackground: userProfile.culturalBackground || undefined,
          religiousBackground: userProfile.religiousBackground || undefined
        }),
      });

      const data = await response.json();
      
      // Sauvegarder l'userId pour les futures conversations
      if (data.userId) {
        localStorage.setItem('coexist-user-id', data.userId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        enhanced: {
          personalized: data.personalized,
          language: data.language,
          culturalContext: data.culturalContext,
          knowledgeSources: data.knowledgeSources,
          followUpSuggestions: data.followUpSuggestions
        }
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header avec profil */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                COEXIST.AI
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assistant de Sagesse Universelle
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Paramètres du profil"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Profil utilisateur */}
        {showProfile && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Profil Personnalisé
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom (optionnel)
                </label>
                <input
                  type="text"
                  value={userProfile.name || ''}
                  onChange={(e) => updateUserProfile({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Langue
                </label>
                <select
                  value={userProfile.language}
                  onChange={(e) => updateUserProfile({ language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="ar">العربية</option>
                  <option value="he">עברית</option>
                  <option value="zh">中文</option>
                  <option value="hi">हिन्दी</option>
                  <option value="pt">Português</option>
                  <option value="ru">Русский</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contexte Culturel
                </label>
                <input
                  type="text"
                  value={userProfile.culturalBackground || ''}
                  onChange={(e) => updateUserProfile({ culturalBackground: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Ex: occidentale, orientale, africaine..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contexte Religieux
                </label>
                <input
                  type="text"
                  value={userProfile.religiousBackground || ''}
                  onChange={(e) => updateUserProfile({ religiousBackground: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Ex: chrétien, musulman, juif, bouddhiste..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl px-4 py-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
              
              {/* Métadonnées enrichies */}
              {message.enhanced && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    {message.enhanced.personalized && (
                      <div className="flex items-center space-x-1">
                        <Brain className="h-3 w-3" />
                        <span>Personnalisé</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Globe className="h-3 w-3" />
                      <span>{message.enhanced.language.toUpperCase()}</span>
                    </div>
                    {message.enhanced.culturalContext && (
                      <span>Culture: {message.enhanced.culturalContext}</span>
                    )}
                  </div>
                  
                  {/* Sources de connaissances */}
                  {message.enhanced.knowledgeSources && message.enhanced.knowledgeSources.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Sources de sagesse :
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {message.enhanced.knowledgeSources.map((source, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Suggestions de suivi */}
                  {message.enhanced.followUpSuggestions && message.enhanced.followUpSuggestions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Questions suggérées :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {message.enhanced.followUpSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInputMessage(suggestion)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  COEXIST.AI réfléchit avec sagesse...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Décrivez votre situation ou posez votre question..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            COEXIST.AI utilise l&apos;intelligence artificielle enrichie pour promouvoir la paix et la compréhension mutuelle.
          </p>
        </div>
      </div>
    </div>
  );
}
