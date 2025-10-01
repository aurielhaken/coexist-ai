'use client';

import Link from 'next/link';
import { Sparkles, Menu, X, MessageCircle, BookOpen, Info, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 dark:border-gray-700/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-float">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                COEXIST.AI
              </span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/chat" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </Link>
            <Link 
              href="/journal" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              <span>Journal</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <Info className="w-4 h-4" />
              <span>À propos</span>
            </Link>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/chat"
              className="btn-modern px-6 py-2 text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Commencer
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 dark:border-gray-700/20 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/chat" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat</span>
              </Link>
              <Link 
                href="/journal" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span>Journal</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5" />
                <span>À propos</span>
              </Link>
              <div className="pt-4 border-t border-white/20 dark:border-gray-700/20">
                <Link
                  href="/chat"
                  className="btn-modern w-full flex items-center justify-center px-6 py-3 text-sm font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Commencer une conversation
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}