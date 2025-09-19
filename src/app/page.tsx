'use client';

import { useState } from 'react';
import { MessageSquare, Send, Sparkles, Heart, Info } from 'lucide-react';
import { Logo } from '../components/Logo';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis COEXIST.AI, votre assistant spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          useDemo: true
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Erreur lors de la communication avec l&apos;API');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Désolé, une erreur s'est produite : ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Logo size="lg" className="drop-shadow-lg" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                COEXIST.AI
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assistant de coexistence pacifique
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link 
              href="/about"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Info size={16} />
              <span className="hidden sm:inline text-sm">À propos</span>
            </Link>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              Mode Démo
            </span>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-100px)]">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl px-6 py-4 rounded-2xl shadow-sm ${
                  message.isUser
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white ml-12'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-12 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {!message.isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      COEXIST.AI
                    </span>
                  </div>
                )}
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <div className="mt-2 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl px-6 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-12">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    COEXIST.AI
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="animate-spin text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Je réfléchis à votre situation...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Décrivez votre situation ou posez votre question..."
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              disabled={isLoading}
            />
            <MessageSquare 
              size={20} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm flex items-center gap-2"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            COEXIST.AI utilise l&apos;intelligence artificielle pour promouvoir la paix et la compréhension mutuelle.
          </p>
        </div>
      </main>
    </div>
  );
}