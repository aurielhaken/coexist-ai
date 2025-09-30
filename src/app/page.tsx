import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo et titre principal */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              COEXIST.AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Votre assistant IA pour la résolution pacifique de conflits
            </p>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Transformez vos conflits en opportunités grâce à l'intelligence artificielle 
              guidée par la sagesse universelle et les principes de coexistence pacifique.
            </p>
          </div>

          {/* Bouton d'action principal */}
          <div className="mb-16">
            <Link
              href="/chat"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Commencer une conversation
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </div>

          {/* Caractéristiques */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Médiation Intelligente</h3>
              <p className="text-gray-600">Analyse contextuelle pour des solutions adaptées</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidentialité Totale</h3>
              <p className="text-gray-600">Vos conversations restent privées et sécurisées</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Disponible 24/7</h3>
              <p className="text-gray-600">Accès permanent à votre assistant de paix</p>
            </div>
          </div>

          {/* Footer simple */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-500">
              Développé avec ❤️ pour un monde plus paisible
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}