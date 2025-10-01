// components/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX, Heart, Brain } from 'lucide-react';
import { MeditationGuide } from './MeditationGuide';
import { VoiceInterface } from './VoiceInterface';
import { FeedbackSystem } from './FeedbackSystem';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedbackSubmitted?: boolean;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages,
          language: 'fr'
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        feedbackSubmitted: false,
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Parler la réponse si l'interface vocale est activée
      if (isSpeaking && data.response) {
        speakText(data.response);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Je suis désolé, je rencontre quelques difficultés techniques. Pouvez-vous réessayer ? 🌟',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(text);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeak = (text: string) => {
    speakText(text);
  };

  const handleFeedbackSubmitted = (messageId: string, feedback: 'positive' | 'negative' | 'neutral') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedbackSubmitted: true }
        : msg
    ));
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pb-6">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 py-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 space-y-4 py-12">
            <Sparkles className="w-12 h-12 mx-auto text-purple-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">
              Bienvenue sur COEXIST.AI
            </h3>
            <p className="text-sm max-w-md mx-auto">
              Je suis là pour vous accompagner vers la paix et la compréhension mutuelle. 
              Partagez-moi vos préoccupations, questions ou défis.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-blue-500'
                      : 'bg-gradient-to-r from-purple-400 to-pink-400'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
              
              {/* Feedback System for Assistant Messages */}
              {message.role === 'assistant' && !message.feedbackSubmitted && (
                <div className="ml-11 mt-2">
                  <FeedbackSystem
                    messageId={message.id}
                    onFeedbackSubmitted={(feedback) => handleFeedbackSubmitted(message.id, feedback)}
                  />
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Boutons d'action */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => setShowMeditation(!showMeditation)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
            showMeditation
              ? 'bg-purple-500 text-white'
              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span className="text-sm">Méditation</span>
        </button>
        
        <button
          onClick={() => setShowVoiceInterface(!showVoiceInterface)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
            showVoiceInterface
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span className="text-sm">Voix</span>
        </button>
        
        <button
          onClick={() => speakText(messages[messages.length - 1]?.content || '')}
          disabled={!messages.length || isSpeaking}
          className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Volume2 className="w-4 h-4" />
          <span className="text-sm">Écouter</span>
        </button>
      </div>

      {/* Interface de méditation */}
      {showMeditation && (
        <div className="mb-6">
          <MeditationGuide />
        </div>
      )}

      {/* Interface vocale */}
      {showVoiceInterface && (
        <div className="mb-6">
          <VoiceInterface
            onTranscript={handleVoiceTranscript}
            onSpeak={handleSpeak}
            isListening={isListening}
            isSpeaking={isSpeaking}
            onStartListening={() => setIsListening(true)}
            onStopListening={() => setIsListening(false)}
            onStartSpeaking={() => setIsSpeaking(true)}
            onStopSpeaking={() => setIsSpeaking(false)}
          />
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Partagez vos pensées, questions ou défis..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white shadow-sm"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Envoyer</span>
        </button>
      </form>
    </div>
  );
}


