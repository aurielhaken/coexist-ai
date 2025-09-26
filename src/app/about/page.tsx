import { LogoFull } from '../../components/Logo';
import Link from 'next/link';
import { ArrowLeft, Heart, Users, MessageCircle, Shield, Globe, Lightbulb, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects - Tons sombres uniquement */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gray-800/30 blur-3xl"></div>
      <div className="pointer-events-none absolute top-64 -right-24 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gray-900/40 blur-3xl"></div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour au Chat</span>
          </Link>
          <h1 className="text-xl font-semibold text-white">
            À propos de COEXIST.AI
          </h1>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Logo Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-indigo-500/50 via-sky-500/40 to-fuchsia-500/20 opacity-70 blur-2xl"></div>
              <div className="relative bg-slate-950/70 backdrop-blur-xl rounded-3xl p-8 border border-white/15 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.6)]">
                <LogoFull className="drop-shadow-2xl" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            COEXIST.AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Assistant IA spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 mb-16 border border-gray-800 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-800 text-white shadow-lg border border-gray-700">
              <Heart size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Notre Mission
            </h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            Dans un monde où les conflits semblent inévitables, COEXIST.AI offre une approche révolutionnaire 
            pour transformer les désaccords en opportunités de compréhension mutuelle. Notre intelligence 
            artificielle combine sagesse ancestrale et psychologie moderne pour guider chacun vers des 
            solutions pacifiques et durables.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-lg transition hover:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-800 text-white shadow-lg border border-gray-700">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Médiation Intelligente
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Analyse contextuelle des conflits familiaux, professionnels, amoureux et amicaux 
              pour proposer des stratégies de résolution adaptées.
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-lg transition hover:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-800 text-white shadow-lg border border-gray-700">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Communication Bienveillante
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Techniques de communication non-violente et d&apos;écoute active pour 
              transformer les tensions en dialogues constructifs.
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-lg transition hover:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-800 text-white shadow-lg border border-gray-700">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Confidentialité Totale
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Vos conversations restent privées. Mode démo disponible sans inscription, 
              avec possibilité d&apos;intégration OpenAI sécurisée.
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-lg transition hover:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-800 text-white shadow-lg border border-gray-700">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Approche Universelle
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Respect des différences culturelles, religieuses et idéologiques 
              pour une coexistence authentique et durable.
            </p>
          </div>
        </div>

        {/* Principles Section */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 mb-16 border border-gray-800 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-800 text-white shadow-lg border border-gray-700">
              <Lightbulb size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">
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
              <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-800/50 border border-gray-700 backdrop-blur">
                <span className="text-sm font-medium text-gray-200">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-800 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Prêt à transformer vos conflits en opportunités ?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Commencez dès maintenant une conversation avec COEXIST.AI
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={20} />
              Démarrer le Chat
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 text-gray-500">
        <p className="flex items-center justify-center gap-2">
          <Heart className="text-red-500" size={16} />
          Développé avec amour pour un monde plus paisible
        </p>
      </footer>
    </div>
  );
}
