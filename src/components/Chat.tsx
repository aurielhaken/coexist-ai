"use client";

import { useState } from "react";
import { Send, Loader2, Volume2, VolumeX } from "lucide-react";
import VoiceInterface, { useTextToSpeech } from "./VoiceInterface";
import VoiceHelp from "./VoiceHelp";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bonjour ! Je suis COEXIST.AI, votre assistant spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { speak, stop, isSpeaking } = useTextToSpeech();

  // Fonction pour gérer la transcription vocale
  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(transcript);
  };

  // Fonction pour lire un message spécifique
  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(content);
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Lire automatiquement la réponse de l'IA
      setTimeout(() => {
        speak(data.response);
      }, 500); // Petit délai pour que l'interface se mette à jour
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

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-brand-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Bienvenue dans COEXIST.AI
            </h3>
            <p className="text-muted-foreground">
              Comment puis-je vous aider à résoudre vos conflits aujourd'hui ?
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? "bg-brand-500 text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  
                  {/* Bouton de lecture pour les messages de l'IA */}
                  {!message.isUser && (
                    <button
                      onClick={() => handleSpeakMessage(message.content)}
                      className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                      title={isSpeaking ? "Arrêter la lecture" : "Lire le message"}
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
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Réflexion...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tapez votre message ou utilisez la reconnaissance vocale..."
            className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            disabled={isLoading}
          />
          
          {/* Interface vocale */}
          <VoiceInterface
            onTranscript={handleVoiceTranscript}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Envoyer le message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        
        {/* Indicateurs d'état vocal */}
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>🎤 Reconnaissance vocale disponible</span>
            <span>🔊 Lecture automatique activée</span>
          </div>
          <div className="flex items-center space-x-2">
            {isSpeaking && (
              <div className="flex items-center space-x-1 text-brand-600">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                <span>Lecture en cours...</span>
              </div>
            )}
            <VoiceHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
