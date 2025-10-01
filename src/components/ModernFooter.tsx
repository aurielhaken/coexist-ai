'use client';

import Link from 'next/link';
import { Heart, Sparkles, MessageCircle, BookOpen, Info, Mail, Github, Twitter } from 'lucide-react';

export default function ModernFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-float">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                COEXIST.AI
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre assistant IA pour la résolution de conflits et la promotion de la coexistence pacifique. 
              Ensemble, créons un monde plus harmonieux.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-500 animate-pulse-slow" />
              <span>Développé avec amour pour un monde plus paisible</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/chat" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </Link>
              </li>
              <li>
                <Link href="/journal" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span>Journal</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <Info className="w-4 h-4" />
                  <span>À propos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@coexist-ai.com" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>contact@coexist-ai.com</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/coexist-ai" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/coexist_ai" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 COEXIST.AI. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Conditions
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
