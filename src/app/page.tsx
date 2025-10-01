// app/page.tsx
'use client';

import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Logo size={80} className="animate-pulse" />
            </div>
            
            <h1 className="text-5xl font-light text-gray-800 mb-4">
              COEXIST<span className="text-purple-500">.AI</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Assistant de Sagesse Universelle • Human Wisdom
              <br />
              <span className="text-sm text-gray-500">
                Promouvant la paix et la compréhension mutuelle à travers l'intelligence artificielle
              </span>
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-semibold text-purple-500">∞</div>
                <div className="text-xs text-gray-500">Sagesse</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-blue-500">100%</div>
                <div className="text-xs text-gray-500">Bienveillance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-500">24/7</div>
                <div className="text-xs text-gray-500">Disponible</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard or Chat Interface */}
        {showDashboard ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <Dashboard />
          </div>
        ) : (
          <ChatInterface />
        )}
        
        {/* Toggle Button */}
        <div className="flex justify-center pb-4">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            {showDashboard ? 'Retour au Chat' : 'Tableau de Bord'}
          </button>
        </div>
      </div>
    </div>
  );
}