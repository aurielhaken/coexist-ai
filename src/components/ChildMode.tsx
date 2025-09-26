'use client';

import { useState } from 'react';
import { Heart, Star, Rainbow, Butterfly, Sun, Moon } from 'lucide-react';

interface ChildMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  emotion?: string;
}

const CHILD_EMOTIONS = [
  { emoji: '😊', name: 'heureux', color: 'bg-yellow-100 text-yellow-800' },
  { emoji: '😢', name: 'triste', color: 'bg-blue-100 text-blue-800' },
  { emoji: '😠', name: 'en colère', color: 'bg-red-100 text-red-800' },
  { emoji: '😰', name: 'peur', color: 'bg-purple-100 text-purple-800' },
  { emoji: '😴', name: 'fatigué', color: 'bg-gray-100 text-gray-800' },
  { emoji: '🤗', name: 'câlin', color: 'bg-pink-100 text-pink-800' }
];

const CHILD_PROMPTS = [
  "J'ai eu une dispute avec mon ami...",
  "Je me sens triste aujourd'hui...",
  "Comment se faire des amis ?",
  "Pourquoi les gens se disputent ?",
  "Comment être gentil ?",
  "Je veux aider quelqu'un..."
];

export default function ChildMode() {
  const [messages, setMessages] = useState<ChildMessage[]>([
    {
      id: 'welcome',
      content: "Salut petit ami ! 🌟 Je suis COEXIST.AI, ton assistant de paix ! Je suis là pour t'aider à comprendre les émotions et à être gentil avec les autres. Comment te sens-tu aujourd'hui ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChildMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
      emotion: selectedEmotion
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Réponse adaptée aux enfants
      const childResponse = generateChildResponse(inputMessage, selectedEmotion);
      
      const aiMessage: ChildMessage = {
        id: (Date.now() + 1).toString(),
        content: childResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      
      const errorMessage: ChildMessage = {
        id: (Date.now() + 1).toString(),
        content: "Oh là là ! J'ai un petit problème technique, mais je suis toujours là pour toi ! Peux-tu me répéter ta question ? 🌈✨",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateChildResponse = (message: string, emotion?: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Réponses adaptées aux enfants
    if (lowerMessage.includes('dispute') || lowerMessage.includes('bagarre')) {
      return `Oh, une dispute ! 😔 C'est normal de se disputer parfois avec ses amis. Voici ce que tu peux faire :

🌈 **Pour résoudre la dispute :**
• Prends une grande respiration 🌬️
• Dis "Je suis désolé" si tu as fait une erreur
• Explique calmement ce qui t'a contrarié
• Propose de jouer ensemble à autre chose

💝 **Rappelle-toi :** Les vrais amis se pardonnent toujours ! L'amitié, c'est plus fort que les disputes ! ✨`;
    }
    
    if (lowerMessage.includes('triste') || emotion === 'triste') {
      return `Je vois que tu es triste... 😢 C'est normal d'avoir des moments tristes. Voici comment te sentir mieux :

🌟 **Pour te réconforter :**
• Fais un gros câlin à quelqu'un que tu aimes 🤗
• Dessine ou colorie quelque chose de joli 🎨
• Écoute ta musique préférée 🎵
• Parle à un adulte de confiance

💫 **Souviens-toi :** La tristesse ne dure pas toujours ! Demain sera un nouveau jour plein de joie ! 🌈`;
    }
    
    if (lowerMessage.includes('colère') || emotion === 'en colère') {
      return `La colère, c'est comme un petit dragon dans ton ventre ! 🐉 Voici comment l'apprivoiser :

🦋 **Pour calmer la colère :**
• Compte jusqu'à 10 lentement
• Serre très fort un coussin
• Dessine ta colère sur du papier
• Va courir ou sauter dehors

🌺 **Astuce magique :** Quand tu es en colère, imagine que tu es un papillon qui vole au-dessus des nuages ! La colère s'envole avec toi ! ✨`;
    }
    
    if (lowerMessage.includes('ami') || lowerMessage.includes('copain')) {
      return `Les amis, c'est magique ! 🌟 Voici comment se faire de vrais amis :

🤝 **Pour se faire des amis :**
• Sois gentil et souriant 😊
• Partage tes jouets et tes goûters
• Écoute ce que les autres racontent
• Aide tes copains quand ils ont besoin

💝 **Règle d'or :** Traite les autres comme tu aimerais être traité ! L'amitié, c'est donner et recevoir de l'amour ! 🌈`;
    }
    
    if (lowerMessage.includes('gentil') || lowerMessage.includes('aide')) {
      return `Tu veux être gentil ? C'est magnifique ! 🌟 Voici plein de façons d'être gentil :

🎁 **Gestes de gentillesse :**
• Aide maman ou papa à ranger
• Partage ton goûter avec un copain
• Dis des mots gentils à quelqu'un
• Aide un plus petit que toi

✨ **Le secret :** Chaque petit geste gentil fait briller le monde un peu plus ! Tu es un super-héros de la gentillesse ! 🦸‍♀️🦸‍♂️`;
    }
    
    // Réponse par défaut
    return `C'est une super question ! 🤔 Laisse-moi t'expliquer avec des mots simples :

🌈 **Ma réponse :**
Chaque situation est différente, mais l'important c'est d'être gentil et de comprendre les autres. Quand tu ne sais pas quoi faire, demande-toi : "Qu'est-ce qui rendrait les autres heureux ?"

💫 **Astuce :** L'amour et la gentillesse sont les super-pouvoirs les plus forts du monde ! Tu en as plein en toi ! ✨

Veux-tu que je t'explique autre chose ? Je suis là pour t'aider ! 🌟`;
  };

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 relative overflow-hidden">
      {/* Éléments décoratifs pour enfants */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce">
          <Rainbow className="h-8 w-8 text-pink-400" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <Butterfly className="h-6 w-6 text-purple-400" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-300">
          <Star className="h-7 w-7 text-yellow-400" />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse delay-500">
          <Sun className="h-9 w-9 text-orange-400" />
        </div>
      </div>

      {/* Header enfant */}
      <header className="peaceful-card m-4 shadow-lg border-0 sticky top-0 z-10 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="gentle-float">
              <div className="text-4xl">🌟</div>
            </div>
            <div>
              <h1 className="peaceful-title text-2xl font-bold">
                COEXIST.AI pour Enfants
              </h1>
              <p className="peaceful-text text-sm">
                Ton assistant de paix et d'amitié ! 🌈✨
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl px-4 py-3 rounded-2xl ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-900 shadow-lg border-2 border-pink-200'
              }`}
            >
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-lg leading-relaxed">
                  {message.content}
                </div>
              </div>
              
              {message.emotion && (
                <div className="mt-2 flex items-center space-x-1">
                  <span className="text-sm">Émotion :</span>
                  <span className="text-2xl">
                    {CHILD_EMOTIONS.find(e => e.name === message.emotion)?.emoji}
                  </span>
                </div>
              )}
              
              <div className="mt-2 text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-lg border-2 border-pink-200">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600"></div>
                <span className="text-gray-600 text-sm">
                  COEXIST.AI réfléchit... 🌟
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions rapides */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="peaceful-card p-4 mb-4">
          <h3 className="peaceful-title text-lg font-semibold mb-3">
            💬 Questions rapides
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CHILD_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-lg text-left text-sm transition-all duration-200 border border-pink-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sélection d'émotion */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="peaceful-card p-4 mb-4">
          <h3 className="peaceful-title text-lg font-semibold mb-3">
            😊 Comment te sens-tu ?
          </h3>
          <div className="flex flex-wrap gap-2">
            {CHILD_EMOTIONS.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`p-3 rounded-lg text-sm transition-all duration-200 border-2 ${
                  selectedEmotion === emotion.name
                    ? `${emotion.color} border-current`
                    : 'bg-white border-gray-200 hover:border-pink-300'
                }`}
              >
                <span className="text-2xl mr-2">{emotion.emoji}</span>
                <span>{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="peaceful-card p-4">
          <div className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Dis-moi ce qui te préoccupe, petit ami... 🌈"
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none text-lg"
                rows={2}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 text-lg"
            >
              <Heart size={20} />
              <span>Envoyer</span>
            </button>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              COEXIST.AI pour enfants - Gratuit et accessible à tous ! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
