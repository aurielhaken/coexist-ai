// components/Sidebar.tsx
import { X, Heart, BookOpen, Users, Globe, Settings } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: Heart, label: 'Méditation Guidée', color: 'text-pink-500' },
    { icon: BookOpen, label: 'Journal de Paix', color: 'text-blue-500' },
    { icon: Users, label: 'Communauté', color: 'text-green-500' },
    { icon: Globe, label: 'Sagesse Universelle', color: 'text-purple-500' },
    { icon: Settings, label: 'Paramètres', color: 'text-gray-500' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h2 className="font-semibold text-gray-900">COEXIST.AI</h2>
              <p className="text-xs text-gray-500">Menu de Navigation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-gray-700 group-hover:text-gray-900">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>🌍 Promouvant la paix mondiale</p>
            <p>❤️ Respect de toutes les croyances</p>
            <p className="text-[10px] mt-2">
              COEXIST.AI v1.0 • Sagesse Universelle
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
