interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Fond moderne avec coins arrondis */}
        <rect x="4" y="4" width="56" height="56" rx="16" fill="#3B82F6"/>
        
        {/* Icône de paix moderne */}
        <g transform="translate(32, 32)">
          {/* Cercle principal */}
          <circle cx="0" cy="0" r="16" fill="white"/>
          
          {/* Symbole de paix stylisé */}
          <g fill="#3B82F6">
            {/* Branches de paix */}
            <path d="M-12,-4 C-14,-2 -14,2 -12,4 C-10,6 -6,6 -4,4 C-2,2 2,2 4,4 C6,6 10,6 12,4 C14,2 14,-2 12,-4 C10,-6 6,-6 4,-4 C2,-2 -2,-2 -4,-4 C-6,-6 -10,-6 -12,-4 Z"/>
            
            {/* Point central */}
            <circle cx="0" cy="0" r="4" fill="#3B82F6"/>
          </g>
        </g>
        
        {/* Points d'accent */}
        <circle cx="16" cy="16" r="2" fill="white" opacity="0.7"/>
        <circle cx="48" cy="16" r="2" fill="white" opacity="0.7"/>
        <circle cx="16" cy="48" r="2" fill="white" opacity="0.7"/>
        <circle cx="48" cy="48" r="2" fill="white" opacity="0.7"/>
      </svg>
    </div>
  );
}

export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`w-48 h-48 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Gradient Definitions */}
        <defs>
          {/* Gradient paisible et humain */}
          <linearGradient id="humanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#4A90E2', stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:'#7ED321', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#F5A623', stopOpacity:1}} />
          </linearGradient>
          
          {/* Heart gradient */}
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#F87171', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#EF4444', stopOpacity:1}} />
          </linearGradient>
          
          {/* Dove gradient */}
          <linearGradient id="doveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#F3F4F6', stopOpacity:1}} />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with subtle gradient */}
        <circle cx="100" cy="100" r="95" fill="url(#humanGradient)" opacity="0.1"/>
        
        {/* Cercle principal avec icône humaine */}
        <circle cx="100" cy="100" r="60" fill="url(#humanGradient)" opacity="0.9" filter="url(#glow)"/>
        
        {/* Icône humaine stylisée au centre */}
        <g transform="translate(100, 100)">
          {/* Corps humain stylisé */}
          <path d="M-15,-25 C-15,-25 -15,-15 -15,-10 C-15,-5 -12,0 -8,0 C-4,0 0,-5 0,-10 C0,-15 4,-15 4,-25 C4,-35 0,-40 -8,-40 C-16,-40 -20,-35 -20,-25 C-20,-15 -16,-15 -15,-25 Z" 
                fill="white" opacity="0.95"/>
          
          {/* Bras ouverts (paix) */}
          <path d="M-25,-20 C-30,-15 -30,-10 -25,-5 C-20,0 -15,5 -10,8 C-5,12 0,12 5,8 C10,5 15,0 20,-5 C25,-10 25,-15 20,-20 C15,-25 10,-25 5,-20 C0,-20 -5,-20 -10,-20 Z" 
                fill="white" opacity="0.9"/>
          
          {/* Cœur au centre */}
          <path d="M-4,-15 C-7,-18 -10,-18 -13,-15 C-16,-12 -16,-8 -13,-5 C-10,-2 -7,-2 -4,0 C-1,-2 2,-2 5,-5 C8,-8 8,-12 5,-15 C2,-18 -1,-18 -4,-15 Z" 
                fill="#E74C3C" opacity="0.8"/>
          
          {/* Lignes de paix (ondes) */}
          <circle cx="0" cy="0" r="35" fill="none" stroke="white" strokeWidth="2" opacity="0.3"/>
          <circle cx="0" cy="0" r="45" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
        </g>
        
        {/* Éléments décoratifs paisibles autour */}
        <g opacity="0.6">
          {/* Feuilles de paix */}
          <path d="M30,30 C35,25 40,25 45,30 C50,35 45,40 40,38 C35,36 30,34 30,30 Z" fill="#27AE60"/>
          <path d="M170,30 C175,25 180,25 185,30 C190,35 185,40 180,38 C175,36 170,34 170,30 Z" fill="#27AE60"/>
          <path d="M30,170 C35,165 40,165 45,170 C50,175 45,180 40,178 C35,176 30,174 30,170 Z" fill="#27AE60"/>
          <path d="M170,170 C175,165 180,165 185,170 C190,175 185,180 180,178 C175,176 170,174 170,170 Z" fill="#27AE60"/>
          
          {/* Oiseaux de paix */}
          <path d="M50,50 C60,40 70,40 80,50" stroke="#3498DB" strokeWidth="2" fill="none"/>
          <path d="M120,50 C130,40 140,40 150,50" stroke="#3498DB" strokeWidth="2" fill="none"/>
          <path d="M50,150 C60,140 70,140 80,150" stroke="#3498DB" strokeWidth="2" fill="none"/>
          <path d="M120,150 C130,140 140,140 150,150" stroke="#3498DB" strokeWidth="2" fill="none"/>
        </g>
        
        {/* Lignes de connexion paisibles */}
        <g opacity="0.4">
          <path d="M 30 30 Q 100 20 170 30" stroke="url(#humanGradient)" strokeWidth="1" fill="none"/>
          <path d="M 30 170 Q 100 180 170 170" stroke="url(#humanGradient)" strokeWidth="1" fill="none"/>
          <path d="M 30 30 Q 20 100 30 170" stroke="url(#humanGradient)" strokeWidth="1" fill="none"/>
          <path d="M 170 30 Q 180 100 170 170" stroke="url(#humanGradient)" strokeWidth="1" fill="none"/>
        </g>
      </svg>
    </div>
  );
}
