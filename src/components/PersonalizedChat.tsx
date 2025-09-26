'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Brain, Globe, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  enhanced?: {
    personalized: boolean;
    language: string;
    knowledgeSources?: string[];
    followUpSuggestions?: string[];
  };
}

interface ChatResponse {
  response: string;
  mode: 'openai' | 'fallback' | 'error';
  timestamp: string;
  personalized: boolean;
  language: string;
  knowledgeSources?: string[];
  followUpSuggestions?: string[];
}

export default function PersonalizedChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [userLanguage, setUserLanguage] = useState('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Message de bienvenue avec l'IA personnalisée
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: `🌍 **Bienvenue chez COEXIST.AI !**

Je suis votre **assistant de sagesse universelle** personnalisé, conçu pour promouvoir la paix et la coexistence.

✨ **Mon approche :**
• 🧠 **Neutre et transparent** - Je présente toutes les perspectives
• 🤝 **Respectueux** - Je respecte votre liberté de choix
• 🌱 **Protecteur de la vie** - Humains, animaux et nature
• 🌐 **Multilingue** - Je m'adapte à votre langue
• 💡 **Actionnable** - Je propose des étapes concrètes

Comment puis-je vous accompagner vers la paix aujourd'hui ?`,
      isUser: false,
      timestamp: new Date(),
      enhanced: {
        personalized: true,
        language: userLanguage
      }
    };
    setMessages([welcomeMessage]);
  }, [userLanguage]);

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
      // Construire l'historique pour l'API
      const history = messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          history,
          userId: `web_user_${Date.now()}`,
          language: userLanguage
        }),
      });

      const data: ChatResponse = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        enhanced: {
          personalized: data.personalized,
          language: data.language,
          knowledgeSources: data.knowledgeSources,
          followUpSuggestions: data.followUpSuggestions
        }
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Désolé, je rencontre une difficulté technique. 

Mais je suis toujours là pour vous accompagner ! Pouvez-vous reformuler votre question ?

En attendant, je vous rappelle que la paix commence par un sourire et que chaque petit geste de compréhension compte. 🌍✨`,
        isUser: false,
        timestamp: new Date(),
        enhanced: {
          personalized: false,
          language: userLanguage
        }
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

  const updateLanguage = (language: string) => {
    setUserLanguage(language);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header avec sélection de langue */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                COEXIST.AI Personnalisé
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assistant de Sagesse Universelle avec OpenAI
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <select
              value={userLanguage}
              onChange={(e) => updateLanguage(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
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
                        <span>IA Personnalisée</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Globe className="h-3 w-3" />
                      <span>{message.enhanced.language.toUpperCase()}</span>
                    </div>
                    {message.enhanced.knowledgeSources && message.enhanced.knowledgeSources.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{message.enhanced.knowledgeSources.length} source(s)</span>
                      </div>
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
            COEXIST.AI utilise OpenAI GPT-4 avec une base de connaissances personnalisée pour promouvoir la paix mondiale.
          </p>
        </div>
      </div>
    </div>
  );
}

