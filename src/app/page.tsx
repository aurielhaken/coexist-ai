import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight, Heart, Shield, Clock, Brain, Users, Lightbulb, Zap } from "lucide-react";
import PeacefulParticles from "@/components/PeacefulParticles";

export default function HomePage() {
  return (
    <>
      <PeacefulParticles />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              {/* Logo animé */}
              <div className="flex justify-center mb-8 animate-fade-in-up">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
              
              {/* Titre principal */}
              <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="gradient-text">COEXIST.AI</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Votre assistant IA pour la 
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> coexistence pacifique</span>
              </p>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Transformez vos conflits en opportunités grâce à l'intelligence artificielle 
                guidée par la sagesse universelle et les principes de coexistence pacifique.
                <br />
                <span className="text-blue-600 dark:text-blue-400 font-medium">Ensemble, créons un monde plus harmonieux.</span>
              </p>

              {/* Bouton d'action principal */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <Link
                  href="/chat"
                  className="btn-modern inline-flex items-center px-10 py-5 text-xl font-semibold shimmer"
                >
                  <MessageCircle className="w-7 h-7 mr-4" />
                  Commencer une conversation
                  <ArrowRight className="w-7 h-7 ml-4" />
                </Link>
              </div>
            </div>

            {/* Caractéristiques principales */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <div className="card-modern p-8 text-center group animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Médiation Intelligente</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Analyse contextuelle avancée pour des solutions personnalisées et adaptées à chaque situation unique.
                </p>
              </div>

              <div className="card-modern p-8 text-center group animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confidentialité Totale</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Vos conversations restent privées et sécurisées. Nous respectons votre intimité et votre confiance.
                </p>
              </div>

              <div className="card-modern p-8 text-center group animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Disponible 24/7</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Accès permanent à votre assistant de paix, disponible à tout moment pour vous accompagner.
                </p>
              </div>

              <div className="card-modern p-8 text-center group animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Approche Bienveillante</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Une approche empathique et bienveillante pour créer un environnement de confiance et de compréhension.
                </p>
              </div>

              <div className="card-modern p-8 text-center group animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Solutions Créatives</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Des solutions innovantes et créatives pour résoudre les conflits de manière pacifique et constructive.
                </p>
              </div>

              <div className="card-modern p-8 text-center group animate-fade-in-up" style={{ animationDelay: '2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Réponses Rapides</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Des réponses instantanées et pertinentes pour vous aider à naviguer dans les situations difficiles.
                </p>
              </div>
            </div>

            {/* Section d'appel à l'action */}
            <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white animate-fade-in-up" style={{ animationDelay: '2.2s' }}>
              <h2 className="text-4xl font-bold mb-6">Prêt à transformer vos conflits ?</h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers de personnes qui ont déjà trouvé la paix grâce à COEXIST.AI
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Commencer maintenant
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </div>

            {/* Footer */}
            <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '2.4s' }}>
              <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                <Heart className="w-5 h-5 text-red-500 animate-pulse-slow" />
                <span className="text-lg">Développé avec amour pour un monde plus paisible</span>
                <Heart className="w-5 h-5 text-red-500 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}