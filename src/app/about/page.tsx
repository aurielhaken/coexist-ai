import { LogoFull } from '../../components/Logo';
import Link from 'next/link';
import { ArrowLeft, Heart, Users, MessageCircle, Shield, Globe, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour au Chat</span>
          </Link>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            À propos de COEXIST.AI
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <LogoFull className="drop-shadow-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            COEXIST.AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Assistant IA spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-red-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Notre Mission
            </h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Dans un monde où les conflits semblent inévitables, COEXIST.AI offre une approche révolutionnaire 
            pour transformer les désaccords en opportunités de compréhension mutuelle. Notre intelligence 
            artificielle combine sagesse ancestrale et psychologie moderne pour guider chacun vers des 
            solutions pacifiques et durables.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-blue-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Médiation Intelligente
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Analyse contextuelle des conflits familiaux, professionnels, amoureux et amicaux 
              pour proposer des stratégies de résolution adaptées.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="text-green-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Communication Bienveillante
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Techniques de communication non-violente et d&apos;écoute active pour 
              transformer les tensions en dialogues constructifs.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-purple-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Confidentialité Totale
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Vos conversations restent privées. Mode démo disponible sans inscription, 
              avec possibilité d&apos;intégration OpenAI sécurisée.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-indigo-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Approche Universelle
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Respect des différences culturelles, religieuses et idéologiques 
              pour une coexistence authentique et durable.
            </p>
          </div>
        </div>

        {/* Principles Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-yellow-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Les 10 Principes COEXIST
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "🎧 Écoute Active - Comprendre tous les points de vue",
              "💝 Empathie - Reconnaître les émotions de chacun",
              "🤝 Respect Mutuel - Dignité pour tous",
              "💬 Communication Non-Violente - Langage constructif",
              "🏆 Solutions Gagnant-Gagnant - Compromis équitables",
              "⏳ Patience - Le temps de la résolution",
              "🌉 Médiation - Pont entre les parties",
              "🌍 Tolérance - Accepter les différences",
              "⚖️ Justice - Équité et fairness",
              "🕊️ Paix - Solutions pacifiques"
            ].map((principle, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à transformer vos conflits en opportunités ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Commencez dès maintenant une conversation avec COEXIST.AI
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={20} />
              Démarrer le Chat
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Développé avec ❤️ pour un monde plus paisible</p>
      </footer>
    </div>
  );
}
