// components/Header.tsx
import { Menu, Settings } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <Logo size={32} />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                COEXIST<span className="text-purple-500">.AI</span>
              </h1>
              <p className="text-xs text-gray-500">Assistant de Sagesse Universelle</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-200">
              🌱 En ligne
            </span>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
