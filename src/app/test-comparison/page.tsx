'use client';

import { useState } from 'react';
import { MessageSquare, Sparkles, Heart, Zap } from 'lucide-react';

interface TestResult {
  id: string;
  question: string;
  demoResponse: string;
  openaiResponse: string;
  timestamp: Date;
}

export default function TestComparison() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const testQuestions = [
    "Mon patron me critique constamment devant mes collègues. Je ne sais plus quoi faire.",
    "Ma belle-mère interfère dans l'éducation de mes enfants et cela crée des tensions avec mon conjoint.",
    "Mon meilleur ami m'a menti sur quelque chose d'important et je ne sais pas si je peux lui faire confiance.",
    "Mon voisin fait du bruit la nuit et refuse de coopérer malgré mes demandes polies."
  ];

  const runComparison = async (testQuestion: string) => {
    setIsLoading(true);
    
    try {
      // Test Mode Démo
      const demoResponse = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: testQuestion,
          useDemo: true
        })
      });
      const demoData = await demoResponse.json();

      // Test Mode OpenAI (si clé disponible)
      let openaiData = { response: "Clé API OpenAI non configurée" };
      if (process.env.NEXT_PUBLIC_OPENAI_AVAILABLE === 'true') {
        const openaiResponse = await fetch('/api/advice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: testQuestion,
            useDemo: false
          })
        });
        openaiData = await openaiResponse.json();
      }

      const result: TestResult = {
        id: Date.now().toString(),
        question: testQuestion,
        demoResponse: demoData.response,
        openaiResponse: openaiData.response,
        timestamp: new Date()
      };

      setResults(prev => [result, ...prev]);
    } catch (error) {
      console.error('Erreur lors du test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Test de Comparaison IA
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comparez la qualité des réponses entre le mode démo et OpenAI
          </p>
        </div>

        {/* Questions de Test */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="text-blue-500" size={20} />
            Questions de Test Prédéfinies
          </h2>
          <div className="grid gap-3">
            {testQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => runComparison(q)}
                disabled={isLoading}
                className="text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Test Personnalisé */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="text-green-500" size={20} />
            Test Personnalisé
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Posez votre propre question de test..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => runComparison(question)}
              disabled={!question.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <Zap size={20} />
              Tester
            </button>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Question Testée
                </h3>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &ldquo;{result.question}&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {result.timestamp.toLocaleString('fr-FR')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Mode Démo */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="text-blue-500" size={20} />
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">
                      Mode Démo (Gratuit)
                    </h4>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {result.demoResponse}
                  </div>
                </div>

                {/* Mode OpenAI */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-purple-500" size={20} />
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                      Mode OpenAI (Payant)
                    </h4>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {result.openaiResponse}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <Sparkles className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
            <p className="text-gray-600 dark:text-gray-300">
              Test en cours...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
