'use client';

import { useState, useEffect } from 'react';
import { Save, BookOpen, Heart, Brain, Star, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  emotions: string[];
  insights: string[];
  gratitude: string[];
}

const EMOTION_OPTIONS = [
  'Paix', 'Joie', 'Gratitude', 'Amour', 'Espoir', 'Sérénité',
  'Colère', 'Tristesse', 'Anxiété', 'Confusion', 'Loneliness', 'Frustration'
];

const REFLECTION_PROMPTS = [
  "Qu'est-ce qui m'a apporté de la paix aujourd'hui ?",
  "Comment ai-je contribué à la coexistence aujourd'hui ?",
  "Quel conflit ai-je résolu ou évité aujourd'hui ?",
  "Quelle nouvelle compréhension ai-je acquise ?",
  "Comment puis-je être plus empathique demain ?",
  "Qu'est-ce que j'ai appris sur moi-même ?",
  "Comment puis-je mieux servir la paix mondiale ?"
];

export default function PeaceJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    emotions: [],
    insights: [],
    gratitude: []
  });
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  useEffect(() => {
    // Charger les entrées depuis localStorage
    const savedEntries = localStorage.getItem('coexist-journal');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) {
      alert('Veuillez remplir au moins le titre et le contenu');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: currentEntry.date || new Date().toISOString().split('T')[0],
      title: currentEntry.title,
      content: currentEntry.content,
      emotions: currentEntry.emotions || [],
      insights: currentEntry.insights || [],
      gratitude: currentEntry.gratitude || []
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('coexist-journal', JSON.stringify(updatedEntries));

    // Réinitialiser le formulaire
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: '',
      emotions: [],
      insights: [],
      gratitude: []
    });

    alert('Entrée sauvegardée avec succès ! 🌸');
  };

  const toggleEmotion = (emotion: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      emotions: prev.emotions?.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...(prev.emotions || []), emotion]
    }));
  };

  const addGratitude = () => {
    const item = prompt('Ajouter un élément de gratitude :');
    if (item) {
      setCurrentEntry(prev => ({
        ...prev,
        gratitude: [...(prev.gratitude || []), item]
      }));
    }
  };

  const addInsight = () => {
    const item = prompt('Ajouter une nouvelle compréhension :');
    if (item) {
      setCurrentEntry(prev => ({
        ...prev,
        insights: [...(prev.insights || []), item]
      }));
    }
  };

  const applyPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCurrentEntry(prev => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${prompt}\n` : prompt
    }));
    setShowPrompt(false);
  };

  const getEmotionColor = (emotion: string) => {
    const positive = ['Paix', 'Joie', 'Gratitude', 'Amour', 'Espoir', 'Sérénité'];
    return positive.includes(emotion) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="peaceful-title text-3xl font-bold mb-4">
          📖 Journal de Paix COEXIST.AI
        </h1>
        <p className="peaceful-text text-lg">
          Documentez votre parcours vers la sagesse et la coexistence pacifique
        </p>
      </div>

      {/* Formulaire d'entrée */}
      <div className="peaceful-card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="peaceful-title text-xl font-semibold">
            Nouvelle Entrée
          </h2>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <input
              type="date"
              value={currentEntry.date}
              onChange={(e) => setCurrentEntry(prev => ({ ...prev, date: e.target.value }))}
              className="peaceful-input text-sm"
            />
          </div>
        </div>

        {/* Titre */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Titre de votre entrée..."
            value={currentEntry.title}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, title: e.target.value }))}
            className="peaceful-input w-full"
          />
        </div>

        {/* Prompt suggestions */}
        <div className="mb-4">
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="peaceful-button px-4 py-2 text-sm flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Suggestions de réflexion</span>
          </button>
          
          {showPrompt && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Questions de réflexion :</h4>
              <div className="space-y-2">
                {REFLECTION_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => applyPrompt(prompt)}
                    className="block w-full text-left p-2 hover:bg-blue-50 rounded text-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="mb-4">
          <textarea
            placeholder="Écrivez vos réflexions, expériences, et insights sur la paix et la coexistence..."
            value={currentEntry.content}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
            className="peaceful-input w-full h-32 resize-none"
          />
        </div>

        {/* Émotions */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Émotions ressenties :</h4>
          <div className="flex flex-wrap gap-2">
            {EMOTION_OPTIONS.map((emotion) => (
              <button
                key={emotion}
                onClick={() => toggleEmotion(emotion)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  currentEntry.emotions?.includes(emotion)
                    ? getEmotionColor(emotion)
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>

        {/* Gratitude */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Gratitude</span>
            </h4>
            <button
              onClick={addGratitude}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Ajouter
            </button>
          </div>
          <div className="space-y-1">
            {currentEntry.gratitude?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold flex items-center space-x-2">
              <Brain className="h-4 w-4 text-blue-500" />
              <span>Nouvelles compréhensions</span>
            </h4>
            <button
              onClick={addInsight}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Ajouter
            </button>
          </div>
          <div className="space-y-1">
            {currentEntry.insights?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sauvegarder */}
        <button
          onClick={saveEntry}
          className="peaceful-button w-full flex items-center justify-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Sauvegarder cette entrée</span>
        </button>
      </div>

      {/* Entrées précédentes */}
      {entries.length > 0 && (
        <div>
          <h2 className="peaceful-title text-2xl font-bold mb-6">
            Entrées précédentes
          </h2>
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="peaceful-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="peaceful-title text-lg font-semibold">
                    {entry.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                
                <p className="peaceful-text mb-3">
                  {entry.content.length > 200 
                    ? `${entry.content.substring(0, 200)}...` 
                    : entry.content
                  }
                </p>
                
                {entry.emotions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.emotions.map((emotion, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${getEmotionColor(emotion)}`}
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{entry.gratitude.length} gratitude(s)</span>
                  <span>{entry.insights.length} insight(s)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
