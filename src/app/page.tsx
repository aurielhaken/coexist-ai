import Link from "next/link";
import { ArrowRight, Heart, Users, MessageCircle, Shield, Globe, Lightbulb } from "lucide-react";
import Chat from "@/components/Chat";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Transformez vos conflits en opportunités de dialogue
              </h1>
              <p className="text-lg text-muted-foreground">
                COEXIST.AI vous accompagne dans la résolution pacifique de vos conflits 
                grâce à l'intelligence artificielle et la sagesse universelle.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a href="/chat" className="btn-primary">Commencer le dialogue</a>
              <a href="/test" className="btn-secondary">Voir un exemple</a>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-card border">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Médiation Intelligente</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyse contextuelle pour des solutions adaptées
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg bg-card border">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Communication Bienveillante</h3>
                  <p className="text-sm text-muted-foreground">
                    Techniques de dialogue constructif
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg bg-card border">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Confidentialité Totale</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos conversations restent privées
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg bg-card border">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Approche Universelle</h3>
                  <p className="text-sm text-muted-foreground">
                    Respect des différences culturelles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-card border rounded-lg shadow-lg h-[600px]">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">COEXIST.AI</h3>
                    <p className="text-xs text-muted-foreground">Assistant de paix</p>
                  </div>
                </div>
              </div>
              <Chat />
            </div>
          </div>
        </div>

        {/* Principles Section */}
        <section className="mt-16 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Les 10 Principes COEXIST
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fondés sur la sagesse universelle et la psychologie moderne, 
              ces principes guident chaque interaction pour une coexistence harmonieuse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "🎧", text: "Écoute Active" },
              { icon: "💝", text: "Empathie" },
              { icon: "🤝", text: "Respect Mutuel" },
              { icon: "💬", text: "Communication Non-Violente" },
              { icon: "🏆", text: "Solutions Gagnant-Gagnant" },
              { icon: "⏳", text: "Patience" },
              { icon: "🌉", text: "Médiation" },
              { icon: "🌍", text: "Tolérance" },
              { icon: "⚖️", text: "Justice" },
              { icon: "🕊️", text: "Paix" },
            ].map((principle, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-card border text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{principle.icon}</div>
                <p className="text-sm font-medium text-foreground">{principle.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-brand-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">C</span>
              </div>
              <span className="font-semibold text-foreground">COEXIST.AI</span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
              <Heart className="w-4 h-4 text-red-500 mr-1" />
              Développé avec amour pour un monde plus paisible
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}