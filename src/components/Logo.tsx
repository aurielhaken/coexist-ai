// components/Logo.tsx
export const Logo = ({ size = 40, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="relative">
      {/* Cœur central - Amour universel */}
      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center transform rotate-45">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      
      {/* Symboles religieux autour */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 rounded-full"></div> {/* Islam */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div> {/* Christianisme */}
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div> {/* Judaïsme */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div> {/* Bouddhisme */}
      <div className="absolute top-1/2 -left-2 w-3 h-3 bg-red-400 rounded-full transform -translate-y-1/2"></div> {/* Hindouisme */}
    </div>
  </div>
);
