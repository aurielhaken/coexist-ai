"use client";

import { useState } from "react";
import { HelpCircle, Mic, Volume2, Sparkles, X, ArrowRight } from "lucide-react";

export default function ModernVoiceHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton d'aide moderne */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:from-blue-100 hover:to-indigo-200 dark:hover:from-blue-700 dark:hover:to-indigo-600 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
        title="Aide pour les fonctionnalités vocales"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* Modal moderne */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Fonctionnalités Vocales
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Une expérience multimodale moderne
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Reconnaissance Vocale */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Reconnaissance Vocale
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Parlez naturellement, l'IA vous comprend
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 dark:text-white">Comment utiliser :</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span>Cliquez sur le bouton microphone 🎤</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span>Parlez clairement en français</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span>Votre parole devient du texte automatiquement</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span>Modifiez le texte avant d'envoyer si nécessaire</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 dark:text-white">Avantages :</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Gain de temps considérable</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Accessibilité améliorée</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Questions longues facilitées</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Interface mains libres</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Synthèse Vocale */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Lecture Vocale
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Écoutez les réponses pendant vos activités
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 dark:text-white">Fonctionnalités :</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>Lecture automatique des réponses</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>Boutons de lecture sur chaque message</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>Contrôle complet (lecture/arrêt)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                        <span>Voix française naturelle</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 dark:text-white">Utilisations :</h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Écoute pendant les activités</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Accessibilité pour malvoyants</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Apprentissage auditif</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Multitâche facilité</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Conseils */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-700/50">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                  Conseils d'Optimisation
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">Environnement :</h4>
                    <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <li>• Utilisez un environnement calme</li>
                      <li>• Parlez à un rythme normal</li>
                      <li>• Articulez bien vos mots</li>
                      <li>• Évitez les bruits de fond</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">Navigation :</h4>
                    <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <li>• Corrigez le texte avant envoi</li>
                      <li>• Utilisez les raccourcis clavier</li>
                      <li>• Testez les fonctionnalités</li>
                      <li>• Explorez toutes les options</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:scale-105 flex items-center space-x-2"
              >
                <span>Compris !</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
