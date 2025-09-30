"use client";

import { useState } from "react";
import { HelpCircle, Mic, Volume2, X } from "lucide-react";

export default function VoiceHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton d'aide */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        title="Aide pour les fonctionnalités vocales"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {/* Modal d'aide */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                🎤 Fonctionnalités Vocales
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2 flex items-center">
                  <Mic className="w-4 h-4 mr-2" />
                  Reconnaissance Vocale
                </h3>
                <ul className="space-y-1 ml-6">
                  <li>• Cliquez sur le bouton microphone pour parler</li>
                  <li>• Parlez clairement en français</li>
                  <li>• Votre parole sera convertie en texte automatiquement</li>
                  <li>• Parfait pour les questions longues ou complexes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-2 flex items-center">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Lecture Vocale
                </h3>
                <ul className="space-y-1 ml-6">
                  <li>• Les réponses de l'IA sont lues automatiquement</li>
                  <li>• Cliquez sur le bouton volume pour relire un message</li>
                  <li>• Parfait pour écouter pendant que vous faites autre chose</li>
                  <li>• Idéal pour les personnes malvoyantes</li>
                </ul>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <h4 className="font-medium text-foreground mb-1">
                  💡 Conseils d'utilisation
                </h4>
                <ul className="space-y-1">
                  <li>• Utilisez un environnement calme pour la reconnaissance vocale</li>
                  <li>• Parlez à un rythme normal et articulez bien</li>
                  <li>• Vous pouvez corriger le texte avant d'envoyer</li>
                  <li>• La lecture vocale peut être arrêtée à tout moment</li>
                </ul>
              </div>

              <div className="bg-brand-50 dark:bg-brand-950 p-3 rounded-lg">
                <h4 className="font-medium text-brand-600 dark:text-brand-400 mb-1">
                  🌟 Accessibilité
                </h4>
                <p>
                  Ces fonctionnalités rendent COEXIST.AI accessible à tous, 
                  peu importe vos capacités visuelles ou motrices. 
                  La technologie vocale facilite l'accès à la sagesse universelle !
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
              >
                Compris !
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
